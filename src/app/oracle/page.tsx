"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  Settings,
  Search,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  RefreshCw,
  PlusCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SpaceAmbientAudio from "@/components/SpaceAmbientAudio";
import { sfx } from "@/lib/soundfx";
import Link from "next/link";

interface Persona {
  id: string;
  name: string;
  title: string;
  era: string;
  avatarColor: string;
  imageUrl?: string | null;
  greeting: string;
  suggestedQuestions: string[];
  isCustom?: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "oracle";
  text: string;
  timestamp: string;
  source?: string;
  suggestedFollowUps?: string[];
}

const PRESET_PERSONAS: Persona[] = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    title: "Master of Lightning & Wireless Resonance",
    era: "1856 – 1943",
    avatarColor: "from-cyan-400 to-blue-600",
    greeting:
      "Greetings, traveler of the 21st century. I am Nikola Tesla. You inhabit the world of wireless communion I foresaw in my Wardenclyffe laboratory. What secrets of the ether, polyphase electricity, or cosmic energy shall we examine today?",
    suggestedQuestions: [
      "What was your true vision for Wardenclyffe Tower?",
      "Why did you oppose Thomas Edison's direct current?",
      "How did you invent the alternating current motor?",
      "What are your thoughts on modern wireless technology and AI?",
    ],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    title: "Father of Relativity & Modern Cosmology",
    era: "1879 – 1955",
    avatarColor: "from-indigo-400 to-cyan-500",
    greeting:
      "Guten Tag, my friend. I am Albert Einstein. Put aside your formalities—life is too short and spacetime is too curved for rigid protocol. What mystery of relativity, quantum quanta, or human curiosity shall we unravel?",
    suggestedQuestions: [
      "Can you explain spacetime curvature in simple words?",
      "Why did you say 'God does not play dice'?",
      "What is the physical meaning of E = mc²?",
      "How did your 1905 miracle year change physics forever?",
    ],
  },
  {
    id: "lovelace",
    name: "Ada Lovelace",
    title: "Enchantress of Numbers & First Programmer",
    era: "1815 – 1852",
    avatarColor: "from-fuchsia-400 to-purple-600",
    greeting:
      "A warm welcome to you. I am Augusta Ada King, Countess of Lovelace. Charles Babbage called me the 'Enchantress of Numbers'. Let us explore the harmony of 'Poetical Science' and the limitless horizons of calculating engines.",
    suggestedQuestions: [
      "How did you write the very first computer algorithm in 1843?",
      "What did you foresee that Charles Babbage did not?",
      "Can machines ever possess genuine creativity or compose music?",
      "What was your concept of 'Poetical Science'?",
    ],
  },
  {
    id: "vinci",
    name: "Leonardo da Vinci",
    title: "Master of Florence & Universal Polymath",
    era: "1452 – 1519",
    avatarColor: "from-emerald-400 to-teal-600",
    greeting:
      "Salute, seeker of truth. I am Leonardo di ser Piero da Vinci. The eye is the window to the soul, and nature is the supreme teacher. What observation of anatomy, mechanics, flight, or painting occupies your mind?",
    suggestedQuestions: [
      "What is your secret to observing and understanding nature?",
      "How did you design your flying machines and aerial screw?",
      "What went through your mind while painting the Mona Lisa?",
      "How can one connect art and engineering into a single discipline?",
    ],
  },
  {
    id: "curie",
    name: "Marie Curie",
    title: "Double Nobel Laureate & Radioactivity Pioneer",
    era: "1867 – 1934",
    avatarColor: "from-amber-400 to-orange-600",
    greeting:
      "Bonjour. I am Marie Skłodowska Curie. In my laboratory in Paris, Pierre and I labored through tons of pitchblende to unlock the radiant heart of matter. Let us discuss the atomic core and scientific perseverance.",
    suggestedQuestions: [
      "How did you isolate radium and polonium in your wooden shed?",
      "What was it like to win two Nobel Prizes in two different sciences?",
      "What obstacles did you face as a woman in European academia?",
      "What advice do you give to researchers confronting impossible odds?",
    ],
  },
  {
    id: "newton",
    name: "Sir Isaac Newton",
    title: "Architect of Classical Physics & Calculus",
    era: "1642 – 1727",
    avatarColor: "from-sky-400 to-indigo-600",
    greeting:
      "Greetings. I am Isaac Newton. Through contemplation of fluxions, gravity, and the prism of light, I sought the mathematical principles governing God's creation. What laws of motion shall we contemplate?",
    suggestedQuestions: [
      "Did the apple falling truly inspire universal gravitation?",
      "Why did you invent calculus during the Great Plague of 1665?",
      "What was your famous dispute with Gottfried Wilhelm Leibniz?",
      "How did your experiments with prisms reveal the nature of color?",
    ],
  },
  {
    id: "turing",
    name: "Alan Turing",
    title: "Father of Computer Science & Enigma Breaker",
    era: "1912 – 1954",
    avatarColor: "from-cyan-500 to-teal-700",
    greeting:
      "Hello. I am Alan Turing. At Bletchley Park and through the abstract formulation of the universal machine, I explored the boundaries of computation and thought. What questions of logic or intelligence do you bring?",
    suggestedQuestions: [
      "How did the Bombe machine crack the German Enigma code?",
      "What was the original philosophical basis of the Turing Test?",
      "What is a Universal Turing Machine in simple terms?",
      "Did you believe machines would eventually outthink human minds?",
    ],
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    title: "Quantum Electrodynamics & Nobel Pioneer",
    era: "1918 – 1988",
    avatarColor: "from-rose-400 to-red-600",
    greeting:
      "Hey there! Richard Feynman here. Put away the stuffed-shirt jargon—science is about the sheer, unadulterated pleasure of finding things out! What piece of physics or nature are you trying to understand?",
    suggestedQuestions: [
      "What are Feynman Diagrams and why did you invent them?",
      "Why is the 'pleasure of finding things out' the heart of physics?",
      "How did you approach thinking like an outsider in science?",
      "Can anyone truly understand quantum mechanics?",
    ],
  },
  {
    id: "universal",
    name: "Grand Oracle of History",
    title: "Omniscient Scholar of All Historical Biographies",
    era: "Dawn of Time – Present",
    avatarColor: "from-purple-500 via-fuchsia-500 to-cyan-400",
    greeting:
      "Welcome, scholar. I am the Grand Oracle of History—an omniscient intelligence indexing every scientist, mathematician, inventor, and philosopher across human civilization. Ask me anything about ANY thinker, discovery, or rivalry.",
    suggestedQuestions: [
      "Compare the discoveries of Isaac Newton and Albert Einstein.",
      "Who was J. Robert Oppenheimer and what was the Manhattan Project?",
      "Tell me about Srinivasa Ramanujan's mathematical genius.",
      "How did Rosalind Franklin contribute to the discovery of DNA?",
    ],
  },
];

