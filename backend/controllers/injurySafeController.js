// backend/controllers/injurySafeController.js

const { PART_GROUP, precautionsFor, extractBodyPart } = require("../data/injurySafeData");

exports.generate = async (req, res) => {
  try {

    const { text } = req.body; // user typed sentence

    // ✅ INPUT VALIDATION (NEW)
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Input text is required"
      });
    }

    const cleanedText = text.trim();

    if (!cleanedText) {
      return res.status(400).json({
        success: false,
        message: "Please enter a body part"
      });
    }

    const part = extractBodyPart(cleanedText);

    // ✅ VALID BODY PART CHECK
    if (!part) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid human body part (e.g., knee, shoulder, upper back)."
      });
    }

    const group = PART_GROUP[part] || "other";

    // ✅ SAFE PLAN GENERATION
    const plan = precautionsFor(part, group);

    if (!plan) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate safe training plan"
      });
    }

    // ✅ SUCCESS RESPONSE (STRUCTURED)
    return res.status(200).json({
      success: true,
      bodyPart: part,
      group,
      plan,
      meta: {
        input: cleanedText
      }
    });

  } catch (err) {

    console.error("injurySafe generate error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};