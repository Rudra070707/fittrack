import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGamification, markTodayDone } from "../api";

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
        setErr(res?.message || "Failed to load gamification");
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

      setSuccess(res?.message || "Updated ✅");
      setData(res.gamification || null);

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
  const progress = Math.min(100, Math.max(0, (xpInLevel / 100) * 100));

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background */}
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

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          initial={{opacity:0,y:18}}
          animate={{opacity:1,y:0}}
        >
          Rewards &{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Streaks
          </span>
        </motion.h1>

        <p className="text-white/60 mb-10">
          Keep your streak alive, earn XP, level up and unlock badges.
        </p>

        {loading ? (
          <div className="text-white/60">Loading…</div>
        ) : err ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-200">
            {err}
          </div>
        ) : (
          <>
            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
                {success}
              </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">

              <motion.div
                whileHover={{y:-6}}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 shadow-lg"
              >
                <p className="text-white/60 text-sm mb-2">🔥 Current Streak</p>
                <p className="text-4xl font-extrabold">{current} days</p>
                <p className="text-white/50 mt-2">Best: {best} days</p>
              </motion.div>

              <motion.div
                whileHover={{y:-6}}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 shadow-lg"
              >
                <p className="text-white/60 text-sm mb-2">⭐ Level</p>
                <p className="text-4xl font-extrabold">Lv {level}</p>
                <p className="text-white/50 mt-2">{xp} XP total</p>
              </motion.div>

              <motion.div
                whileHover={{y:-6}}
                className="bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 shadow-lg"
              >
                <p className="text-white/60 text-sm mb-3">⚡ Progress to next</p>

                <div className="w-full h-3 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    initial={{width:0}}
                    animate={{width:`${progress}%`}}
                    transition={{duration:0.8}}
                  />
                </div>

                <p className="text-white/50 mt-3 text-sm">
                  {xpToNext} XP to next level
                </p>

              </motion.div>

            </div>

            {/* Daily check-in */}
            <div className="mt-8 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold">Daily check-in</h2>
                  <p className="text-white/60 text-sm mt-1">
                    Tap once per day to keep your streak and earn +20 XP.
                  </p>
                </div>

                <motion.button
                  whileHover={{scale:1.05}}
                  whileTap={{scale:0.95}}
                  onClick={onMarkToday}
                  disabled={marking}
                  className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 shadow-[0_12px_34px_rgba(34,197,94,0.25)] disabled:opacity-60"
                >
                  {marking ? "Updating…" : "Mark Today Done"}
                </motion.button>

              </div>

            </div>

            {/* Badges */}
            <div className="mt-8 bg-white/6 backdrop-blur-2xl border border-white/12 rounded-3xl p-6">

              <h2 className="text-xl font-bold mb-4">Badges</h2>

              {badges.length === 0 ? (
                <p className="text-white/60">
                  No badges yet — keep going and you’ll unlock them.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">

                  {badges.map((b) => (
                    <motion.span
                      key={b}
                      whileHover={{scale:1.08}}
                      className="px-4 py-2 rounded-full bg-black/30 border border-white/10 text-sm"
                    >
                      🏅 {b}
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