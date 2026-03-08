import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../api";

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

      const res = await fetch(`${API_BASE}/contact`, {
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

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        text
      )}`;

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
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.p
          className="text-green-400 font-semibold tracking-widest text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          CONTACT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          We’re here to <span className="text-green-400">help you</span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg max-w-3xl mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Have questions about memberships, workouts, or support?
          Send us a message and we’ll get back to you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE - FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-2">Send a message</h2>

            <p className="text-gray-400 mb-6 text-sm">
              We usually respond within 24 hours.
            </p>

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

              <p className="text-xs text-gray-500 text-center">
                After saving, WhatsApp will open to send instantly.
              </p>
            </div>
          </motion.form>

          {/* RIGHT SIDE - INFO */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Contact Details */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Contact Details</h3>

              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Support Email</span>
                  <span className="font-semibold text-white">
                    support@fittrack.com
                  </span>
                </div>

                <div className="border-t border-white/10" />

                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-semibold text-white">
                    +91 9370563484
                  </span>
                </div>

                <div className="border-t border-white/10" />

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold text-white">
                    Mumbai, Maharashtra
                  </span>
                </div>

                <div className="border-t border-white/10" />

                <div className="flex justify-between">
                  <span className="text-gray-500">Hours</span>
                  <span className="font-semibold text-white">
                    Mon–Sat, 6AM–10PM
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">Quick Help</h3>

              <ul className="space-y-3 text-gray-300">
                {[
                  "Membership & plan queries",
                  "Workout & diet guidance",
                  "Account / login support",
                  "Feedback & suggestions",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/10">
                <p className="text-xs text-gray-500 tracking-widest">TIP</p>
                <p className="text-gray-300 mt-2 text-sm">
                  For fastest support, include your registered email and plan
                  name.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}