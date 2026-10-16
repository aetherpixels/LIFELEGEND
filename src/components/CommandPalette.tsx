"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Compass, Swords, Sparkles, BookOpen, User, Volume2, Globe, Command, X } from "lucide-react";
import { sfx } from "@/lib/soundfx";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Legends" | "Interactive Tools" | "Audio";
  href: string;
  icon: any;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "nav-home",
        title: "3D Universe Home",
        subtitle: "Return to the interactive WebGL rotating core",
        category: "Navigation",
        href: "/",
        icon: Globe,
      },
      {
        id: "nav-lives",
        title: "Biographies Gallery",
        subtitle: "Explore the glass tablet archive with search & filters",
        category: "Navigation",
        href: "/biographies",
        icon: Compass,
      },
      {
        id: "nav-constellation",
        title: "3D Constellation Galaxy",
        subtitle: "Explore the 3D star map connecting all historical figures",
        category: "Interactive Tools",
        href: "/constellation",
        icon: Sparkles,
      },
      {
        id: "nav-oracle",
        title: "AI Oracle: Dialogue with Legends",
        subtitle: "Chat in real-time with simulated historical personas",
        category: "Interactive Tools",
        href: "/oracle",
        icon: Sparkles,
      },
      {
        id: "nav-compare",
        title: "Clash of Minds: Compare Matrix",
        subtitle: "Head-to-head intellectual breakdown of great thinkers",
        category: "Interactive Tools",
        href: "/compare",
        icon: Swords,
      },
      {
        id: "nav-vault",
        title: "Codex Study Vault",
        subtitle: "Personal bookmarks, reading notes, and learning codex",
        category: "Interactive Tools",
        href: "/codex",
        icon: BookOpen,
      },
      {
        id: "legend-tesla",
        title: "Nikola Tesla",
        subtitle: "AC Electricity, wireless energy, and high-frequency coils",
        category: "Legends",
        href: "/biographies/nikola-tesla",
        icon: User,
      },
      {
        id: "legend-lovelace",
        title: "Ada Lovelace",
        subtitle: "First computer algorithm, poetics of computation",
        category: "Legends",
        href: "/biographies/ada-lovelace",
        icon: User,
      },
      {
        id: "legend-curie",
        title: "Marie Curie",
        subtitle: "Radioactivity, dual Nobel laureate, radium isolation",
        category: "Legends",
        href: "/biographies/marie-curie",
        icon: User,
      },
      {
        id: "legend-vinci",
        title: "Leonardo da Vinci",
        subtitle: "Universal polymath, Renaissance anatomy, engineering",
        category: "Legends",
        href: "/biographies/leonardo-da-vinci",
        icon: User,
      },
      {
        id: "legend-einstein",
        title: "Albert Einstein",
        subtitle: "Special & General Relativity, quantum photoelectric effect",
        category: "Legends",
        href: "/biographies/albert-einstein",
        icon: User,
      },
      {
        id: "legend-newton",
        title: "Sir Isaac Newton",
        subtitle: "Universal gravitation, classical mechanics, and calculus",
        category: "Legends",
        href: "/biographies/isaac-newton",
        icon: User,
      },
      {
        id: "legend-turing",
        title: "Alan Turing",
        subtitle: "Theoretical computer science, Enigma codebreaking, and AI",
        category: "Legends",
        href: "/biographies/alan-turing",
        icon: User,
      },
      {
        id: "legend-feynman",
        title: "Richard Feynman",
        subtitle: "Quantum electrodynamics, nanotechnology, and Feynman diagrams",
        category: "Legends",
        href: "/biographies/richard-feynman",
        icon: User,
      },
      {
        id: "legend-galileo",
        title: "Galileo Galilei",
        subtitle: "Observational astronomy, telescope discoveries, and physics",
        category: "Legends",
        href: "/biographies/galileo-galilei",
        icon: User,
      },
      {
        id: "legend-hawking",
        title: "Stephen Hawking",
        subtitle: "Hawking radiation, black holes, and cosmological singularities",
        category: "Legends",
        href: "/biographies/stephen-hawking",
        icon: User,
      },
      {
        id: "legend-franklin",
        title: "Rosalind Franklin",
        subtitle: "X-ray crystallography, Photo 51, and DNA double helix",
        category: "Legends",
        href: "/biographies/rosalind-franklin",
        icon: User,
      },
      {
        id: "legend-darwin",
        title: "Charles Darwin",
        subtitle: "Evolution by natural selection, HMS Beagle voyage",
        category: "Legends",
        href: "/biographies/charles-darwin",
        icon: User,
      },
      {
        id: "legend-ramanujan",
        title: "Srinivasa Ramanujan",
        subtitle: "Infinite series, mock theta functions, and number theory",
        category: "Legends",
        href: "/biographies/srinivasa-ramanujan",
        icon: User,
      },
      {
        id: "legend-kalam",
        title: "A. P. J. Abdul Kalam",
        subtitle: "Satellite launch vehicles, missile technology, and People's President",
        category: "Legends",
        href: "/biographies/apj-abdul-kalam",
        icon: User,
      },
      {
        id: "legend-aryabhata",
        title: "Aryabhata",
        subtitle: "Classical Indian astronomy, concept of zero, and planetary motion",
        category: "Legends",
        href: "/biographies/aryabhata",
        icon: User,
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        sfx.playClick();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: CommandItem) => {
    sfx.playSuccess();
    setIsOpen(false);
    setQuery("");
    router.push(item.href);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          sfx.playClick();
          setIsOpen(true);
        }}
        type="button"
        title="Open Command Palette (Ctrl+K / ⌘K)"
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-xs text-slate-300 hover:text-cyan-200 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.15)] active:scale-95"
      >
        <Search className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-mono text-[11px] text-slate-400">Search system...</span>
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-cyan-300">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-[#091129] border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(34,211,238,0.3)] overflow-hidden text-white animate-scale-up"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-cyan-500/20 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search legends, historical tools, or jump to page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-400 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching commands or legends found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => {
                    setSelectedIndex(idx);
                    sfx.playHover();
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 border border-cyan-400/50 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      : "border border-transparent text-slate-300 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isSelected
                          ? "bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                          : "bg-slate-900 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm truncate">{item.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate font-light mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 shrink-0 ml-3">
                    Jump →
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t border-white/5 bg-slate-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400 font-bold">LIFELEGENDS ENTERPRISE CODEX</span>
        </div>
      </div>
    </div>
  );
}
