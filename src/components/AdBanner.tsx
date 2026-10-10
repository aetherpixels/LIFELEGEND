export default function AdBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 bg-[#0D142A]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-cyan-500/50 text-xs tracking-[0.2em] uppercase h-28 shadow-[0_0_20px_rgba(34,211,238,0.05)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      <span className="mb-2">Advertisement Space</span>
      <span className="text-[10px] text-slate-500">(Google AdSense / Affiliate Banner goes here)</span>
    </div>
  );
}
