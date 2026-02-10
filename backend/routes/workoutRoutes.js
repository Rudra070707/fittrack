// backend/routes/workoutRoutes.js

const express = require("express");
const router = express.Router();
const { generatePlan } = require("../controllers/workoutController");

// POST /api/workout/generate
router.post("/generate", generatePlan);

module.exports = router;
