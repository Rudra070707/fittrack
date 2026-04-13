import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGamification, markTodayDone } from "../api";
// import toast from "react-hot-toast";

export default function Gamification() {

  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      setErr("");
      setLoading(true);

      const res = await getGamification();

      if (!res?.success) {
        setErr(res?.message || "Failed to load data");
        setData(null);
        return;
      }

      setData(res.gamification);

    } catch (e) {
      console.error(e);
      setErr("Network / server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onMarkToday = async () => {

    try {
      setSuccess("");
      setErr("");
      setMarking(true);

      const res = await markTodayDone();

      if (!res?.success) {
        setErr(res?.message || "Failed to update streak");
        return;
      }

      setSuccess(res?.message || "Updated successfully");
      setData(res.gamification || null);

      // ✅ AUTO CLEAR SUCCESS MESSAGE (NEW UX)
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (e) {
      console.error(e);
      setErr("Network / server error");
    } finally {
      setMarking(false);
    }
  };

  const current = data?.streak?.current ?? 0;
  const best = data?.streak?.best ?? 0;
  const xp = data?.xp ?? 0;
  const level = data?.level ?? 1;
  const badges = data?.badges ?? [];

  const xpInLevel = xp % 100;
  const xpToNext = 100 - xpInLevel;
  const progress = Math.min(100, (xpInLevel / 100) * 100);

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND UPGRADE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        {/* glow layers */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-400/10 blur-[200px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-400/10 blur-[200px] rounded-full"/>

        {/* CENTER GLOW */}
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10 blur-[140px]" />

        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{
            background:[
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{duration:16,repeat:Infinity}}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          initial={{opacity:0,y:18}}
          animate={{opacity:1,y:0}}
        >
          Rewards &{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]">
            Streaks
          </span>
        </motion.h1>

        <p className="text-white/60 mb-10">
          Keep your streak alive, earn XP, level up and unlock badges.
        </p>

        {/* LOADING */}
        {loading && (
          <div className="animate-pulse text-white/60">
            Loading your progress...
          </div>
        )}

        {/* ERROR */}
        {err && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-200">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>

            {/* SUCCESS */}
            {success && (
              <motion.div
                initial={{scale:0.95,opacity:0}}
                animate={{scale:1,opacity:1}}
                className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-200"
              >
                {success}
              </motion.div>
            )}

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6">

              <motion.div
                whileHover={{scale:1.06,y:-6}}
                className="group relative bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_80px_rgba(34,197,94,0.4)]"
              >
                <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-3xl rounded-3xl transition"/>
                <p className="text-white/60 text-sm">🔥 Current Streak</p>
                <p className="text-4xl font-extrabold mt-2">{current} days</p>
                <p className="text-white/50 mt-2">Best: {best} days</p>
              </motion.div>

              <motion.div
                whileHover={{scale:1.06,y:-6}}
                className="group relative bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_80px_rgba(59,130,246,0.4)]"
              >
                <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-blue-400/20 blur-3xl rounded-3xl transition"/>
                <p className="text-white/60 text-sm">⭐ Level</p>
                <p className="text-4xl font-extrabold mt-2">Lv {level}</p>
                <p className="text-white/50 mt-2">{xp} XP total</p>
              </motion.div>

              <motion.div
                whileHover={{scale:1.06,y:-6}}
                className="group relative bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_80px_rgba(34,197,94,0.4)]"
              >
                <div className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/20 blur-3xl rounded-3xl transition"/>
                <p className="text-white/60 text-sm mb-3">⚡ Progress</p>

                <div className="w-full h-3 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    initial={{width:0}}
                    animate={{width:`${progress}%`}}
                  />
                </div>

                <p className="text-white/50 mt-3 text-sm">
                  {xpToNext} XP to next level
                </p>
              </motion.div>

            </div>

            {/* DAILY CHECK-IN */}
            <div className="mt-8 bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] transition">

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold">Daily check-in</h2>
                  <p className="text-white/60 text-sm mt-1">
                    Keep your streak alive and earn XP daily.
                  </p>
                </div>

                <motion.button
                  whileHover={{scale:1.08}}
                  whileTap={{scale:0.92}}
                  onClick={onMarkToday}
                  disabled={marking}
                  className="
                    px-6 py-3 rounded-2xl font-bold
                    bg-gradient-to-r from-emerald-500 to-emerald-400
                    text-black
                    transition-all duration-300
                    hover:shadow-[0_0_35px_rgba(34,197,94,0.8)]
                    disabled:opacity-60
                  "
                >
                  {marking ? "Updating..." : "Mark Today Done"}
                </motion.button>

              </div>

            </div>

            {/* BADGES */}
            <div className="mt-8 bg-white/[0.05] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

              <h2 className="text-xl font-bold mb-4">
                Badges
              </h2>

              {badges.length === 0 ? (
                <p className="text-white/60">
                  No badges yet — keep going 💪
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">

                  {badges.map((b) => (
                    <motion.span
                      key={b}
                      whileHover={{scale:1.15,rotate:2}}
                      className="
                        px-4 py-2 rounded-full
                        bg-black/30 border border-white/10
                        text-sm
                        hover:border-emerald-400/40
                        hover:bg-emerald-400/10
                        transition-all duration-300
                      "
                    >
                      🏅 {b.replaceAll("_"," ").toUpperCase()}
                    </motion.span>
                  ))}

                </div>
              )}

            </div>

          </>
        )}

      </div>
    </section>
  );
}