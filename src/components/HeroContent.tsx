"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 py-6 max-w-6xl mx-auto">
      <Navbar />

      <div className="text-center my-auto flex flex-col items-center justify-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0em" }}
        animate={{ opacity: 1, letterSpacing: "0.2em" }}
        transition={{ duration: 1.5, delay: 0.1 }}
        className="text-amber-400/80 text-sm md:text-base font-semibold uppercase tracking-widest mb-4"
      >
        The Stories That Shape Humanity
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter leading-none mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          LEGENDS <br />
          NEVER DIE
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
      >
        Discover the extraordinary lives of iconic people who changed the world forever. A fully interactive 3D historical experience.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
      >
        <Link href="/biographies">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234, 179, 8, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-4 bg-transparent text-amber-50 font-bold text-sm tracking-widest uppercase py-4 px-10 rounded-full transition-colors overflow-hidden border border-amber-500/50 backdrop-blur-md cursor-pointer"
          >
            <span className="relative z-10">Explore Legends</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform text-amber-400" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </Link>

        <Link href="/biographies#library">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-slate-900/60 text-slate-300 hover:text-white font-bold text-sm tracking-widest uppercase py-4 px-8 rounded-full transition-colors border border-slate-700/60 backdrop-blur-md cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Open Library</span>
          </motion.button>
        </Link>
      </motion.div>
      </div>

      <div className="text-center text-xs tracking-[0.25em] text-slate-600 uppercase py-2">
        Powered by LifeLegends 3D Universe
      </div>
    </div>
  );
}
