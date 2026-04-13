// backend/controllers/workoutController.js

const { generateWorkoutPlan } = require("../utils/workoutGenerator");

exports.generatePlan = async (req, res) => {
  try {
    let { goal, level, days } = req.body;

    // ✅ BASIC VALIDATION
    if (!goal || !level || days === undefined) {
      return res.status(400).json({
        success: false,
        message: "goal, level, days are required"
      });
    }

    // ✅ NORMALIZE INPUT
    goal = String(goal).trim();
    level = String(level).trim();
    days = Number(days);

    // ✅ VALIDATE DAYS
    if (isNaN(days) || ![3, 5, 6].includes(days)) {
      return res.status(400).json({
        success: false,
        message: "days must be 3, 5, or 6"
      });
    }

    // ✅ VALID OPTIONS
    const allowedGoals = ["Weight Loss", "Muscle Gain", "Strength", "General Fitness"];
    const allowedLevels = ["Beginner", "Intermediate", "Advanced"];

    if (!allowedGoals.includes(goal)) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal"
      });
    }

    if (!allowedLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Invalid level"
      });
    }

    // ✅ GENERATE PLAN
    const plan = generateWorkoutPlan({ goal, level, days });

    return res.status(200).json({
      success: true,
      plan,
      meta: {
        goal,
        level,
        days
      }
    });

  } catch (err) {
    console.error("workout generatePlan error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error generating workout plan"
    });
  }
};