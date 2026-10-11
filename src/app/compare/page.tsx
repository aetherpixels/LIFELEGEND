"use client";

import { useState } from "react";
import Link from "next/link";
import { Swords, ArrowLeft, Sparkles, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpaceAmbientAudio from "@/components/SpaceAmbientAudio";
import { sfx } from "@/lib/soundfx";

interface LegendData {
  id: string;
  name: string;
  era: string;
  category: string;
  discipline: string;
  keyInnovation: string;
  majorRivalryOrChallenge: string;
  lastingLegacy: string;
  quote: string;
  accentColor: string;
}

const LEGENDS: LegendData[] = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    era: "1856 - 1943",
    category: "Innovators",
    discipline: "Electrical & Mechanical Engineering",
    keyInnovation: "Polyphase Alternating Current (AC) Grid & Wireless Induction",
    majorRivalryOrChallenge: "The War of Currents against Thomas Edison & DC hegemony",
    lastingLegacy: "Electrified the 20th century; blueprint for worldwide telecommunications",
    quote: "The present is theirs; the future, for which I really worked, is mine.",
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "lovelace",
    name: "Ada Lovelace",
    era: "1815 - 1852",
    category: "Pioneers",
    discipline: "Mathematical Theory & Computing Poetics",
    keyInnovation: "First Published Computer Algorithm (Bernoulli numbers on Analytical Engine)",
    majorRivalryOrChallenge: "Overcoming 19th-century patriarchal academic suppression",
    lastingLegacy: "Envisioned machines creating music, art, and universal software logic",
    quote: "That brain of mine is something more than merely mortal, as time will show.",
    accentColor: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "curie",
    name: "Marie Curie",
    era: "1867 - 1934",
    category: "Scientists",
    discipline: "Radioactivity & Atomic Physics",
    keyInnovation: "Isolation of Polonium & Radium; Pioneer of Radiation Oncology",
    majorRivalryOrChallenge: "Extreme laboratory radiation exposure & institutional xenophobia",
    lastingLegacy: "First person to win two Nobel Prizes in two distinct scientific fields",
    quote: "Nothing in life is to be feared, it is only to be understood.",
    accentColor: "from-amber-400 to-orange-600",
  },
  {
    id: "vinci",
    name: "Leonardo da Vinci",
    era: "1452 - 1519",
    category: "Artists",
    discipline: "High Renaissance Universal Polymathy",
    keyInnovation: "Aerial Screw, Parachute Prototypes, Sfumato & Anatomical Codices",
    majorRivalryOrChallenge: "Artistic rivalry with Michelangelo & patron instability",
    lastingLegacy: "The universal gold standard of combining empirical science with fine art",
    quote: "Learning never exhausts the mind.",
    accentColor: "from-emerald-400 to-teal-600",
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    era: "1879 - 1955",
    category: "Scientists",
    discipline: "Theoretical & Quantum Physics",
    keyInnovation: "Special & General Relativity (E=mc²), Photoelectric Effect",
    majorRivalryOrChallenge: "Philosophical debates with Niels Bohr over quantum indeterminacy",
    lastingLegacy: "Rewrote mankind's understanding of gravity, space, time, and the universe",
    quote: "Imagination is more important than knowledge.",
    accentColor: "from-indigo-400 to-cyan-500",
  },
];

