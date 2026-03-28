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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-black"/>

        <motion.div
          className="absolute inset-0 opacity-80"
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

      <div className="relative max-w-6xl mx-auto px-6 py-24">

        {/* 🧠 HEADER */}
        <motion.p
          className="text-emerald-400 tracking-[0.3em] text-xs font-semibold"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
        >
          ABOUT FITTRACK
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight tracking-tight"
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
        >
          Smart Fitness.
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]">
            {" "}Simple Progress.
          </span>
        </motion.h1>

        <motion.p
          className="text-white/70 mt-6 text-lg max-w-3xl leading-relaxed"
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.2}}
        >
          FitTrack is a modern fitness & gym management platform designed to
          help users plan workouts, follow healthy routines, and track progress
          — while keeping the experience smooth, clean, and intuitive.
        </motion.p>

        {/* 💎 FEATURE CHIPS */}
        <div className="mt-10 flex flex-wrap gap-3">

          {[
            "Workout Planner",
            "Diet Guidance",
            "Progress Tracking",
            "Injury-Safe Training",
          ].map((t,i)=>(

            <motion.span
              key={i}
              whileHover={{scale:1.08}}
              className="
                px-4 py-2 rounded-full text-sm
                bg-white/5 border border-white/10
                backdrop-blur-xl text-white/80
                transition-all duration-300
                hover:border-emerald-400/40
                hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]
              "
            >
              <span className="text-emerald-400 font-bold mr-2">•</span>
              {t}
            </motion.span>

          ))}

        </div>

        {/* 🧊 INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {cards.map((card,i)=>(

            <motion.div
              key={i}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
              initial={{opacity:0,y:40}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{duration:0.6,delay:i*0.15}}
            >

              <div className="
                p-8 rounded-3xl
                bg-white/[0.05] backdrop-blur-2xl
                border border-white/10
                transition-all duration-300
                group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]
                group-hover:-translate-y-2
              ">

                <h3 className="text-xl font-bold mb-4">
                  {card.title}
                </h3>

                <p className="text-white/70 leading-relaxed">
                  {card.desc}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        {/* 🚀 CORE FEATURES */}
        <motion.div
          className="mt-20 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-3xl p-10"
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
        >

          <h2 className="text-3xl font-bold mb-6">
            Core Features
          </h2>

          <ul className="space-y-4">

            {features.map((f,idx)=>(

              <motion.li
                key={idx}
                className="flex gap-3 text-white/80"
                initial={{opacity:0,x:-15}}
                whileInView={{opacity:1,x:0}}
                transition={{delay:idx*0.1}}
              >
                <span className="text-emerald-400 font-bold">✓</span>
                {f}
              </motion.li>

            ))}

          </ul>

        </motion.div>

      </div>

    </section>
  );
}