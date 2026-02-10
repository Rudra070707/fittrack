const ContactMessage = require("../models/ContactMessage");
const { sendMail } = require("../utils/mailer");

// ✅ PUBLIC: user submits contact message
exports.createContactMessage = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "fullName, email, subject, message are required",
      });
    }

    const saved = await ContactMessage.create({
      fullName,
      email,
      subject,
      message,
      status: "new",
    });

    // ✅ Email to YOU + Auto reply to user (non-blocking)
    (async () => {
      try {
        const ownerEmail =
          process.env.OWNER_EMAIL ||
          process.env.EMAIL_USER ||
          process.env.MAIL_FROM; // fallback (not ideal, but safe)

        // send to owner (admin)
        await sendMail({
          to: ownerEmail,
          subject: `📩 New Contact Message: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>New Contact Message (FitTrack)</h2>
              <p><b>Name:</b> ${fullName}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Subject:</b> ${subject}</p>
              <p><b>Message:</b></p>
              <p style="white-space: pre-line;">${message}</p>
              <hr/>
              <p><b>Saved in DB ID:</b> ${saved._id}</p>
            </div>
          `,
        });

        // auto reply to user
        await sendMail({
          to: email,
          subject: "✅ We received your message - FitTrack Support",
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>Hi ${fullName},</h2>
              <p>Thanks for contacting <b>FitTrack</b>. We’ve received your message and will get back to you soon.</p>
              <p><b>Your Subject:</b> ${subject}</p>
              <p style="margin-top: 12px;"><b>Your Message:</b></p>
              <p style="white-space: pre-line;">${message}</p>
              <br/>
              <p>— FitTrack Support Team</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.log("⚠️ Email sending failed:", mailErr.message);
      }
    })();

    return res.json({
      success: true,
      message: "Message saved successfully",
      data: saved,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: list messages (Inbox)
exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: update status (new/seen/resolved)
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["new", "seen", "resolved"];
    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res.json({ success: true, message: "Status updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ ADMIN: delete message
exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
