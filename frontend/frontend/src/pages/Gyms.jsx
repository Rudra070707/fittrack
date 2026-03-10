import { motion } from "framer-motion";

export default function Gyms() {

  const gyms = [
    { name: "Gold Gym", distance: "1.2 km", status: "Open" },
    { name: "Anytime Fitness", distance: "2.5 km", status: "Open" },
    { name: "Cult Fit", distance: "3.1 km", status: "Open" },
  ];

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

      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find <span className="text-green-400">Gyms Near You</span>
        </motion.h1>

        <p className="text-gray-400 mb-10">
          Discover gyms and fitness centers around your location.
        </p>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Enter city or location"
            className="
              w-full px-5 py-3 rounded-2xl
              bg-white/5 border border-white/10
              focus:ring-2 focus:ring-green-400
              outline-none backdrop-blur-xl
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
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-3xl p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
              "
            >

              <h2 className="font-bold text-xl">{gym.name}</h2>

              <p className="text-gray-400 mt-2">
                {gym.status} • {gym.distance} away
              </p>

              <button
                className="
                  mt-5 w-full py-2 rounded-xl
                  bg-green-400 text-black font-semibold
                  hover:bg-green-500 transition
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