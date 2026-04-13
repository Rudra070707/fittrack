// backend/routes/planRoutes.js

const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User");
const planController = require("../controllers/planController");

// 🔥 NEW: AUTH
const { requireAuth } = require("../middleware/authMiddleware");

// 🔹 TEMP: Seed default plans (GET route for testing)
router.get("/seed", async (req, res) => {
  try {
    await Plan.deleteMany({});

    await Plan.insertMany([
      {
        name: "Basic Plan",
        code: "basic",
        price: 999,
        durationMonths: 1,
        features: ["Gym Access", "Locker Facility", "Basic Support"],
        highlight: false
      },
      {
        name: "Premium Plan",
        code: "premium",
        price: 1999,
        durationMonths: 1,
        features: [
          "Gym + Zumba + Yoga",
          "Personal Trainer",
          "Diet Consultation",
          "Priority Support"
        ],
        highlight: true
      },
      {
        name: "Elite Plan",
        code: "elite",
        price: 2999,
        durationMonths: 1,
        features: [
          "All Premium Benefits",
          "AI Diet Assistant",
          "Workout Analytics",
          "VIP Lounge Access"
        ],
        highlight: false
      }
    ]);

    res.json({ success: true, message: "Plans Seeded Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ➕ Add new plan
router.post("/add-plan", async (req, res) => {
  try {
    const { name, code, price, durationMonths, features, highlight, description } = req.body;

    const plan = new Plan({
      name,
      code,
      price,
      durationMonths,
      features,
      highlight,
      description: description || ""
    });

    await plan.save();
    res.json({ success: true, message: "Plan added successfully", plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📋 Get all plans
router.get("/all", async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });

    const plansWithUserCount = await Promise.all(
      plans.map(async (plan) => {
        const userCount = await User.countDocuments({
          plan: plan.name
        });

        return { ...plan.toObject(), userCount };
      })
    );

    res.json({ success: true, plans: plansWithUserCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔥🔥🔥 NEW: SELECT PLAN (MAIN FIX)
router.post("/select-plan", requireAuth, async (req, res) => {
  try {
    const { planCode } = req.body;

    if (!planCode) {
      return res.status(400).json({
        success: false,
        message: "planCode is required"
      });
    }

    const plan = await Plan.findOne({ code: planCode });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    const now = new Date();

    const end = new Date();
    end.setMonth(end.getMonth() + (plan.durationMonths || 1));

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        plan: plan.name,
        planStart: now,
        planEnd: end
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Plan selected successfully 🎉",
      plan: plan.name,
      validTill: end
    });

  } catch (err) {
    console.error("Select plan error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// ✅ UPDATE PLAN
router.put("/:id", planController.updatePlan);

module.exports = router;