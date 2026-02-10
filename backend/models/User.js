const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: String,
    gender: String,
    age: Number,

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ✅ force change password after first login (admin-created users)
    mustChangePassword: {
      type: Boolean,
      default: false,
    },

    plan: String,
    planStart: Date,
    planEnd: Date,

    // ✅ NEW: Zumba notification preference
    zumbaNotify: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
