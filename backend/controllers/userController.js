const User = require("../models/User");
const Plan = require("../models/Plan");

/* ======================================================
   ✅ CREATE USER
   ====================================================== */
exports.createUser = async (req, res) => {
  try {
    const { name, email, planCode, plan } = req.body;

    let finalPlan = plan || null;

    // 🔗 If planCode provided → convert to plan name
    if (planCode) {
      const foundPlan = await Plan.findOne({ code: planCode });
      if (!foundPlan) {
        return res.status(400).json({
          success: false,
          message: "Invalid plan code"
        });
      }
      finalPlan = foundPlan.name;
    }

    const user = new User({
      ...req.body,
      plan: finalPlan
    });

    await user.save();

    res.json({
      success: true,
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/* ======================================================
   ✅ GET ALL USERS
   ====================================================== */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/* ======================================================
   🔹 DEV ONLY: SEED TEST USERS
   ====================================================== */
exports.seedTestUsers = async (req, res) => {
  try {
    const testUsers = [
      { name: "Test User 1", email: "test1@gmail.com", phone: "9999999991", plan: "Basic Plan" },
      { name: "Test User 2", email: "test2@gmail.com", phone: "9999999992", plan: "Pro Plan" },
      { name: "Test User 3", email: "test3@gmail.com", phone: "9999999993", plan: "Premium Plan" }
    ];

    for (let u of testUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
      }
    }

    res.json({
      success: true,
      message: "Test users seeded ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Seeding failed ❌"
    });
  }
};
