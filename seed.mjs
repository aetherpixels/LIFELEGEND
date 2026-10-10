import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dku4omlj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sklmqfPXAIRITxZynthxeFgMwp265txw1zSGflmmCN1bfRzuFDnxLRZQJhOPNdgaecS0FIjz1PP6SkMKOnfnR462WFqjGIJYZ15zteuin3dAtR8LhEE6Aj30vIgPVKXDukSEsaSPt7krywaKmOcIhYAS0oDQSezX4pCcodi4RSyDTzUp1UxO'
});

const biographies = [
  {
    name: "Nikola Tesla",
    slug: { _type: "slug", current: "nikola-tesla" },
    era: "1856 - 1943",
    category: "Innovators",
    shortDescription: "A visionary inventor and electrical engineer who revolutionized the modern world with alternating current.",
    quotes: ["The present is theirs; the future, for which I really worked, is mine."],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG",
    content: [{ _type: "block", children: [{ _type: "span", text: "Nikola Tesla was a Serbian-American inventor..." }] }]
  },
  {
    name: "Ada Lovelace",
    slug: { _type: "slug", current: "ada-lovelace" },
    era: "1815 - 1852",
    category: "Pioneers",
    shortDescription: "The world's first computer programmer, she envisioned the modern computer a century before it was built.",
    quotes: ["That brain of mine is something more than merely mortal, as time will show."],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg",
    content: [{ _type: "block", children: [{ _type: "span", text: "Augusta Ada King, Countess of Lovelace..." }] }]
  },
  {
    name: "Marie Curie",
    slug: { _type: "slug", current: "marie-curie" },
    era: "1867 - 1934",
    category: "Scientists",
    shortDescription: "A pioneering physicist and chemist who conducted breakthrough research on radioactivity.",
    quotes: ["Nothing in life is to be feared, it is only to be understood."],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
    content: [{ _type: "block", children: [{ _type: "span", text: "Marie Salomea Skłodowska–Curie was a Polish and naturalized-French physicist..." }] }]
  },
  {
    name: "Leonardo da Vinci",
    slug: { _type: "slug", current: "leonardo-da-vinci" },
    era: "1452 - 1519",
    category: "Artists",
    shortDescription: "The ultimate Renaissance man whose genius spanned art, engineering, and anatomy.",
    quotes: ["Learning never exhausts the mind."],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png",
    content: [{ _type: "block", children: [{ _type: "span", text: "Leonardo di ser Piero da Vinci was an Italian polymath..." }] }]
  },
  {
    name: "Albert Einstein",
    slug: { _type: "slug", current: "albert-einstein" },
    era: "1879 - 1955",
    category: "Scientists",
    shortDescription: "Theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.",
    quotes: ["Imagination is more important than knowledge."],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
    content: [{ _type: "block", children: [{ _type: "span", text: "Albert Einstein was a German-born theoretical physicist..." }] }]
  }
];

async function seed() {
  for (const bio of biographies) {
    console.log(`Fetching image for ${bio.name}...`);
    const imgResponse = await fetch(bio.imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const arrayBuffer = await imgResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`Uploading asset to Sanity...`);
    const asset = await client.assets.upload('image', buffer, { filename: `${bio.slug.current}.jpg` });

    console.log(`Creating document for ${bio.name}...`);
    const existing = await client.fetch(`*[_type == "biography" && name == $name][0]`, { name: bio.name });
    
    if (existing) {
       await client.patch(existing._id).set({
         image: { _type: 'image', asset: { _type: "reference", _ref: asset._id } }
       }).commit();
    } else {
       await client.create({
         _type: 'biography', name: bio.name, slug: bio.slug, era: bio.era, category: bio.category,
         shortDescription: bio.shortDescription, quotes: bio.quotes,
         image: { _type: 'image', asset: { _type: "reference", _ref: asset._id } },
         content: bio.content
       });
    }
  }
  console.log("Seeding completely successfully!");
}

seed().catch(console.error);
