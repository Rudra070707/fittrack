const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Date of entry (store as Date at midnight ideally)
    date: { type: Date, required: true },

    // Weight tracking (kg)
    weightKg: { type: Number, default: null },

    // ✅ Body fat tracking (%)
    bodyFat: { type: Number, default: null },

    // Workout tracking
    didWorkout: { type: Boolean, default: false },
    workoutMinutes: { type: Number, default: 0 },

    // Optional: type/category (Push/Pull/Legs/Cardio etc.)
    workoutType: { type: String, default: "" },
  },
  { timestamps: true }
);

// Helpful index: one entry per user per day
progressSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
