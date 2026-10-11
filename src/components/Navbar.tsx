"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Compass, BookOpen, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "[HOME]", href: "/", icon: Home },
    { name: "[LIVES]", href: "/biographies", icon: Compass },
    { name: "[LIBRARY]", href: "/biographies#library", icon: BookOpen },
    { name: "[ABOUT]", href: "/#about", icon: Sparkles },
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
        </div>
      )}
    </header>
  );
}
