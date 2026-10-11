"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none">
      <div className="text-center flex flex-col items-center justify-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, delay: 0.1 }}
          className="text-amber-400/80 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-4"
        >
          The Stories That Shape Humanity
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter leading-none mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            LEGENDS <br />
            NEVER DIE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Discover the extraordinary lives of iconic people who changed the world forever. A fully interactive 3D historical experience.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.5 }}
          className="pointer-events-auto flex flex-col items-center gap-6"
        >
          <Link href="/biographies">
            <motion.button 
              whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(234, 179, 8, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-4 bg-transparent text-amber-50 font-bold text-sm sm:text-base tracking-widest uppercase py-4 px-10 rounded-full transition-all overflow-hidden border-2 border-amber-500/70 backdrop-blur-md cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <span className="relative z-10">Explore Legends</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform text-amber-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-amber-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </Link>

          {/* 50-Lakh Tier Direct Exploration Portals */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-xl">
            <Link
              href="/constellation"
              className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] cursor-pointer"
            >
              🌌 3D CONSTELLATION
            </Link>
            <Link
              href="/oracle"
              className="px-3.5 py-1.5 rounded-full bg-fuchsia-950/60 hover:bg-fuchsia-900/80 border border-fuchsia-500/40 hover:border-fuchsia-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-fuchsia-300 hover:text-white transition-all shadow-[0_0_15px_rgba(217,70,239,0.15)] cursor-pointer"
            >
              🤖 AI ORACLE
            </Link>
            <Link
              href="/compare"
              className="px-3.5 py-1.5 rounded-full bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 hover:border-indigo-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-indigo-300 hover:text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.15)] cursor-pointer"
            >
              ⚔️ CLASH MATRIX
            </Link>
            <Link
              href="/codex"
              className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-emerald-300 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer"
            >
              📜 STUDY CODEX
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 text-center text-[10px] sm:text-xs tracking-[0.3em] text-slate-500 uppercase">
        Click and drag to rotate the 3D globe • Press ⌘K or Ctrl+K for Global Search
      </div>
    </div>
  );
}
