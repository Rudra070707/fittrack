const express = require("express");
const router = express.Router();

const userAuthController = require("../controllers/userAuthController");
const { requireAuth } = require("../middleware/authMiddleware");

// 🔐 Auth routes
router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

// 🔁 Change password (protected)
router.post("/change-password", requireAuth, userAuthController.changePassword);

module.exports = router;
