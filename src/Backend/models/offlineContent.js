const mongoose = require("mongoose");

const offlineContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // <-- link to User
});

module.exports = mongoose.model("OfflineContent", offlineContentSchema);
