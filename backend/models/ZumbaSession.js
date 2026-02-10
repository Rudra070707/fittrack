const mongoose = require("mongoose");

const zumbaSessionSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Zumba Session" },
    dateTime: { type: Date, required: true },
    notifyBeforeMin: { type: Number, default: 60 },
    isActive: { type: Boolean, default: true },

    // ✅ NEW: prevent duplicate emails
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ZumbaSession", zumbaSessionSchema);
