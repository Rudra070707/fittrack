import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  // ✅ Put your number in .env (frontend):
  // VITE_WHATSAPP_NUMBER=919876543210
  const rawWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || "";

  // ✅ sanitize (remove +, spaces, dashes)
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
      alert(
        "WhatsApp number is not set.\n\nAdd this in frontend/.env:\nVITE_WHATSAPP_NUMBER=919876543210\n\nThen restart npm run dev"
      );
      return;
    }

    try {
      setLoading(true);

      // ✅ 1) Save message in DB (real website feature)
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        alert(data.message || `Failed to send message (${res.status})`);
        return;
      }

      // ✅ 2) Open WhatsApp with pre-filled message (reaches your phone)
      const text = `Hi FitTrack Team 👋
Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent from FitTrack Contact Page`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        text
      )}`;

      // ✅ UI success + reset
      setSuccess("Message saved! Opening WhatsApp to send it now ✅");
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // open after UI update
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);
    } catch (err) {
      console.error(err);
      alert("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-24 overflow-hidden">
      {/* Subtle grid + overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      </div>

      {/* Floating Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600/20 blur-[140px] rounded-full" />
      <div className="absolute top-1/3 -right-28 w-[520px] h-[520px] bg-blue-500/10 blur-[180px] rounded-full" />

      {/* top accent line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <motion.p
          className="text-green-400 font-semibold tracking-[0.25em] text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          CONTACT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We’re here to{" "}
          <span className="text-green-400 drop-shadow-[0_0_22px_rgba(34,197,94,0.35)]">
            help you
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Have questions about memberships, workouts, or support? Send us a
          message and we’ll get back to you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          {/* Contact Form */}
          <motion.form
            className="
              relative
              bg-white/6 backdrop-blur-xl
              border border-white/10
              rounded-3xl p-8
              shadow-[0_22px_60px_rgba(0,0,0,0.55)]
              overflow-hidden
            "
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-green-400/12 blur-[160px] rounded-full" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              Send a message
            </h2>
            <p className="text-gray-400 mb-6">We usually respond within 24 hours.</p>

            {/* Success message */}
            {success && (
              <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-400/20 text-green-300 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10
                           text-white placeholder-gray-500 outline-none
                           focus:ring-2 focus:ring-green-400/80 focus:border-green-400/40 transition"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10
                           text-white placeholder-gray-500 outline-none
                           focus:ring-2 focus:ring-green-400/80 focus:border-green-400/40 transition"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10
                           text-white placeholder-gray-500 outline-none
                           focus:ring-2 focus:ring-green-400/80 focus:border-green-400/40 transition"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10
                           text-white placeholder-gray-500 outline-none resize-none
                           focus:ring-2 focus:ring-green-400/80 focus:border-green-400/40 transition"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                disabled={loading}
                className="
                  w-full mt-2 py-3 rounded-2xl font-bold
                  bg-green-400 text-black
                  shadow-[0_0_28px_rgba(34,197,94,0.55)]
                  hover:bg-green-500
                  hover:shadow-[0_0_42px_rgba(34,197,94,0.75)]
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-xs text-gray-500 pt-2">
                After saving, WhatsApp will open to send instantly.
              </p>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_22px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
              <div className="pointer-events-none absolute -top-20 left-10 w-64 h-64 bg-green-400/10 blur-[160px] rounded-full" />

              <h3 className="text-xl font-extrabold mb-5">Contact Details</h3>

              <div className="text-gray-200 space-y-4">
                <p className="flex items-center justify-between gap-3">
                  <span className="text-gray-400">Support Email</span>
                  <span className="font-semibold text-white">
                    support@fittrack.com
                  </span>
                </p>
                <div className="h-[1px] bg-white/10" />
                <p className="flex items-center justify-between gap-3">
                  <span className="text-gray-400">Phone</span>
                  <span className="font-semibold text-white">+91 9370563484</span>
                </p>
                <div className="h-[1px] bg-white/10" />
                <p className="flex items-center justify-between gap-3">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold text-white">
                    Mumbai, Maharashtra
                  </span>
                </p>
                <div className="h-[1px] bg-white/10" />
                <p className="flex items-center justify-between gap-3">
                  <span className="text-gray-400">Hours</span>
                  <span className="font-semibold text-white">Mon–Sat, 6AM–10PM</span>
                </p>
              </div>
            </div>

            <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_22px_60px_rgba(0,0,0,0.55)] overflow-hidden relative">
              <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 bg-blue-500/10 blur-[180px] rounded-full" />
              <h3 className="text-xl font-extrabold mb-4">Quick Help</h3>
              <ul className="text-gray-200 space-y-3">
                {[
                  "Membership & plan queries",
                  "Workout & diet guidance",
                  "Account / login support",
                  "Feedback & suggestions",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-5 rounded-2xl bg-black/25 border border-white/10">
                <p className="text-xs text-gray-400 tracking-[0.22em]">TIP</p>
                <p className="text-gray-200 mt-2">
                  For fastest support, include your registered email and plan name.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </section>
  );
}
