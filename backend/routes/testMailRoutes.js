const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mailer");

router.get("/send-test", async (req, res) => {
  try {
    const to = req.query.to;
    if (!to) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    await sendMail({
      to,
      subject: "✅ FitTrack Test Email",
      html: "<h2>Email system working perfectly 🎉</h2>",
    });

    res.json({ success: true, message: "Test email sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
