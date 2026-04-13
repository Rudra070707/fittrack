// backend/routes/injurySafeRoutes.js

const express = require("express");
const router = express.Router();
const injurySafeController = require("../controllers/injurySafeController");

// ✅ OPTIONAL: RATE LIMITING (PROTECTION)
const rateLimit = require("express-rate-limit");

const injuryLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per minute
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// POST /api/injury-safe/generate
router.post("/generate", injuryLimiter, injurySafeController.generate);

module.exports = router;