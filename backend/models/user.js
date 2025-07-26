// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  names: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  residence: { type: String, required: true },
  guardian: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
