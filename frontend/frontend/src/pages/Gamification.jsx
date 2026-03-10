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
    <section className="relative min-h-screen bg-[#05070c] text-white px-6 py-24 overflow-hidden">

      {/* Background glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-400/20 blur-[200px] rounded-full"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-[650px] h-[650px] bg-emerald-500/15 blur-[220px] rounded-full"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative">

        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Rewards & <span className="text-green-400">Streaks</span>
        </motion.h1>

        <p className="text-gray-400 mb-10">
          Keep your streak alive, earn XP, level up and unlock badges.
        </p>

        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : err ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-200">
            {err}
          </div>
        ) : (
          <>
            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-400/20 text-green-200">
                {success}
              </div>
            )}

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6">

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >
                <p className="text-gray-400 text-sm mb-2">🔥 Current Streak</p>
                <p className="text-4xl font-extrabold">{current} days</p>
                <p className="text-gray-400 mt-2">Best: {best} days</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >
                <p className="text-gray-400 text-sm mb-2">⭐ Level</p>
                <p className="text-4xl font-extrabold">Lv {level}</p>
                <p className="text-gray-400 mt-2">{xp} XP total</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >
                <p className="text-gray-400 text-sm mb-3">⚡ Progress to next</p>

                <div className="w-full h-3 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                <p className="text-gray-400 mt-3 text-sm">
                  {xpToNext} XP to next level
                </p>
              </motion.div>

            </div>

            {/* DAILY CHECK-IN */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold">Daily check-in</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Tap once per day to keep your streak and earn +20 XP.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onMarkToday}
                  disabled={marking}
                  className="px-6 py-3 rounded-2xl font-bold bg-green-400 text-black hover:bg-green-500 transition disabled:opacity-60"
                >
                  {marking ? "Updating…" : "Mark Today Done"}
                </motion.button>

              </div>

            </div>

            {/* BADGES */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

              <h2 className="text-xl font-bold mb-4">Badges</h2>

              {badges.length === 0 ? (
                <p className="text-gray-400">
                  No badges yet — keep going and you’ll unlock them.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {badges.map((b) => (
                    <motion.span
                      key={b}
                      whileHover={{ scale: 1.08 }}
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