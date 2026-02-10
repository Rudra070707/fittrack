const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const Plan = require("../models/Plan");

// ✅ auth middleware (for admin reset password route)
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

/* ============================
   Helpers
   ============================ */
const makeRandomPassword = (len = 10) => {
  return crypto
    .randomBytes(24)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, len);
};

const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

/* ======================================================
   ➕ ADD MEMBER (ADMIN PANEL)
   ====================================================== */
router.post("/add", async (req, res) => {
  try {
    const { name, email, planCode } = req.body;

    if (!name || !email) {
      return res.json({
        success: false,
        message: "Name & email required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    let planName = null;
    let planStart = null;
    let planEnd = null;

    // 🔗 Convert planCode → plan name + set plan dates
    if (planCode) {
      const plan = await Plan.findOne({ code: planCode });
      if (!plan) {
        return res.json({
          success: false,
          message: "Invalid plan code",
        });
      }
      planName = plan.name;

      planStart = new Date();
      planEnd = addMonths(planStart, plan.durationMonths || 1);
    }

    // ✅ Auto password for admin-added members
    const plainPassword = makeRandomPassword(10);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mustChangePassword: true, // ✅ force change on first login
      plan: planName,
      planStart,
      planEnd,
    });

    await user.save();

    res.json({
      success: true,
      message: "Member added successfully",
      user,
      tempPassword: plainPassword, // ✅ show once for admin/testing
    });
  } catch (error) {
    console.error("ADD USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ======================================================
   📋 GET ALL MEMBERS
   ====================================================== */
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ======================================================
   🗑 DELETE USER
   ====================================================== */
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ======================================================
   ✏ UPDATE USER
   ====================================================== */
router.put("/:id", async (req, res) => {
  try {
    let updateData = { ...req.body };

    // 🔁 Convert planCode → plan name safely + update dates
    if (req.body.planCode) {
      const plan = await Plan.findOne({ code: req.body.planCode });
      if (!plan) {
        return res.json({
          success: false,
          message: "Invalid plan code",
        });
      }

      updateData.plan = plan.name;

      const start = new Date();
      updateData.planStart = start;
      updateData.planEnd = addMonths(start, plan.durationMonths || 1);
    }

    // 🔒 Prevent password & mustChangePassword updates from this route
    if (updateData.password) delete updateData.password;
    if (updateData.mustChangePassword) delete updateData.mustChangePassword;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ======================================================
   🟢 USER SUBSCRIBE (FROM MEMBERSHIP PAGE)
   ====================================================== */
router.post("/subscribe", async (req, res) => {
  try {
    const { name, email, phone, planCode } = req.body;

    if (!name || !email || !phone || !planCode) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }

    const plan = await Plan.findOne({ code: planCode });
    if (!plan) {
      return res.json({
        success: false,
        message: "Invalid plan",
      });
    }

    const planStart = new Date();
    const planEnd = addMonths(planStart, plan.durationMonths || 1);

    // ✅ If user exists, update their plan instead of creating duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.name = name;
      existingUser.phone = phone;
      existingUser.plan = plan.name;
      existingUser.planStart = planStart;
      existingUser.planEnd = planEnd;

      await existingUser.save();

      return res.json({
        success: true,
        message: "Membership updated",
        user: existingUser,
      });
    }

    // ✅ New member: generate password
    const plainPassword = makeRandomPassword(10);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      mustChangePassword: true,
      plan: plan.name,
      planStart,
      planEnd,
    });

    await user.save();

    res.json({
      success: true,
      message: "Membership activated",
      user,
      tempPassword: plainPassword,
    });
  } catch (error) {
    console.error("SUBSCRIBE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ======================================================
   🔑 ADMIN: RESET MEMBER PASSWORD
   POST /api/users/:id/reset-password
   ====================================================== */
router.post("/:id/reset-password", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const plainPassword = makeRandomPassword(10);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    user.password = hashedPassword;
    user.mustChangePassword = true;
    await user.save();

    res.json({
      success: true,
      message: "Password reset ✅",
      tempPassword: plainPassword,
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   🔹 DEV ONLY: SEED USERS
   ====================================================== */
router.post("/seed", async (req, res) => {
  try {
    const testUsers = [
      { name: "Test User 1", email: "test1@gmail.com", phone: "9999999991", plan: "Basic Plan" },
      { name: "Test User 2", email: "test2@gmail.com", phone: "9999999992", plan: "Premium Plan" },
      { name: "Test User 3", email: "test3@gmail.com", phone: "9999999993", plan: "Elite Plan" },
    ];

    for (let u of testUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash("Test@123", 10);
        await User.create({
          ...u,
          password: hashedPassword,
          mustChangePassword: true,
        });
      }
    }

    res.json({
      success: true,
      message: "Test users seeded ✅ (Password: Test@123)",
    });
  } catch (error) {
    console.error("SEED ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Seeding failed ❌",
    });
  }
});

module.exports = router;
