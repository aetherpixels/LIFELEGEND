"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, Search } from "lucide-react";

interface BiographyItem {
  _id: string;
  name: string;
  slug?: { current?: string };
  era?: string;
  category?: string;
  shortDescription?: string;
  imageUrl?: string;
}

export default function BiographiesInteractive({
  initialBiographies,
}: {
  initialBiographies: BiographyItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialBiographies.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [initialBiographies]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredBiographies = useMemo(() => {
    return initialBiographies.filter((b) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        b.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.era?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [initialBiographies, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            placeholder="Search legends, eras, ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a1128]/80 border border-cyan-500/30 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(232,121,249,0.5)] border border-fuchsia-300"
                    : "bg-[#0b132b] text-cyan-400/80 hover:text-cyan-200 border border-cyan-500/20 hover:border-cyan-500/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid count summary */}
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-4 px-2">
        <span>SHOWING {filteredBiographies.length} LEGEND{filteredBiographies.length === 1 ? "" : "S"}</span>
        {Object.values(favorites).filter(Boolean).length > 0 && (
          <span className="text-fuchsia-400">
            ♥ {Object.values(favorites).filter(Boolean).length} FAVORITE{Object.values(favorites).filter(Boolean).length === 1 ? "" : "S"}
          </span>
        )}
      </div>

      {filteredBiographies.length === 0 ? (
        <div className="text-center py-20 bg-[#070e24]/60 border border-slate-800 rounded-3xl">
          <p className="text-cyan-400 text-base font-semibold mb-2">No matching legends found.</p>
          <p className="text-slate-400 text-xs">Try clearing your search query or picking "ALL" categories.</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {filteredBiographies.map((bio) => {
            const isFav = favorites[bio._id];
            return (
              <Link
                key={bio._id}
                href={`/biographies/${bio.slug?.current || '#'}`}
                className="block w-full sm:w-[240px] shrink-0 group"
              >
                <div className="relative w-full aspect-[3/4.2] rounded-3xl overflow-hidden bg-[#151E3D] border-2 border-slate-700/50 hover:border-fuchsia-500 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(232,121,249,0.3)] transform group-hover:-translate-y-2">
                  {/* Heart Icon Button */}
                  <button
                    onClick={(e) => toggleFavorite(bio._id, e)}
                    type="button"
                    aria-label="Favorite legend"
                    className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? "text-fuchsia-400 fill-fuchsia-400" : "text-slate-400 hover:text-fuchsia-400"
                      }`}
                    />
                  </button>

                  {/* Image (Top 65%) */}
                  <div className="absolute top-0 inset-x-0 h-[65%] bg-slate-900 border-b border-white/5">
                    {bio.imageUrl ? (
                      <img
                        src={bio.imageUrl}
                        alt={bio.name}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold tracking-[0.2em] text-xs uppercase bg-slate-900">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Seamless Gradient Blend */}
                  <div className="absolute top-[45%] inset-x-0 h-[25%] bg-gradient-to-b from-transparent to-[#151E3D] z-10" />

                  {/* Text Content */}
                  <div className="absolute bottom-0 inset-x-0 h-[45%] bg-[#151E3D] p-5 flex flex-col justify-end z-10 text-left">
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-1">
                      {bio.category || "Legend"}
                    </span>
                    <h2 className="text-xl font-bold text-white mb-1 tracking-wide drop-shadow-md truncate">
                      {bio.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 font-sans tracking-wide line-clamp-3 leading-relaxed">
                      {bio.shortDescription ||
                        "A legendary figure whose actions shaped the course of human history and left an enduring legacy."}
                    </p>
                  </div>

                  {/* Glow Line */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
