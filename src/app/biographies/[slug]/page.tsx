import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default async function BiographyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const biography = await client.fetch(`*[_type == "biography" && slug.current == $slug][0]`, {
    slug
  });

  if (!biography) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <Link href="/biographies" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-12 uppercase tracking-widest text-sm font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image & Quick Stats */}
          <div className="lg:col-span-5 space-y-8 sticky top-8">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] bg-slate-900">
              {biography.image ? (
                <img 
                  src={urlFor(biography.image).width(800).url()} 
                  alt={biography.name}
                  className="object-cover w-full h-full opacity-90"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono uppercase tracking-widest">
                  <p>No Portrait</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-4">Legend Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-sm uppercase tracking-wide">Category</p>
                  <p className="font-medium text-lg">{biography.category || 'Uncategorized'}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm uppercase tracking-wide">Era</p>
                  <p className="font-medium text-lg font-mono text-indigo-200">{biography.era || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {biography.name}
            </h1>
            
            <p className="text-2xl text-indigo-200/80 font-light leading-relaxed mb-12">
              {biography.shortDescription}
            </p>

            {biography.quotes && biography.quotes.length > 0 && (
              <blockquote className="my-12 pl-6 border-l-4 border-amber-500 bg-amber-500/5 p-6 rounded-r-2xl italic text-xl text-slate-300">
                <Quote className="w-8 h-8 text-amber-500/50 mb-4" />
                "{biography.quotes[0]}"
              </blockquote>
            )}

            <div className="prose prose-invert prose-lg prose-indigo max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed text-slate-300">
              {biography.content ? (
                <PortableText value={biography.content} />
              ) : (
                <p className="text-slate-500 italic">The full biography has not been written yet.</p>
              )}
            </div>

            <div className="mt-16">
              <AdBanner />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
