const express = require("express");
const router = express.Router();
const multer = require("multer");
const settingsController = require("../controllers/settingsController");

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ROUTES
router.post("/", upload.single("logo"), settingsController.saveSettings);
router.get("/", settingsController.getSettings);

module.exports = router;
