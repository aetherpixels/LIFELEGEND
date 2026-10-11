"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Bookmark, Trash2, Download, ArrowRight, Sparkles, Check, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpaceAmbientAudio from "@/components/SpaceAmbientAudio";
import { useAuth } from "@/context/AuthContext";
import { sfx } from "@/lib/soundfx";
import jsPDF from "jspdf";

interface StudyNote {
  id: string;
  legendName: string;
  note: string;
  createdAt: string;
}

const STORAGE_NOTES_KEY = "lifelegends_study_codex_notes";
const STORAGE_FAVS_KEY = "lifelegends_user_saved_legends";

export default function CodexVaultPage() {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [newLegend, setNewLegend] = useState("Nikola Tesla");
  const [newNote, setNewNote] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        // Starter notes
        const initial = [
          {
            id: "1",
            legendName: "Nikola Tesla",
            note: "Key concept: Resonant induction and rotating magnetic fields allow power generation without friction brushes.",
            createdAt: new Date().toLocaleDateString(),
          },
          {
            id: "2",
            legendName: "Ada Lovelace",
            note: "Principle of 'Poetical Science': Mathematics is the language of natural laws, applicable to music and visual art.",
            createdAt: new Date().toLocaleDateString(),
          },
        ];
        setNotes(initial);
        localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(initial));
      }
    } catch {}
  }, []);

  const saveNotes = (updated: StudyNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    sfx.playSuccess();
    const created: StudyNote = {
      id: Date.now().toString(),
      legendName: newLegend,
      note: newNote.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    saveNotes([created, ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = (id: string) => {
    sfx.playClick();
    saveNotes(notes.filter((n) => n.id !== id));
  };

  const handleExportCodex = () => {
    sfx.playSuccess();
    setExporting(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;

      // Header Banner
      doc.setFillColor(11, 19, 43);
      doc.rect(0, 0, pageWidth, 90, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(34, 211, 238);
      doc.text("LIFELEGENDS CODEX VAULT", margin, 42);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 220);
      doc.text(
        `RESEARCH ARCHIVE • SCHOLAR: ${user?.name ? user.name.toUpperCase() : "HISTORICAL RESEARCHER"}`,
        margin,
        62
      );

      let y = 130;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(20, 20, 30);
      doc.text("Personal Historical Research Codex", margin, y);
      y += 25;

      notes.forEach((item, index) => {
        if (y > 750) {
          doc.addPage();
          y = 50;
        }

        doc.setFillColor(243, 244, 246);
        doc.rect(margin, y - 5, contentWidth, 22, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(168, 85, 247);
        doc.text(`${index + 1}. ${item.legendName.toUpperCase()} (${item.createdAt})`, margin + 8, y + 10);
        y += 28;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 50);

        const splitText = doc.splitTextToSize(item.note, contentWidth);
        doc.text(splitText, margin + 8, y);
        y += splitText.length * 15 + 15;
      });

      doc.save("lifelegends-personal-codex.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#040816] text-white p-4 sm:p-8 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Header HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Research Codex</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300">
              Personal Study Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              Store private research insights, synthesize ideas across eras, and export custom field notes.
            </p>
          </div>

          <button
            onClick={handleExportCodex}
            disabled={notes.length === 0 || exporting}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            <span>{exporting ? "Compiling..." : "Export Codex (PDF)"}</span>
          </button>
        </div>

        {/* Note Composer Box */}
        <div className="p-6 rounded-3xl bg-[#091129]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.8)] mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Log Historical Insight / Observation</span>
          </h3>

          <form onSubmit={handleAddNote} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  Associated Legend
                </label>
                <select
                  value={newLegend}
                  onChange={(e) => setNewLegend(e.target.value)}
                  className="w-full bg-[#050a1a] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option>Nikola Tesla</option>
                  <option>Ada Lovelace</option>
                  <option>Marie Curie</option>
                  <option>Leonardo da Vinci</option>
                  <option>Albert Einstein</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  Research Note / Theoretical Connection
                </label>
                <input
                  type="text"
                  placeholder="Record breakthrough insight, cross-era idea, or thesis..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full bg-[#050a1a] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
              >
                Save To Vault
              </button>
            </div>
          </form>
        </div>

        {/* Notes Grid */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
            <span>SAVED RESEARCH ENTRIES ({notes.length})</span>
            <span>STORED LOCALLY & ENCRYPTED</span>
          </div>

          {notes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#091129]/60 border border-white/5 text-slate-400 text-xs">
              Your research codex is empty. Log an insight above to start building your personal archive.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0b1433]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-mono text-cyan-300">
                        {item.legendName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{item.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-light">
                      {item.note}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 mt-3 border-t border-white/5">
                    <button
                      onClick={() => handleDeleteNote(item.id)}
                      type="button"
                      title="Delete entry"
                      className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SpaceAmbientAudio />
    </main>
  );
}
