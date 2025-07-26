// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware"); // import the middleware
const User = require("../models/user");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Create user
router.post("/", auth, upload.single("picture"), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get user by ID
router.get("/:id", auth, getUser);

// Update user
router.put("/:id", auth, upload.single("picture"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user
router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
