import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../api";
import toast from "react-hot-toast";
import LoadingButton from "../components/ui/LoadingButton";

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
      toast.error("Please fill all fields ❌");
      return;
    }

    if (!WHATSAPP_NUMBER) {
      toast.error("WhatsApp not configured ⚠️");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Sending message...", { id: "contact" });

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to send ❌", { id: "contact" });
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

      toast.success("Message sent successfully 🎉", { id: "contact" });

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);

    } catch (err) {
      console.error(err);
      toast.error("Server error ⚠️", { id: "contact" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 ADVANCED BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-[#05080f]" />

        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 80%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-400/10 blur-[220px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-400/10 blur-[220px]" />

        {/* 🔥 CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-green-400/10 blur-[160px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        {/* HEADER */}
        <div className="mb-20 text-center">

          {/* 🔥 BADGE */}
          <motion.div
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💬 Get in Touch
          </motion.div>

          <p className="text-emerald-400 tracking-[0.4em] text-xs">
            CONTACT FITTRACK
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-6 leading-[1.05]">
            Let’s Build Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(34,197,94,1)]">
              Fitness Journey
            </span>
          </h1>

          <p className="text-white/60 mt-6 text-lg">
            Questions, feedback, or support — we’ve got you covered.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-14">

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            whileHover={{ scale: 1.02 }}
            className="
              relative p-[1px] rounded-3xl
              bg-gradient-to-br from-white/10 to-transparent
            "
          >

            {/* 🔥 OUTER GLOW */}
            <div className="absolute -inset-3 opacity-0 hover:opacity-100 bg-green-400/25 blur-3xl rounded-3xl transition duration-500" />

            {/* 🔥 DEPTH */}
            <div className="absolute -inset-1 translate-y-6 bg-black/30 blur-2xl rounded-3xl opacity-60 hover:translate-y-10 transition-all duration-500" />

            <div className="
              p-10 rounded-3xl
              bg-white/[0.05] backdrop-blur-2xl
              border border-white/10
            ">

              <h2 className="text-2xl font-bold mb-6">Send a message</h2>

              {success && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-emerald-200 text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-5">

                {[{
                  val: fullName, set: setFullName, type: "text", ph: "Full Name"
                },{
                  val: email, set: setEmail, type: "email", ph: "Email"
                },{
                  val: subject, set: setSubject, type: "text", ph: "Subject"
                }].map((f,i)=>(

                  <input
                    key={i}
                    type={f.type}
                    value={f.val}
                    disabled={loading}
                    onChange={(e)=>f.set(e.target.value)}
                    placeholder={f.ph}
                    className="
                      w-full p-4 rounded-xl
                      bg-black/40 border border-white/10
                      focus:ring-2 focus:ring-emerald-400
                      transition-all duration-300
                      hover:border-emerald-400/40
                      focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]
                    "
                  />

                ))}

                <textarea
                  rows="5"
                  value={message}
                  disabled={loading}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="Your Message"
                  className="
                    w-full p-4 rounded-xl
                    bg-black/40 border border-white/10
                    focus:ring-2 focus:ring-emerald-400
                    transition-all duration-300
                    hover:border-emerald-400/40
                    focus:shadow-[0_0_30px_rgba(34,197,94,0.5)]
                  "
                />

                <LoadingButton loading={loading}>
                  Send Message
                </LoadingButton>

              </div>

            </div>

          </motion.form>

          {/* RIGHT PANEL */}
          <div className="space-y-10">

            {[
              {
                title:"Contact Details",
                content:[
                  ["Support Email","support@fittrack.com"],
                  ["Phone","+91 9370563484"],
                  ["Location","Mumbai"],
                  ["Hours","Mon–Sat, 6AM–10PM"]
                ]
              },
              {
                title:"Quick Help",
                list:[
                  "Membership queries",
                  "Workout guidance",
                  "Account support",
                  "Feedback & suggestions"
                ]
              }
            ].map((block,i)=>(

              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="
                  relative p-[1px] rounded-3xl
                  bg-gradient-to-br from-white/10 to-transparent
                "
              >

                <div className="absolute -inset-3 opacity-0 hover:opacity-100 bg-green-400/25 blur-3xl rounded-3xl transition duration-500" />

                <div className="
                  p-8 rounded-3xl
                  bg-white/[0.05] backdrop-blur-2xl
                  border border-white/10
                ">

                  <h3 className="text-xl font-bold mb-4">{block.title}</h3>

                  {block.content && block.content.map((row,j)=>(
                    <div key={j} className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-white/50">{row[0]}</span>
                      <span>{row[1]}</span>
                    </div>
                  ))}

                  {block.list && block.list.map((item,j)=>(
                    <p key={j} className="text-white/70">✓ {item}</p>
                  ))}

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}