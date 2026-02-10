const express = require("express");
const router = express.Router();

const {
  createPayment,
  getAllPayments,
} = require("../controllers/paymentController");

console.log("✅ Payment Routes Loaded");

// 🔎 Test
router.get("/", (req, res) => {
  res.send("Payments API Working");
});

// 📊 Admin: Get all payments
router.get("/all", getAllPayments);

// 💳 Add payment (demo)
router.post("/add", createPayment);

module.exports = router;
