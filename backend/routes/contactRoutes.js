// backend/routes/contactRoutes.js

const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");

const {
  createContactMessage,
  getAllContactMessages,
  updateContactStatus,
  deleteContactMessage,
} = require("../controllers/contactController");

// ✅ PUBLIC
router.post("/", createContactMessage);

// ✅ ADMIN (Protected)
router.get("/", adminAuth, getAllContactMessages);
router.patch("/:id/status", adminAuth, updateContactStatus);
router.delete("/:id", adminAuth, deleteContactMessage);

module.exports = router;