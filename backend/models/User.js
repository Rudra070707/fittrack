// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    phone: {
      type: String,
      trim: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: ""
    },

    age: {
      type: Number,
      min: 0,
      max: 120
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true
    },

    // ✅ force change password after first login (admin-created users)
    mustChangePassword: {
      type: Boolean,
      default: false,
    },

    plan: {
      type: String,
      default: ""
    },

    planStart: Date,
    planEnd: Date,

    // ✅ NEW: Zumba notification preference
    zumbaNotify: {
      type: Boolean,
      default: true,
    },

    /* ======================================================
       🎮 GAMIFICATION (UPGRADED)
       ====================================================== */
    streak: {
      current: { 
        type: Number, 
        default: 0,
        min: 0
      },
      best: { 
        type: Number, 
        default: 0,
        min: 0
      },
      // store date-only string: "YYYY-MM-DD" (IST safe using helper)
      lastActiveDate: { 
        type: String, 
        default: "" 
      },
    },

    xp: { 
      type: Number, 
      default: 0,
      min: 0
    },

    level: { 
      type: Number, 
      default: 1,
      min: 1
    },

    badges: { 
      type: [String], 
      default: [] 
    },

    // 🔥 NEW: last login tracking (useful for analytics)
    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

/* ======================================================
   🔐 INDEXES (PERFORMANCE BOOST)
   ====================================================== */
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

/* ======================================================
   🔥 PRE-SAVE HOOKS (DATA SAFETY)
   ====================================================== */

// Ensure streak consistency
userSchema.pre("save", function (next) {

  if (this.streak) {
    if (this.streak.current < 0) this.streak.current = 0;
    if (this.streak.best < this.streak.current) {
      this.streak.best = this.streak.current;
    }
  }

  if (this.xp < 0) this.xp = 0;
  if (this.level < 1) this.level = 1;

  next();
});

/* ======================================================
   🔥 METHODS (SCALABILITY READY)
   ====================================================== */

// Public profile (safe response)
userSchema.methods.toPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    plan: this.plan,
    streak: this.streak,
    xp: this.xp,
    level: this.level,
    badges: this.badges
  };
};

module.exports = mongoose.model("User", userSchema);