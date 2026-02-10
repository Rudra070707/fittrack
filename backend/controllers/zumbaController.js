// backend/controllers/zumbaController.js
const ZumbaSession = require("../models/ZumbaSession");

/**
 * ✅ Admin: Create a Zumba Session
 * body: { title?, dateTime, notifyBeforeMin?, isActive? }
 */
exports.createZumbaSession = async (req, res) => {
  try {
    const { title, dateTime, notifyBeforeMin, isActive } = req.body;

    if (!dateTime) {
      return res.status(400).json({
        success: false,
        message: "dateTime is required",
      });
    }

    const session = await ZumbaSession.create({
      title: title || "Zumba Session",
      dateTime: new Date(dateTime),
      notifyBeforeMin: notifyBeforeMin ?? 60,
      isActive: isActive ?? true,
    });

    return res.json({
      success: true,
      message: "Zumba session created successfully",
      session,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ✅ Admin: Get all sessions (optional but useful for admin panel)
 */
exports.getAllZumbaSessions = async (req, res) => {
  try {
    const sessions = await ZumbaSession.find().sort({ dateTime: 1 });

    return res.json({
      success: true,
      sessions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * ✅ Admin: Toggle active status (optional)
 * params: /:id/toggle
 */
exports.toggleZumbaSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await ZumbaSession.findById(id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    session.isActive = !session.isActive;
    await session.save();

    return res.json({
      success: true,
      message: "Session status updated",
      session,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
