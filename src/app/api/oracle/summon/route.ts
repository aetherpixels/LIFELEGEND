import { NextResponse } from "next/server";

const GRADIENTS = [
  "from-cyan-400 to-blue-600",
  "from-fuchsia-400 to-purple-600",
  "from-amber-400 to-orange-600",
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-sky-600",
  "from-rose-400 to-pink-600",
  "from-violet-400 to-indigo-600",
];

function getGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[idx];
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "Search query required" }, { status: 400 });
    }

    const cleanQuery = query.trim().slice(0, 100);

    // 1. Search Wikipedia for best match
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      cleanQuery
    )}&format=json&origin=*`;
    
    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": "LifeLegends-Oracle/2.0 (Historical Research Project)" },
      next: { revalidate: 86400 },
    });
    const searchData = await searchRes.json();
    const topMatch = searchData.query?.search?.[0];

    if (!topMatch) {
      return NextResponse.json(
        { error: `No historical figure found for "${cleanQuery}". Try full name like "Robert Oppenheimer" or "Richard Feynman".` },
        { status: 404 }
      );
    }

    // 2. Fetch full Wikipedia summary
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      topMatch.title.replace(/ /g, "_")
    )}`;
    const summaryRes = await fetch(summaryUrl, {
      headers: { "User-Agent": "LifeLegends-Oracle/2.0 (Historical Research Project)" },
      next: { revalidate: 86400 },
    });
    const summary = await summaryRes.json();

    // 3. Extract Era and Dates
    const desc = summary.description || "";
    const dateMatch = desc.match(/\(([^)]*\d{3,4}[^)]*)\)/) || summary.extract?.match(/\(([^)]*\d{3,4}[^)]*)\)/);
    const era = dateMatch ? dateMatch[1] : "Historical Era";

    // 4. Generate in-character greeting
    const title = summary.title;
    const cleanTitle = desc ? `${desc}` : "Scientist & Historical Thinker";
    const greeting = `Greetings, curious mind. I am ${title}. You have summoned my spirit from the annals of history. ${
      summary.extract ? summary.extract.split(".")[0] + "." : ""
    } Ask me anything about my life, discoveries, challenges, or vision of the cosmos.`;

    // 5. Generate contextual starter questions
    const questions = [
      `What was your greatest scientific discovery?`,
      `What was the biggest obstacle or rivalry in your career?`,
      `How did you approach thinking and solving impossible problems?`,
      `What advice would you give to modern researchers and thinkers?`,
    ];

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return NextResponse.json({
      id: `summon-${slug}`,
      name: title,
      title: cleanTitle,
      era,
      summary: summary.extract || "",
      imageUrl: summary.thumbnail?.source || null,
      avatarColor: getGradient(title),
      greeting,
      suggestedQuestions: questions,
    });
  } catch (error: any) {
    console.error("Summon error:", error);
    return NextResponse.json(
      { error: "Failed to summon figure from historical archives. Please try again." },
      { status: 500 }
    );
  }
}
