import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Chatbot() {
  const location = useLocation();

  // ✅ Normalize token (supports "Bearer xxx" OR "xxx")
  const rawToken = localStorage.getItem("token");
  const token = useMemo(() => {
    if (!rawToken) return null;
    return rawToken.startsWith("Bearer ")
      ? rawToken.split(" ")[1]
      : rawToken;
  }, [rawToken]);

  // ✅ State
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // 🌐 language
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content:
        "Hi 👋 I’m FitTrack Assistant. Ask me anything about Plans, Diet, Workout, Injury-Safe Training, Progress, Services, Login/Signup, or Support.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const chatBoxRef = useRef(null);

  // ⏳ helper for realistic thinking delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 📊 Detect page context
  const getContext = () => {
    const path = location.pathname;
    if (path.includes("/diet")) return "Diet Page";
    if (path.includes("/workout")) return "Workout Page";
    if (path.includes("/progress")) return "Progress Page";
    if (path.includes("/injury")) return "Injury Page";
    return "General Page";
  };

  // 🔒 Auto-close if logged out
  useEffect(() => {
    if (!token) setOpen(false);
  }, [token]);

  // ⬇️ Auto-scroll on new messages
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, suggestions]);

  // 🚀 Send message (user or FAQ click)
  const sendMessage = async (text) => {
    const msg = text ?? input;
    if (!msg.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", content: msg }]);
    setInput("");
    setLoading(true);
    setSuggestions([]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: msg,
        page: getContext(),
        language, // 🌐 MUST be sent
      });

      // 🧠 Human-like thinking delay
      const replyText = res.data?.reply || "";
      const base = 600;
      const perChar = 10;
      const delay = Math.min(1800, base + replyText.length * perChar);
      await sleep(delay);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: replyText },
      ]);
      setSuggestions(res.data?.suggestions || []);
    } catch {
      await sleep(700);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setLoading(false);
  };

  // 🗑️ Clear chat
  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        content:
          "Chat cleared 🧹 Ask me anything about Plans, Diet, Workout, Injury-Safe Training, Progress, Services, Login/Signup, or Support!",
      },
    ]);
    setSuggestions([]);
  };

  // 🔒 Hide chatbot if not logged in
  if (!token) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-400 text-black font-bold shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:scale-105 transition"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-3xl overflow-hidden bg-[#0b0f14] border border-white/10 shadow-[0_25px_90px_rgba(0,0,0,0.75)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold">
            <span>FitTrack Assistant</span>

            {/* 🌐 Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs bg-black/20 text-black rounded px-2 py-1"
              title="Language"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>

            <button
              onClick={clearChat}
              className="text-xs bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-400 text-black"
                    : "mr-auto bg-white/10 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div className="mr-auto bg-white/10 px-4 py-2 rounded-2xl flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
              </div>
            )}

            {/* FAQ buttons */}
            {!loading && suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200 hover:bg-white/20 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about plans, diet, workout, progress..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-green-400 text-black px-4 rounded-xl font-semibold hover:bg-green-500 transition disabled:opacity-60"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
