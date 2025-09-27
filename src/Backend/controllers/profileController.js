const Profile = require("../models/Profile");
const OfflineContent = require("../models/offlineContent");

// --- GET profile by user ID (existing) ---
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Keep existing behavior: find by Profile _id
    const user = await Profile.findById(userId);
    const offlineContent = await OfflineContent.find({ userId });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user, offlineContent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- UPDATE profile by user ID (existing) ---
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { full_name, email, school, language } = req.body;

    const updatedUser = await Profile.findByIdAndUpdate(
      userId,
      { full_name, email, school, language },
      { new: true }
    );

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- DELETE offline content ---
exports.removeOfflineContent = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    await OfflineContent.findByIdAndDelete(contentId);

    res.json({ message: "Content removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NEW: GET logged-in user's profile using JWT ---
exports.getCurrentProfile = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    // FIX: search Profile by userId field instead of _id
    const user = await Profile.findOne({ userId });
    const offlineContent = await OfflineContent.find({ userId });

    if (!user) return res.status(404).json({ error: "Profile not found" });

    res.json({ user, offlineContent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- NEW: UPDATE logged-in user's profile using JWT ---
exports.updateCurrentProfile = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { full_name, email, school, language } = req.body;

    // FIX: update Profile by userId field
    const updatedUser = await Profile.findOneAndUpdate(
      { userId },
      { full_name, email, school, language },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "Profile not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
