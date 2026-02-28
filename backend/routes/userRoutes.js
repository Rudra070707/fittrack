const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const Plan = require("../models/Plan");

// ✅ auth middleware
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
router.post("/add", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, email, planCode } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "Name & email required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists" });
    }

    let planName = null;
    let planStart = null;
    let planEnd = null;

    if (planCode) {
      const plan = await Plan.findOne({ code: planCode });
      if (!plan) {
        return res.json({ success: false, message: "Invalid plan code" });
      }
      planName = plan.name;
      planStart = new Date();
      planEnd = addMonths(planStart, plan.durationMonths || 1);
    }

    const plainPassword = makeRandomPassword(10);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mustChangePassword: true,
      plan: planName,
      planStart,
      planEnd,
    });

    await user.save();

    res.json({
      success: true,
      message: "Member added successfully",
      user,
      tempPassword: plainPassword,
    });
  } catch (error) {
    console.error("ADD USER ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   📋 GET ALL MEMBERS
====================================================== */
router.get("/all", requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   🗑 DELETE USER
====================================================== */
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   ✏ UPDATE USER
====================================================== */
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.body.planCode) {
      const plan = await Plan.findOne({ code: req.body.planCode });
      if (!plan) {
        return res.json({ success: false, message: "Invalid plan code" });
      }

      updateData.plan = plan.name;
      const start = new Date();
      updateData.planStart = start;
      updateData.planEnd = addMonths(start, plan.durationMonths || 1);
    }

    delete updateData.password;
    delete updateData.mustChangePassword;

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
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   🟢 USER SUBSCRIBE (PUBLIC)
====================================================== */
router.post("/subscribe", async (req, res) => {
  try {
    const { name, email, phone, planCode } = req.body;

    if (!name || !email || !phone || !planCode) {
      return res.json({ success: false, message: "All fields required" });
    }

    const plan = await Plan.findOne({ code: planCode });
    if (!plan) {
      return res.json({ success: false, message: "Invalid plan" });
    }

    const planStart = new Date();
    const planEnd = addMonths(planStart, plan.durationMonths || 1);

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
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   🔔 USER: TOGGLE ZUMBA EMAIL (NEW ⭐)
====================================================== */
router.patch("/me/zumba-notify", requireAuth, async (req, res) => {
  try {
    const { enabled } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { zumbaNotify: !!enabled },
      { new: true }
    ).select("name email zumbaNotify");

    res.json({
      success: true,
      message: `Zumba notifications ${user.zumbaNotify ? "enabled ✅" : "disabled ❌"}`,
      user,
    });
  } catch (err) {
    console.error("ZUMBA TOGGLE ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ======================================================
   🔑 ADMIN RESET PASSWORD
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

module.exports = router;