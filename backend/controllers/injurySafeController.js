// backend/controllers/injurySafeController.js
const { PART_GROUP, precautionsFor, extractBodyPart } = require("../data/injurySafeData");

exports.generate = async (req, res) => {
  try {
    const { text } = req.body; // user typed sentence

    const part = extractBodyPart(text);

    if (!part) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid human body part (e.g., knee, shoulder, upper back)."
      });
    }

    const group = PART_GROUP[part] || "other";
    const plan = precautionsFor(part, group);

    return res.json({
      success: true,
      bodyPart: part,
      group,
      plan
    });
  } catch (err) {
    console.error("injurySafe generate error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
