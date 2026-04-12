import { useEffect, useState } from "react";

export default function StatsCard({ label, value }) {

  // 🔥 NEW: animated counter
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = Math.ceil(value / (duration / 16));

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplayValue(start);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  // 🔥 NEW: dynamic color based on value
  const getColor = () => {
    if (value >= 50) return "from-green-400 to-emerald-500";
    if (value >= 10) return "from-blue-400 to-cyan-400";
    return "from-yellow-400 to-orange-400";
  };

  return (
    <div
      className="
        relative
        group
        bg-white/[0.06] backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        p-8
        shadow-[0_25px_60px_rgba(0,0,0,0.7)]
        transition-all duration-300
        hover:scale-[1.06]
        hover:shadow-[0_0_60px_rgba(34,197,94,0.55)]
        overflow-hidden
      "
    >
      {/* subtle glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400/25 blur-3xl rounded-full" />

      {/* 🔥 secondary glow */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full" />

      {/* 🔥 animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent" />

      {/* 🔥 animated shine effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/20 blur-md translate-x-0 group-hover:translate-x-[250%] transition duration-1000" />
      </div>

      {/* 🔥 top highlight line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* 🔥 bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 transition-all duration-500 group-hover:w-full" />

      {/* 🔥 floating dot indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-80">
        <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
      </div>

      {/* 🔥 NEW: live pulse ring */}
      <div className="absolute top-3 right-3">
        <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>

      {/* 🔥 NEW: animated radial glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />
      </div>

      {/* 🔥 NEW: noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* LABEL */}
      <p className="relative text-gray-400 text-sm tracking-[0.2em] uppercase group-hover:text-gray-300 transition">
        {label}
      </p>

      {/* VALUE (ANIMATED 🔥) */}
      <h3 className={`relative text-4xl font-extrabold mt-3 bg-gradient-to-r ${getColor()} bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-[1.08] transition-transform duration-300`}>
        {displayValue}
      </h3>

      {/* 🔥 micro stats line */}
      <div className="relative mt-4 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full w-1/2 bg-gradient-to-r ${getColor()} opacity-70 group-hover:w-full transition-all duration-700`} />
      </div>

      {/* 🔥 NEW: mini chart (fake live graph) */}
      <div className="relative mt-5 h-10 flex items-end gap-[2px] opacity-70">
        {[4, 7, 5, 9, 6, 10, 8, 12].map((h, i) => (
          <div
            key={i}
            className={`w-[6px] rounded bg-gradient-to-t ${getColor()} animate-pulse`}
            style={{
              height: `${h * 4}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* 🔥 bottom glow pulse */}
      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[120%] h-[60px] bg-green-400/10 blur-[60px] opacity-0 group-hover:opacity-100 transition duration-500" />
    </div>
  );
}