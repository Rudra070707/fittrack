export default function SkeletonCard() {
  return (
    <div className="
      animate-pulse
      rounded-3xl p-6
      bg-white/5 border border-white/10
    ">
      <div className="h-5 bg-white/10 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
    </div>
  );
}