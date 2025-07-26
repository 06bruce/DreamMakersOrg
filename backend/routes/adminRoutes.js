// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { names, email, password } = req.body;

  // Validate input
  if (!names || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  // Validate input
  if (!name || !email || !phone || !role || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      names: name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
