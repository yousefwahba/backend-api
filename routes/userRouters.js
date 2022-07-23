const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControlers");
const { protect } = require("../middleware/authMiddlewate");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
module.exports = router;