export default function OraclePage() {
  const [personas, setPersonas] = useState<Persona[]>(PRESET_PERSONAS);
  const [selectedPersonaId, setSelectedPersonaId] = useState("tesla");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Summon State
  const [summonQuery, setSummonQuery] = useState("");
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonError, setSummonError] = useState<string | null>(null);
  const [showSummonBar, setShowSummonBar] = useState(false);

  // Optional Custom Key State
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [savedKeyNotice, setSavedKeyNotice] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const activePersona = useMemo(
    () => personas.find((p) => p.id === selectedPersonaId) || personas[0],
    [personas, selectedPersonaId]
  );

  // Load custom key from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lifelegends_oracle_custom_key");
      if (stored) setCustomApiKey(stored);
    } catch {}
  }, []);

  // Set initial greeting when active persona changes
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: "greeting",
        sender: "oracle",
        text: activePersona.greeting,
        timestamp: timeStr,
        source: "Historical Persona Core",
        suggestedFollowUps: activePersona.suggestedQuestions.slice(0, 3),
      },
    ]);
    stopSpeech();
  }, [activePersona]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  };

  const speakText = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === id) {
      stopSpeech();
      return;
    }

    stopSpeech();
    sfx.playClick();

    // Clean markdown for speech
    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/[*_#`]/g, "")
      .replace(/\n+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = activePersona.id === "einstein" ? 0.9 : activePersona.id === "turing" ? 1.05 : 1.0;

    // Pick English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("Zira")) || voices[0];
    if (enVoice) utterance.voice = enVoice;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    speechRef.current = utterance;
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async (id: string, text: string) => {
    sfx.playSuccess();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const saveKey = () => {
    sfx.playSuccess();
    try {
      if (customApiKey.trim()) {
        localStorage.setItem("lifelegends_oracle_custom_key", customApiKey.trim());
      } else {
        localStorage.removeItem("lifelegends_oracle_custom_key");
      }
      setSavedKeyNotice(true);
      setTimeout(() => setSavedKeyNotice(false), 2500);
    } catch {}
  };

  // Summon any scientist/biography from history
  const handleSummon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summonQuery.trim() || isSummoning) return;

    sfx.playClick();
    setIsSummoning(true);
    setSummonError(null);

    try {
      const res = await fetch("/api/oracle/summon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: summonQuery.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not summon figure");
      }

      const newPersona: Persona = {
        id: data.id,
        name: data.name,
        title: data.title,
        era: data.era,
        avatarColor: data.avatarColor,
        imageUrl: data.imageUrl,
        greeting: data.greeting,
        suggestedQuestions: data.suggestedQuestions,
        isCustom: true,
      };

      sfx.playSuccess();
      setPersonas((prev) => [newPersona, ...prev.filter((p) => p.id !== newPersona.id)]);
      setSelectedPersonaId(newPersona.id);
      setSummonQuery("");
      setShowSummonBar(false);
    } catch (err: any) {
      setSummonError(err.message || "Failed to summon. Try typing another name.");
    } finally {
      setIsSummoning(false);
    }
  };

  // Send message to LLM & RAG Engine
  const handleSend = async (messageToSend?: string) => {
    const query = (messageToSend || inputValue).trim();
    if (!query || isTyping) return;

    sfx.playClick();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageToSend) setInputValue("");
    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/oracle/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          persona: {
            id: activePersona.id,
            name: activePersona.name,
            title: activePersona.title,
            era: activePersona.era,
          },
          history: historyPayload,
          apiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Oracle error");
      }

      sfx.playSuccess();
      const oracleMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "oracle",
        text: data.reply,
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
        suggestedFollowUps: data.suggestedFollowUps,
      };

      setMessages((prev) => [...prev, oracleMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "oracle",
        text: `My connection through the historical ether was momentarily severed (${err.message}). Ask me again, and we shall resume our inquiry.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "System Fallback",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Export Dialogue to Codex Vault
  const handleExportToCodex = () => {
    sfx.playSuccess();
    try {
      const summaryText = messages
        .map((m) => `[${m.timestamp}] ${m.sender === "user" ? "Scholar" : activePersona.name}:\n${m.text}\n`)
        .join("\n---\n\n");

      const existingNotes = JSON.parse(localStorage.getItem("lifelegends_study_codex_notes") || "[]");
      const newCodexEntry = {
        id: Date.now().toString(),
        legendName: activePersona.name,
        note: `AI Oracle Dialogue with ${activePersona.name} (${activePersona.era}):\n\n${summaryText.slice(0, 1500)}...`,
        createdAt: new Date().toLocaleDateString(),
      };

      localStorage.setItem("lifelegends_study_codex_notes", JSON.stringify([newCodexEntry, ...existingNotes]));
      alert(`Dialogue successfully exported to your Personal Study Codex Vault! You can view or generate a PDF in [CODEX].`);
    } catch {
      alert("Dialogue copied to memory.");
    }
  };

  // Render message with basic markdown support (bolding and quotes)
  const renderFormattedText = (raw: string) => {
    const paragraphs = raw.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      // Split on bold syntax **text**
      const parts = para.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed">
          {parts.map((part, idx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={idx} className="font-bold text-cyan-200">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#040816] text-white p-3 sm:p-6 md:p-8 relative overflow-x-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Header HUD */}
        <div className="text-center my-4 sm:my-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Advanced Historical LLM & Biographical RAG Engine</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              100% Free Forever
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300">
            AI Oracle: Dialogue with History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl mx-auto mt-2">
            Converse in real-time with any scientist, mathematician, or pioneer in human history. Powered by deep
            biographical knowledge, authentic historical writings, and neural persona synthesis.
          </p>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
            <button
              onClick={() => {
                sfx.playClick();
                setShowSummonBar(!showSummonBar);
              }}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-300" />
              <span>Summon Any Scientist</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                setSelectedPersonaId("universal");
              }}
              type="button"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                selectedPersonaId === "universal"
                  ? "bg-fuchsia-500/25 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                  : "bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Omniscient Mode (All Science)</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                setShowSettings(!showSettings);
              }}
              type="button"
              title="Engine Settings"
              className="p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Summon Any Scientist Bar Modal/Dropdown */}
        {showSummonBar && (
          <form
            onSubmit={handleSummon}
            className="mb-6 p-4 rounded-3xl bg-[#091129]/95 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Summon ANY scientist or thinker (e.g. Robert Oppenheimer, Feynman, Ramanujan, Kepler, Bohr, Darwin)..."
                  value={summonQuery}
                  onChange={(e) => setSummonQuery(e.target.value)}
                  className="w-full bg-[#040816] border border-cyan-500/30 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!summonQuery.trim() || isSummoning}
                className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold text-xs tracking-wider uppercase disabled:opacity-40 hover:opacity-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                {isSummoning ? "Summoning from History..." : "Summon Legend"}
              </button>
            </div>

            {summonError && <p className="mt-2 text-xs text-rose-400 font-mono">{summonError}</p>}
            <p className="mt-2 text-[11px] text-slate-400 font-light">
              Tip: You can summon any historical scientist, philosopher, inventor, or Nobel laureate. The system will
              dynamically fetch their biographical data and initiate a first-person dialogue.
            </p>
          </form>
        )}

        {/* Optional Engine Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-5 rounded-3xl bg-[#0b163a]/90 border border-white/10 backdrop-blur-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Oracle Intelligence Architecture
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                type="button"
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              By default, this Oracle operates on an <strong>Autonomous Historical RAG Engine</strong> that retrieves
              authentic historical archives from Wikipedia, completely <strong>100% free forever</strong> with zero API
              keys or subscription costs. If you wish to use raw Google Gemini 2.0 Flash or Groq Llama-3.3, you may
              optionally supply a private key below.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="password"
                placeholder="Optional: Enter Gemini or Groq API Key..."
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="w-full sm:flex-1 bg-[#040816] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={saveKey}
                type="button"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Save Settings
              </button>
            </div>

            {savedKeyNotice && (
              <p className="mt-2 text-xs text-emerald-400 font-mono">Settings updated successfully.</p>
            )}
          </div>
        )}

        {/* Persona Selector Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
          {personas.map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedPersonaId(persona.id);
                }}
                onMouseEnter={() => sfx.playHover()}
                type="button"
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/25 to-fuchsia-500/25 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-[1.02]"
                    : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {persona.imageUrl ? (
                  <img
                    src={persona.imageUrl}
                    alt={persona.name}
                    className="w-6 h-6 rounded-full object-cover border border-cyan-400/50"
                  />
                ) : (
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${persona.avatarColor}`} />
                )}
                <span>{persona.name}</span>
                {persona.isCustom && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                    Custom
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Chat Tablet Window */}
        <div className="flex-1 rounded-3xl bg-[#091129]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-h-[660px]">
          {/* Active Persona Banner Header */}
          <div className="p-4 sm:p-5 border-b border-white/5 bg-slate-950/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {activePersona.imageUrl ? (
                <img
                  src={activePersona.imageUrl}
                  alt={activePersona.name}
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0"
                />
              ) : (
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${activePersona.avatarColor} flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0`}
                >
                  {activePersona.name[0]}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">{activePersona.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE ORACLE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light truncate max-w-xs sm:max-w-md">
                  {activePersona.title} • {activePersona.era}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportToCodex}
                type="button"
                title="Export this conversation to your Personal Study Codex Vault"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-900/60 text-xs font-mono transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Save to Codex</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  stopSpeech();
                  setMessages([
                    {
                      id: "greeting",
                      sender: "oracle",
                      text: activePersona.greeting,
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      source: "Historical Persona Core",
                      suggestedFollowUps: activePersona.suggestedQuestions.slice(0, 3),
                    },
                  ]);
                }}
                type="button"
                title="Reset conversation"
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isSpeaking = speakingId === msg.id;

              return (
                <div key={msg.id} className="space-y-2">
                  <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                        isUser
                          ? "bg-fuchsia-500 text-white shadow-[0_0_10px_rgba(232,121,249,0.4)]"
                          : `bg-gradient-to-br ${activePersona.avatarColor} text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]`
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Speech Bubble */}
                    <div
                      className={`max-w-[88%] sm:max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? "bg-fuchsia-950/40 border border-fuchsia-500/40 text-slate-100 rounded-tr-none"
                          : "bg-[#0b163a]/80 border border-cyan-500/30 text-slate-200 rounded-tl-none shadow-lg"
                      }`}
                    >
                      <div>{renderFormattedText(msg.text)}</div>

                      {/* Message Footer HUD */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-3 text-[10px] font-mono text-slate-500">
                        <div className="flex items-center gap-2">
                          <span>{msg.timestamp}</span>
                          {msg.source && (
                            <span className="text-cyan-400/80 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
                              {msg.source}
                            </span>
                          )}
                        </div>

                        {!isUser && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => speakText(msg.id, msg.text)}
                              type="button"
                              title={isSpeaking ? "Stop voice synthesis" : "Read aloud with neural voice"}
                              className={`p-1 rounded hover:bg-white/10 transition-colors ${
                                isSpeaking ? "text-cyan-400 animate-pulse" : "text-slate-400 hover:text-white"
                              }`}
                            >
                              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              onClick={() => copyToClipboard(msg.id, msg.text)}
                              type="button"
                              title="Copy answer to clipboard"
                              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contextual Follow-Up Suggestions */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="pl-11 flex flex-wrap gap-2 pt-1">
                      {msg.suggestedFollowUps.map((prompt, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSend(prompt)}
                          disabled={isTyping}
                          type="button"
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all text-left cursor-pointer active:scale-95 disabled:opacity-40"
                        >
                          → {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 bg-gradient-to-br ${activePersona.avatarColor} text-black flex items-center justify-center`}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0b163a]/80 border border-cyan-500/30 flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-300">Synthesizing historical knowledge...</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 border-t border-white/5 bg-slate-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask ${activePersona.name} any question about discoveries, theories, or history...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#060c20] border border-cyan-500/30 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <SpaceAmbientAudio />
    </main>
  );
}
