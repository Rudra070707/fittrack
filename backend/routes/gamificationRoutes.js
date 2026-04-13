// backend/routes/gamificationRoutes.js

const express = require("express");
const router = express.Router();

const {
  getGamification,
  markTodayDone,
} = require("../controllers/gamificationController");

const { requireAuth } = require("../middleware/authMiddleware");

// ✅ RATE LIMIT (NEW 🔐)
const rateLimit = require("express-rate-limit");

const gamificationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 40, // limit each IP
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
});

// ✅ Protect both routes (logged-in users only)
router.get("/", requireAuth, gamificationLimiter, getGamification);
router.post("/mark-today", requireAuth, gamificationLimiter, markTodayDone);

module.exports = router;