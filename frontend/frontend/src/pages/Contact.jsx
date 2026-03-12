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

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      setSuccess("Message saved! Opening WhatsApp…");

      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);

    } catch {
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Global animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"/>

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background:[
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity,ease:"easeInOut"}}
        />

      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">

        {/* Heading */}
        <motion.p
          className="text-emerald-400 font-semibold tracking-[0.3em] text-xs mb-4"
          initial={{opacity:0}}
          animate={{opacity:1}}
        >
          CONTACT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6"
          initial={{opacity:0,y:25}}
          animate={{opacity:1,y:0}}
        >
          We’re here to{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            help you
          </span>
        </motion.h1>

        <motion.p
          className="text-white/60 text-lg max-w-3xl mb-14"
          initial={{opacity:0}}
          animate={{opacity:1}}
        >
          Have questions about memberships, workouts, or support?
          Send us a message and we’ll get back to you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* CONTACT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8 shadow-[0_26px_90px_rgba(0,0,0,0.65)]"
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
          >

            <h2 className="text-2xl font-bold mb-2">
              Send a message
            </h2>

            <p className="text-white/60 mb-6 text-sm">
              We usually respond within 24 hours.
            </p>

            {success && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-emerald-200 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/12 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/12 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e)=>setSubject(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/12 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/12 focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <motion.button
                whileHover={{scale:1.03}}
                whileTap={{scale:0.96}}
                disabled={loading}
                className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 shadow-[0_12px_34px_rgba(34,197,94,0.25)]"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>

              <p className="text-xs text-white/50 text-center">
                After saving, WhatsApp will open to send instantly.
              </p>

            </div>
          </motion.form>

          {/* CONTACT INFO */}
          <motion.div
            className="space-y-8"
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
          >

            <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8">

              <h3 className="text-xl font-bold mb-6">
                Contact Details
              </h3>

              <div className="space-y-4 text-white/70">

                <div className="flex justify-between">
                  <span className="text-white/50">Support Email</span>
                  <span className="font-semibold text-white">
                    support@fittrack.com
                  </span>
                </div>

                <div className="border-t border-white/10"/>

                <div className="flex justify-between">
                  <span className="text-white/50">Phone</span>
                  <span className="font-semibold text-white">
                    +91 9370563484
                  </span>
                </div>

                <div className="border-t border-white/10"/>

                <div className="flex justify-between">
                  <span className="text-white/50">Location</span>
                  <span className="font-semibold text-white">
                    Mumbai, Maharashtra
                  </span>
                </div>

                <div className="border-t border-white/10"/>

                <div className="flex justify-between">
                  <span className="text-white/50">Hours</span>
                  <span className="font-semibold text-white">
                    Mon–Sat, 6AM–10PM
                  </span>
                </div>

              </div>
            </div>

            <div className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-8">

              <h3 className="text-xl font-bold mb-4">
                Quick Help
              </h3>

              <ul className="space-y-3 text-white/70">
                {[
                  "Membership & plan queries",
                  "Workout & diet guidance",
                  "Account / login support",
                  "Feedback & suggestions",
                ].map((item,i)=>(
                  <li key={i} className="flex gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}