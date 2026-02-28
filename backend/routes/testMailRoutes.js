const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mailer");

// ✅ Health check (so browser won't show "Cannot GET")
router.get("/", (req, res) => {
  res.json({ success: true, message: "testMail route working ✅" });
});

// ✅ Send test email (POST /api/testmail)
router.post("/", async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ success: false, message: "`to` is required" });
    }

    await sendMail({
      to,
      subject: "✅ FitTrack Test Email",
      html: `<h2>Test Email ✅</h2><p>If you got this, Gmail SMTP is working.</p>`,
    });

    res.json({ success: true, message: "Test email sent ✅" });
  } catch (err) {
    console.error("❌ TESTMAIL ERROR:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Also support POST /api/testmail/send (your Postman URL)
router.post("/send", async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ success: false, message: "`to` is required" });
    }

    await sendMail({
      to,
      subject: "✅ FitTrack Test Email (/send)",
      html: `<h2>Test Email ✅</h2><p>Route: /api/testmail/send</p>`,
    });

    res.json({ success: true, message: "Test email sent ✅" });
  } catch (err) {
    console.error("❌ TESTMAIL /send ERROR:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;