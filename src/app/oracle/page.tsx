"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, Volume2, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpaceAmbientAudio from "@/components/SpaceAmbientAudio";
import { sfx } from "@/lib/soundfx";

interface Persona {
  id: string;
  name: string;
  title: string;
  era: string;
  avatarColor: string;
  greeting: string;
  knowledgeBase: {
    keywords: string[];
    response: string;
  }[];
  defaultResponse: string;
}

const PERSONAS: Persona[] = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    title: "Master of Lightning & Wireless Resonance",
    era: "1856 - 1943",
    avatarColor: "from-cyan-400 to-blue-600",
    greeting: "Greetings, traveler of the 21st century. I am Nikola Tesla. You inhabit the world of wireless communion I foresaw in my Wardenclyffe laboratory. What secrets of the ether shall we examine today?",
    knowledgeBase: [
      {
        keywords: ["edison", "war", "current", "dc"],
        response: "Thomas Edison was a relentless experimenter, yet he lacked mathematical method. His direct current system required power plants every mile and copper cables thick as trunks! My alternating current transformed humanity because rotating magnetic fields are the natural grammar of the universe.",
      },
      {
        keywords: ["wireless", "energy", "wardenclyffe", "power"],
        response: "At Wardenclyffe, I sought not merely wireless telegraphy, but the instantaneous transmission of limitless electrical power through the Earth's resonant cavity without wires. Had J.P. Morgan not withdrawn capital, humanity would enjoy clean, free ether-power today.",
      },
      {
        keywords: ["future", "ai", "modern", "internet", "machine"],
        response: "When wireless is perfectly applied, the whole earth will be converted into a huge brain, which in fact it is, all things being particles of a real and rhythmic whole. What you call the internet and artificial intelligence is the dawn of that very global nervous system.",
      },
      {
        keywords: ["pigeon", "solitude", "marriage", "lonely"],
        response: "I do not think you can name many great inventions that have been made by married men. An inventor possesses so intense a nature, with so much in it of wild, passionate quality, that in giving himself to a woman he might surrender all his creative fire.",
      },
      {
        keywords: ["advice", "success", "work", "creativity"],
        response: "Be alone, that is the secret of invention; be alone, that is when ideas are born. Cultivate intense mental visualization—I built and tested my machines entirely inside my mind before touching metal.",
      },
    ],
    defaultResponse: "The mind is a receiver of cosmic knowledge; throughout the universe there is a core from which we obtain knowledge, strength, and inspiration. To comprehend your inquiry, you must think in terms of energy, frequency, and vibration.",
  },
  {
    id: "lovelace",
    name: "Ada Lovelace",
    title: "Enchantress of Numbers & First Programmer",
    era: "1815 - 1852",
    avatarColor: "from-fuchsia-400 to-purple-600",
    greeting: "A warm welcome to you. I am Augusta Ada King, Countess of Lovelace. Charles Babbage called me the 'Enchantress of Numbers'. Let us discuss the harmony of algorithmic poetics and thinking machines.",
    knowledgeBase: [
      {
        keywords: ["babbage", "engine", "analytical", "difference"],
        response: "Babbage built the hardware; I envisioned the soul of the machine. The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves. I saw that the engine could manipulate symbols beyond mere numbers—including musical notes and poetic syntax.",
      },
      {
        keywords: ["program", "code", "first", "algorithm"],
        response: "In Note G of my 1843 memoir on Menabrea's sketch, I formulated the exact computational sequence to compute Bernoulli numbers on Babbage's store and mill. It included loops, memory addresses, and conditional branching—the world's very first computer program.",
      },
      {
        keywords: ["ai", "think", "intelligence", "conscious"],
        response: "The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform. Yet, when programmed with transcendent rules, can its outputs surpass our initial expectations? That is the glorious question of your era.",
      },
      {
        keywords: ["father", "byron", "poetry", "poet"],
        response: "My mother, Lady Byron, feared I would inherit my father Lord Byron's volatile romantic madness, so she submerged me in rigorous mathematics! But I united them into what I named 'Poetical Science'—using math to see the invisible laws of the cosmos.",
      },
    ],
    defaultResponse: "That brain of mine is something more than merely mortal, as time will show. Every mathematical relationship expresses a profound poetic truth. Tell me how your modern calculating engines express art and music today.",
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    title: "Father of Relativity & Modern Cosmology",
    era: "1879 - 1955",
    avatarColor: "from-indigo-400 to-cyan-500",
    greeting: "Guten Tag, my friend. I am Albert Einstein. Put aside your formalities—life is too short and spacetime is too curved for rigid protocol. What mystery of physics or humanity shall we unravel?",
    knowledgeBase: [
      {
        keywords: ["relativity", "time", "speed", "light", "space"],
        response: "When you sit with a nice girl for two hours you think it's only a minute, but when you sit on a hot stove for a minute you think it's two hours—that's relativity! Mathematically, the speed of light is the cosmic invariant; space and time flex to preserve that universal constant.",
      },
      {
        keywords: ["quantum", "bohr", "dice", "god"],
        response: "Quantum mechanics is certainly imposing. But an inner voice tells me that it is not yet the real thing. The theory says a lot, but does not really bring us any closer to the secret of the 'Old One'. I, at any rate, am convinced that God does not play dice with the universe.",
      },
      {
        keywords: ["imagination", "knowledge", "creativity"],
        response: "Imagination is more important than knowledge. For knowledge is limited to all we now know and understand, while imagination embraces the entire world, and all there ever will be to know and understand.",
      },
      {
        keywords: ["emc2", "energy", "mass", "equation"],
        response: "E = mc² revealed that mass and energy are merely different garments worn by the same fundamental physical entity. A tiny grain of matter harbors a ferocious ocean of dormant energy.",
      },
    ],
    defaultResponse: "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science. Whoever does not know it and can no longer wonder is as good as dead.",
  },
  {
    id: "vinci",
    name: "Leonardo da Vinci",
    title: "Master of Florence & Universal Polymath",
    era: "1452 - 1519",
    avatarColor: "from-emerald-400 to-teal-600",
    greeting: "Salute, seeker of knowledge. I am Leonardo di ser Piero da Vinci. The eye is the window to the soul, and nature is the supreme teacher. Come, what observation of anatomy, mechanics, or flight occupies your thoughts?",
    knowledgeBase: [
      {
        keywords: ["mona", "lisa", "painting", "art"],
        response: "Art is never finished, only abandoned. For the portrait of Lisa Gherardini, I spent decades layering microscopic glazes of oil to render the sfumato effect—the subtle veil of smoke around her enigmatic lips where light and shadow marry.",
      },
      {
        keywords: ["flying", "flight", "wings", "helicopter"],
        response: "Once you have tasted flight, you will forever walk the earth with your eyes turned skyward. I dissected the wings of bats and kites for forty years. My aerial screw proved that air has density, and man would one day conquer the heights.",
      },
      {
        keywords: ["learning", "polymath", "curiosity"],
        response: "Learning never exhausts the mind. Principles for the development of a complete mind: study the science of art, study the art of science. Develop your senses—especially learn how to see. Realize that everything connects to everything else.",
      },
    ],
    defaultResponse: "Nature has so generously distributed one of its most sublime gifts: curiosity. Saper vedere—knowing how to see—is the beginning of all invention. What natural phenomenon have you observed today?",
  },
];

