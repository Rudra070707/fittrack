// SAME IMPORTS (UNCHANGED)
import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";

// 🔥 NEW: import reusable button
import LoadingButton from "./ui/LoadingButton";

export default function Chatbot() {

  const location = useLocation();

  const rawToken = localStorage.getItem("token");

  const token = useMemo(() => {
    if (!rawToken) return null;

    return rawToken.startsWith("Bearer ")
      ? rawToken.split(" ")[1]
      : rawToken;

  }, [rawToken]);

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");

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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getContext = () => {
    const path = location.pathname;

    if (path.includes("/diet")) return "Diet Page";
    if (path.includes("/workout")) return "Workout Page";
    if (path.includes("/progress")) return "Progress Page";
    if (path.includes("/injury")) return "Injury Page";

    return "General Page";
  };

  useEffect(() => {
    if (!token) setOpen(false);
  }, [token]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, suggestions]);

  const sendMessage = async (text) => {

    const msg = text ?? input;

    if (!msg.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", content: msg }]);

    setInput("");
    setLoading(true);
    setSuggestions([]);

    try {

      const res = await axios.post(`${API_BASE}/chat`, {
        message: msg,
        page: getContext(),
        language,
      });

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

  if (!token) return null;

  return (
    <>

      {/* 💬 FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0 0 20px rgba(34,197,94,0.5)",
            "0 0 60px rgba(34,197,94,1)",
            "0 0 20px rgba(34,197,94,0.5)"
          ],
          opacity: open ? 0 : 1,
          scale: open ? 0 : 1
        }}
        transition={{ repeat: open ? 0 : Infinity, duration: 2.5 }}
        className="
        fixed bottom-6 left-6 z-[9999] !left-6 !right-auto
        w-14 h-14 rounded-full
        bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400
        text-black text-lg font-bold
        shadow-[0_0_60px_rgba(34,197,94,0.9)]
        border border-white/20
        backdrop-blur-md
        relative overflow-hidden
        pointer-events-auto
        "
      >
        <span className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
        💬
      </motion.button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 80, x: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 80, x: -40 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="
            fixed bottom-24 left-6 z-[9999] !left-6 !right-auto
            w-[370px] max-h-[540px]
            flex flex-col
            rounded-3xl overflow-hidden
            backdrop-blur-2xl
            bg-gradient-to-b from-[#0b0f14]/95 to-[#020617]/95
            border border-white/10
            shadow-[0_60px_200px_rgba(0,0,0,1)]
            pointer-events-auto
            "
          >

            {/* 🔥 HEADER */}
            <div className="
            flex items-center justify-between gap-2
            px-4 py-3
            bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
            text-black font-semibold
            shadow-inner
            ">

              <span className="tracking-wide">FitTrack AI 🤖</span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs bg-black/20 rounded-lg px-2 py-1 border border-black/20 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>

              <button
                onClick={clearChat}
                className="
                text-xs bg-black/20 px-3 py-1 rounded-full
                hover:bg-black/30 hover:scale-105
                transition
                "
              >
                Clear
              </button>

              {/* 🔥 CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="text-xs bg-black/20 px-2 py-1 rounded-full hover:bg-black/40"
              >
                ✕
              </button>

            </div>

            {/* 🔥 MESSAGES */}
            <div
              ref={chatBoxRef}
              className="
              flex-1 overflow-y-auto
              px-4 py-4 space-y-3 text-sm
              scrollbar-thin
              "
            >

              {messages.map((msg, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.sender === "user"
                      ? "ml-auto bg-gradient-to-r from-green-400 to-emerald-400 text-black shadow-[0_10px_40px_rgba(34,197,94,0.7)]"
                      : "mr-auto bg-white/10 text-gray-200 border border-white/10 backdrop-blur-md shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {msg.content}
                </motion.div>

              ))}

              {/* 🔥 TYPING */}
              {loading && (
                <div className="mr-auto bg-white/10 px-4 py-2 rounded-2xl flex gap-1 backdrop-blur-md">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300" />
                </div>
              )}

              {/* 🔥 SUGGESTIONS */}
              {!loading && suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="
                      text-xs px-3 py-1 rounded-full
                      bg-white/10 border border-white/10
                      hover:bg-green-400 hover:text-black
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]
                      hover:scale-105
                      transition
                      "
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* 🔥 INPUT */}
            <div className="border-t border-white/10 p-3 flex gap-2 backdrop-blur-md">

              <input
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything about fitness..."
                className="
                flex-1 bg-black/40 border border-white/10
                rounded-xl px-3 py-2 text-white text-sm
                outline-none focus:ring-2 focus:ring-green-400
                hover:border-green-400/40 transition
                disabled:opacity-60
                "
              />

              <LoadingButton
                onClick={() => sendMessage()}
                loading={loading}
              >
                Send
              </LoadingButton>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}