import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import Link from "next/link";
import { Suspense } from "react";
import AdBanner from "@/components/AdBanner";
import Navbar from "@/components/Navbar";
import BiographiesInteractive from "@/components/BiographiesInteractive";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function BiographiesData() {
  const biographies = await client.fetch(`*[_type == "biography"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    era,
    category,
    shortDescription,
    image
  }`);

  const processed = (biographies || []).map((bio: any) => ({
    _id: bio._id,
    name: bio.name,
    slug: bio.slug,
    era: bio.era,
    category: bio.category,
    shortDescription: bio.shortDescription,
    imageUrl: bio.image ? urlFor(bio.image).width(400).height(500).url() : undefined,
  }));

  return <BiographiesInteractive initialBiographies={processed} />;
}

export default function BiographiesPage() {
  return (
    <main className="min-h-screen bg-[#070A14] text-white p-4 md:p-8 lg:p-12 relative flex items-center justify-center overflow-x-hidden">
      
      {/* Background Planets / Glows mimicking the original AI mockup */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-fuchsia-600/10 blur-[150px] rounded-[100%] pointer-events-none" />

      {/* Main Glass Panel Container (The UI Tablet) */}
      <div className="relative z-10 w-full max-w-6xl bg-[#0D142A]/80 backdrop-blur-3xl border border-[#23325A] rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-6 sm:p-8 md:p-16">
        
        {/* Responsive Interactive Navbar with Mobile Menu */}
        <Navbar />

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
          <div className="relative z-10 text-center flex flex-col items-center px-4">
             <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-xs mb-3">Journey Through Remarkable Lives</span>
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
               LIFELEGENDS
             </h2>
             <div className="mt-4 flex gap-3">
               <a href="#legends-gallery" className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                 Explore Now
               </a>
             </div>
          </div>
        </div>

        <AdBanner />

        {/* Featured Biographies Title Section */}
        <div id="legends-gallery" className="flex flex-col items-center mb-10 text-center scroll-mt-6">
          <span className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Explore Legends
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-fuchsia-400 tracking-wider uppercase drop-shadow-[0_0_25px_rgba(232,121,249,0.4)]">
            Featured Biographies
          </h1>
        </div>

        {/* Dynamic Biographies Grid with Search, Categories, and Favorites */}
        <div id="library">
          <Suspense fallback={<div className="text-cyan-400 text-center animate-pulse tracking-[0.2em] uppercase font-bold text-sm my-20">Loading Database...</div>}>
            <BiographiesData />
          </Suspense>
        </div>

        {/* Bottom CTA like in the mockup */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#legends-gallery"
            className="w-full sm:w-auto text-center border border-cyan-500 text-cyan-400 font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
          >
            Discover More
          </a>
          <Link
            href="/"
            className="w-full sm:w-auto text-center border border-fuchsia-500/40 text-fuchsia-300 font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-full hover:bg-fuchsia-500/20 transition-all duration-300 active:scale-95"
          >
            Return to 3D Space
          </Link>
        </div>

      </div>
    </main>
  );
}
