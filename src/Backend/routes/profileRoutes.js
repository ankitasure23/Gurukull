const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middleware/authMiddleware");

// --- JWT-based routes ---
router.get("/", auth, profileController.getCurrentProfile);
router.put("/", auth, profileController.updateCurrentProfile);

// --- Existing routes ---
router.get("/:id", profileController.getProfile);
router.put("/:id", profileController.updateProfile);
router.delete("/offline/:contentId", profileController.removeOfflineContent);

module.exports = router;
