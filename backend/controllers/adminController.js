const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// @route  POST /api/admin/register
exports.registerAdmin = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  try {
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ name, email, phone, role, password });
    await newAdmin.save();

    const token = generateToken(newAdmin);
    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Lasts Longer", error: err.message });
  }
};

// @route  POST /api/admin/login
// backend/controllers/adminController.js

// backend/controllers/adminController.js

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create token (assuming you already have generateToken)
    const token = generateToken(admin);

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

