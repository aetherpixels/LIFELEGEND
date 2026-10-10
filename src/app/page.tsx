import ThreeDBackground from "@/components/ThreeDBackground";
import HeroContent from "@/components/HeroContent";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Canvas Background */}
      <ThreeDBackground />
      
      {/* Foreground Animated Content */}
      <HeroContent />
    </main>
  );
}
