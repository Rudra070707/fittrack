// backend/routes/zumbaRoutes.js
const express = require("express");
const router = express.Router();

const {
  createZumbaSession,
  getAllZumbaSessions,
  toggleZumbaSession,
} = require("../controllers/zumbaController");

// ✅ Use your existing admin auth middleware name here:
// If your middleware file is named differently, keep it same as your project.
const adminAuth = require("../middleware/adminAuth");

// ✅ Admin routes
router.post("/create", adminAuth, createZumbaSession);
router.get("/all", adminAuth, getAllZumbaSessions);
router.patch("/:id/toggle", adminAuth, toggleZumbaSession);

module.exports = router;
