import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import Link from "next/link";
import { Suspense } from "react";
import { Heart } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function BiographiesList() {
  const biographies = await client.fetch(`*[_type == "biography"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    era,
    category,
    shortDescription,
    image
  }`);

  if (biographies.length === 0) {
    return <p className="text-cyan-400 text-lg text-center my-20">No biographies found in the database.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {biographies.map((bio: any) => (
        <Link key={bio._id} href={`/biographies/${bio.slug?.current || '#'}`} className="block w-full sm:w-[240px] shrink-0 group">
          <div className="relative w-full aspect-[3/4.2] rounded-3xl overflow-hidden bg-[#151E3D] border-2 border-slate-700/50 hover:border-fuchsia-500 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(232,121,249,0.3)] transform group-hover:-translate-y-2">
            
            {/* Heart Icon */}
            <div className="absolute top-4 right-4 z-20">
               <Heart className="w-5 h-5 text-fuchsia-500/50 group-hover:text-fuchsia-400 transition-colors" />
            </div>

            {/* Image (Top 65%) */}
            <div className="absolute top-0 inset-x-0 h-[65%] bg-slate-900 border-b border-white/5">
              {bio.image ? (
                <img 
                  src={urlFor(bio.image).width(400).height(500).url()} 
                  alt={bio.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold tracking-[0.2em] text-xs uppercase bg-slate-900">
                  No Image
                </div>
              )}
            </div>

            {/* Seamless Gradient Blend */}
            <div className="absolute top-[45%] inset-x-0 h-[25%] bg-gradient-to-b from-transparent to-[#151E3D] z-10" />

            {/* Text Content (Bottom Area) */}
            <div className="absolute bottom-0 inset-x-0 h-[45%] bg-[#151E3D] p-5 flex flex-col justify-end z-10 text-left">
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide drop-shadow-md truncate">
                {bio.name}
              </h2>
              <p className="text-[10px] text-slate-400 font-sans tracking-wide line-clamp-3 leading-relaxed">
                {bio.shortDescription || 'A legendary figure whose actions shaped the course of human history and left an enduring legacy.'}
              </p>
            </div>

            {/* Sci-Fi Glow Line at bottom of active cards */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function BiographiesPage() {
  return (
    <main className="min-h-screen bg-[#070A14] text-white p-4 md:p-8 lg:p-12 relative flex items-center justify-center overflow-x-hidden">
      
      {/* Background Planets / Glows mimicking the original AI mockup */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-fuchsia-600/10 blur-[150px] rounded-[100%] pointer-events-none" />

      {/* Main Glass Panel Container (The UI Tablet) */}
      <div className="relative z-10 w-full max-w-6xl bg-[#0D142A]/80 backdrop-blur-3xl border border-[#23325A] rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-8 md:p-16">
        
        {/* Mockup Top Navigation Menu */}
        <header className="flex justify-between items-center mb-10 px-4">
          <div className="text-lg md:text-xl font-bold tracking-widest text-white/90 leading-tight">
            LIFE<br />LEGENDS
          </div>
          <nav className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] text-cyan-500/70">
            <Link href="/" className="hover:text-cyan-400 transition-colors">[HOME]</Link>
            <Link href="/biographies" className="text-cyan-400 border-b border-cyan-400 pb-1">[LIVES]</Link>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">[LIBRARY]</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">[ABOUT]</span>
          </nav>
        </header>

        {/* The Massive Hero Inner Banner from Mockup */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden mb-12 border-2 border-slate-700/50 shadow-[0_0_50px_rgba(232,121,249,0.15)] flex items-center justify-center group">
          {/* Deep Space Background for Banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#0F172A] to-[#0A192F]" />
          
          {/* Animated Stars/Planets */}
          <div className="absolute top-10 left-[15%] w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.5)] transform -rotate-12 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute top-20 right-[20%] w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-[0_0_40px_rgba(34,211,238,0.5)] group-hover:translate-x-4 transition-transform duration-1000" />
          <div className="absolute bottom-10 right-10 w-10 h-10 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-full shadow-[0_0_20px_rgba(232,121,249,0.5)] group-hover:-translate-y-4 transition-transform duration-1000" />
          
          {/* Starry overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-30" />

          {/* Text inside banner */}
          <div className="relative z-10 text-center flex flex-col items-center">
             <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-xs mb-3">Journey Through Remarkable Lives</span>
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
               LIFELEGENDS
             </h2>
          </div>
        </div>

        <AdBanner />

        {/* Featured Biographies Title Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Explore Legends
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-fuchsia-400 tracking-wider uppercase drop-shadow-[0_0_25px_rgba(232,121,249,0.4)]">
            Featured Biographies
          </h1>
        </div>

        {/* Dynamic Biographies Grid */}
        <Suspense fallback={<div className="text-cyan-400 text-center animate-pulse tracking-[0.2em] uppercase font-bold text-sm my-20">Loading Database...</div>}>
          <BiographiesList />
        </Suspense>

        {/* Bottom CTA like in the mockup */}
        <div className="mt-16 flex justify-center">
          <button className="border border-cyan-500 text-cyan-400 font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Discover More
          </button>
        </div>

      </div>
    </main>
  );
}
