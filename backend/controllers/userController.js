// backend/controllers/userController.js
const User = require('../models/user');

// CREATE
exports.createUser = async (req, res) => {
  try {
    const { name, age, gender, guardianName, residence } = req.body;
    const picture = req.file?.path || null;

    const newUser = new User({ name, age, gender, guardianName, residence, picture });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

// READ ALL
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// READ ONE
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const { name, age, gender, guardianName, residence } = req.body;
    const picture = req.file?.path;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        gender,
        guardianName,
        residence,
        ...(picture && { picture }),
      },
      { new: true }
    );

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
