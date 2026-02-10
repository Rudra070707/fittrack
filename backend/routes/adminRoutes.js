const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth");

// =========================
//   ADMIN SIGNUP
// =========================
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed });

    return res.json({ success: true, message: "Admin created successfully ✅" });
  } catch (err) {
    console.error("ADMIN SIGNUP ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// =========================
//   ADMIN LOGIN
// =========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "JWT_SECRET missing in .env" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ✅ IMPORTANT: include role in token for adminAuth
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ success: true, token, role: "admin" });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// =========================
//   DEBUG: WHO AM I (optional but super helpful)
// =========================
router.get("/me", adminAuth, (req, res) => {
  return res.json({ success: true, admin: req.admin });
});

module.exports = router;
