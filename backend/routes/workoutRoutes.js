// backend/routes/workoutRoutes.js

const express = require("express");
const router = express.Router();
const { generatePlan } = require("../controllers/workoutController");

// ✅ RATE LIMIT (PROTECTION)
const rateLimit = require("express-rate-limit");

const workoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// POST /api/workout/generate
router.post("/generate", workoutLimiter, generatePlan);

module.exports = router;