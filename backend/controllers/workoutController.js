// backend/controllers/workoutController.js

const { generateWorkoutPlan } = require("../utils/workoutGenerator");

exports.generatePlan = async (req, res) => {
  try {
    const { goal, level, days } = req.body;

    if (!goal || !level || !days) {
      return res.status(400).json({
        success: false,
        message: "goal, level, days are required"
      });
    }

    const d = Number(days);
    if (![3, 5, 6].includes(d)) {
      return res.status(400).json({
        success: false,
        message: "days must be 3, 5, or 6"
      });
    }

    const allowedGoals = ["Weight Loss", "Muscle Gain", "Strength", "General Fitness"];
    const allowedLevels = ["Beginner", "Intermediate", "Advanced"];

    if (!allowedGoals.includes(goal)) {
      return res.status(400).json({ success: false, message: "Invalid goal" });
    }

    if (!allowedLevels.includes(level)) {
      return res.status(400).json({ success: false, message: "Invalid level" });
    }

    const plan = generateWorkoutPlan({ goal, level, days: d });

    return res.json({
      success: true,
      plan
    });
  } catch (err) {
    console.error("workout generatePlan error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error generating workout plan"
    });
  }
};