interface ChatMessage {
  id: string;
  sender: "user" | "oracle";
  text: string;
  timestamp: string;
}

export default function OraclePage() {
  const [selectedPersonaId, setSelectedPersonaId] = useState("tesla");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  useEffect(() => {
    // Reset messages when persona changes
    setMessages([
      {
        id: "greeting",
        sender: "oracle",
        text: activePersona.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [selectedPersonaId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    sfx.playClick();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue.toLowerCase();
    setInputValue("");
    setIsTyping(true);

    // Contextual matching engine
    setTimeout(() => {
      let matchedResponse = activePersona.defaultResponse;
      for (const entry of activePersona.knowledgeBase) {
        if (entry.keywords.some((kw) => query.includes(kw))) {
          matchedResponse = entry.response;
          break;
        }
      }

      sfx.playSuccess();
      const oracleMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "oracle",
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, oracleMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#040816] text-white p-4 sm:p-8 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Header HUD */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Historical Oracle Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300">
            Dialogue with Legends
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto mt-2">
            Ask questions directly to historical thinkers simulated through their personal philosophies, writings, and core discoveries.
          </p>
        </div>

        {/* Persona Selectors Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {PERSONAS.map((persona) => {
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
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105"
                    : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${persona.avatarColor}`} />
                <span>{persona.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Tablet Window */}
        <div className="flex-1 rounded-3xl bg-[#091129]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-h-[620px]">
          {/* Active Persona Banner */}
          <div className="p-4 sm:p-5 border-b border-white/5 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activePersona.avatarColor} flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)]`}>
                {activePersona.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">{activePersona.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE ORACLE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light truncate max-w-xs sm:max-w-md">
                  {activePersona.title} • {activePersona.era}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setMessages([
                  {
                    id: "greeting",
                    sender: "oracle",
                    text: activePersona.greeting,
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                      isUser
                        ? "bg-fuchsia-500 text-white shadow-[0_0_10px_rgba(232,121,249,0.4)]"
                        : `bg-gradient-to-br ${activePersona.avatarColor} text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]`
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-fuchsia-950/40 border border-fuchsia-500/40 text-slate-100 rounded-tr-none"
                        : "bg-[#0b163a]/80 border border-cyan-500/30 text-slate-200 rounded-tl-none shadow-lg"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] font-mono text-slate-500 text-right mt-1.5">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl shrink-0 bg-gradient-to-br ${activePersona.avatarColor} text-black flex items-center justify-center`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0b163a]/80 border border-cyan-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-white/5 bg-slate-950/80 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Ask ${activePersona.name} about their life, discoveries, or philosophy...`}
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