export default function ComparePage() {
  const [leftId, setLeftId] = useState("tesla");
  const [rightId, setRightId] = useState("einstein");

  const leftLegend = LEGENDS.find((l) => l.id === leftId) || LEGENDS[0];
  const rightLegend = LEGENDS.find((l) => l.id === rightId) || LEGENDS[1];

  return (
    <main className="min-h-screen bg-[#050814] text-white p-4 sm:p-8 md:p-12 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Navbar />

        {/* Header */}
        <div className="text-center my-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Swords className="w-4 h-4 text-cyan-400" />
            <span>Titan Mind Comparison Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Clash of Intellectual Giants
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 font-light">
            Compare breakthrough discoveries, historical rivals, and long-term civilizational impact side-by-side.
          </p>
        </div>

        {/* Legend Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {/* Left Picker */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#09112a]/80 border border-cyan-500/30 backdrop-blur-xl">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2">
              Select Left Champion
            </label>
            <select
              value={leftId}
              onChange={(e) => {
                sfx.playClick();
                setLeftId(e.target.value);
              }}
              className="w-full bg-[#050917] border border-cyan-500/40 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-cyan-300 cursor-pointer"
            >
              {LEGENDS.map((leg) => (
                <option key={leg.id} value={leg.id} disabled={leg.id === rightId}>
                  {leg.name} ({leg.category})
                </option>
              ))}
            </select>
          </div>

          {/* Right Picker */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#09112a]/80 border border-fuchsia-500/30 backdrop-blur-xl">
            <label className="block text-[11px] font-mono uppercase tracking-widest text-fuchsia-400 mb-2">
              Select Right Champion
            </label>
            <select
              value={rightId}
              onChange={(e) => {
                sfx.playClick();
                setRightId(e.target.value);
              }}
              className="w-full bg-[#050917] border border-fuchsia-500/40 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-fuchsia-300 cursor-pointer"
            >
              {LEGENDS.map((leg) => (
                <option key={leg.id} value={leg.id} disabled={leg.id === leftId}>
                  {leg.name} ({leg.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matrix Comparison Table */}
        <div className="rounded-3xl bg-[#070e24]/90 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Headings */}
          <div className="grid grid-cols-2 border-b border-white/10 text-center">
            <div className="p-6 bg-cyan-950/20 border-r border-white/10">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Contender A</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{leftLegend.name}</h2>
              <span className="text-xs text-slate-400 font-mono">{leftLegend.era}</span>
            </div>

            <div className="p-6 bg-fuchsia-950/20">
              <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest">Contender B</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{rightLegend.name}</h2>
              <span className="text-xs text-slate-400 font-mono">{rightLegend.era}</span>
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-white/5">
            {/* Discipline */}
            <div className="p-4 sm:p-6 text-center bg-black/20">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400 block mb-3">
                Core Discipline & Field
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-semibold">
                <div className="text-cyan-200 border-r border-white/5 px-2">{leftLegend.discipline}</div>
                <div className="text-fuchsia-200 px-2">{rightLegend.discipline}</div>
              </div>
            </div>

            {/* Key Innovation */}
            <div className="p-4 sm:p-6 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400 block mb-3">
                Revolutionary Breakthrough
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-light">
                <div className="text-slate-200 border-r border-white/5 px-2">{leftLegend.keyInnovation}</div>
                <div className="text-slate-200 px-2">{rightLegend.keyInnovation}</div>
              </div>
            </div>

            {/* Major Conflict */}
            <div className="p-4 sm:p-6 text-center bg-black/20">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-fuchsia-400 block mb-3">
                Primary Historical Crucible / Rivalry
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-light">
                <div className="text-slate-300 border-r border-white/5 px-2">{leftLegend.majorRivalryOrChallenge}</div>
                <div className="text-slate-300 px-2">{rightLegend.majorRivalryOrChallenge}</div>
              </div>
            </div>

            {/* Enduring Legacy */}
            <div className="p-4 sm:p-6 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400 block mb-3">
                Civilizational Impact on Modernity
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-light">
                <div className="text-slate-200 border-r border-white/5 px-2">{leftLegend.lastingLegacy}</div>
                <div className="text-slate-200 px-2">{rightLegend.lastingLegacy}</div>
              </div>
            </div>

            {/* Defining Quote */}
            <div className="p-4 sm:p-6 text-center bg-black/20">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400 block mb-3">
                Philosophical Creed
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm italic">
                <div className="text-slate-300 border-r border-white/5 px-2">"{leftLegend.quote}"</div>
                <div className="text-slate-300 px-2">"{rightLegend.quote}"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/biographies"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 active:scale-95 transition-all text-xs font-bold tracking-widest uppercase cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Biographies Gallery</span>
          </Link>
        </div>
      </div>

      <SpaceAmbientAudio />
    </main>
  );
}
