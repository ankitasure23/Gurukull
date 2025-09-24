const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signup,
  login, //  import signup & login
} = require("../controllers/userControllers");

const router = express.Router();

// 🔑 Auth routes
router.post("/signup", signup);
router.post("/login", login);

// 👥 User CRUD routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
