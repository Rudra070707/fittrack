import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Gyms() {

  // 🔥 NEW: loading state
  const [loading, setLoading] = useState(true);

  const [gyms, setGyms] = useState([]);

  // 🔥 simulate API (replace later with real API)
  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 1200)); // simulate delay

      setGyms([
        { name: "Gold Gym", distance: "1.2 km", status: "Open" },
        { name: "Anytime Fitness", distance: "2.5 km", status: "Open" },
        { name: "Cult Fit", distance: "3.1 km", status: "Open" },
      ]);

      setLoading(false);
    };

    fetchGyms();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              "radial-gradient(circle at 15% 25%, rgba(16,185,129,0.28), transparent 60%), radial-gradient(circle at 85% 35%, rgba(59,130,246,0.20), transparent 55%)",
              "radial-gradient(circle at 70% 20%, rgba(59,130,246,0.26), transparent 60%), radial-gradient(circle at 35% 80%, rgba(99,102,241,0.18), transparent 55%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.24), transparent 62%), radial-gradient(circle at 85% 60%, rgba(99,102,241,0.20), transparent 55%)"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">

        {/* 🔥 HEADER */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Gyms Near You
          </span>
        </motion.h1>

        <p className="text-white/60 mb-10 max-w-2xl">
          Discover gyms and fitness centers around your location.
        </p>

        {/* 🔍 SEARCH */}
        <div className="mb-12 relative">

          <input
            type="text"
            placeholder="Enter city or location"
            disabled={loading} // 🔥 disable while loading
            className="
              w-full px-5 py-3 rounded-2xl
              bg-black/30 border border-white/12
              backdrop-blur-xl
              focus:ring-2 focus:ring-emerald-400
              outline-none text-white placeholder-white/40
              transition-all duration-300
              hover:border-emerald-400/40
              disabled:opacity-60
            "
          />

          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition bg-emerald-400/5 blur-xl" />

        </div>

        {/* 💎 GYM CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {loading
            ? // 🔥 SKELETON LOADING
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="
                    animate-pulse rounded-3xl p-6
                    bg-white/6 border border-white/12
                  "
                >
                  <div className="h-5 bg-white/10 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-6"></div>
                  <div className="h-10 bg-white/10 rounded"></div>
                </div>
              ))
            : gyms.map((gym, i) => (

                <motion.div
                  key={i}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="
                    group relative rounded-3xl p-[1px]
                    bg-gradient-to-br from-white/10 to-transparent
                  "
                >

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-emerald-400/10 blur-xl" />

                  <div className="
                    bg-white/6 backdrop-blur-2xl
                    border border-white/12
                    rounded-3xl p-6
                    transition-all duration-300
                    group-hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
                  ">

                    <h2 className="font-bold text-xl">{gym.name}</h2>

                    <p className="text-white/60 mt-2">
                      <span className="text-emerald-400 font-semibold">
                        {gym.status}
                      </span>{" "}
                      • {gym.distance} away
                    </p>

                    <button
                      className="
                        mt-5 w-full py-2 rounded-xl
                        bg-gradient-to-r from-emerald-500 to-emerald-400
                        text-slate-950 font-semibold
                        transition-all duration-300
                        hover:scale-[1.03]
                        hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]
                      "
                    >
                      View Gym
                    </button>

                  </div>

                </motion.div>
              ))}

        </div>

      </div>
    </section>
  );
}