"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles, ShieldCheck, ArrowRight, User, Mail } from "lucide-react";
import { sfx } from "@/lib/soundfx";

export default function AuthModal({ onSuccess }: { onSuccess?: () => void }) {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const sanitizeInput = (str: string) => {
    return str.replace(/[<>'"&]/g, "").trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      setError("Please enter a valid name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    sfx.playSuccess();
    login(cleanName, cleanEmail);
    setError("");
    if (onSuccess) onSuccess();
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#0B132B] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(34,211,238,0.3)] text-white"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playClick();
            closeAuthModal();
          }}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Life Legends Copyright Seal */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative mb-3">
            <img
              src="/images/lifelegends-seal.jpg"
              alt="Life Legends Official Copyright & Authenticity Seal"
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_25px_rgba(234,179,8,0.5)] animate-pulse"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-500 text-black shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-300 uppercase">
            Sign In to Life Legends
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-light max-w-xs">
            Unlock offline biography PDF downloads with official copyright verification seal, save research notes, and track favorite legends.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Leonardo Tesla"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#070e24] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#070e24] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 text-black font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-[0_0_25px_rgba(34,211,238,0.4)]"
          >
            <span>Sign In / Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-white/5 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>100% Free Forever • Instant Access • Verified Archival Copy</span>
        </div>
      </div>
    </div>
  );
}
