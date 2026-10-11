"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles } from "lucide-react";

export default function AudioNarrator({
  title,
  textToRead,
}: {
  title: string;
  textToRead: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (raw: string) => {
    return raw
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[#*`_~]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const startReading = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const prepared = `${title}. ${cleanText(textToRead)}`;
    const utterance = new SpeechSynthesisUtterance(prepared);
    utteranceRef.current = utterance;

    utterance.rate = 0.95; // comfortable storytelling pace
    utterance.pitch = 1.0;

    // Pick a natural english voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onboundary = (event) => {
      if (event.charIndex && prepared.length > 0) {
        const pct = Math.min(100, Math.round((event.charIndex / prepared.length) * 100));
        setProgress(pct);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);
  };

  const pauseReading = () => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (!isSupported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      startReading();
    }
  };

  const stopReading = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  if (!isSupported) return null;

  return (
    <div className="w-full my-6 p-4 rounded-2xl bg-[#09122C]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Narrator Info */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">
                AI Audio Narrator
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                <Sparkles className="w-2.5 h-2.5" /> FREE AUDIOBOOK
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Listen to the life story of {title}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {!isPlaying ? (
            <button
              onClick={startReading}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Listen</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeReading}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseReading}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-black text-xs uppercase tracking-widest hover:bg-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5 fill-black" />
              <span>Pause</span>
            </button>
          )}

          {isPlaying && (
            <button
              onClick={stopReading}
              type="button"
              title="Stop and reset narration"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Audio Progress Bar */}
      {isPlaying && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-cyan-400">{progress}%</span>
        </div>
      )}
    </div>
  );
}
