// backend/routes/injurySafeRoutes.js
const express = require("express");
const router = express.Router();
const injurySafeController = require("../controllers/injurySafeController");

// POST /api/injury-safe/generate
router.post("/generate", injurySafeController.generate);

module.exports = router;
