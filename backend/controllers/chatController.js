const responses = require("../data/chatbotResponses");

function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getReply(message, page, language = "en") {
  const msg = normalize(message);

  // ✅ Context priority (with language fallback)
  if (msg.includes("plan")) {
    const ctx = {
      en: "📌 Do you want a Diet Plan or Workout Plan? Type: diet / workout",
      hi: "📌 आपको डाइट प्लान चाहिए या वर्कआउट प्लान? लिखें: diet / workout",
      mr: "📌 तुम्हाला डाएट प्लॅन की वर्कआउट प्लॅन हवा आहे? लिहा: diet / workout",
    };

    if (page?.includes("Diet")) return ctx[language] || ctx.en;
    if (page?.includes("Workout")) return ctx[language] || ctx.en;
  }

  // ✅ Keyword matching
  const match = responses.find((item) =>
    item.tags.some((tag) => msg.includes(normalize(tag)))
  );

  if (match) {
    return match.reply?.[language] || match.reply?.en || match.reply;
  }

  // ✅ Default fallback
  const fallback = responses.find((r) => r.tags.includes("default"));
  return fallback.reply?.[language] || fallback.reply?.en || fallback.reply;
}

const chatWithGPT = async (req, res) => {
  try {
    const { message, page, language = "en" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = getReply(message, page, language);

    return res.json({
      reply,
      suggestions: ["Diet", "Workout", "Progress", "Plans", "Login"],
    });
  } catch (err) {
    console.error("Chatbot server error:", err.message);
    return res.status(500).json({ error: "Chatbot server error" });
  }
};

module.exports = { chatWithGPT };
