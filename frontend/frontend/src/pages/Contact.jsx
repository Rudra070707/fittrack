import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../api";

// 🔥 NEW
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
      toast.error("Please fill all fields ❌"); // 🔥 NEW
      return;
    }

    if (!WHATSAPP_NUMBER) {
      toast.error("WhatsApp not configured ⚠️"); // 🔥 NEW
      return;
    }

    try {
      setLoading(true);
      toast.loading("Sending message...", { id: "contact" }); // 🔥 NEW

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to send ❌", { id: "contact" }); // 🔥 NEW
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

      toast.success("Message sent successfully 🎉", { id: "contact" }); // 🔥 NEW

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 250);

    } catch (err) {
      console.error(err);
      toast.error("Server error ⚠️", { id: "contact" }); // 🔥 NEW
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* BACKGROUND SAME */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">

        <motion.p
          className="text-emerald-400 tracking-[0.3em] text-xs mb-4"
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

        <motion.p className="text-white/60 text-lg max-w-3xl mb-14">
          Have questions about memberships, workouts, or support?
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="group bg-white/6 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
          >

            <h2 className="text-2xl font-bold mb-2">
              Send a message
            </h2>

            {success && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-emerald-200 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">

              {[{
                val: fullName,
                set: setFullName,
                type: "text",
                ph: "Full Name"
              },{
                val: email,
                set: setEmail,
                type: "email",
                ph: "Email"
              },{
                val: subject,
                set: setSubject,
                type: "text",
                ph: "Subject"
              }].map((f,i)=>(
                <input
                  key={i}
                  type={f.type}
                  value={f.val}
                  disabled={loading} // 🔥 NEW
                  onChange={(e)=>f.set(e.target.value)}
                  placeholder={f.ph}
                  className="
                    w-full p-3 rounded-xl
                    bg-black/30 border border-white/10
                    focus:ring-2 focus:ring-emerald-400
                    outline-none transition
                    hover:border-emerald-400/40
                    disabled:opacity-60
                  "
                />
              ))}

              <textarea
                rows="5"
                value={message}
                disabled={loading} // 🔥 NEW
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Your Message"
                className="
                  w-full p-3 rounded-xl
                  bg-black/30 border border-white/10
                  focus:ring-2 focus:ring-emerald-400
                  outline-none transition
                  hover:border-emerald-400/40
                  disabled:opacity-60
                "
              />

              {/* 🔥 USING LoadingButton */}
              <LoadingButton loading={loading}>
                Send Message
              </LoadingButton>

            </div>

          </motion.form>

          {/* RIGHT SIDE SAME */}
          <motion.div className="space-y-8">

            {[{
              title:"Contact Details",
              content:[
                ["Support Email","support@fittrack.com"],
                ["Phone","+91 9370563484"],
                ["Location","Mumbai, Maharashtra"],
                ["Hours","Mon–Sat, 6AM–10PM"]
              ]
            },{
              title:"Quick Help",
              list:[
                "Membership & plan queries",
                "Workout & diet guidance",
                "Account / login support",
                "Feedback & suggestions"
              ]
            }].map((block,i)=>(
              <div
                key={i}
                className="bg-white/6 backdrop-blur-2xl border border-white/10 rounded-3xl p-8"
              >
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
            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}