// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminSchema);
