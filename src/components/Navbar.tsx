"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Compass, BookOpen, Sparkles, User, LogOut, Swords, Bot } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sfx } from "@/lib/soundfx";
import CommandPalette from "@/components/CommandPalette";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();

  const navLinks = [
    { name: "[HOME]", href: "/", icon: Home },
    { name: "[LIVES]", href: "/biographies", icon: Compass },
    { name: "[CONSTELLATION]", href: "/constellation", icon: Sparkles },
    { name: "[ORACLE]", href: "/oracle", icon: Bot },
    { name: "[COMPARE]", href: "/compare", icon: Swords },
    { name: "[CODEX]", href: "/codex", icon: BookOpen },
  ];

  return (
    <header className="relative z-30 mb-8 w-full border border-cyan-500/20 bg-slate-950/70 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 cursor-pointer">
          <div className="text-left font-black tracking-widest text-white leading-tight">
            <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">LIFE</span>
            <br />
            <span className="text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">LEGENDS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-1 text-cyan-400/80 hover:text-cyan-200 hover:border-b-2 hover:border-cyan-400 transition-all cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop User Status Badge */}
        <div className="hidden md:flex items-center gap-3">
          <CommandPalette />
          {isLoggedIn && user ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-200 max-w-[100px] truncate">{user.name}</span>
              <button
                onClick={logout}
                title="Log out"
                type="button"
                className="text-slate-400 hover:text-red-400 transition-colors ml-1 p-0.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sfx.playClick();
                openAuthModal();
              }}
              type="button"
              className="px-4 py-1.5 rounded-full border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-500/10 active:scale-95 transition-all text-xs font-bold tracking-widest uppercase cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label="Toggle navigation menu"
          className="md:hidden flex items-center justify-center p-2 rounded-xl border border-cyan-500/40 text-cyan-300 bg-slate-900/80 hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/20 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-[0.2em] text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-white/5">
            {isLoggedIn && user ? (
              <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-300">
                <span className="truncate">Signed in as <strong>{user.name}</strong></span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  type="button"
                  className="text-red-400 font-bold ml-2 underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  sfx.playClick();
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                type="button"
                className="w-full text-center py-2.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 text-xs font-bold tracking-widest uppercase cursor-pointer active:scale-95 transition-all"
              >
                Sign In / Free Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
