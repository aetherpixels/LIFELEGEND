"use client";

import { useState } from "react";
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function HistoricalTriviaQuiz({
  biographyName,
  category,
}: {
  biographyName: string;
  category?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Dynamic contextual questions based on the legend
  const questions: Question[] = [
    {
      question: `Which principal field or discipline is ${biographyName} most celebrated for revolutionizing?`,
      options: [
        category || "Science & Innovation",
        "Deep-Sea Marine Exploration",
        "Medieval Heraldry",
        "Steam Locomotive Logistics",
      ],
      correctIndex: 0,
      explanation: `${biographyName} is universally commemorated for their breakthroughs in ${category || "their core discipline"}.`,
    },
    {
      question: `What primary mindset characterized the life philosophy of ${biographyName}?`,
      options: [
        "Unquestioning conformity with established traditions",
        "Relentless intellectual curiosity and testing bold hypotheses",
        "Avoidance of empirical observation and study",
        "Exclusive focus on political office",
      ],
      correctIndex: 1,
      explanation: `Historical archives emphasize that ${biographyName}'s life was driven by unwavering curiosity and original thought.`,
    },
    {
      question: `How does the legacy of ${biographyName} continue to impact modern society?`,
      options: [
        "It was entirely replaced and holds no modern relevance",
        "Their fundamental theories and works remain foundational pillars of modern knowledge",
        "Only localized folklore commemorates them today",
        "Their writings were completely lost to time",
      ],
      correctIndex: 1,
      explanation: `Today's technological, scientific, and artistic landscapes are direct beneficiaries of ${biographyName}'s contributions.`,
    },
  ];

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="w-full my-12 p-6 md:p-8 rounded-3xl bg-[#091026]/90 border border-fuchsia-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(232,121,249,0.15)] text-white">
      {/* Title */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.2)]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-fuchsia-400">
              Interactive Challenge
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              Test Your Knowledge: {biographyName}
            </h3>
          </div>
        </div>

        {!quizFinished && (
          <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Q {currentIdx + 1}/{questions.length}
          </span>
        )}
      </div>

      {quizFinished ? (
        /* Quiz Finished Scoreboard */
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            <Award className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-black uppercase text-white tracking-wide">
            Challenge Completed!
          </h4>
          <p className="text-sm text-slate-300">
            You scored <strong className="text-cyan-400 text-lg">{score}</strong> out of{" "}
            <strong>{questions.length}</strong> on the history of {biographyName}.
          </p>

          <div className="pt-4">
            <button
              onClick={handleRestart}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        </div>
      ) : (
        /* Question Form */
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-5 leading-relaxed">
            {currentQ.question}
          </h4>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = "bg-[#0d173b]/70 border-white/10 text-slate-200 hover:border-cyan-500/40 hover:bg-[#0f1b45]";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-950/50 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                } else {
                  btnStyle = "opacity-50 border-white/5 text-slate-400";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  type="button"
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next button */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
              <p className="text-xs text-cyan-200 leading-relaxed font-light">
                {currentQ.explanation}
              </p>
              <button
                onClick={handleNext}
                type="button"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer shrink-0 self-end sm:self-auto shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                {currentIdx + 1 === questions.length ? "View Score" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
