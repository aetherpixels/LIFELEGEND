const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

function generateFeaturePdf() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  function checkPageBreak(neededHeight) {
    if (yPos + neededHeight > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      addPageHeaderFooter();
    }
  }

  function addPageHeaderFooter() {
    const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
    
    // Top subtle rule
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("LIFE LEGENDS • Master Platform Feature Specification", margin, 10);
    doc.text("Version 2.4 Enterprise", pageWidth - margin - 35, 10);

    // Bottom subtle rule
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.text("100% Free Forever Architecture • Zero Paid APIs • Zero Hosting Fees", margin, pageHeight - 8);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 15, pageHeight - 8);
  }

  // --- COVER / HEADER ---
  addPageHeaderFooter();

  // Decorative Header Badge
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, yPos, contentWidth, 38, 3, 3, "F");
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, yPos, contentWidth, 38, 3, 3, "D");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(34, 211, 238); // Cyan
  doc.text("LIFE LEGENDS", margin + 8, yPos + 12);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(248, 250, 252);
  doc.text("Master Platform Feature Specification (Feature 0 to Complete)", margin + 8, yPos + 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Digital Museum of Human Genius • 3D Constellation Cosmos • AI Oracle • Historical Codex", margin + 8, yPos + 27);
  doc.text("Valuation Benchmark: Enterprise Grade (₹50,00,000 Architecture) • 100% Free Forever Guarantee", margin + 8, yPos + 33);

  yPos += 46;

  // --- EXECUTIVE SUMMARY SECTION ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(129, 140, 248); // Indigo
  doc.text("Executive Architecture & Zero-Cost Mandate", margin, yPos);
  yPos += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const execSummary = 
    "Life Legends is engineered as a world-class historical archive and conversational AI sanctum commemorating 15 of humanity's greatest scientific and philosophical minds. Built on Next.js 16 (Turbopack), React 19, Three.js WebGL, and custom multi-tiered neural LLM routing, the platform is strictly designed to operate at zero continuous running costs ($0/mo hosting, $0/mo database, $0/mo AI billing) while offering enterprise-grade speed, visual immersion, and pedagogical rigor.";
  
  const execLines = doc.splitTextToSize(execSummary, contentWidth);
  doc.text(execLines, margin, yPos);
  yPos += execLines.length * 4.5 + 6;

  // --- FEATURE DIRECTORY ---
  const features = [
    {
      num: "Feature 0",
      title: "Core Platform Architecture & Edge Infrastructure",
      details: [
        "Framework: Next.js 16 with Partial Prerendering (PPR) and Turbopack bundler for instant edge compilation.",
        "Runtime: React 19 and TypeScript 5 ensuring strict end-to-end data safety and WebGL lifecycle control.",
        "Styling & Design System: Tailwind CSS v4 space-dark palette (#030712) with neon cyan, indigo, and amber glassmorphism.",
        "Motion Physics: Framer Motion spring physics powering page transitions, hover glow, and modal expansions.",
        "Zero-Cost Architecture: 100% Free Forever with zero mandatory cloud billing, zero paid subscriptions, and edge serverless deployment on Vercel."
      ]
    },
    {
      num: "Feature 1",
      title: "Interactive 3D Constellation Cosmos (/constellation)",
      details: [
        "Astronomical WebGL Canvas: Procedural 3D cosmos built with Three.js and React Three Fiber.",
        "15 Celestial Star Nodes: Each thinker occupies a 3D coordinate space glowing with their disciplinary hue.",
        "Intellectual Lineage Arcs: 3D connecting spline arcs representing ideological mentorships and scientific rivalries.",
        "Orbital Navigational Camera: Full 360-degree orbit, zoom, and panning with inertial damping.",
        "HUD Inspection & Deep Warp: Hovering over nodes exposes key discoveries and quotes; clicking initiates a camera warp directly to the biography."
      ]
    },
    {
      num: "Feature 2",
      title: "Enterprise AI Oracle Sanctum (/oracle)",
      details: [
        "4-Tier Zero-Hallucination Architecture: Eliminates modern corporate blunders (e.g. Tesla Inc) via 4 resilient layers.",
        "Tier 0 Instant Intent Engine (0ms): Directly answers identity, greetings, status, rivalries (Edison, Leibniz, Bohr), and philosophy with authentic first-person museum-grade scholarship.",
        "Tier 1 Universal Free Cloud AI Connector: Auto-routes to Groq Cloud (500 tokens/sec Llama-3.3 70B via gsk_ keys), Google Gemini 2.0 Flash (AIza keys), or OpenRouter free tier.",
        "Tier 2 Global Distributed Neural LLM: Pollinations AI serverless inference with 25-second timeout and 60-second Vercel maxDuration.",
        "Tier 3 Scholarly Historical Synthesis: Offline-resilient first-person knowledge reasoner filtering Wikipedia corporate noise.",
        "Claude-Style Interactive Artifact Drawer: Generates live LaTeX formulas, ASCII patent blueprints (Tesla AC motor, Da Vinci aerial screw), and code algorithms (Ada Lovelace Note G).",
        "Speech-to-Text Voice Dictation: In-browser Web Speech Recognition API allowing hands-free ChatGPT-style voice conversations.",
        "Neural Text-to-Speech: Multi-voice synthesizer with persona-calibrated pitch and cadence.",
        "Multi-Session Persistence: ChatGPT-style session sidebar stored locally in browser localStorage.",
        "Summon Any Thinker Engine: Dynamically summons historical figures beyond the core 15 catalog (/api/oracle/summon)."
      ]
    },
    {
      num: "Feature 3",
      title: "Historical Codex & Searchable Digital Archive (/codex)",
      details: [
        "Search-As-You-Type Directory: Real-time query matching across names, discovery tags, categories, and eras.",
        "Chronological Era Filtering: Tabbed organization across Ancient Antiquity, Renaissance, Enlightenment, and Modernity.",
        "Instant Copyright-Sealed PDF Download: Client-side PDF generation incorporating the official gold Life Legends seal.",
        "Cross-Navigation Portals: One-click actions to consult any figure in the AI Oracle or launch a dual-figure comparison."
      ]
    },
    {
      num: "Feature 4",
      title: "Dual-Legend Comparative Crucible (/compare)",
      details: [
        "Side-by-Side Analytical Matrix: Compare any two historical figures simultaneously (e.g. Tesla vs. Edison, Newton vs. Einstein).",
        "Chronological Delta: Calculates era overlap, scientific paradigm differences, and ideological conflicts.",
        "Discovery & Invention Breakdown: Direct comparison of patents, foundational papers, and world impact.",
        "Oracle Staged Debate: One-click jump to stage a live philosophical dialogue between both thinkers in the Oracle."
      ]
    },
    {
      num: "Feature 5",
      title: "Immersive Long-Form Biographies (/biographies/[slug])",
      details: [
        "15 In-Depth Monographs: Verified historical narratives covering upbringing, breakthroughs, controversies, and legacy.",
        "High-Definition Visual Gallery: Locally hosted portrait imagery with dynamic radial backlight gradients.",
        "Legend Metrics HUD: Disciplinary category, chronological era, and historical lifespan statistics.",
        "Curated Blockquotes: Famous philosophical quotes displayed with gold-accented typography.",
        "Direct AI Oracle Entryway: Interactive glowing portal connecting readers straight to the persona."
      ]
    },
    {
      num: "Feature 6",
      title: "AI Audio Narrator (AudioNarrator.tsx)",
      details: [
        "In-Browser Speech Synthesis: Reads the full biography out loud with play, pause, and seek controls.",
        "Playback Speed Selector: User-adjustable rates (0.75x, 1.0x, 1.25x, 1.5x) for comfortable listening."
      ]
    },
    {
      num: "Feature 7",
      title: "Interactive 3D WebGL Artifact Viewer (Artifact3DViewer.tsx)",
      details: [
        "Interactive Historical Inventions: Real-time 3D rendered WebGL models (armillary spheres, prisms, gyroscopes).",
        "Full 360-Degree Inspection: Intuitive drag-to-rotate orbital controls with studio lighting shaders."
      ]
    },
    {
      num: "Feature 8",
      title: "Interactive Historical Timeline (HistoricalTimeline.tsx)",
      details: [
        "Chronological Breakthrough Map: Vertical interactive milestone tracker detailing career highlights.",
        "Date Tagging & Context: Exact years paired with empirical significance and publication notes."
      ]
    },
    {
      num: "Feature 9",
      title: "Gamified Historical Trivia Quiz Challenge (HistoricalTriviaQuiz.tsx)",
      details: [
        "Adaptive Quiz Engine: Dynamic multiple-choice questions challenging readers on biography facts.",
        "Instant Evaluation & Explanations: Explains the scientific history behind every answer choice with score tracking."
      ]
    },
    {
      num: "Feature 10",
      title: "Daily Quote Card Generator (DailyQuoteGenerator.tsx)",
      details: [
        "Aesthetic Shareable Visual Cards: Formats historical quotes into clean typographic cards.",
        "One-Click Copy & Shuffle: Instantly copies verified quotes to clipboard or shuffles for new inspiration."
      ]
    },
    {
      num: "Feature 11",
      title: "Distraction-Free Focus Mode & Reader Enhancements",
      details: [
        "Distraction-Free Reading Mode: Dims background halos, navigation, and sidebars to spotlight pure text.",
        "Dynamic Font Sizing: User-selectable Small, Medium, and Large typography with optimized reading ergonomics.",
        "Real-Time Read Clock: Dynamic word-count analysis calculating accurate reading time in minutes."
      ]
    },
    {
      num: "Feature 12",
      title: "Space Ambient Audio & Sound Effects (SpaceAmbientAudio.tsx, soundfx.ts)",
      details: [
        "Atmospheric Soundscape: Procedural deep-space audio drone with volume slider and persistent mute state.",
        "Web Audio API Sound Effects: Ultra-light procedural audio chimes for clicks, warp transitions, and actions."
      ]
    },
    {
      num: "Feature 13",
      title: "Global Authentication & Sign In Modal (AuthModal.tsx)",
      details: [
        "Universal HUD Modal: Accessible globally from the main Navbar.",
        "Official Copyright Seal Display: Features the gold and silver relief insignia.",
        "Mock Social Sign-In: Google, GitHub, and Guest Scholar mode with zero backend auth hosting bills."
      ]
    },
    {
      num: "Feature 14",
      title: "Official Gold & Silver Copyright Seal Integration",
      details: [
        "Authentic Visual Watermark: Uploaded circular seal featuring double laurel wreaths and 'Life Legends' relief.",
        "Document Embeddings: Permanently stamped onto all exported PDF documents and modal headers."
      ]
    },
    {
      num: "Feature 15",
      title: "Sanity CMS Studio v3 Integration (/studio)",
      details: [
        "Embedded Headless Studio: Content management interface accessible directly at /studio.",
        "Resilient Local Fallback: Automatically falls back to curated local dataset (src/data/biographies.ts) during network interruptions."
      ]
    },
    {
      num: "Feature 16",
      title: "Complete Roster of 15 Historical Legends + Grand Oracle",
      details: [
        "1. Nikola Tesla (1856–1943): Alternating Current, AC Induction Motor, Wardenclyffe World Wireless System.",
        "2. Albert Einstein (1879–1955): Special & General Relativity, E = mc², Photoelectric Effect (Nobel 1921).",
        "3. Ada Lovelace (1815–1852): Note G, World's First Computer Algorithm, Concept of Poetical Science.",
        "4. Leonardo da Vinci (1452–1519): Aerial Screw Helicopter, Vitruvian Geometry, Sfumato Painting, Coronary Anatomy.",
        "5. Marie Curie (1867–1934): Radioactivity, Discovery of Radium & Polonium, First Double Nobel Laureate.",
        "6. Sir Isaac Newton (1642–1727): Principia Mathematica, Three Laws of Motion, Universal Gravitation, Calculus.",
        "7. Alan Turing (1912–1954): Universal Turing Machine, Bletchley Park Enigma Bombe, Turing Test for AI.",
        "8. Richard Feynman (1918–1988): Quantum Electrodynamics, Feynman Diagrams, Nanotechnology, Path Integrals.",
        "9. Galileo Galilei (1564–1642): Telescopic Astronomy, Jovian Moons, Law of Falling Bodies, Heliocentrism.",
        "10. Stephen Hawking (1942–2018): Hawking Radiation, Bekenstein-Hawking Entropy, Singularity Theorems.",
        "11. Rosalind Franklin (1920–1958): Photo 51 X-ray Crystallography, B-DNA Helical Structure, TMV Virus Architecture.",
        "12. Charles Darwin (1809–1882): Theory of Evolution by Natural Selection, HMS Beagle Voyage, Origin of Species.",
        "13. Srinivasa Ramanujan (1887–1920): Infinite Series for 1/pi, Hardy-Ramanujan Partition Formula, Mock Theta Functions.",
        "14. Dr. A. P. J. Abdul Kalam (1931–2015): SLV-3 Rocket, Agni & Prithvi Missiles, Kalam-Raju Stent, 11th President of India.",
        "15. Aryabhata (476–550 CE): Aryabhatiya, Earth's Diurnal Axial Rotation, pi approximation (3.1416), Jya Sine Table.",
        "16. Grand Oracle of History: Omniscient intelligence synthesizing all discoveries, eras, and rivalries."
      ]
    },
    {
      num: "Feature 17",
      title: "Search Engine Optimization, OpenGraph & Image Cache",
      details: [
        "Dynamic Metatags: Custom page titles, descriptions, and OpenGraph social preview tags across all routes.",
        "Self-Hosted High-Resolution Portraits: 15 curated images stored in public/portraits/ ensuring zero CDN failures."
      ]
    },
    {
      num: "Feature 18",
      title: "100% Free Forever Operational Guarantee",
      details: [
        "Zero API Invoices: Operates permanently on free serverless endpoints and client-side keys.",
        "Zero Database Costs: Content powered by static pre-rendering with optional free Sanity CMS integration.",
        "Zero Hosting Bills: Runs indefinitely on Vercel's global edge infrastructure."
      ]
    }
  ];

  features.forEach((feat) => {
    checkPageBreak(30);

    // Feature Header Box
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, yPos, contentWidth, 7, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${feat.num}: ${feat.title}`, margin + 3, yPos + 5);
    yPos += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    feat.details.forEach((det) => {
      checkPageBreak(10);
      const splitDet = doc.splitTextToSize(`• ${det}`, contentWidth - 4);
      doc.text(splitDet, margin + 4, yPos);
      yPos += splitDet.length * 4.2;
    });

    yPos += 3;
  });

  // Ensure output directories exist
  const brainDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\1df5869f-6110-47c1-a9c6-0adf75bd1b79";
  const publicDocsDir = path.join(__dirname, "..", "public", "docs");

  if (!fs.existsSync(publicDocsDir)) {
    fs.mkdirSync(publicDocsDir, { recursive: true });
  }

  const brainPdfPath = path.join(brainDir, "Life_Legends_Master_Feature_Document.pdf");
  const publicPdfPath = path.join(publicDocsDir, "Life_Legends_Master_Feature_Document.pdf");

  const pdfOutput = doc.output("arraybuffer");
  fs.writeFileSync(brainPdfPath, Buffer.from(pdfOutput));
  fs.writeFileSync(publicPdfPath, Buffer.from(pdfOutput));

  console.log("PDF generated successfully at:");
  console.log("1. " + brainPdfPath);
  console.log("2. " + publicPdfPath);
}

generateFeaturePdf();
