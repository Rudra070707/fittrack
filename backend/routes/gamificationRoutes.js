// backend/routes/gamificationRoutes.js
const express = require("express");
const router = express.Router();

const {
  getGamification,
  markTodayDone,
} = require("../controllers/gamificationController");

const { requireAuth } = require("../middleware/authMiddleware");

// ✅ Protect both routes (logged-in users only)
router.get("/", requireAuth, getGamification);
router.post("/mark-today", requireAuth, markTodayDone);

module.exports = router;