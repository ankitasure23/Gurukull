const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  school: { type: String },
  language: { type: String, default: "English" }
});

module.exports = mongoose.model("Profile", profileSchema);
