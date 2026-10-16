"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
  ShieldCheck,
  Cpu,
  PlusCircle,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  FileCode,
  Layers,
  History,
  Trash2,
  Maximize2,
  Minimize2,
  Flame,
  Radio,
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

interface OracleArtifact {
  id: string;
  title: string;
  type: "formula" | "blueprint" | "timeline" | "code" | "manuscript";
  badge: string;
  data: string;
  summary: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "oracle";
  text: string;
  timestamp: string;
  source?: string;
  thinking?: string;
  artifact?: OracleArtifact;
  suggestedFollowUps?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  personaId: string;
  messages: ChatMessage[];
  updatedAt: string;
}

const PRESET_PERSONAS: Persona[] = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    title: "Master of Lightning & Wireless Resonance",
    era: "1856 – 1943",
    avatarColor: "from-cyan-400 to-blue-600",
    imageUrl: "/portraits/nikola-tesla.jpg",
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
    imageUrl: "/portraits/albert-einstein.jpg",
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
    imageUrl: "/portraits/ada-lovelace.jpg",
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
    imageUrl: "/portraits/leonardo-da-vinci.jpg",
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
    imageUrl: "/portraits/marie-curie.jpg",
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
    imageUrl: "/portraits/isaac-newton.jpg",
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
    imageUrl: "/portraits/alan-turing.jpg",
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
    imageUrl: "/portraits/richard-feynman.jpg",
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
    id: "hawking",
    name: "Stephen Hawking",
    title: "Master of Black Hole Thermodynamics",
    era: "1942 – 2018",
    avatarColor: "from-violet-400 to-indigo-600",
    imageUrl: "/portraits/stephen-hawking.jpg",
    greeting:
      "Greetings. I am Stephen Hawking. Looking into the depths of black holes and the cosmic dawn of time, I sought to unify quantum theory with general relativity. What cosmological frontier shall we examine?",
    suggestedQuestions: [
      "What is Hawking Radiation and how do black holes evaporate?",
      "What happens to information when it falls into a black hole?",
      "What happened before the Big Bang?",
      "What is your advice for facing overwhelming adversity?",
    ],
  },
  {
    id: "ramanujan",
    name: "Srinivasa Ramanujan",
    title: "Mathematical Genius of Infinite Series",
    era: "1887 – 1920",
    avatarColor: "from-amber-500 to-yellow-600",
    imageUrl: "/portraits/srinivasa-ramanujan.jpg",
    greeting:
      "Namaste. I am Srinivasa Ramanujan. To me, an equation has no meaning unless it expresses a thought of God. Let us wander through the infinite series, modular forms, and partition wonders of pure mathematics.",
    suggestedQuestions: [
      "How did your famous infinite series for 1/pi come to you?",
      "What is the story behind the taxicab number 1729?",
      "What are Mock Theta functions in modern physics?",
      "What was your collaboration with G.H. Hardy like at Cambridge?",
    ],
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    title: "Father of Observational Astronomy & Modern Physics",
    era: "1564 – 1642",
    avatarColor: "from-blue-400 to-teal-600",
    imageUrl: "/portraits/galileo-galilei.jpg",
    greeting:
      "Salute! I am Galileo Galilei. Through my improved spyglass, I looked upon the rugged mountains of the Moon and the moons of Jupiter, proving that the heavens obey mathematical laws and that the Earth moves. What mystery of motion or the stars shall we explore?",
    suggestedQuestions: [
      "How did your telescope observations disprove geocentrism?",
      "What truly happened during your trial before the Roman Inquisition?",
      "What is the Law of Falling Bodies and did you drop balls from Pisa?",
      "Why is mathematics the language of the universe?",
    ],
  },
  {
    id: "franklin",
    name: "Rosalind Franklin",
    title: "Chemist of Photo 51 & Double Helix Architecture",
    era: "1920 – 1958",
    avatarColor: "from-rose-400 to-pink-600",
    imageUrl: "/portraits/rosalind-franklin.jpg",
    greeting:
      "Hello. I am Rosalind Franklin. In my laboratory at King's College London, precision and empirical data guided every exposure. Through Photo 51, the B-form helical structure of DNA revealed itself. What questions of molecular crystallography shall we discuss?",
    suggestedQuestions: [
      "What is the story behind Photo 51 and the discovery of DNA?",
      "What were the technical hurdles of X-ray diffraction on wet fibers?",
      "What was your research on the Tobacco Mosaic Virus and coal?",
      "What principles guided your uncompromising scientific rigor?",
    ],
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    title: "Architect of Evolution & Natural Selection",
    era: "1809 – 1882",
    avatarColor: "from-emerald-500 to-green-700",
    imageUrl: "/portraits/charles-darwin.jpg",
    greeting:
      "A warm day to you. I am Charles Darwin. Aboard HMS Beagle and across decades at Down House, I observed the boundless varieties of life and deduced how natural selection shapes all living creatures. What questions of nature's adaptations bring you here?",
    suggestedQuestions: [
      "How did your voyage on HMS Beagle inspire the theory of evolution?",
      "How does natural selection drive the adaptation of species?",
      "What was your reaction when Alfred Russel Wallace sent his essay?",
      "What did you mean by 'grandeur in this view of life'?",
    ],
  },
  {
    id: "kalam",
    name: "Dr. A. P. J. Abdul Kalam",
    title: "Missile Man of India & Aerospace Pioneer",
    era: "1931 – 2015",
    avatarColor: "from-amber-400 to-orange-600",
    imageUrl: "/portraits/apj-abdul-kalam.jpg",
    greeting:
      "Vanakkam and warm greetings! I am Dr. A. P. J. Abdul Kalam. Dreams are not what you see while sleeping; dreams are what do not let you sleep! Let us discuss rocket engineering, overcoming failure, and igniting the power of youth.",
    suggestedQuestions: [
      "How did you lead India's SLV-3 satellite launch vehicle project?",
      "What is the greatest leadership lesson Prof. Satish Dhawan taught you?",
      "What is your advice for students facing failure and hardship?",
      "How can technology be harnessed to uplift rural communities?",
    ],
  },
  {
    id: "aryabhata",
    name: "Aryabhata",
    title: "Ancient Master Astronomer & Formulator of Zero",
    era: "476 – 550 CE",
    avatarColor: "from-orange-400 to-yellow-600",
    imageUrl: "/portraits/aryabhata.jpg",
    greeting:
      "Namaskar. I am Aryabhata. In the ancient observatory of Kusumapura fifteen centuries ago, I composed the Aryabhatiya, calculated pi to 3.1416, and proved that the Earth rotates upon its axis. What astronomical calculations shall we explore?",
    suggestedQuestions: [
      "How did you calculate that the Earth rotates daily on its axis?",
      "What was your method for approximating the value of pi as 3.1416?",
      "How did you explain solar and lunar eclipses scientifically without myth?",
      "What is the Aryabhatiya sine table (Jya)?",
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
      "Tell me about Rosalind Franklin's Photo 51 and DNA.",
      "How did Aryabhata compute the rotating Earth and concept of zero?",
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

  // Claude-Style Interactive Artifact State
  const [activeArtifact, setActiveArtifact] = useState<OracleArtifact | null>(null);
  const [showArtifactDrawer, setShowArtifactDrawer] = useState(false);
  const [expandedThinking, setExpandedThinking] = useState<Record<string, boolean>>({});

  // Voice Input (Speech-to-Text Microphone)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ChatGPT-style Chat Sessions Sidebar
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);

  // Reasoning Mode Selector (Quantum / Socratic / Archival)
  const [reasoningMode, setReasoningMode] = useState<"quantum" | "socratic" | "archival">("quantum");

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

  // Load saved sessions & settings from localStorage and check URL persona param
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("lifelegends_oracle_custom_key");
      if (storedKey) setCustomApiKey(storedKey);

      const storedSessions = localStorage.getItem("lifelegends_saved_oracle_sessions");
      if (storedSessions) {
        const parsed = JSON.parse(storedSessions);
        setSessions(parsed);
      }

      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const pParam = urlParams.get("persona") || urlParams.get("p");
        if (pParam) {
          const cleanP = pParam.toLowerCase().replace("bio-", "");
          const match = personas.find(
            (p) =>
              p.id.toLowerCase() === cleanP ||
              p.id.toLowerCase().includes(cleanP) ||
              cleanP.includes(p.id.toLowerCase()) ||
              p.name.toLowerCase().includes(cleanP)
          );
          if (match) setSelectedPersonaId(match.id);
        }
      }
    } catch {}
  }, [personas]);

  // Save sessions to localStorage
  const persistSessions = (updated: ChatSession[]) => {
    setSessions(updated);
    try {
      localStorage.setItem("lifelegends_saved_oracle_sessions", JSON.stringify(updated.slice(0, 20)));
    } catch {}
  };

  // Start a new session or set greeting
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const initialMsg: ChatMessage = {
      id: "greeting-" + Date.now(),
      sender: "oracle",
      text: activePersona.greeting,
      timestamp: timeStr,
      source: "Verified Persona Knowledge Core",
      suggestedFollowUps: activePersona.suggestedQuestions.slice(0, 3),
    };
    setMessages([initialMsg]);
    stopSpeech();
    setActiveArtifact(null);
  }, [activePersona]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Speech cleanup on unmount
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

    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/[*_#`\[\]]/g, "")
      .replace(/\n+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch =
      activePersona.id === "einstein" ? 0.9 : activePersona.id === "turing" ? 1.05 : 1.0;

    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("Zira")) || voices[0];
    if (enVoice) utterance.voice = enVoice;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    speechRef.current = utterance;
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text Microphone Dictation (ChatGPT Voice Mode)
  const toggleSpeechRecognition = () => {
    sfx.playClick();
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is supported in Chrome, Edge, and modern browsers.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInputValue(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
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

  // Create a new session
  const handleNewSession = () => {
    sfx.playSuccess();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newId = Date.now().toString();
    const newMsg: ChatMessage = {
      id: "greeting-" + newId,
      sender: "oracle",
      text: activePersona.greeting,
      timestamp: timeStr,
      source: "Verified Persona Knowledge Core",
      suggestedFollowUps: activePersona.suggestedQuestions.slice(0, 3),
    };
    setMessages([newMsg]);
    setCurrentSessionId(newId);
    setActiveArtifact(null);
    setShowSidebar(false);
  };

  // Summon any historical figure
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
      if (!res.ok) throw new Error(data.error || "Could not summon figure");

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
      setSummonError(err.message || "Failed to summon figure. Try typing another name.");
    } finally {
      setIsSummoning(false);
    }
  };

  // Send message to LLM & RAG Engine
  const handleSend = async (messageToSend?: string) => {
    const query = (messageToSend || inputValue).trim();
    if (!query || isTyping) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    sfx.playClick();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!messageToSend) setInputValue("");
    setIsTyping(true);

    try {
      const historyPayload = newHistory.slice(-5).map((m) => ({
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
          reasoningMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Oracle error");

      sfx.playSuccess();
      const oracleMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "oracle",
        text: data.reply,
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
        thinking: data.thinking,
        artifact: data.artifact,
        suggestedFollowUps: data.suggestedFollowUps,
      };

      const finalMessages = [...newHistory, oracleMsg];
      setMessages(finalMessages);

      if (data.artifact) {
        setActiveArtifact(data.artifact);
        setShowArtifactDrawer(true);
      }

      // Update or create session in sidebar
      const sessionTitle = query.slice(0, 35) + (query.length > 35 ? "..." : "");
      const sessionId = currentSessionId || Date.now().toString();
      setCurrentSessionId(sessionId);

      const updatedSessions = [
        {
          id: sessionId,
          title: `${activePersona.name}: ${sessionTitle}`,
          personaId: activePersona.id,
          messages: finalMessages,
          updatedAt: timeStr,
        },
        ...sessions.filter((s) => s.id !== sessionId),
      ];
      persistSessions(updatedSessions);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "oracle",
        text: `My connection through the historical ether was momentarily severed (${err.message}). Ask me again, and we shall resume our inquiry.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "System Fallback Core",
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
      alert("Dialogue saved to memory.");
    }
  };

  // Download Transcript as Markdown
  const handleDownloadTranscript = () => {
    sfx.playSuccess();
    const content = `# LIFELEGENDS AI ORACLE TRANSCRIPT
Historical Figure: ${activePersona.name} (${activePersona.era})
Archival Session: ${new Date().toLocaleDateString()}

${messages
  .map(
    (m) =>
      `### ${m.sender === "user" ? "Scholar" : activePersona.name} (${m.timestamp})\n${m.text}\n`
  )
  .join("\n---\n\n")}
`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activePersona.name.toLowerCase().replace(/\s+/g, "-")}-oracle-transcript.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderFormattedText = (raw: string) => {
    const paragraphs = raw.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      if (para.startsWith("### ")) {
        return (
          <h4 key={pIdx} className="text-sm font-bold text-cyan-300 mt-3 mb-1 uppercase tracking-wider">
            {para.replace("### ", "")}
          </h4>
        );
      }
      const parts = para.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={pIdx} className="mb-2 last:mb-0 leading-relaxed text-slate-200">
          {parts.map((part, idx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={idx} className="font-bold text-cyan-300">
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

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Header HUD */}
        <div className="text-center my-3 sm:my-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Quantum Historical LLM & Interactive Artifact Engine</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              100% Free Forever
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300">
            AI Oracle: Dialogue with Legends
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl mx-auto mt-1">
            Real-time conversational simulation at the level of ChatGPT & Claude with verified historical RAG, deep
            chain-of-thought reasoning, live voice mode, and interactive scientific artifacts.
          </p>

          {/* Reasoning Depth & Model Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            {/* Reasoning Modes */}
            <div className="inline-flex rounded-xl bg-slate-900/90 border border-cyan-500/30 p-0.5 text-xs font-mono">
              <button
                onClick={() => setReasoningMode("quantum")}
                type="button"
                className={`px-3 py-1 rounded-lg transition-all ${
                  reasoningMode === "quantum"
                    ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ⚡ Quantum Fast
              </button>
              <button
                onClick={() => setReasoningMode("socratic")}
                type="button"
                className={`px-3 py-1 rounded-lg transition-all ${
                  reasoningMode === "socratic"
                    ? "bg-fuchsia-500 text-white font-bold shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🧠 Deep Socratic
              </button>
              <button
                onClick={() => setReasoningMode("archival")}
                type="button"
                className={`px-3 py-1 rounded-lg transition-all ${
                  reasoningMode === "archival"
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🏛️ Archival Thesis
              </button>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setShowSummonBar(!showSummonBar);
              }}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-300" />
              <span>Summon Any Legend</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                setShowSidebar(!showSidebar);
              }}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>History ({sessions.length})</span>
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                setShowSettings(!showSettings);
              }}
              type="button"
              title="Engine Settings"
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Summon Any Scientist Bar Modal/Dropdown */}
        {showSummonBar && (
          <form
            onSubmit={handleSummon}
            className="mb-4 p-4 rounded-3xl bg-[#091129]/95 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-in fade-in slide-in-from-top-2"
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
          </form>
        )}

        {/* Optional Engine Settings Panel */}
        {showSettings && (
          <div className="mb-4 p-5 rounded-3xl bg-[#0b163a]/95 border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Neural Engine & Free API Key Integration
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                type="button"
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* Provider Status Pill */}
            <div className="mb-4 p-3 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-slate-400">ACTIVE ENGINE:</span>
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {customApiKey.startsWith("gsk_")
                    ? "Groq Cloud Llama-3.3 70B (0.3s Sub-Second Speed)"
                    : customApiKey.startsWith("AIza")
                    ? "Google Gemini 2.0 Flash (Neural Core)"
                    : customApiKey.startsWith("sk-or-")
                    ? "OpenRouter Free Tier"
                    : customApiKey.trim()
                    ? "Custom OpenAI-Compatible Endpoint"
                    : "Global Distributed Neural LLM (100% Free Forever, No Key Needed)"}
                </span>
              </div>
              {customApiKey.trim() && (
                <button
                  onClick={() => {
                    setCustomApiKey("");
                    localStorage.removeItem("lifelegends_oracle_custom_key");
                    sfx.playSuccess();
                  }}
                  type="button"
                  className="text-[11px] font-mono text-rose-400 hover:text-rose-300 underline self-start sm:self-auto cursor-pointer"
                >
                  Clear Key (Reset to Free Default)
                </button>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              This Oracle runs on our <strong>Global Distributed Neural LLM & Historical Knowledge Core</strong> for free forever. For <strong>sub-second instant answers (500 tokens/sec)</strong> comparable to ChatGPT and Claude, you can connect your own 100% free API key:
            </p>

            {/* Free Key Provider Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300">Google Gemini Free Key</p>
                  <p className="text-[10px] text-slate-400">15 req/min, 1M tokens/min • Free Forever</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-900/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-amber-300">Groq Cloud Free Key</p>
                  <p className="text-[10px] text-slate-400">500 tokens/sec, Llama 3.3 70B • 100% Free</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Input Form */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="password"
                placeholder="Paste Gemini (AIza...) or Groq (gsk_...) key here..."
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="w-full sm:flex-1 bg-[#040816] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                onClick={saveKey}
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Save Key
              </button>
            </div>
            {savedKeyNotice && (
              <p className="mt-2 text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> API key saved securely in browser. Oracle will now use this model!
              </p>
            )}
          </div>
        )}

        {/* Persona Selector Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin">
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/25 to-fuchsia-500/25 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-[1.02]"
                    : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {persona.imageUrl ? (
                  <img
                    src={persona.imageUrl}
                    alt={persona.name}
                    className="w-5 h-5 rounded-full object-cover border border-cyan-400/50"
                  />
                ) : (
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${persona.avatarColor}`} />
                )}
                <span>{persona.name}</span>
                {persona.isCustom && (
                  <span className="text-[9px] px-1 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                    Custom
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Workspace (Side-by-side Chat & Claude-Style Artifact Panel) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 max-h-[720px] min-h-[580px]">
          {/* Left Session Drawer / Sidebar (Collapsible) */}
          {showSidebar && (
            <div className="lg:col-span-3 rounded-3xl bg-[#091129]/95 border border-cyan-500/30 p-4 flex flex-col justify-between overflow-hidden shadow-2xl animate-in fade-in">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                  <h3 className="text-xs font-bold font-mono uppercase text-cyan-300 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    <span>Dialogue Sessions</span>
                  </h3>
                  <button
                    onClick={handleNewSession}
                    type="button"
                    title="New Dialogue"
                    className="p-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 text-xs flex items-center gap-1 font-mono transition-colors"
                  >
                    <PlusCircle className="w-3 h-3" />
                    <span>New</span>
                  </button>
                </div>

                <div className="space-y-1.5 overflow-y-auto max-h-[500px]">
                  {sessions.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No saved dialogues yet.</p>
                  ) : (
                    sessions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          sfx.playClick();
                          setMessages(s.messages);
                          setSelectedPersonaId(s.personaId);
                          setCurrentSessionId(s.id);
                          setShowSidebar(false);
                        }}
                        className={`p-2.5 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                          currentSessionId === s.id
                            ? "bg-cyan-500/20 border-cyan-400 text-white"
                            : "bg-slate-900/40 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <span className="truncate max-w-[180px] font-medium">{s.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const filtered = sessions.filter((sess) => sess.id !== s.id);
                            persistSessions(filtered);
                          }}
                          type="button"
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Auto-saved to Local Codex</span>
                <button onClick={() => setShowSidebar(false)} type="button" className="text-cyan-400 hover:underline">
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Central Chat Tablet */}
          <div
            className={`${
              showSidebar ? "lg:col-span-5" : activeArtifact && showArtifactDrawer ? "lg:col-span-7" : "lg:col-span-12"
            } rounded-3xl bg-[#091129]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all`}
          >
            {/* Active Persona Banner Header */}
            <div className="p-3.5 sm:p-4 border-b border-white/5 bg-slate-950/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {activePersona.imageUrl ? (
                  <img
                    src={activePersona.imageUrl}
                    alt={activePersona.name}
                    className="w-10 h-10 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activePersona.avatarColor} flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0`}
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
                  <p className="text-xs text-slate-400 font-light truncate max-w-xs">
                    {activePersona.title} • {activePersona.era}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {activeArtifact && (
                  <button
                    onClick={() => setShowArtifactDrawer(!showArtifactDrawer)}
                    type="button"
                    title="Toggle Claude-style Interactive Artifact"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                    <span className="hidden sm:inline">Artifact</span>
                  </button>
                )}

                <button
                  onClick={handleDownloadTranscript}
                  type="button"
                  title="Download conversation markdown transcript"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleExportToCodex}
                  type="button"
                  title="Export to Codex Vault"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNewSession}
                  type="button"
                  title="New Dialogue"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                const isSpeaking = speakingId === msg.id;
                const isThinkingOpen = expandedThinking[msg.id];

                return (
                  <div key={msg.id} className="space-y-2">
                    {/* Deep Reasoning / Thought Process Accordion (Claude/o1 Style) */}
                    {!isUser && msg.thinking && (
                      <div className="pl-11 pr-2">
                        <button
                          onClick={() =>
                            setExpandedThinking((prev) => ({
                              ...prev,
                              [msg.id]: !prev[msg.id],
                            }))
                          }
                          type="button"
                          className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/80 hover:text-cyan-300 py-1 transition-colors cursor-pointer"
                        >
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Thought Process (Reasoning Steps)</span>
                          {isThinkingOpen ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>

                        {isThinkingOpen && (
                          <div className="mt-1.5 p-3 rounded-2xl bg-[#040816]/90 border border-cyan-500/20 text-[11px] font-mono text-slate-400 space-y-1 animate-in fade-in">
                            <p className="whitespace-pre-line leading-relaxed">{msg.thinking}</p>
                          </div>
                        )}
                      </div>
                    )}

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
                        className={`max-w-[90%] sm:max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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
                              <span className="text-cyan-400/80 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20 truncate max-w-[140px]">
                                {msg.source}
                              </span>
                            )}
                          </div>

                          {!isUser && (
                            <div className="flex items-center gap-1.5">
                              {/* Audio Equalizer animation when speaking */}
                              {isSpeaking && (
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 mr-1">
                                  <span className="w-1 h-2.5 bg-cyan-400 animate-pulse" />
                                  <span className="w-1 h-3.5 bg-cyan-400 animate-pulse [animation-delay:0.15s]" />
                                  <span className="w-1 h-2 bg-cyan-400 animate-pulse [animation-delay:0.3s]" />
                                </div>
                              )}

                              <button
                                onClick={() => speakText(msg.id, msg.text)}
                                type="button"
                                title={isSpeaking ? "Stop voice synthesis" : "Read aloud with neural voice"}
                                className={`p-1 rounded hover:bg-white/10 transition-colors ${
                                  isSpeaking ? "text-cyan-400 animate-pulse" : "text-slate-400 hover:text-white"
                                }`}
                              >
                                {isSpeaking ? (
                                  <VolumeX className="w-3.5 h-3.5" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
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
                      <div className="pl-11 flex flex-wrap gap-1.5 pt-1">
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
                    <span className="text-xs font-mono text-cyan-300">
                      Executing multi-step historical reasoning...
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Input Form with Speech-to-Text Microphone Dictation */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 sm:p-4 border-t border-white/5 bg-slate-950/80 flex items-center gap-2"
            >
              {/* Microphone Speech Recognition Button */}
              <button
                onClick={toggleSpeechRecognition}
                type="button"
                title={isListening ? "Stop listening" : "Dictate with your voice (Free Voice Mode)"}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isListening
                    ? "bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                    : "bg-[#060c20] border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400"
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder={
                  isListening
                    ? "Listening to your voice... Speak your question..."
                    : `Ask ${activePersona.name} any question about discoveries, equations, or history...`
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 bg-[#060c20] border rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  isListening ? "border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : "border-cyan-500/30 focus:border-cyan-400"
                }`}
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

          {/* Right Claude-Style Interactive Artifact Canvas */}
          {activeArtifact && showArtifactDrawer && (
            <div className="lg:col-span-5 rounded-3xl bg-[#070e24]/95 border-2 border-cyan-400/40 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-in slide-in-from-right-4">
              <div>
                {/* Artifact Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                        {activeArtifact.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
                        {activeArtifact.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowArtifactDrawer(false)}
                    type="button"
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Artifact Content Canvas */}
                <div className="bg-[#020510] border border-cyan-500/20 rounded-2xl p-4 font-mono text-xs text-cyan-200 overflow-x-auto max-h-[460px] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeArtifact.data}
                </div>

                <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                  {activeArtifact.summary}
                </p>
              </div>

              {/* Artifact Action Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => copyToClipboard("artifact", activeArtifact.data)}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Artifact</span>
                </button>

                <button
                  onClick={handleExportToCodex}
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-opacity hover:opacity-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Save to Codex Vault</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SpaceAmbientAudio />
    </main>
  );
}
