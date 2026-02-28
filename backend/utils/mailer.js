// backend/utils/mailer.js
const nodemailer = require("nodemailer");

/**
 * ✅ Gmail SMTP Transport (Render-friendly)
 * Use explicit SMTP config instead of only `service: "gmail"`
 * to reduce connection timeout / DNS issues on some hosts.
 *
 * Needs ENV:
 * - GMAIL_USER = your gmail address
 * - GMAIL_APP_PASS = 16-char Gmail App Password
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // ✅ 587 = STARTTLS (usually best for Render)
  secure: false, // must be false for 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },

  // Helpful on slow/limited networks
  connectionTimeout: 20_000, // 20s
  greetingTimeout: 20_000,
  socketTimeout: 20_000,
});

/**
 * ✅ Verify SMTP connection on server start (helps debugging)
 * If this fails, Render logs will show WHY (auth, blocked, etc.)
 */
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP Verify Failed:", err.message);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

/**
 * ✅ Generic sendMail function (Used across FitTrack)
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