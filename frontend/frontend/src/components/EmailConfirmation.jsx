export default function EmailConfirmation({ email }) {
  return (
    <div className="
      mt-5
      rounded-2xl
      bg-white/5 backdrop-blur-md
      border border-white/10
      p-4
      text-sm text-gray-300
      flex items-start gap-3
      shadow-[0_0_25px_rgba(0,0,0,0.4)]
    ">

      {/* Icon */}
      <div className="
        w-9 h-9 flex items-center justify-center
        rounded-xl
        bg-green-400/15 border border-green-400/25
        text-lg
        shadow-[0_0_12px_rgba(34,197,94,0.3)]
      ">
        📧
      </div>

      {/* Text */}
      <div className="leading-relaxed">
        <p>
          A confirmation email has been sent to
        </p>

        <p className="
          text-green-400 font-semibold mt-1
          break-all
          drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]
        ">
          {email}
        </p>
      </div>

    </div>
  );
}