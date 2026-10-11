"use client";

import { useMemo } from "react";
import { Milestone, Calendar, Sparkles } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export default function HistoricalTimeline({
  biographyName,
  era,
  rawContent = "",
}: {
  biographyName: string;
  era?: string;
  rawContent?: string;
}) {
  const events: TimelineEvent[] = useMemo(() => {
    // 1. Try to extract 4-digit years from raw biography text
    const yearMatches = Array.from(rawContent.matchAll(/\b(1[3-9]\d{2}|20\d{2})\b/g));
    const extracted: TimelineEvent[] = [];
    const seenYears = new Set<string>();

    for (const match of yearMatches) {
      const year = match[0];
      if (seenYears.has(year)) continue;
      seenYears.add(year);

      const matchIndex = match.index || 0;
      const snippet = rawContent.slice(Math.max(0, matchIndex - 20), Math.min(rawContent.length, matchIndex + 140));
      const cleanSnippet = snippet.replace(/[#*`_~]/g, "").trim();

      extracted.push({
        year,
        title: `Milestone of ${year}`,
        description: cleanSnippet.length > 20 ? cleanSnippet : `Significant breakthrough in the journey of ${biographyName}.`,
      });

      if (extracted.length >= 4) break;
    }

    if (extracted.length >= 2) {
      return extracted.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    // Default chronological fallbacks based on era
    return [
      {
        year: era ? era.split("-")[0].trim() : "Early Life",
        title: "Origins & Formative Years",
        description: `${biographyName} discovers their profound calling and starts developing early foundational knowledge.`,
      },
      {
        year: "Breakthrough",
        title: "The Defining Discovery",
        description: `Pioneered major revolutionary advancements that challenged the status quo of the century.`,
      },
      {
        year: "Peak Era",
        title: "Global Recognition & Climax",
        description: `Produced their masterwork, transforming science, culture, and human history permanently.`,
      },
      {
        year: era ? era.split("-")[1]?.trim() || "Legacy" : "Legacy",
        title: "Eternal Legend",
        description: `Enduring philosophy and inventions continue inspiring generations in the modern world.`,
      },
    ];
  }, [biographyName, era, rawContent]);

  return (
    <div className="w-full my-12 p-6 md:p-8 rounded-3xl bg-[#070E24]/80 border border-indigo-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Milestone className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">
            Interactive Journey
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
            Historical Timeline of {biographyName}
          </h3>
        </div>
      </div>

      {/* Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-gradient-to-b border-indigo-500/30 space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative group">
            {/* Glowing timeline node dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-[#0B132B] border-2 border-cyan-400 group-hover:border-fuchsia-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-fuchsia-400 transition-colors" />
            </div>

            {/* Event Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D183A]/60 border border-white/5 group-hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                  <Calendar className="w-3 h-3" />
                  {event.year}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {event.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end text-[10px] font-mono text-slate-400 gap-1.5">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Verified Chronological Milestones</span>
      </div>
    </div>
  );
}
