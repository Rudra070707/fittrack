import { motion } from "framer-motion";

export default function Gyms() {

  const gyms = [
    { name: "Gold Gym", distance: "1.2 km", status: "Open" },
    { name: "Anytime Fitness", distance: "2.5 km", status: "Open" },
    { name: "Cult Fit", distance: "3.1 km", status: "Open" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* Animated background */}
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

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Gyms Near You
          </span>
        </motion.h1>

        <p className="text-white/60 mb-10">
          Discover gyms and fitness centers around your location.
        </p>

        {/* Search */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Enter city or location"
            className="
              w-full px-5 py-3 rounded-2xl
              bg-black/30 border border-white/12
              backdrop-blur-xl
              focus:ring-2 focus:ring-emerald-400
              outline-none text-white placeholder-white/40
            "
          />
        </div>

        {/* Gym cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {gyms.map((gym, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="
                bg-white/6 backdrop-blur-2xl
                border border-white/12
                rounded-3xl p-6
                shadow-[0_26px_90px_rgba(0,0,0,0.65)]
              "
            >

              <h2 className="font-bold text-xl">{gym.name}</h2>

              <p className="text-white/60 mt-2">
                {gym.status} • {gym.distance} away
              </p>

              <button
                className="
                  mt-5 w-full py-2 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-emerald-400
                  text-slate-950 font-semibold
                  shadow-[0_12px_34px_rgba(34,197,94,0.25)]
                  hover:scale-[1.02] transition
                "
              >
                View Gym
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}