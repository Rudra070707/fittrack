export default function StatsCard({ label, value }) {
  return (
    <div
      className="
        relative
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-8
        shadow-[0_20px_40px_rgba(0,0,0,0.6)]
        transition-all duration-300
        hover:scale-[1.03]
        hover:shadow-[0_0_35px_rgba(34,197,94,0.35)]
      "
    >
      {/* subtle glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-400/20 blur-3xl rounded-full" />

      <p className="text-gray-400 text-sm tracking-wide uppercase">
        {label}
      </p>

      <h3 className="text-4xl font-extrabold mt-3 text-white">
        {value}
      </h3>
    </div>
  );
}
