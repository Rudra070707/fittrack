// backend/routes/dietRoutes.js

const express = require("express");
const router = express.Router();
const dietController = require("../controllers/dietController");

// ✅ OPTIONAL: RATE LIMITING (PROTECTION AGAINST SPAM)
const rateLimit = require("express-rate-limit");

const dietLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per minute
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ✅ ROUTES

// POST /api/diet → Generate diet plan
router.post("/", dietLimiter, dietController.generateDietPlan);

module.exports = router;