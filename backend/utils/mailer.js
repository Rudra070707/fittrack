// backend/utils/mailer.js
const nodemailer = require("nodemailer");

/**
 * Gmail SMTP Transport
 * Uses secure SSL on port 465
 * (Recommended for college projects)
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // your gmail address
    pass: process.env.GMAIL_APP_PASS,  // 16-char app password
  },
});

/**
 * Generic sendMail function
 * (Used across FitTrack)
 *
 * @param {Object} param0
 * @param {string|string[]} param0.to
 * @param {string} param0.subject
 * @param {string} param0.html
 */
async function sendMail({ to, subject, html }) {
  if (!to || !subject || !html) {
    throw new Error("sendMail requires to, subject, and html");
  }

  try {
    const info = await transporter.sendMail({
      from: `"FitTrack" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
}

/**
 * ✅ Zumba Session Notification Helper
 */
async function sendZumbaNotification({ to, userName, sessionTime }) {
  return sendMail({
    to,
    subject: "🕺 Zumba Session Reminder – FitTrack",
    html: `
      <div style="font-family:Arial, sans-serif; line-height:1.6">
        <h2>Hello ${userName || "there"} 👋</h2>
        <p>This is a reminder for your <b>Zumba Session</b>.</p>
        <p><b>Session Time:</b> ${sessionTime}</p>
        <p>Stay active and enjoy the session 💪</p>
        <hr />
        <small>This is an automated email from FitTrack.</small>
      </div>
    `,
  });
}

module.exports = {
  sendMail,
  sendZumbaNotification,
};
