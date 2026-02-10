const Payment = require("../models/Payment");
const User = require("../models/User");

// ✅ Create payment (demo gateway)
exports.createPayment = async (req, res) => {
  try {
    const { userId, amount, plan, txnId, transactionId, method, status } = req.body;

    // accept txnId OR transactionId from frontend
    const finalTxn = transactionId || txnId;

    if (!userId || !amount || !plan || !finalTxn) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details (userId, amount, plan, transactionId)",
      });
    }

    // 🔍 Fetch snapshot from User
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔒 Prevent duplicate SUCCESS payment for same plan (optional but good)
    const existing = await Payment.findOne({
      userId,
      plan,
      status: "SUCCESS",
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this plan",
      });
    }

    const payment = await Payment.create({
      userId,
      userName: user.name || "Member",
      userEmail: user.email || "unknown@email.com",
      amount: Number(amount),
      plan,
      transactionId: String(finalTxn),
      method: method || "Demo Gateway",
      status: status || "SUCCESS",
    });

    return res.json({
      success: true,
      message: "Payment recorded successfully",
      payment,
    });
  } catch (err) {
    console.error("createPayment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Admin: Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    return res.json({ success: true, payments });
  } catch (err) {
    console.error("getAllPayments error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
