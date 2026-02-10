// backend/routes/dietRoutes.js
const express = require("express");
const router = express.Router();
const dietController = require("../controllers/dietController");

// POST /api/diet
router.post("/", dietController.generateDietPlan);

module.exports = router;
