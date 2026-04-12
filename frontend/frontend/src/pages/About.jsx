import { motion } from "framer-motion";

export default function About() {

  const cards = [
    {
      title: "What FitTrack Provides",
      desc: "Workout planning, diet guidance, progress tracking and injury-safe training support in one dashboard.",
    },
    {
      title: "Who It’s For",
      desc: "Beginners, fitness enthusiasts, and anyone who wants a structured path to stay consistent.",
    },
    {
      title: "Why FitTrack",
      desc: "A simple UI, quick navigation, and smart features that feel like a real fitness product.",
    },
  ];

  const features = [
    "Personalized workout planner for consistent training",
    "Diet planning support for better results",
    "Progress tracking to stay motivated",
    "Injury-safe training guidance for safer workouts",
    "FitTrack AI Assistant for instant fitness help",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-[#05080f] via-[#05080f] to-black"/>

        {/* 🔥 MULTI-LAYER GLOW */}
        <motion.div
          className="absolute inset-0 opacity-70"
          animate={{
            background:[
              "radial-gradient(circle at 20% 30%, rgba(16,185,129,0.25), transparent 60%)",
              "radial-gradient(circle at 70% 20%, rgba(99,102,241,0.25), transparent 60%)",
              "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.25), transparent 60%)"
            ]
          }}
          transition={{duration:18,repeat:Infinity}}
        />

        {/* 🔥 EXTRA DEPTH */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-400/10 blur-[220px] rounded-full"/>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-400/10 blur-[220px] rounded-full"/>

        {/* 🔥 CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-green-400/10 blur-[180px] rounded-full"/>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-28">

        {/* 🧠 HEADER */}
        <motion.p
          className="text-emerald-400 tracking-[0.4em] text-xs font-semibold"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
        >
          ABOUT FITTRACK
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mt-5 leading-[1.05] tracking-tight"
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
        >
          Smart Fitness.
          <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(34,197,94,1)]">
            {" "}Simple Progress.
          </span>
        </motion.h1>

        <motion.p
          className="text-white/60 mt-8 text-lg max-w-3xl leading-relaxed"
          initial={{opacity:0}}
          animate={{opacity:1}}
        >
          FitTrack is a modern fitness & gym management platform designed to
          help users plan workouts, follow healthy routines, and track progress
          — while keeping the experience smooth, clean, and intuitive.
        </motion.p>

        {/* 💎 FEATURE CHIPS */}
        <div className="mt-12 flex flex-wrap gap-4">

          {[
            "Workout Planner",
            "Diet Guidance",
            "Progress Tracking",
            "Injury-Safe Training",
          ].map((t,i)=>(

            <motion.span
              key={i}
              whileHover={{scale:1.1, y:-4}}
              className="
                px-5 py-2.5 rounded-full text-sm
                bg-white/5 border border-white/10
                backdrop-blur-xl text-white/80
                transition-all duration-300
                hover:border-emerald-400/60
                hover:bg-emerald-400/10
                hover:shadow-[0_0_50px_rgba(34,197,94,0.8)]
              "
            >
              <span className="text-emerald-400 font-bold mr-2">•</span>
              {t}
            </motion.span>

          ))}

        </div>

        {/* 🧊 CARDS */}
        <div className="grid md:grid-cols-3 gap-10 mt-20">

          {cards.map((card,i)=>(

            <motion.div
              key={i}
              initial={{opacity:0,y:60,scale:0.95}}
              whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true}}
              transition={{duration:0.7,delay:i*0.15}}
              whileHover={{y:-14, scale:1.05}}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
            >

              {/* 🔥 OUTER GLOW */}
              <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 bg-emerald-400/25 blur-3xl rounded-3xl transition duration-500"/>

              {/* 🔥 DEPTH */}
              <div className="absolute -inset-1 translate-y-6 bg-black/30 blur-2xl rounded-3xl opacity-60 group-hover:translate-y-12 transition-all duration-500"/>

              <div className="
                relative p-9 rounded-3xl
                bg-white/[0.05] backdrop-blur-2xl
                border border-white/10
                transition-all duration-300
                group-hover:border-emerald-400/60
                group-hover:shadow-[0_0_100px_rgba(34,197,94,0.4)]
              ">

                <h3 className="text-xl font-bold mb-5 group-hover:text-emerald-300 transition">
                  {card.title}
                </h3>

                <p className="text-white/70 leading-relaxed">
                  {card.desc}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        {/* 🚀 FEATURES */}
        <motion.div
          className="
            mt-24
            rounded-3xl p-[1px]
            bg-gradient-to-br from-white/10 to-transparent
          "
        >

          <div className="
            p-12 rounded-3xl
            bg-white/[0.05] backdrop-blur-2xl
            border border-white/10
            shadow-[0_0_100px_rgba(0,0,0,0.9)]
          ">

            <h2 className="text-3xl font-bold mb-8">
              Core Features
            </h2>

            <ul className="space-y-5">

              {features.map((f,idx)=>(

                <motion.li
                  key={idx}
                  className="flex gap-4 text-white/80 text-lg"
                  initial={{opacity:0,x:-20}}
                  whileInView={{opacity:1,x:0}}
                  transition={{delay:idx*0.1}}
                >
                  <span className="text-emerald-400 text-xl drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                    ✓
                  </span>
                  {f}
                </motion.li>

              ))}

            </ul>

          </div>

        </motion.div>

      </div>
    </section>
  );
}