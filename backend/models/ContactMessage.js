// backend/models/ContactMessage.js

const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: { 
      type: String, 
      required: true, 
      trim: true 
    },

    email: { 
      type: String, 
      required: true, 
      trim: true,
      lowercase: true,
      index: true
    },

    subject: { 
      type: String, 
      required: true, 
      trim: true 
    },

    message: { 
      type: String, 
      required: true, 
      trim: true 
    },

    status: {
      type: String,
      enum: ["new", "seen", "resolved"],
      default: "new",
      index: true
    },
  },
  { timestamps: true }
);

// 🔥 index for sorting performance
contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);