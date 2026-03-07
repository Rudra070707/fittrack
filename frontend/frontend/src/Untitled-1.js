import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const rawWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || "";
  const WHATSAPP_NUMBER = String(rawWhatsapp).replace(/[^\d]/g, "");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (loading) return;

    if (!fullName || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    if (!WHATSAPP_NUMBER) {
      alert("WhatsApp number not set in .env");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to send message");
        return;
      }

      const text = `Hi FitTrack Team 👋
Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      setSuccess("Message saved! Opening WhatsApp…");
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);
    } catch (err) {
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white px-6 py-28 overflow-hidden">

      <div className="max-w-6xl mx-auto relative">

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We’re here to <span className="text-green-400">help you</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10">

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-400/20 rounded-xl text-green-300 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400/80 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400/80 outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400/80 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 focus:ring-2 focus:ring-green-400/80 outline-none"
              />

              <button
                disabled={loading}
                className="w-full py-3 rounded-2xl font-bold bg-green-400 text-black hover:bg-green-500 transition-all"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}