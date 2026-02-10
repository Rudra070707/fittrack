// backend/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/:slug", serviceController.getBySlug);

// Admin
router.post("/seed/all", requireAuth, requireAdmin, serviceController.seedAll);
router.put("/:slug", requireAuth, requireAdmin, serviceController.updateBySlug);

module.exports = router;
