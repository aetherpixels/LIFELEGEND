"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Share2, Check } from "lucide-react";

export default function BiographyReadingEnhancements({
  biographyName,
  contentWordCount = 500,
}: {
  biographyName: string;
  contentWordCount?: number;
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Approximate reading time (200 words per minute)
  const readingTime = Math.max(1, Math.ceil(contentWordCount / 200));

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (window.scrollY / totalHeight) * 100)
        );
        setReadingProgress(Math.round(progress));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${biographyName} - LifeLegends`,
          text: `Read the story of ${biographyName} on LifeLegends.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Top sticky reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Top utility bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5 text-xs text-slate-400">
        <Link
          href="/biographies"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{readingTime} MIN READ</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{readingProgress}% READ</span>
          </div>

          <button
            onClick={handleShare}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer font-bold tracking-wider"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span>SHARE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
