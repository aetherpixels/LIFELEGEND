"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles, Lock, ArrowRight } from "lucide-react";

export default function AuthModal({ onSuccess }: { onSuccess?: () => void }) {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    login(name, email);
    setError("");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0B132B] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.25)] text-white">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 mb-3 shadow-[0_0_20px_rgba(232,121,249,0.3)]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white uppercase">
            Unlock Offline PDF
          </h3>
          <p className="text-xs text-slate-300 mt-2 font-light">
            Create a free Reader Account in 5 seconds to download and keep full historical biographies offline.
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
            <label className="block text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Leonardo Tesla"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#070e24] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#070e24] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <span>Unlock Instant Download</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>100% Free Forever • No Password Required</span>
        </div>
      </div>
    </div>
  );
}
