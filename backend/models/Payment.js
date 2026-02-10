const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // 🔗 Reference (integrity / future joins)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📌 Snapshot fields (show in admin + receipts even if user changes later)
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    plan: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },

    method: {
      type: String,
      default: "Demo Gateway",
      trim: true,
    },

    // ✅ Keep only ONE key: transactionId
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
