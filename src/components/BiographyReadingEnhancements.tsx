"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Share2, Check, Download, Lock } from "lucide-react";
import jsPDF from "jspdf";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function BiographyReadingEnhancements({
  biographyName,
  category,
  era,
  shortDescription,
  rawContentText,
  quotes = [],
  contentWordCount = 500,
}: {
  biographyName: string;
  category?: string;
  era?: string;
  shortDescription?: string;
  rawContentText?: string;
  quotes?: string[];
  contentWordCount?: number;
}) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const pendingDownloadRef = useRef(false);

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

  const executePDFGeneration = () => {
    setDownloading(true);
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
      doc.setFillColor(11, 19, 43); // Dark navy
      doc.rect(0, 0, pageWidth, 90, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(34, 211, 238); // Cyan
      doc.text("LIFELEGENDS", margin, 42);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 220);
      doc.text("LEGENDS NEVER DIE - HISTORICAL ARCHIVE", margin, 62);

      // Biography Title
      let y = 130;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(20, 20, 30);
      doc.text(biographyName, margin, y);

      // Meta info (Era / Category)
      y += 24;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(168, 85, 247); // Purple
      const metaLine = `${(category || "HISTORICAL FIGURE").toUpperCase()} | ${era || "HISTORICAL ERA"}`;
      doc.text(metaLine, margin, y);

      // Summary
      if (shortDescription) {
        y += 25;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 80);
        const splitSummary = doc.splitTextToSize(shortDescription, contentWidth);
        doc.text(splitSummary, margin, y);
        y += splitSummary.length * 16;
      }

      // Quote block if available
      if (quotes && quotes.length > 0) {
        y += 20;
        doc.setFillColor(243, 244, 246);
        doc.rect(margin, y - 10, contentWidth, 40, "F");
        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.setTextColor(180, 83, 9);
        const quoteText = `"${quotes[0]}"`;
        const splitQuote = doc.splitTextToSize(quoteText, contentWidth - 20);
        doc.text(splitQuote, margin + 10, y + 8);
        y += 45;
      }

      // Story Body
      y += 20;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 50);

      const bodyText =
        rawContentText && rawContentText.trim().length > 0
          ? rawContentText
          : shortDescription || "Full biography available on LifeLegends.";

      const splitBody = doc.splitTextToSize(bodyText, contentWidth);

      // Handle multi-page overflow
      splitBody.forEach((line: string) => {
        if (y > 780) {
          doc.addPage();
          y = 50;
        }
        doc.text(line, margin, y);
        y += 16;
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 160);
        doc.text(
          `Page ${i} of ${totalPages} - Exported from LifeLegends Universe`,
          pageWidth / 2,
          820,
          { align: "center" }
        );
      }

      const fileName = `${biographyName.toLowerCase().replace(/\s+/g, "-")}-biography.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setDownloading(false);
      pendingDownloadRef.current = false;
    }
  };

  const handleDownloadClick = () => {
    if (!isLoggedIn) {
      pendingDownloadRef.current = true;
      openAuthModal();
      return;
    }
    executePDFGeneration();
  };

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
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Auth Modal Triggered if user clicks download while logged out */}
      <AuthModal
        onSuccess={() => {
          if (pendingDownloadRef.current) {
            executePDFGeneration();
          }
        }}
      />

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

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{readingTime} MIN READ</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{readingProgress}% READ</span>
          </div>

          {/* Download PDF Button with Login Protection */}
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-500/10 active:scale-95 transition-all cursor-pointer font-bold tracking-wider shadow-[0_0_10px_rgba(232,121,249,0.15)]"
          >
            {isLoggedIn ? (
              <Download className="w-3.5 h-3.5 text-fuchsia-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {downloading
                ? "GENERATING..."
                : isLoggedIn
                ? "DOWNLOAD PDF"
                : "LOGIN TO DOWNLOAD"}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer font-bold tracking-wider"
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
