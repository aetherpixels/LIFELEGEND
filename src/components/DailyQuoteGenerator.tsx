"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Check, Quote, Share2 } from "lucide-react";

export default function DailyQuoteGenerator() {
  const [copied, setCopied] = useState(false);

  // Curated rotating legends quotes
  const quotesList = [
    {
      quote: "The present is theirs; the future, for which I really worked, is mine.",
      author: "Nikola Tesla",
      role: "Visionary Electrical Inventor (1856 - 1943)",
    },
    {
      quote: "That brain of mine is something more than merely mortal, as time will show.",
      author: "Ada Lovelace",
      role: "Pioneer of Computer Programming (1815 - 1852)",
    },
    {
      quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.",
      author: "Marie Curie",
      role: "Pioneering Nobel Laureate Physicist (1867 - 1934)",
    },
    {
      quote: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      role: "Renaissance Polymath & Artist (1452 - 1519)",
    },
    {
      quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the universe.",
      author: "Albert Einstein",
      role: "Theoretical Physicist (1879 - 1955)",
    },
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const day = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    setQuoteIndex(day % quotesList.length);
  }, [quotesList.length]);

  const current = quotesList[quoteIndex];

  const handleCopy = () => {
    const formatted = `"${current.quote}" — ${current.author} (${current.role})\n\nDiscovered on LifeLegends: ${window.location.origin}`;
    navigator.clipboard?.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const text = `"${current.quote}" — ${current.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Legend Quote of the Day",
          text,
          url: window.location.origin,
        });
        return;
      } catch {}
    }
    handleCopy();
  };

  return (
    <div className="w-full my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1435]/90 via-[#0a102b]/80 to-[#150d30]/90 border border-amber-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(245,158,11,0.15)] relative overflow-hidden group">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Tag & Actions */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
            Legend Wisdom of the Day
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-white transition-all text-xs font-bold tracking-wider cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            type="button"
            className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
            title="Share quote"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quote Body */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/40 my-4">
        <Quote className="absolute -top-3 -left-3.5 w-6 h-6 text-amber-500/30" />
        <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-100 italic leading-relaxed">
          "{current.quote}"
        </p>
      </div>

      {/* Author Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-6 pt-4 border-t border-white/5">
        <div>
          <h4 className="text-base font-black text-amber-300 uppercase tracking-wide">
            {current.author}
          </h4>
          <p className="text-xs text-slate-400 font-mono tracking-wider">
            {current.role}
          </p>
        </div>

        <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
          Daily Archive #{quoteIndex + 1}
        </span>
      </div>
    </div>
  );
}
