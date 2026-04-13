// backend/models/Progress.js

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
      index: true
    },

    // Date of entry (normalized to midnight)
    date: { 
      type: Date, 
      required: true,
      index: true
    },

    // Weight tracking (kg)
    weightKg: { 
      type: Number, 
      default: null,
      min: 0,
      validate: {
        validator: function(v) {
          return v === null || v >= 0;
        },
        message: "Weight must be positive"
      }
    },

    // Body fat tracking (%)
    bodyFat: { 
      type: Number, 
      default: null,
      min: 0,
      max: 100,
      validate: {
        validator: function(v) {
          return v === null || (v >= 0 && v <= 100);
        },
        message: "Body fat must be between 0 and 100"
      }
    },

    // Workout tracking
    didWorkout: { 
      type: Boolean, 
      default: false 
    },

    workoutMinutes: { 
      type: Number, 
      default: 0,
      min: 0,
      validate: {
        validator: function(v) {
          return v >= 0;
        },
        message: "Workout minutes must be >= 0"
      }
    },

    workoutType: { 
      type: String, 
      default: "",
      trim: true
    },

  },
  { timestamps: true }
);

// ✅ Unique index: 1 entry per day per user
progressSchema.index({ userId: 1, date: 1 }, { unique: true });

// ✅ Normalize date before save
progressSchema.pre("save", function(next) {
  if (this.date) {
    this.date.setHours(0, 0, 0, 0);
  }
  next();
});

// ✅ Normalize date for findOneAndUpdate (IMPORTANT 🔥)
progressSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();

  if (update && update.date) {
    const d = new Date(update.date);
    if (!isNaN(d.getTime())) {
      d.setHours(0, 0, 0, 0);
      update.date = d;
    }
  }

  next();
});

module.exports = mongoose.model("Progress", progressSchema);