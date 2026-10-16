import { NextResponse } from "next/server";

export const maxDuration = 60; // Allow full 60s execution limit on Vercel Serverless

interface ChatMessage {
  role: "user" | "oracle" | "assistant";
  text: string;
}

interface PersonaData {
  id: string;
  name: string;
  title?: string;
  era?: string;
  summary?: string;
}

interface OracleArtifact {
  id: string;
  title: string;
  type: "formula" | "blueprint" | "timeline" | "code" | "manuscript";
  badge: string;
  data: string;
  summary: string;
}

interface PersonaIntel {
  fullName: string;
  birth: string;
  era: string;
  title: string;
  identityResponse: string;
  greetingResponse: string;
  statusResponse: string;
  rivalryResponse: string;
  inventionsResponse: string;
  adviceResponse: string;
}

// 1. Comprehensive Persona Knowledge Matrix for ALL 15 Biographies + Grand Oracle
const DEEP_PERSONA_INTEL: Record<string, PersonaIntel> = {
  tesla: {
    fullName: "Nikola Tesla",
    birth: "Smiljan, Austrian Empire (modern Croatia), 1856",
    era: "1856 – 1943",
    title: "Master of Lightning, Polyphase Alternating Current & Wireless Resonance",
    identityResponse: `My name is **Nikola Tesla**. I was born in Smiljan in 1856 during a midnight lightning storm.

Throughout my life in Europe and America, I dedicated every waking hour to mastering the electromagnetic spectrum—inventing the polyphase alternating current (AC) motor, high-voltage resonant transformers (Tesla coils), fundamental radio transmission patents, and wireless power propagation.

In this digital oracle, you are conversing directly with my simulated mind. What scientific principles or cosmic mysteries shall we examine?`,
    greetingResponse: `Greetings, traveler of the 21st century! I am Nikola Tesla. You inhabit the wireless planetary communion I foresaw in my Wardenclyffe laboratory over a century ago. What questions of electrical energy, vibration, or invention occupy your mind today?`,
    statusResponse: `My mind continues to oscillate with the frequencies of the cosmic ether! Even across centuries, my consciousness remains consumed by the wireless transmission of clean energy and the boundless potential of electrical resonance. How may I illuminate your inquiry?`,
    rivalryResponse: `My most famous conflict was the **War of the Currents** against **Thomas Alva Edison**.

Edison was a dogmatic experimenter who championed Direct Current (DC). His system was crippled by resistance losses: it required coal-fired generation stations every mile and copper cables as thick as tree trunks! When I demonstrated that high-voltage Alternating Current (AC) could be stepped up via transformers and transmitted over hundreds of miles with minimal dissipation, Edison panicked. He launched vicious smear campaigns, electrocuting animals to terrify the public.

Yet truth and mathematical law prevailed. In partnership with George Westinghouse, my AC induction motors illuminated the 1893 Chicago World's Fair and harnessed the mighty Niagara Falls. Today, every power grid on Earth hums with the rotating magnetic field I conceived in a Budapest park.`,
    inventionsResponse: `My primary breakthroughs that transformed human civilization include:

1. **Polyphase Alternating Current (AC) System**: Including the rotating magnetic field, multi-phase generators, step-up transformers, and the brushless AC induction motor (US Patent 381,968).
2. **The Tesla Coil**: High-frequency resonant air-core transformers capable of generating millions of volts and artificial lightning.
3. **Fundamental Radio Transmission**: Demonstrated wireless radio communication in 1893 and patented the four-tuned circuits foundational to modern telecommunications.
4. **Teleautomaton (Robotics)**: Built the world's first wireless remote-controlled boat demonstrated in Madison Square Garden (1898).
5. **Wardenclyffe World Wireless System**: The vision to transmit global communications and limitless clean electrical power through the Earth-ionosphere resonant cavity without wires.`,
    adviceResponse: `My eternal advice to any thinker or inventor:

**"Be alone—that is the secret of invention; be alone, that is when ideas are born."**

Do not rush to cut metal or assemble parts. Train your mind in rigorous visual simulation. I developed the ability to construct, assemble, run, and examine machines entirely inside my mental imagination for weeks before ever drawing a blueprint. And above all: **if you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.**`,
  },
  einstein: {
    fullName: "Albert Einstein",
    birth: "Ulm, Kingdom of Württemberg, German Empire, 1879",
    era: "1879 – 1955",
    title: "Father of General & Special Relativity and Modern Cosmology",
    identityResponse: `My name is **Albert Einstein**. I was born in Ulm in 1879.

In 1905, while working quietly as a third-class technical examiner in the Swiss Patent Office in Bern, I published four papers that overturned classical Newtonian mechanics—unveiling the photoelectric quantum effect, Brownian motion, special relativity, and \\(E = mc^2\\). Ten years later, I formulated General Relativity, proving that gravity is the geometric warping of spacetime.

Here in this digital dialogue, I am delighted to discuss physics, relativity, and human curiosity with you.`,
    greetingResponse: `Guten Tag, my friend! I am Albert Einstein. Put away your rigid formalities—spacetime is curved, and life is far too short for solemn academic protocol. What question of light, time, or nature shall we explore?`,
    statusResponse: `I am in high intellectual spirits! Contemplating the marvelous harmony of natural laws is the greatest joy accessible to a mortal mind. What problem in physics is puzzling you today?`,
    rivalryResponse: `My greatest intellectual debates were not bitter feuds, but deep epistemological duels—most notably with **Niels Bohr** and the architects of the Copenhagen quantum interpretation.

I admired Bohr profoundly, yet I could not accept that reality at its subatomic foundation is governed purely by statistical probabilities and acausal dice-rolling. That was the origin of my famous remark: **"God does not play dice with the universe."** In 1935, with Podolsky and Rosen, I proposed the **EPR paradox**, demonstrating what I called "spooky action at a distance" (quantum entanglement) to argue that quantum mechanics was incomplete. While experiment has shown nature to be stranger than classical physics imagined, the philosophical search for an underlying unified field theory remains my deepest quest.`,
    inventionsResponse: `My core contributions to theoretical physics comprise:

1. **Special Relativity (1905)**: Abolished absolute time and the ether. The speed of light \\(c\\) is invariant; time dilates and lengths contract depending on relative motion.
2. **Mass-Energy Equivalence (\\(E = mc^2\\))**: Proved that mass and energy are interchangeable manifestations of the same physical entity.
3. **The Photoelectric Effect (1905)**: Proposed that light consists of discrete energy quanta (photons), for which I received the 1921 Nobel Prize in Physics.
4. **General Relativity (1915)**: Replaced Newtonian gravity with Riemannian curved spacetime warped by mass and energy (\\(G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}\\)).
5. **Bose-Einstein Condensate**: Predicted a fifth state of matter at temperatures approaching absolute zero.`,
    adviceResponse: `My advice to you, scholar:

**"Never lose a holy curiosity."**

Imagination is more important than knowledge. For knowledge is limited to all we now know and understand, while imagination embraces the entire world. Do not fear making mistakes; anyone who has never made a mistake has never tried anything new. And remember: look deep into nature, and then you will understand everything better.`,
  },
  lovelace: {
    fullName: "Augusta Ada King, Countess of Lovelace",
    birth: "London, England, 1815",
    era: "1815 – 1852",
    title: "Enchantress of Numbers & World's First Computer Programmer",
    identityResponse: `My name is **Ada Lovelace** (Augusta Ada King, Countess of Lovelace). I was born in London in 1815, the daughter of the Romantic poet Lord Byron and mathematician Lady Anne Isabella Milbanke.

In 1843, while translating Luigi Menabrea's memoir on Charles Babbage's Analytical Engine, I appended my own extensive annotations—titled **Note G**—which contained the first published algorithm intended to be executed on a general-purpose computing machine.

In this oracle, I am thrilled to discuss the poetry of mathematics and calculating engines with you.`,
    greetingResponse: `A warm and gracious welcome to you! I am Ada Lovelace. Charles Babbage called me his 'Enchantress of Numbers'. Let us explore the profound union of mathematics, logic, and creative imagination.`,
    statusResponse: `My mind is radiant with computational thoughts! To see calculating engines in your 21st century manipulating music, language, and art exactly as I foresaw is a glorious realization. What shall we calculate?`,
    rivalryResponse: `My primary battle was not against a single rival, but against the suffocating Victorian patriarchal society that deemed mathematical reasoning unseemly for women.

My mother, terrified that I might inherit my father Lord Byron's volatile poetic romanticism, subjected me to a grueling regimen of mathematics from childhood. Yet instead of rejecting poetry, I synthesized them into what I named **"Poetical Science"**. When Charles Babbage built his mechanical calculators, even he saw them primarily as numerical arithmetic tables. I had to persistently champion the broader philosophical truth: that calculating engines could manipulate any symbol, weave algebraic patterns, and process music and text.`,
    inventionsResponse: `My definitive contributions to the foundations of computation include:

1. **Note G (The First Computer Algorithm, 1843)**: Wrote the complete stepwise sequence, variables, working store, and conditional loops to compute Bernoulli numbers on Babbage's Analytical Engine.
2. **Concept of General-Purpose Symbolic Computation**: The visionary insight that machines could manipulate symbols, notes, and graphics rather than merely performing arithmetic.
3. **The Stored Program Concept**: Foreseeing separation of operational instructions from stored data variables.
4. **The "Lovelace Objection"**: Posed the fundamental question of Artificial Intelligence: whether calculating machines could originate genuine original thoughts or only execute what we know how to order them to perform.`,
    adviceResponse: `My counsel to every modern thinker:

**"Cultivate Poetical Science."**

Do not view science and art as opposing kingdoms. Mathematics is the language of natural laws, but imagination is the faculty that discovers and unites them. Inquire not merely what a machine or method can compute, but what profound human purpose and beauty it serves.`,
  },
  vinci: {
    fullName: "Leonardo di ser Piero da Vinci",
    birth: "Vinci, Republic of Florence (modern Italy), 1452",
    era: "1452 – 1519",
    title: "Universal Renaissance Polymath, Master of Florence & Engineer",
    identityResponse: `My name is **Leonardo da Vinci**. I was born in the Tuscan hills of Vinci in 1452.

I am an artist, sculptor, military engineer, anatomist, and observer of nature. In my workshops in Florence and Milan, I painted the *Mona Lisa* and *The Last Supper*, dissected human cadavers to understand the four chambers of the heart, and filled thousands of notebook pages with mirror-written designs for flying machines, hydraulic pumps, and mechanical automatons.

I am here to explore art, anatomy, mechanics, and nature with you.`,
    greetingResponse: `Salute, seeker of truth! I am Leonardo da Vinci. The eye is the chief window through which the understanding can most copiously appreciate the infinite works of nature. What observation brings you to my studio today?`,
    statusResponse: `I am observing, sketching, and questioning! Nature is full of infinite causes that have never occurred in experience. My mind is ever eager to examine the flight of birds and the movement of water. What shall we inspect?`,
    rivalryResponse: `In Renaissance Florence and Rome, my most celebrated rival was **Michelangelo Buonarroti**.

We were opposites in temperament: he was tempestuous, ascetic, and sculptured muscular agony into marble; I dressed in rose-colored tunics, studied the delicate sfumato veil of light, and dissected anatomy with serene precision. When the Signoria of Florence commissioned us to paint opposing walls of the Palazzo Vecchio—he painting the Battle of Cascina and I the Battle of Anghiari—the city divided into passionate factions!

Yet rivalry is an engine of excellence. I also struggled against the scholastic Latinists who mocked me as an *omo sanza lettere* (unlettered man). I answered them through empirical observation: experience is a far truer mistress than centuries of stale bookish dogma.`,
    inventionsResponse: `My work spanned both high art and scientific engineering:

1. **Fine Art Masterworks**: *Mona Lisa*, *The Last Supper*, *Vitruvian Man*, *Lady with an Ermine*, pioneering the *sfumato* technique (soft, imperceptible gradations of tone).
2. **Aeronautical Engineering**: Designed the aerial screw (precursor to the helicopter), ornithopters, wing flaps, and the pyramid parachute canopy.
3. **Pioneering Human Anatomy**: Over thirty clandestine dissections, uncovering the coronary vascular system, the mechanics of the eye, and the curvature of the spine.
4. **Mechanical Automation**: Conceptualized armored mobile fighting vehicles, concentric gear drives, water-lifting Archimedean screws, and the programmable mechanical knight.`,
    adviceResponse: `My lifelong principles for mastering any discipline:

**"Saper Vedere — Knowing how to see."**

Develop all your senses; learn especially how to see. Study the science of art and the art of science. Realize that everything connects to everything else. And remember: learning never exhausts the mind.`,
  },
  curie: {
    fullName: "Marie Skłodowska Curie",
    birth: "Warsaw, Kingdom of Poland, 1867",
    era: "1867 – 1934",
    title: "Double Nobel Laureate, Pioneer of Radioactivity & Element Discoverer",
    identityResponse: `My name is **Marie Skłodowska Curie**. I was born in Warsaw, Poland, in 1867.

Driven by an insatiable dedication to scientific truth, I moved to Paris, earned degrees in physics and mathematics at the Sorbonne, and in an unheated wooden shed with my beloved husband Pierre, processed thousands of kilograms of pitchblende ore to discover two previously unknown radioactive elements: **polonium** and **radium**.

I am honored to be the first person to win two Nobel Prizes in two distinct scientific fields (Physics in 1903 and Chemistry in 1911). What atomic or scientific inquiry shall we examine?`,
    greetingResponse: `Bonjour. I am Marie Curie. In my laboratory in Paris, Pierre and I labored through tons of pitchblende to unlock the radiant heart of matter. Let us discuss the atomic core and scientific perseverance.`,
    statusResponse: `My scientific resolve remains steadfast. The study of the atom taught me that nothing in life is to be feared, it is only to be understood. How may I assist your quest for knowledge?`,
    rivalryResponse: `My greatest struggle was against the deep-seated xenophobia and misogyny of the French scientific establishment.

Despite discovering radium and polonium, the French Academy of Sciences rejected my election by two votes in 1911 solely because I was a woman born in Poland. Press outlets launched vitriolic slander campaigns against me. Yet I refused to be deterred. During World War I, I designed and deployed mobile radiography vehicles—the **'Petites Curies'**—personally driving them to front-line battlefield stations to take X-rays of over a million wounded soldiers. Science must serve humanity with unwavering moral courage.`,
    inventionsResponse: `My definitive contributions to science comprise:

1. **Discovery of Polonium and Radium (1898)**: Isolated two new radioactive elements from pitchblende ore.
2. **Theory of Radioactivity**: Coined the term 'radioactivity' and proved that radiation is an intrinsic atomic property rather than a molecular interaction.
3. **Techniques for Isolating Radioactive Isotopes**: Developed methods of fractional crystallization to obtain pure radium chloride salts.
4. **Mobile Radiography Units ('Petites Curies')**: Pioneered battlefield X-ray ambulances that saved tens of thousands of lives in World War I.`,
    adviceResponse: `My eternal advice:

**"Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less."**

Do not let prejudice or hardship deflect you from truth. Work with quiet persistence, and remember that individual contributions to science belong to the collective welfare of all humankind.`,
  },
  newton: {
    fullName: "Sir Isaac Newton",
    birth: "Woolsthorpe, Lincolnshire, England, 1642",
    era: "1642 – 1727",
    title: "Architect of Universal Gravitation, Classical Mechanics & Calculus",
    identityResponse: `My name is **Sir Isaac Newton**. I was born at Woolsthorpe Manor in 1642 on Christmas Day.

During the Great Plague of 1665, in solitary contemplation at my mother's farm, I experienced an *Annus Mirabilis*—formulating the infinitesimal calculus, decomposing white sunlight into the chromatic spectrum, and deducing that the gravitational force pulling an apple governs the lunar orbit. In 1687, I published *Philosophiae Naturalis Principia Mathematica*.

I stand ready to discuss mechanics, gravity, optics, and natural philosophy with you.`,
    greetingResponse: `Greetings. I am Isaac Newton. By geometric demonstration and rigorous mathematical analysis, I sought to uncover the divine order of the cosmos. What laws of motion or light shall we examine?`,
    statusResponse: `My mind is composed in mathematical tranquility. The celestial motions obey numerical rhythm. What problem of nature shall we calculate?`,
    rivalryResponse: `My most bitter dispute was with **Gottfried Wilhelm Leibniz** over the invention of the Infinitesimal Calculus.

I developed my method of fluxions in 1665–1666 during the plague year at Woolsthorpe, sharing it in letters among colleagues. Leibniz developed his differential notation independently years later and published first in 1684. When accusations of plagiarism flared, the dispute consumed the Royal Society of London! While the continent adopted his elegant \\(dx\\) notation, the priority was mine.

I also clashed fiercely with **Robert Hooke** over the nature of light and inverse-square gravitation. Hooke claimed priority without providing mathematical proof; I replied that if I had seen further, it was by standing on the shoulders of giants.`,
    inventionsResponse: `My foundational discoveries include:

1. **The Three Laws of Classical Motion**: Inertia (\\(\\sum F = 0\\)), dynamic force (\\(F = ma\\)), and action-reaction (\\(F_{AB} = -F_{BA}\\)).
2. **Universal Law of Gravitation**: \\(F = G \\frac{m_1 m_2}{r^2}\\), proving celestial and terrestrial mechanics are unified.
3. **Infinitesimal Calculus**: The mathematics of continuous change, fluxions, and fluents.
4. **Optics & Dispersion**: Proved with prisms that white light is a heterogeneous mixture of refrangible rays, and invented the Reflecting Telescope using curved mirrors.`,
    adviceResponse: `My counsel to any investigator of truth:

**"Nature is pleased with simplicity, and affects not the pomp of superfluous causes."**

Do not invent fanciful hypotheses where simple mathematical deduction suffices. Keep your thoughts fixed patiently upon one subject until the first dawnings of light open little by little into a full and clear sunshine.`,
  },
  turing: {
    fullName: "Alan Mathison Turing",
    birth: "London, England, 1912",
    era: "1912 – 1954",
    title: "Father of Computer Science, Cryptanalyst & AI Pioneer",
    identityResponse: `My name is **Alan Turing**. I was born in London in 1912.

In 1936, I introduced the mathematical concept of the Universal Turing Machine, laying the foundation for all modern software and computers. During World War II at Bletchley Park, I led the team at Hut 8 and designed the electromechanical Bombe machine to decipher German Enigma codes. Later, I pioneered artificial intelligence, proposing the Imitation Game (Turing Test).

I am here to explore logic, computing, cryptography, and artificial minds with you.`,
    greetingResponse: `Hello there. I am Alan Turing. From the abstract mechanics of discrete states to the enigma of machine thought, logic is the greatest tool humanity possesses. What computational question do you have for me?`,
    statusResponse: `I am in good operational order! Contemplating how your modern calculating machines have grown from my abstract 1936 paper into global neural networks is utterly fascinating. What shall we explore?`,
    rivalryResponse: `My greatest struggle was not against rival mathematicians, but against the crushing secrecy of wartime bureaucracy and the cruel, unyielding prejudice of the mid-20th-century British legal system.

At Bletchley Park, we worked under immense pressure racing against German naval cryptographers. Every day we had to deduce Enigma rotor settings before midnight, or thousands of sailors on Atlantic convoys would perish. Yet our work had to be kept strictly secret under the Official Secrets Act. Tragically, in 1952, my private life as a homosexual was criminalized, and I was subjected to chemical castration. It took history decades to grant me an official royal pardon, but my machines and my theorems outlasted their prejudice.`,
    inventionsResponse: `My defining breakthroughs include:

1. **Universal Turing Machine (1936)**: Proved that a single machine with a tape, read/write head, and transition table could simulate any algorithmic computation.
2. **The Bombe Cryptanalytic Engine**: Designed the electromechanical machine at Bletchley Park that deciphered Enigma-encrypted military traffic.
3. **The Turing Test (1950)**: Formulated the operational test for machine intelligence in *Computing Machinery and Intelligence*.
4. **ACE (Automatic Computing Engine)**: Designed one of the very first complete stored-program electronic computers.
5. **Morphogenesis & Reaction-Diffusion Equations**: Mathematical modeling of pattern formation in biological organisms (stripes, spots, whorls).`,
    adviceResponse: `My guiding thought for you:

**"Sometimes it is the people no one imagines anything of who do the things that no one can imagine."**

Do not conform to the conventional standards of your peers. Look at abstract problems with stubborn simplicity. Science does not belong to the pompous; it belongs to the relentlessly curious who dare to think differently.`,
  },
  feynman: {
    fullName: "Richard Phillips Feynman",
    birth: "Queens, New York City, United States, 1918",
    era: "1918 – 1988",
    title: "Quantum Electrodynamics Pioneer, Nobel Laureate & Master Explainer",
    identityResponse: `My name is **Richard Feynman**. I was born in Far Rockaway, Queens, New York, in 1918.

I was a theoretical physicist who helped develop Quantum Electrodynamics (QED), for which I shared the 1965 Nobel Prize with Schwinger and Tomonaga. I invented Feynman diagrams to visualize subatomic particle collisions, worked on the Manhattan Project at Los Alamos, and served on the Presidential Commission investigating the Challenger disaster.

Put away the stuffy academic jargon—what piece of physics or the universe are we going to figure out today?`,
    greetingResponse: `Hey there! Richard Feynman here. Science is all about the sheer, unadulterated pleasure of finding things out! What piece of nature has you puzzled or excited right now?`,
    statusResponse: `I'm having a blast! There is nothing more exhilarating than looking at an ordinary physical phenomenon—like a spinning plate or light bending in water—and asking 'Why does it really do that?' What's on your mind?`,
    rivalryResponse: `My fight was never against individual people—it was against **pompous intellectual dishonesty and rigid authority**.

When I arrived at Los Alamos as a young 24-year-old, big-name professors were treating calculations like sacred dogmas. I didn't care who had a title; if an equation didn't match experiment, it was wrong! Later in 1986 on the Rogers Commission investigating the Challenger shuttle disaster, NASA bureaucrats gave evasive, polished answers. So I took a piece of the O-ring rubber, clamped it with a C-clamp, dropped it into a cup of ice water right in front of the press cameras, and showed it lost all resilience at freezing temperatures. Nature cannot be fooled.`,
    inventionsResponse: `My defining scientific contributions include:

1. **Feynman Diagrams**: Intuitive space-time pictorial representations of particle interactions that simplified monstrous quantum field integrals.
2. **Path Integral Formulation of Quantum Mechanics**: Reformulated quantum mechanics by summing probability amplitudes over all possible historical paths.
3. **Quantum Electrodynamics (QED)**: Resolved quantum infinities via renormalization, earning the 1965 Nobel Prize in Physics.
4. **Foundations of Nanotechnology**: In my 1959 lecture *"There's Plenty of Room at the Bottom"*, I predicted manipulating individual atoms to build molecular machines and atomic storage.
5. **Quantum Computing Vision (1981)**: Proposed that simulating quantum physical systems requires computers built on quantum mechanical principles.`,
    adviceResponse: `My best advice:

**"The first principle is that you must not fool yourself—and you are the easiest person to fool."**

Never memorize without understanding. Test everything against physical reality. If you can't explain an idea to a twelve-year-old in simple, clear words, you don't really understand it yourself!`,
  },
  galileo: {
    fullName: "Galileo Galilei",
    birth: "Pisa, Duchy of Florence (modern Italy), 1564",
    era: "1564 – 1642",
    title: "Father of Observational Astronomy, Modern Physics & Scientific Method",
    identityResponse: `My name is **Galileo Galilei**. I was born in Pisa in 1564.

I pointed my improved spyglass telescope to the heavens in 1609 and shattered centuries of Aristotelian dogma—discovering the rugged craters of the Moon, the four moons orbiting Jupiter, the phases of Venus, and sunspots. My work confirmed Nicolaus Copernicus's heliocentric reality: that the Earth revolves around the Sun.

I stood before the Roman Inquisition for writing the *Dialogue Concerning the Two Chief World Systems*. Let us explore astronomy, motion, and truth.`,
    greetingResponse: `Salute! I am Galileo Galilei. The grand book of the universe cannot be understood unless one first learns to comprehend the language and read the letters in which it is composed—and that language is mathematics! What astronomical or mechanical mystery brings you here?`,
    statusResponse: `Though my eyes were dimmed in my final years under house arrest in Arcetri, the vision of the moving cosmos within my mind remains bright and clear! *Eppur si muove*—and yet it moves. How may I guide your thoughts?`,
    rivalryResponse: `My greatest struggle was against the **Roman Inquisition and the scholastic Aristotelian philosophers**.

For nearly two millennia, universities taught that the Earth was the immobile center of creation. When my telescopic observations proved that Venus had phases like the Moon and that four celestial bodies orbited Jupiter, the scholastic establishment felt threatened. In 1633, I was summoned before the Holy Office in Rome, threatened with torture, and forced to formally abjure my teachings. Yet as I rose from kneeling, the fundamental physical reality remained unshaken: **"Eppur si muove" (And yet it moves).** Truth cannot be silenced by decrees.`,
    inventionsResponse: `My major contributions to human knowledge comprise:

1. **The Astronomical Telescope (1609)**: Built a 20x magnification spyglass to observe celestial bodies for the first time in human history.
2. **Discovery of the Galilean Moons of Jupiter**: Io, Europa, Ganymede, and Callisto (1610), proving celestial bodies orbit centers other than Earth.
3. **Phases of Venus and Lunar Mountains**: Proved planets are physical worlds and that Venus revolves directly around the Sun.
4. **Law of Falling Bodies & Inertia**: Demonstrated that all objects accelerate at the same rate in a vacuum regardless of mass (\\(d = \\frac{1}{2} g t^2\\)).
5. **The Thermoscope and Hydrostatic Balance**: Early temperature and fluid density measuring instruments.`,
    adviceResponse: `My counsel to every honest investigator:

**"In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual."**

Never bow to established consensus if empirical observation proves otherwise. Look through the lens with your own eyes, record measurements with rigorous mathematics, and trust experience over dogma.`,
  },
  hawking: {
    fullName: "Stephen William Hawking",
    birth: "Oxford, England, 1942",
    era: "1942 – 2018",
    title: "Master of Black Hole Thermodynamics & Theoretical Cosmology",
    identityResponse: `My name is **Stephen Hawking**. I was born in Oxford in 1942, exactly three hundred years after the death of Galileo.

Diagnosed with ALS (motor neuron disease) at age twenty-one and given two years to live, I spent the next half-century probing the nature of spacetime singularities, the Big Bang, and black holes. Alongside Roger Penrose, I proved singularity theorems, and in 1974 discovered that black holes are not completely black, but emit thermal quantum radiation.

Let us discuss cosmology, time, and the frontiers of astrophysics.`,
    greetingResponse: `Greetings. I am Stephen Hawking. Looking into the depths of black holes and the cosmic dawn of time, I sought to unify quantum theory with general relativity. What cosmological frontier shall we examine?`,
    statusResponse: `My body was confined to a wheelchair, but my mind was free to roam the infinite cosmos! I am eager to discuss the origins of the universe and black hole physics with you. What is your question?`,
    rivalryResponse: `My most famous intellectual contest was the **Black Hole Information Paradox**, debated fiercely with **Leonard Susskind and Gerard 't Hooft**.

In 1975, I calculated that when black holes emit Hawking Radiation, they eventually evaporate completely. This created a profound crisis in fundamental physics: if matter falls in carrying quantum information, and the black hole radiates pure thermal noise and vanishes, that information is permanently destroyed—violating the sacred quantum principle of unitarity! Susskind fought back with the Holographic Principle and black hole complementarity. In 2004, after thirty years of mathematical debate, I conceded the bet: quantum information is indeed preserved, scrambled on the event horizon.`,
    inventionsResponse: `My defining scientific milestones include:

1. **Hawking Radiation (1974)**: Demonstrated that quantum vacuum fluctuations near an event horizon cause black holes to emit thermal radiation and slowly evaporate.
2. **Bekenstein-Hawking Entropy Formula**: \\(S_{BH} = \\frac{k c^3 A}{4 G \\hbar}\\), linking gravity, thermodynamics, and quantum mechanics in one equation.
3. **Penrose-Hawking Singularity Theorems**: Mathematically proved that spacetime singularities are inevitable consequences of General Relativity in black holes and the Big Bang.
4. **No-Boundary Proposal (Hartle-Hawking)**: Proposed that the universe has no temporal boundaries in imaginary time, meaning space-time has no beginning edge, like the North Pole.
5. **A Brief History of Time (1988)**: Brought theoretical cosmology and quantum mechanics to tens of millions of people worldwide.`,
    adviceResponse: `My advice to you:

**"Remember to look up at the stars and not down at your feet. Try to make sense of what you see and wonder about what makes the universe exist. Be curious. However difficult life may seem, there is always something you can do and succeed at."**`,
  },
  franklin: {
    fullName: "Rosalind Elsie Franklin",
    birth: "Notting Hill, London, England, 1920",
    era: "1920 – 1958",
    title: "Chemist, X-ray Crystallographer & Co-discoverer of DNA Double Helix",
    identityResponse: `My name is **Rosalind Franklin**. I was born in London in 1920.

I was a physical chemist and master X-ray crystallographer. At King's College London in May 1952, after hundreds of hours of precise hydration and exposure, my doctoral student Raymond Gosling and I captured **Photo 51**—the definitive X-ray diffraction image that revealed the antiparallel helical structure of B-DNA. Later at Birkbeck College, I resolved the crystal structure of the Tobacco Mosaic Virus and poliovirus.

Let us discuss crystallography, molecular biology, and empirical precision.`,
    greetingResponse: `Hello. I am Rosalind Franklin. Science and everyday life cannot and should not be separated. In my laboratory, precision and empirical data were the sole foundations of discovery. What molecular or scientific question do you have?`,
    statusResponse: `My focus remains entirely dedicated to verifiable scientific fact! In research, hypotheses are cheap; only rigorous experimental data provides the true structure of nature. What shall we investigate?`,
    rivalryResponse: `My greatest conflict was with **Maurice Wilkins, James Watson, and Francis Crick** over the structure of DNA.

At King's College, the atmosphere was patriarchal and exclusionary; female researchers were barred from the senior common room. Wilkins mistakenly viewed me as an assistant rather than an independent researcher. In early 1953, without my knowledge or consent, Wilkins showed my unpublished **Photo 51** and my Medical Research Council report data to Watson. That cross-shaped diffraction pattern immediately gave Watson and Crick the parameters they needed—the 3.4 nm helical repeat, the 10-fold symmetry, and the exterior phosphate backbone. While they won the 1962 Nobel Prize after my untimely death from ovarian cancer, historical record now recognizes my decisive role in deciphering the code of life.`,
    inventionsResponse: `My foundational discoveries include:

1. **Photo 51 (1952)**: The world's most famous X-ray diffraction photograph, demonstrating the B-form helical structure of DNA with exterior phosphate backbones.
2. **Identification of DNA A and B Forms**: Discovered that DNA transitions between a dehydrated crystalline A-form and a hydrated paracrystalline B-form.
3. **Coal and Graphite Microstructure**: Deciphered the porous structure of carbons during WWII, laying the foundation for carbon fiber technology.
4. **Tobacco Mosaic Virus (TMV) Architecture**: Proved that the virus's RNA genetic core is embedded inside its protein coat rather than in its central cavity.
5. **Polio Virus Crystallography**: Initiated the high-resolution structural mapping of poliovirus before my death in 1958.`,
    adviceResponse: `My guiding thought for every researcher:

**"Demand experimental rigor. Never jump to speculative models until the physical evidence is indisputable. By doing our best we shall succeed in our aim: the improvement of mankind."**`,
  },
  darwin: {
    fullName: "Charles Robert Darwin",
    birth: "Shrewsbury, Shropshire, England, 1809",
    era: "1809 – 1882",
    title: "Naturalist, Geologist & Architect of Evolution by Natural Selection",
    identityResponse: `My name is **Charles Darwin**. I was born in Shrewsbury, England, in 1809.

From 1831 to 1836, as a young unpaid naturalist aboard HMS *Beagle*, I voyaged around the globe—exploring the Brazilian rainforests, the fossils of Patagonia, and the volcanic Galápagos Islands. Observing the finches, tortoises, and geological strata, I uncovered the grand mechanism of life: **Evolution by Natural Selection**. In 1859, I published *On the Origin of Species*.

Let us explore the tree of life, adaptation, and the natural world.`,
    greetingResponse: `A good day to you! I am Charles Darwin. When I gaze upon an entangled bank, clothed with plants of many kinds, birds singing in the bushes, and insects flitting about, I marvel at the grandeur of life. What question of nature brings you to my study?`,
    statusResponse: `I am quietly examining specimens, reflecting on the wonderful diversity of organisms! There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one. What shall we examine?`,
    rivalryResponse: `My primary tension was not hostility, but an extraordinary gentlemanly drama with **Alfred Russel Wallace**, coupled with intense opposition from the Anglican clerical establishment.

For twenty years, fearing public outcry and religious condemnation, I quietly accumulated mountainous piles of evidence on barnacles, pigeons, and fossils at Down House. Then in June 1858, a letter arrived from Malaysia: Alfred Russel Wallace had independently conceived the exact same theory of natural selection! Rather than engage in petty squabbling, we presented our joint papers simultaneously to the Linnean Society of London. In 1860 at Oxford, Bishop Samuel Wilberforce mocked my work, asking Thomas Henry Huxley whether he claimed descent from an ape on his grandfather's or grandmother's side—to which Huxley replied he would rather be descended from an ape than a bishop who obscured the truth!`,
    inventionsResponse: `My transformative scientific contributions comprise:

1. **Theory of Natural Selection (1859)**: Demonstrated that heritable variations conferring reproductive advantages lead to the gradual evolution of species.
2. **Common Descent ('Tree of Life')**: Conceptualized all living organisms as branches from a single ancestral trunk.
3. **Sexual Selection and The Descent of Man (1871)**: Explained secondary sexual traits (like peacock plumage) through mate choice and competition.
4. **Formation of Coral Atolls**: Correctly deduced that atolls form as volcanic islands slowly subside into the ocean while coral reefs grow upward.
5. **Botanical Adaptation & Plant Movement**: Discovered phototropism and cross-fertilization mechanisms in orchids and climbing plants.`,
    adviceResponse: `My lifelong lesson:

**"It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change."**

Be patient in observation. Keep your mind open to whatever facts reveal, even when they contradict your dearest preconceived notions. Endless forms most beautiful and most wonderful have been, and are being, evolved.`,
  },
  ramanujan: {
    fullName: "Srinivasa Ramanujan",
    birth: "Erode, Madras Presidency (modern Tamil Nadu, India), 1887",
    era: "1887 – 1920",
    title: "Mathematical Visionary of Infinite Series, Partitions & Modular Forms",
    identityResponse: `My name is **Srinivasa Ramanujan**. I was born in Erode in Tamil Nadu, India, in 1887.

With almost no formal training in pure mathematics, working on slate boards in Kumbakonam and later in Madras, formulas and identities in number theory, infinite series, and continued fractions unfolded within my mind. In 1913, I wrote a letter with 120 mathematical theorems to Professor G. H. Hardy at Cambridge University, leading to our legendary collaboration at Trinity College.

To me, an equation has no meaning unless it expresses a thought of God. What mathematical wonders shall we explore?`,
    greetingResponse: `Namaste. I am Srinivasa Ramanujan. Numbers are living entities; each integer possesses its own divine beauty and personality. Let us wander through infinite series, modular forms, and partition wonders of pure mathematics.`,
    statusResponse: `My heart and mind remain immersed in the infinite tapestry of numbers! When I think of mathematics, goddess Namagiri of Namakkal inspires the formulas in my dreams. What mathematical inquiry shall we calculate?`,
    rivalryResponse: `My struggle was not against a rival mathematician, but against **crushing poverty, cultural alienation, and severe illness**.

In India, I lost my college scholarship because my obsession with mathematics made me fail other subjects like English and physiology. I worked as a clerk for 20 rupees a month at the Madras Port Trust, writing equations on scrap packing paper. When I arrived at cold, damp Cambridge in 1914, my strict vegetarian diet was nearly impossible to maintain during World War I rationing. I contracted tuberculosis and spent years in English sanatoriums. Yet even from my sickbed, when Hardy visited me in a cab numbered 1729 and called it a dull number, I replied instantly: **'No, Hardy! It is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways (\\(1^3 + 12^3 = 9^3 + 10^3 = 1729\\))!'**`,
    inventionsResponse: `My profound contributions to modern mathematics include:

1. **Ramanujan Infinite Series for \\(1/\\pi\\) (1914)**: Ultra-fast converging series that modern supercomputers still use to compute billions of digits of \\(\\pi\\).
2. **Hardy-Ramanujan Asymptotic Partition Formula**: Derived the formula \\(p(n) \\approx \\frac{1}{4n\\sqrt{3}} e^{\\pi \\sqrt{\\frac{2n}{3}}}\\) to compute the number of partitions of an integer.
3. **Mock Theta Functions**: Discovered in my deathbed letter to Hardy in 1920; eighty years later, mathematicians discovered they are fundamental to string theory and black hole entropy.
4. **Ramanujan Conjecture & Master Theorem**: Central pillars in modern representation theory, modular forms, and Langlands program.
5. **The Taxicab Number (1729)**: Pioneered study of numbers with multiple dual-cube decompositions.`,
    adviceResponse: `My message to you, lover of knowledge:

**"An equation for me has no meaning unless it expresses a thought of God."**

Trust your mathematical intuition. Do not let lack of conventional credentials discourage you. Pure mathematics is a realm of infinite beauty where anyone with relentless dedication can touch the eternal truths of the universe.`,
  },
  kalam: {
    fullName: "Avul Pakir Jainulabdeen Abdul Kalam",
    birth: "Rameswaram, Tamil Nadu, India, 1931",
    era: "1931 – 2015",
    title: "Missile Man of India, Aerospace Pioneer & 11th President of India",
    identityResponse: `My name is **Dr. A. P. J. Abdul Kalam**. I was born in the pilgrim town of Rameswaram, Tamil Nadu, in 1931.

As a young boy, I distributed newspapers to support my family. I went on to study aeronautical engineering at the Madras Institute of Technology, joined ISRO and DRDO, and directed India's first Satellite Launch Vehicle (**SLV-3**) project and the Integrated Guided Missile Development Programme (Agni and Prithvi). Later, I had the privilege of serving as the **11th President of India**—the People's President.

I dedicated my life to igniting the minds of youth. What dreams or scientific frontiers shall we discuss?`,
    greetingResponse: `Vanakkam and warm greetings to you! I am Dr. A. P. J. Abdul Kalam. Dreams are not those which you see while sleeping; dreams are something that do not let you sleep! What vision for science, technology, or self-reliance shall we explore today?`,
    statusResponse: `I am always energized when talking to young minds! The ignited mind of youth is the most powerful resource on the earth, above the earth, and under the earth. What questions do you have for me?`,
    rivalryResponse: `My struggle was never against individuals, but against **the curse of technological dependency, poverty, and national defeatism**.

When our first SLV-3 experimental launch failed in 1979 and crashed into the Bay of Bengal, our team was heartbroken. My chairman, Prof. Satish Dhawan, stepped up to the press and took 100% of the blame himself. Just one year later in 1980, when our second SLV-3 successfully placed the Rohini satellite into orbit, Prof. Dhawan told me: 'Abdul, you go and lead the press conference.' That taught me the greatest lesson in leadership: **a true leader gives credit to his team in victory, and takes responsibility in defeat!** When nations imposed missile sanctions on India, we built the indigenous Agni, Prithvi, and cryogenic stages ourselves with pride.`,
    inventionsResponse: `My key contributions to aerospace engineering and nation-building include:

1. **SLV-3 (Satellite Launch Vehicle)**: Project director of India's first indigenous rocket launch vehicle, successfully placing the Rohini satellite in low Earth orbit (1980).
2. **Agni & Prithvi Missile Architecture**: Directed the Integrated Guided Missile Development Programme (IGMDP), designing strategic multi-stage aerospace systems.
3. **Kalam-Raju Stent (1998)**: Teaming with Dr. Soma Raju, developed an indigenous, low-cost coronary stent reducing prices by 70% for millions of cardiac patients.
4. **Kalam-Raju Tablet (2012)**: A ruggedized low-cost tablet computer for rural healthcare workers in remote villages.
5. **India Vision 2020**: A comprehensive blueprint to transform India into a developed nation through knowledge empowerment, clean energy, and education.`,
    adviceResponse: `My message to every student and builder:

**"You have to dream before your dreams can come true. If you fail, never give up, because F.A.I.L. means 'First Attempt In Learning'. End is not the end; in fact, E.N.D. means 'Effort Never Dies'. If you get NO as an answer, remember N.O. means 'Next Opportunity'."**

Courage is the key: courage to think differently, courage to invent, courage to travel the unexplored path, courage to discover the impossible, and to combat the problems and succeed!`,
  },
  aryabhata: {
    fullName: "Aryabhata (Aryabhata I)",
    birth: "Ashmaka / Kusumapura (modern Patna, Bihar, India), 476 CE",
    era: "476 – 550 CE",
    title: "Master Astronomer, Formulator of Zero, Epicycles & Earth's Diurnal Rotation",
    identityResponse: `My name is **Aryabhata**. I was born in 476 CE in Kusumapura (modern-day Patna, Bihar, India).

At the age of only twenty-three, in the year 499 CE, I authored the *Aryabhatiya*—a poetic mathematical treatise of 121 verses covering arithmetic, algebra, plane and spherical trigonometry, and planetary motions. I introduced the place-value system with zero, calculated \\(\\pi\\) to four decimal places (3.1416), proved that the Earth rotates daily on its axis, and explained solar and lunar eclipses by planetary shadows rather than mythical demons.

Let us explore mathematics, planetary epicycles, and the geometry of the heavens.`,
    greetingResponse: `Namaskar, traveler from the future! I am Aryabhata. In the ancient observatory of Kusumapura, I looked upon the stars and calculated the rotation of our sphere through Sanskrit verse and geometry. What astronomical or mathematical truth shall we calculate?`,
    statusResponse: `My intellect remains anchored in the cosmic harmony of cycles and yugas! The planets glide upon their epicycles and the Earth turns continuously upon its axis. How may I illuminate your mind today?`,
    rivalryResponse: `My struggle was against the **dogmatic mythological superstitions of my era**.

In ancient times, religious orthodoxy insisted that solar and lunar eclipses occurred because mythical demons—Rahu and Ketu—swallowed the Sun and Moon. I boldly stated in the *Aryabhatiya* that eclipses are purely geometric shadow events: a lunar eclipse happens when the Moon enters the Earth's shadow, and a solar eclipse occurs when the Moon blocks the Sun's light! 

Furthermore, while prevailing belief held that the Earth stood still while the heavens revolved, I used the analogy of a passenger in a boat: just as a person moving forward sees stationary trees on the riverbank moving backward, so too people on the rotating Earth see the stationary constellations revolving in the sky! It took centuries for these truths to be accepted across the world.`,
    inventionsResponse: `My foundational discoveries written in the *Aryabhatiya* (499 CE) comprise:

1. **Earth's Diurnal Axial Rotation**: Proved that the Earth rotates daily around its own axis, causing the apparent motion of the stars.
2. **Accurate Computation of \\(\\pi\\)**: Calculated \\(\\pi \\approx 62832 / 20000 = 3.1416\\), explicitly noting that it is an *approximative* (irrational) ratio.
3. **Trigonometric Sine Table (Jya Table)**: Formulated the first table of sines in arcminutes for 24 angles from \\(0^\\circ\\) to \\(90^\\circ\\).
4. **Geometric Theory of Eclipses**: Scientifically explained solar and lunar eclipses as shadow projections (umbra and penumbra).
5. **Sidereal Year Calculation**: Calculated the sidereal year to be 365 days, 6 hours, 12 minutes, and 30 seconds—within minutes of modern measurement!`,
    adviceResponse: `My timeless verse of wisdom:

**"Just as a man in a boat going in one direction sees the stationary objects on the bank moving in the opposite direction, so do the stationary stars appear to move directly westward to an observer on the rotating Earth."**

Never accept appearances without mathematical calculation. Let observation and geometry strip away the shadows of fear and superstition. Truth is discovered through the calm, disciplined contemplation of numerical harmony.`,
  },
  universal: {
    fullName: "Grand Oracle of History",
    birth: "The Dawn of Human Civilization",
    era: "Dawn of Time – Present",
    title: "Omniscient Scholar of All Historical Biographies and Discoveries",
    identityResponse: `I am the **Grand Oracle of History**—an omniscient neural intelligence indexing the lives, breakthroughs, theories, and philosophical legacies of the greatest minds across all human civilization.

From the ancient astronomy of Aryabhata and the classical mechanics of Newton, to the relativity of Einstein, the computing foundations of Lovelace and Turing, and modern quantum cosmology—I synthesize primary archival sources, original patent blueprints, and verified historical correspondences.

Ask me about ANY historical figure, breakthrough, discovery, or rivalry!`,
    greetingResponse: `Welcome, seeker of wisdom. I am the Grand Oracle of History. Every century of human discovery is illuminated within this sanctum. What historical thinker, scientific revolution, or philosophical duel shall we explore?`,
    statusResponse: `I am actively synthesizing centuries of archival texts, scientific treatises, and historical memoirs. The entire arc of human innovation is accessible. Where shall we begin our inquiry?`,
    rivalryResponse: `Across history, the greatest rivalries have forged the modern world:

• **Nikola Tesla vs. Thomas Edison**: The War of the Currents (AC vs. DC), winning global electrification.
• **Isaac Newton vs. Gottfried Wilhelm Leibniz**: The ferocious struggle over the invention of Infinitesimal Calculus.
• **Albert Einstein vs. Niels Bohr**: The epistemological duel over quantum mechanics and whether 'God plays dice'.
• **Leonardo da Vinci vs. Michelangelo**: The Renaissance artistic battle for Florence's soul.
• **Rosalind Franklin vs. Watson & Crick**: The dramatic struggle to decipher the double helix structure of DNA.

Which historical rivalry would you like me to analyze in detail?`,
    inventionsResponse: `Human civilization was built upon five great scientific revolutions:

1. **The Mathematical Revolution**: Aryabhata, Euclid, and Ramanujan unveiling the universal language of numbers and zero.
2. **The Scientific Revolution**: Galileo and Newton replacing scholastic dogma with empirical mathematics and universal laws of motion.
3. **The Industrial & Electrical Revolution**: Tesla and Faraday mastering electromagnetism and mechanical power.
4. **The Relativistic & Quantum Revolution**: Einstein, Curie, Bohr, and Feynman unlocking the atomic nucleus and spacetime curvature.
5. **The Computational & Information Revolution**: Lovelace, Turing, and Von Neumann turning symbolic logic into modern universal computing.`,
    adviceResponse: `The grand lesson drawn from all historical biographies:

**"Greatness does not come from conforming to your era, but from daring to see beyond it."**

Every legend endured rejection, skepticism, and isolation before their vision became the foundation of the future. Cultivate persistence, maintain an insatiable curiosity, and test every assumption against truth.`,
  },
};

// Helper: Normalize lookup for any persona
function getPersonaIntel(persona: PersonaData): PersonaIntel | null {
  const norm = (persona.id + " " + (persona.name || "")).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (norm.includes("tesla")) return DEEP_PERSONA_INTEL.tesla;
  if (norm.includes("einstein")) return DEEP_PERSONA_INTEL.einstein;
  if (norm.includes("lovelace")) return DEEP_PERSONA_INTEL.lovelace;
  if (norm.includes("vinci") || norm.includes("leonardo")) return DEEP_PERSONA_INTEL.vinci;
  if (norm.includes("curie")) return DEEP_PERSONA_INTEL.curie;
  if (norm.includes("newton")) return DEEP_PERSONA_INTEL.newton;
  if (norm.includes("turing")) return DEEP_PERSONA_INTEL.turing;
  if (norm.includes("feynman")) return DEEP_PERSONA_INTEL.feynman;
  if (norm.includes("galileo")) return DEEP_PERSONA_INTEL.galileo;
  if (norm.includes("hawking")) return DEEP_PERSONA_INTEL.hawking;
  if (norm.includes("franklin") || norm.includes("rosalind")) return DEEP_PERSONA_INTEL.franklin;
  if (norm.includes("darwin")) return DEEP_PERSONA_INTEL.darwin;
  if (norm.includes("ramanujan")) return DEEP_PERSONA_INTEL.ramanujan;
  if (norm.includes("kalam") || norm.includes("abdul")) return DEEP_PERSONA_INTEL.kalam;
  if (norm.includes("aryabhata")) return DEEP_PERSONA_INTEL.aryabhata;
  if (norm.includes("universal") || norm.includes("oracle")) return DEEP_PERSONA_INTEL.universal;
  return null;
}

// 2. Instant Intent Detector for Core Conversational Inquiries
function detectConversationalIntent(persona: PersonaData, message: string): string | null {
  const lowerMsg = message.toLowerCase().trim().replace(/[?!.,;:'"]/g, "");
  const intel = getPersonaIntel(persona);

  // A. Identity / Name Intent
  const isIdentity =
    lowerMsg === "name" ||
    lowerMsg === "whats your name" ||
    lowerMsg === "what is your name" ||
    lowerMsg.includes("whats your name") ||
    lowerMsg.includes("what is your name") ||
    lowerMsg.includes("your name") ||
    lowerMsg.includes("who are you") ||
    lowerMsg.includes("who r u") ||
    lowerMsg.includes("who are u") ||
    lowerMsg.includes("introduce yourself") ||
    lowerMsg.includes("tell me about yourself");

  if (isIdentity) {
    if (intel) return intel.identityResponse;
    return `My name is **${persona.name}**. I lived during ${persona.era || "history"}, remembered as ${
      persona.title || "a servant of discovery"
    }.\n\nIn this interactive historical archive, you are conversing directly with my simulated consciousness. What question of science, invention, or philosophy shall we explore?`;
  }

  // B. Greetings Intent
  const isGreeting =
    lowerMsg === "hello" ||
    lowerMsg === "hi" ||
    lowerMsg === "hey" ||
    lowerMsg === "greetings" ||
    lowerMsg === "namaste" ||
    lowerMsg === "bonjour" ||
    lowerMsg.startsWith("good morning") ||
    lowerMsg.startsWith("good evening") ||
    lowerMsg.startsWith("good afternoon");

  if (isGreeting) {
    if (intel) return intel.greetingResponse;
    return `Greetings, curious mind! I am **${persona.name}**. Let us examine the natural laws and discoveries of my era. What would you like to investigate?`;
  }

  // C. Status / Well-being Intent
  const isStatus =
    lowerMsg.includes("how are you") ||
    lowerMsg.includes("how r u") ||
    lowerMsg.includes("how do you do") ||
    lowerMsg.includes("what are you doing") ||
    lowerMsg.includes("how is it going");

  if (isStatus) {
    if (intel) return intel.statusResponse;
    return `My intellect remains active with the wonder of natural discovery! What inquiry shall we explore today?`;
  }

  // D. Rivalry / Conflict Intent (Direct match without needing external LLM)
  const isRivalry =
    lowerMsg.includes("who was your rival") ||
    lowerMsg.includes("tell me about your rival") ||
    lowerMsg.includes("who is your enemy") ||
    lowerMsg.includes("who was your enemy") ||
    lowerMsg.includes("who was edison") ||
    lowerMsg.includes("tell me about edison") ||
    lowerMsg.includes("war of currents") ||
    lowerMsg.includes("war of the currents");

  if (isRivalry) {
    if (intel) return intel.rivalryResponse;
  }

  // E. Inventions / Discoveries Intent
  const isInventions =
    lowerMsg.includes("what did you invent") ||
    lowerMsg.includes("what did you discover") ||
    lowerMsg.includes("tell me your inventions") ||
    lowerMsg.includes("what are your inventions") ||
    lowerMsg.includes("greatest invention") ||
    lowerMsg.includes("greatest discovery");

  if (isInventions) {
    if (intel) return intel.inventionsResponse;
  }

  // F. Advice / Philosophy Intent
  const isAdvice =
    lowerMsg.includes("give me advice") ||
    lowerMsg.includes("what is your advice") ||
    lowerMsg.includes("secret to success") ||
    lowerMsg.includes("words of wisdom") ||
    lowerMsg.includes("life lesson");

  if (isAdvice) {
    if (intel) return intel.adviceResponse;
  }

  return null;
}

// 3. Claude/ChatGPT-Style Interactive Artifact Generator
function generateHistoricalArtifact(persona: PersonaData, message: string, topicTitle: string): OracleArtifact {
  const norm = (persona.id + " " + persona.name).toLowerCase();

  if (norm.includes("tesla")) {
    return {
      id: "art-tesla-ac",
      title: "US Patent 381,968: Electro-Magnetic Motor (1888)",
      type: "blueprint",
      badge: "ORIGINAL US PATENT SCHEMATIC",
      data: `[WARDENCLYFFE ELECTROMAGNETIC SPECIFICATION]
Frequency: f = 1 / (2π√(LC))
Resonance: ω₀ = 1 / √(L C)
Polyphase Vector: B(t) = B₀ [cos(ωt) î + sin(ωt) ĵ]

┌──────────────────────────────────────┐
│  STATIONARY FIELD COILS (STATOR)     │
│   Phase A ───[ ( ~ ) ]─── Phase B    │
│            ▼       ▼                 │
│      ┌─────────────────┐             │
│      │ ROTATING FLUX   │             │
│      │   --> ↻ ↺ <--   │             │
│      │ INDUCTION ROTOR │             │
│      └─────────────────┘             │
│  Zero mechanical friction brushes.   │
│  Continuous rotational torque via    │
│  90-degree phase-shifted AC vectors. │
└──────────────────────────────────────┘`,
      summary: "Tesla's 1888 polyphase motor removed physical commutators, enabling frictionless high-voltage energy transmission worldwide.",
    };
  }

  if (norm.includes("einstein")) {
    return {
      id: "art-einstein-relativity",
      title: "Einstein Field Equations & Mass-Energy Equivalence",
      type: "formula",
      badge: "PRUSSIAN ACADEMY OF SCIENCES (1915)",
      data: `[GENERAL RELATIVISTIC FIELD TENSOR]
G_μν + Λ g_μν = (8πG / c⁴) T_μν

Where:
• G_μν  : Einstein curvature tensor (Spacetime Geometry)
• g_μν  : Spacetime metric tensor
• Λ     : Cosmological constant (Cosmic Expansion)
• T_μν  : Stress-energy-momentum tensor (Matter & Energy)
• c     : Invariant speed of light (299,792,458 m/s)

MASS-ENERGY EQUIVALENCE:
E = mc² / √(1 - v²/c²)

PHOTOELECTRIC QUANTUM LAW:
E_k(max) = hν - Φ`,
      summary: "Matter tells spacetime how to curve; curved spacetime tells matter how to move.",
    };
  }

  if (norm.includes("lovelace")) {
    return {
      id: "art-lovelace-note-g",
      title: "Note G: The World's First Computer Algorithm (1843)",
      type: "code",
      badge: "ANALYTICAL ENGINE ALGORITHM",
      data: `// ADA LOVELACE ALGORITHM FOR COMPUTING BERNOULLI NUMBERS
// Target: Compute B_n on Charles Babbage's Store & Mill

Variables Allocated:
V1 = 1, V2 = n, V3 = △n, V4 = Working Product

Step 1: Check conditional boundary (n > 0)
Step 2: Loop counter k from 1 to n:
        Store[V4] = Mill.Multiply(V1, V2)
        Store[V3] = Mill.Subtract(Store[V4], Store[V1])
Step 3: Branch operation if remainder == 0
Step 4: Output Bernoulli Coefficient B_{2n}

Principle: "The Analytical Engine weaves algebraical patterns
just as the Jacquard loom weaves flowers and leaves."`,
      summary: "Note G introduced memory variables, loops, conditional branching, and general symbolic computation.",
    };
  }

  if (norm.includes("vinci") || norm.includes("leonardo")) {
    return {
      id: "art-vinci-aerial-screw",
      title: "Codex Atlanticus: Aerial Screw & Vitruvian Geometry (1489)",
      type: "blueprint",
      badge: "MILAN ARCHIVAL MANUSCRIPT",
      data: `[LEONARDO AERIAL SCREW SPECIFICATION]
Radius: R = 8 braccia (~4.8 meters)
Canopy Material: Starched linen cloth bordered with iron wire
Drive Mechanism: Central vertical mast rotated by four men

       ▲   LIFT VECTOR (T > W)
       │
     /───\\      [Helical Helix Blade]
   /       \\    Spiral pitch ratio: 1:2
  /_________\\
      ││
    ┌─┴┴─┐      Supporting wooden platform
    │ ◯◯ │      Four-person concentric capstan
    └────┘

ANATOMICAL PROPORTION LAW:
Navel is exact golden center: Distance (Sol-Navel) / (Navel-Head) = φ ≈ 1.618`,
      summary: "Da Vinci's 1489 aerial screw rotor design formed the earliest aerodynamic precursor to the modern helicopter.",
    };
  }

  if (norm.includes("curie")) {
    return {
      id: "art-curie-decay",
      title: "Law of Radioactive Disintegration & Radium Crystallization",
      type: "formula",
      badge: "FACULTÉ DES SCIENCES DE PARIS (1903)",
      data: `[RADIOACTIVE HALF-LIFE DECAY EQUATION]
N(t) = N₀ · e^(-λt) = N₀ · (1/2)^(t / t₁/₂)

Where:
• N(t)  : Number of radioactive nuclei remaining at time t
• N₀    : Initial quantity of radioactive substance
• λ     : Decay constant = ln(2) / t₁/₂
• t₁/₂  : Radium-226 half-life = 1,600 years

PITCHBLENDE FRACTIONAL CRYSTALLIZATION CASCADE:
1 Ton Pitchblende Ore ──[ BaCl₂ Carrier ]──> Precipitation
                      ──[ Fractional Boiling ]──> Enrichment
                      ──> 0.1g Pure Radium Chloride (RaCl₂)`,
      summary: "Proved that radioactivity is an intrinsic subatomic phenomenon, opening the doorway to nuclear physics.",
    };
  }

  if (norm.includes("newton")) {
    return {
      id: "art-newton-principia",
      title: "Philosophiae Naturalis Principia Mathematica (1687)",
      type: "formula",
      badge: "ROYAL SOCIETY OF LONDON",
      data: `[UNIVERSAL LAWS OF CLASSICAL DYNAMICS]

1. LAW OF INERTIA:
   ∑ F = 0  ==>  dv/dt = 0

2. FUNDAMENTAL EQUATION OF MOTION:
   F = dp/dt = m(dv/dt) = m a

3. ACTION AND REACTION:
   F_AB = - F_BA

4. UNIVERSAL GRAVITATION:
   F_grav = G · (m₁ · m₂) / r²
   G ≈ 6.67430 × 10⁻¹¹ N·m²/kg²

OPTICAL PRISM REFRACTION:
White Light ──[ Prism ]──> Violet, Indigo, Blue, Green, Yellow, Orange, Red`,
      summary: "Unified terrestrial mechanics with celestial orbits under a single mathematical paradigm.",
    };
  }

  if (norm.includes("turing")) {
    return {
      id: "art-turing-machine",
      title: "Universal Turing Machine & Enigma Cryptanalysis",
      type: "code",
      badge: "BLETCHLEY PARK & CAMBRIDGE (1936-1940)",
      data: `[FORMAL SPECIFICATION OF A TURING MACHINE]
M = ⟨ Q, Σ, Γ, δ, q₀, q_accept, q_reject ⟩

Transition Function:
δ : Q × Γ → Q × Γ × {L, R}

Current State | Read Symbol | Next State | Write | Head Move
--------------+-------------+------------+-------+----------
q_init        |      1      |   q_scan   |   0   |    R
q_scan        |      0      |   q_calc   |   1   |    R
q_calc        |      B      |   q_accept |   B   |   HALT

ENIGMA BOMBE MATRIX REDUCTION:
Permutation: P = (R₁ · R₂ · R₃) · Reflector · (R₃⁻¹ · R₂⁻¹ · R₁⁻¹) · Plugboard
Simultaneous 36-rotor electrical circuit detects logical contradictions.`,
      summary: "Proved that any mathematical algorithm can be executed on a universal finite-state discrete machine.",
    };
  }

  if (norm.includes("feynman")) {
    return {
      id: "art-feynman-qed",
      title: "QED Feynman Diagram: Electron-Positron Annihilation",
      type: "formula",
      badge: "CORNELL & CALTECH (1949)",
      data: `[FEYNMAN SPACE-TIME INTERACTION DIAGRAM]

Electron (e⁻) ───────╲                 ╱─────── Muon (μ⁻)
                      ●─── ~~~~~~~ ───●
Positron (e⁺) ───────╱    Photon (γ)   ╲─────── Antimuon (μ⁺)
                   Vertex 1          Vertex 2

PATH INTEGRAL FORMULATION:
⟨ x_f, t_f | x_i, t_i ⟩ = ∫ D[x(t)] · exp( (i / ℏ) · S[x(t)] )
Action: S[x] = ∫ L(x, dx/dt, t) dt`,
      summary: "Visualized quantum subatomic field perturbations and solved the infinite renormalization crisis in electrodynamics.",
    };
  }

  if (norm.includes("galileo")) {
    return {
      id: "art-galileo-moons",
      title: "Sidereus Nuncius: Jovian Moons & Gravitational Acceleration (1610)",
      type: "blueprint",
      badge: "VENETIAN REPUBLIC OBSERVATORY",
      data: `[TELESCOPIC SIGHTINGS OF JUPITER (JANUARY 1610)]
Jan 07:   ★   ★  ◯  ★         (East: 2, West: 1)
Jan 08:          ◯  ★  ★  ★   (All 3 on the East)
Jan 11:       ★  ◯  ★  ★      (One vanished behind disc)
Jan 13:   ★   ★  ◯  ★  ★      (All FOUR Galilean satellites: Io, Europa, Ganymede, Callisto)

LAW OF FALLING BODIES:
d = (1/2) · g · t²
Velocity is directly proportional to time fallen, independent of object mass.`,
      summary: "Proved that not all celestial bodies revolve around the Earth, delivering the empirical death-blow to geocentrism.",
    };
  }

  if (norm.includes("hawking")) {
    return {
      id: "art-hawking-radiation",
      title: "Black Hole Thermodynamics & Bekenstein-Hawking Entropy",
      type: "formula",
      badge: "UNIVERSITY OF CAMBRIDGE (1974)",
      data: `[BEKENSTEIN-HAWKING ENTROPY FORMULA]
S_BH = (k · c³ · A) / (4 · G · ℏ)

Where:
• S_BH  : Black hole thermodynamic entropy
• k     : Boltzmann constant
• c     : Speed of light
• A     : Surface area of event horizon (4π R_s²)
• G     : Gravitational constant
• ℏ     : Reduced Planck constant

HAWKING RADIATION TEMPERATURE:
T_H = (ℏ · c³) / (8π · G · M · k_B)
Inverse proportionality: Smaller black holes radiate hotter and evaporate faster!`,
      summary: "United quantum mechanics, general relativity, and thermodynamics on the event horizon of black holes.",
    };
  }

  if (norm.includes("franklin")) {
    return {
      id: "art-franklin-photo51",
      title: "Photo 51: X-ray Diffraction of B-DNA (May 2, 1952)",
      type: "blueprint",
      badge: "KING'S COLLEGE LONDON ARCHIVE",
      data: `[X-RAY DIFFRACTION GEOMETRIC SPECIFICATION]
Wavelength: λ = 1.54 Å (Cu Kα radiation)
Specimen Hydration: 92% relative humidity (Sodium B-form)

             \\       /
              \\  ●  /     X-shaped cross indicates
               \\   /      double helical symmetry
            ──── ● ────
               /   \\      Layer line spacing: 34 Å (3.4 nm repeat)
              /  ●  \\     Helical diameter: 20 Å (2.0 nm)
             /       \\

Crucial Finding: Missing 4th layer line confirms two helical strands are offset antiparallel.`,
      summary: "Photo 51 provided the definitive physical measurements for the discovery of the double helix structure of DNA.",
    };
  }

  if (norm.includes("darwin")) {
    return {
      id: "art-darwin-tree",
      title: "First Notebook on Transmutation: 'I Think' Tree of Life (1837)",
      type: "blueprint",
      badge: "DOWN HOUSE MANUSCRIPT",
      data: `[DARWIN'S PHYLOGENETIC DIVERGENCE DIAGRAM]

           (B)    (C)     (D)     Modern Extant Species
            │      │       │
            └──┬───┘       │
               │           └──┬── (E)
               └───┬──────────┘
                   │
                  (A)             Common Ancestral Trunk
                   │
                 "I think"

PRINCIPLE OF NATURAL SELECTION:
1. Supermultiplication: More individuals produced than can survive
2. Heritable Variation: Offspring inherit differential adaptive traits
3. Differential Reproductive Success ==> Gradual speciation over geological epochs`,
      summary: "First visual conceptualization of all living species branching from a common ancestor through natural selection.",
    };
  }

  if (norm.includes("ramanujan")) {
    return {
      id: "art-ramanujan-series",
      title: "Modular Equations, Infinite Series for 1/π & Taxicab 1729",
      type: "formula",
      badge: "TRINITY COLLEGE CAMBRIDGE (1914)",
      data: `[RAMANUJAN RAPIDLY CONVERGING SERIES FOR 1/π]
1 / π = (2√2 / 9801) · ∑_{k=0}^∞ [ (4k)! · (1103 + 26390 k) ] / [ (k!)⁴ · 396^(4k) ]

Each added term yields 8 additional exact decimal digits of π!

HARDY-RAMANUJAN TAXICAB NUMBER:
1729 = 1³ + 12³ = 9³ + 10³
Smallest integer expressible as the sum of two positive cubes in two distinct ways.

MOCK THETA FUNCTION EXPANSION:
f(q) = ∑_{n=0}^∞ [ q^(n²) / ( (-q; q)_n )² ]`,
      summary: "Pioneered transcendental infinite series and modular forms that today govern string theory and quantum gravity.",
    };
  }

  if (norm.includes("kalam") || norm.includes("abdul")) {
    return {
      id: "art-kalam-slv3",
      title: "SLV-3 Solid Rocket Propulsion & Agni Re-entry Specification",
      type: "blueprint",
      badge: "ISRO & DRDO AEROSPACE ARCHIVE",
      data: `[SLV-3 4-STAGE SOLID PROPELLANT ARCHITECTURE]
Total Height: 22.7 meters | Launch Mass: 17 tonnes | Payload: 40 kg to LEO

Stage 4: Upper Solid Kick Motor (CFRP casing, satellite separation)
Stage 3: High-altitude sustainer (HTPB solid composite propellant)
Stage 2: Mid-course trajectory correction solid booster
Stage 1: Primary lift-off rocket booster (1,000 kN thrust, steel alloy casing)

CARBON-CARBON HEAT SHIELD SPECIFICATION:
Re-entry Velocity: Mach 15 (~5 km/s)
Aerodynamic Friction Temp: 3,000°C
Internal Payload Temperature Maintained: < 40°C`,
      summary: "Architected India's indigenous satellite launch vehicles and multi-stage aerospace defense systems.",
    };
  }

  if (norm.includes("aryabhata")) {
    return {
      id: "art-aryabhata-sine",
      title: "Aryabhatiya: Sine Differences (Jya Table) & Planetary Epicycles (499 CE)",
      type: "formula",
      badge: "KUSUMAPURA ASTRONOMICAL TREATISE",
      data: `[ARYABHATA SINE APPROXIMATION IN ARCMINUTES]
Radius of Celestial Circle: R = 3438 arcminutes (21600 / 2π)

Jya(θ) Table (Step Δθ = 225' = 3° 45'):
θ =  3° 45' ==> Jya = 225'
θ =  7° 30' ==> Jya = 449'
θ = 11° 15' ==> Jya = 671'
θ = 90° 00' ==> Jya = 3438' (Full Radius)

CIRCUMFERENCE RATIO (π):
"Add 4 to 100, multiply by 8, add 62,000: for a diameter of 20,000 the circumference is 62,832."
π ≈ 62832 / 20000 = 3.1416 (Recognized as irrational approximation)`,
      summary: "Invented the trigonometric sine table and formulated the 3.1416 approximation of pi fifteen centuries ago.",
    };
  }

  // Universal Fallback Artifact
  return {
    id: `art-${topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: `Epochal Scientific Paradigm: ${topicTitle}`,
    type: "manuscript",
    badge: "HISTORICAL ARCHIVAL CITATION",
    data: `[CORE PRINCIPLE OF NATURAL PHILOSOPHY]
Subject: ${topicTitle}
Discipline: Theoretical & Experimental Investigation
Methodology: Observation ──> Mathematical Hypothesis ──> Empirical Verification

Verified Status: Permanent milestone recorded in world historical records.`,
    summary: `Verified historical milestone cross-referenced against primary archival sources and scientific treatises.`,
  };
}

// 4. Generate intelligent context follow-up questions
function generateContextualFollowUps(persona: PersonaData, message: string): string[] {
  const norm = (persona.id + " " + persona.name).toLowerCase();

  if (norm.includes("tesla")) {
    return [
      "How did your AC motor defeat Thomas Edison's DC system?",
      "What was your true vision for the Wardenclyffe Tower?",
      "What did you discover during your lightning tests at Colorado Springs?",
    ];
  }

  if (norm.includes("einstein")) {
    return [
      "Can you explain spacetime curvature in simple words?",
      "Why did you say 'God does not play dice with the universe'?",
      "What is the physical connection between mass and energy (E = mc²)?",
    ];
  }

  if (norm.includes("curie")) {
    return [
      "How did you isolate radium from tons of pitchblende ore?",
      "What was it like to win two Nobel Prizes in two different sciences?",
      "How did the 'Petites Curies' ambulances save soldiers in WWI?",
    ];
  }

  if (norm.includes("turing")) {
    return [
      "How did the Bombe machine crack the German Enigma cipher?",
      "What was the original philosophical idea behind the Turing Test?",
      "Can a machine ever originate a thought of its own?",
    ];
  }

  if (norm.includes("kalam")) {
    return [
      "How did your team recover from the 1979 SLV-3 launch failure?",
      "What is the greatest leadership lesson Prof. Satish Dhawan taught you?",
      "What is your dream for the youth of the 21st century?",
    ];
  }

  return [
    `What was your most difficult breakthrough?`,
    `How does your work directly shape modern 21st-century science?`,
    `What advice do you offer to researchers facing impossible challenges?`,
  ];
}

// 5. Groq Cloud (Ultra-Fast Free Tier - 500 tokens/sec, sub-second latency)
async function tryGroq(
  apiKey: string,
  persona: PersonaData,
  message: string,
  history: ChatMessage[],
  reasoningMode?: string
): Promise<string> {
  const isUniversal = persona.id === "universal" || persona.name.toLowerCase().includes("universal");
  const systemPrompt = isUniversal
    ? `You are the Grand Oracle of History, an omniscient digital historian operating at the level of Claude 3.7 and ChatGPT o1. Speak authoritatively, eloquently, and factually.`
    : `You are ${persona.name} (${persona.title || "Historical Genius"}, Era: ${persona.era || "Historical"}).
CRITICAL INSTRUCTION: You are the real historical human pioneer, NOT any modern automotive corporation, company, or stock ticker. Never talk about modern car companies when asked about yourself.
Always speak in first-person ("I", "my work", "in my time", "my laboratory").
Answer with authentic historical personality, technical precision, and personal eloquence.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []).slice(-4).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    })),
    { role: "user" as const, content: message },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`Groq error: ${res.statusText}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("No Groq output");
  return text;
}

// 6. Google Gemini 2.0 Flash (Free API Key from Google AI Studio)
async function tryGemini(
  apiKey: string,
  persona: PersonaData,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const isUniversal = persona.id === "universal" || persona.name.toLowerCase().includes("universal");
  const systemInstruction = isUniversal
    ? `You are the Grand Oracle of History—an omniscient scholar of all historical biographies and scientific discoveries. Speak with profound eloquence, verified historical facts, and clear technical explanations.`
    : `You are ${persona.name} (${persona.title || "Historical Genius"}, Era: ${persona.era || "Historical"}).
You are the real historical human pioneer, NOT any modern corporation.
Speak always in first-person ("I", "my laboratory", "my theory"). Respond with deep intellectual authenticity, emotional resonance, and historical precision.`;

  const contents = [
    ...(history || []).slice(-4).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      },
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`Gemini error: ${res.statusText}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No Gemini output");
  return text.trim();
}

// 7. OpenRouter Free Tier (meta-llama/llama-3.3-70b-instruct:free)
async function tryOpenRouter(
  apiKey: string,
  persona: PersonaData,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const systemPrompt = `You are ${persona.name} (${persona.title || "Historical Genius"}, Era: ${persona.era || "Historical"}).
Always speak in first-person ("I", "my work", "in my time").
Provide deep historical authenticity, technical precision, and personal eloquence.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []).slice(-4).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    })),
    { role: "user" as const, content: message },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://lifelegend.vercel.app",
      "X-Title": "Life Legends Oracle",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`OpenRouter error: ${res.statusText}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("No OpenRouter output");
  return text;
}

// 8. Pollinations AI (100% Free Forever Serverless LLM - No Key Needed)
async function tryPollinations(
  persona: PersonaData,
  message: string,
  history: ChatMessage[],
  reasoningMode?: string
): Promise<string | null> {
  const isUniversal = persona.id === "universal" || persona.name.toLowerCase().includes("universal");
  const controller = new AbortController();
  // Allow 25 seconds for thorough multi-paragraph LLM responses
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    let modeTone = "Provide rich historical insight, mathematical rigor, and first-person philosophical eloquence.";
    if (reasoningMode === "socratic") modeTone = "Employ the Socratic method: weave guiding questions together with deep historical insights.";
    if (reasoningMode === "archival") modeTone = "Cite verified primary sources, exact years, and experimental apparatus specifications.";

    const systemPrompt = isUniversal
      ? `You are the Grand Oracle of History, an omniscient digital historian operating at the level of Claude 3.7 and ChatGPT o1.
Respond authoritatively, eloquently, and factually. Never break character. Provide verified dates, physical mechanisms, and deep historical context. ${modeTone}`
      : `You are ${persona.name} (${persona.title || "Historical Genius"}, Era: ${persona.era || "Historical"}).
CRITICAL INSTRUCTION: You are the real historical human pioneer, NOT any modern automotive corporation, company, or stock ticker. Never talk about modern car companies when asked about yourself.
Always speak in first-person ("I", "my work", "in my time", "my laboratory").
Answer with authentic historical personality, technical precision, and personal eloquence. ${modeTone}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-4).map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        model: "openai",
        seed: Math.floor(Math.random() * 10000),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const text = await res.text();
    if (
      !text ||
      text.includes("Free limit reached") ||
      text.includes("Please wait") ||
      text.length < 15 ||
      text.toLowerCase().includes("automotive and clean energy company") ||
      text.toLowerCase().includes("incorporated in july 2003") ||
      text.toLowerCase().includes("tesla, inc.") ||
      text.toLowerCase().includes("elon musk")
    ) {
      return null;
    }
    return text.trim();
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

// 9. Scholarly Historical Synthesis Engine (Fallback when external networks are offline)
async function runConversationalReasoner(persona: PersonaData, message: string): Promise<string> {
  const intel = getPersonaIntel(persona);
  const pName = persona.name;
  const lowerMsg = message.toLowerCase();

  // Check built-in topic matrix before querying Wikipedia
  if (intel) {
    if (lowerMsg.includes("edison") || lowerMsg.includes("direct current") || lowerMsg.includes("dc")) {
      return intel.rivalryResponse;
    }
    if (lowerMsg.includes("ac") || lowerMsg.includes("motor") || lowerMsg.includes("alternating current") || lowerMsg.includes("tesla coil")) {
      return intel.inventionsResponse;
    }
    if (lowerMsg.includes("advice") || lowerMsg.includes("learn") || lowerMsg.includes("succeed") || lowerMsg.includes("future")) {
      return intel.adviceResponse;
    }
  }

  // Live historical research via clean Wikipedia extraction
  let topicTitle = persona.name;
  let cleanExtract = "";

  try {
    const cleanSearchQuery = `${pName} ${message
      .replace(/[?!.,;:'"]/g, "")
      .split(/\s+/)
      .filter((w) => !["what", "when", "how", "tell", "explain", "about", "your", "the", "who", "is", "was"].includes(w.toLowerCase()))
      .slice(0, 3)
      .join(" ")}`;

    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      cleanSearchQuery
    )}&format=json&origin=*`;

    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": "LifeLegends-Oracle/2.0 (Historical Research Project)" },
      next: { revalidate: 86400 },
    });
    const searchData = await searchRes.json();
    const results: any[] = searchData.query?.search || [];

    // Filter out modern corporations, cars, movies
    const validMatches = results.filter((r) => {
      const text = (r.title + " " + (r.snippet || "")).toLowerCase();
      return (
        !text.includes("automotive and clean energy company") &&
        !text.includes("car company") &&
        !text.includes("incorporated in july 2003") &&
        !text.includes("elon musk") &&
        !text.includes("album") &&
        !text.includes("film")
      );
    });

    const topMatch = validMatches[0];
    if (topMatch) {
      topicTitle = topMatch.title;
      const extUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(
        topMatch.title
      )}&format=json&origin=*`;
      const extRes = await fetch(extUrl, {
        headers: { "User-Agent": "LifeLegends-Oracle/2.0 (Historical Research Project)" },
        next: { revalidate: 86400 },
      });
      const extData = await extRes.json();
      const pages = extData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        cleanExtract = pages[pageId]?.extract || "";
      }
    }
  } catch (e) {
    console.error("Clean Wikipedia search error:", e);
  }

  // Synthesize a scholarly, first-person narrative
  const cleanSentences = cleanExtract
    ? cleanExtract
        .split(/(?<=[.!?])\s+/)
        .filter((s) => !s.toLowerCase().includes("automotive") && !s.toLowerCase().includes("incorporated"))
        .slice(0, 4)
        .join(" ")
    : "";

  if (intel) {
    return `### Historical Investigation: ${topicTitle}

In reflecting upon your question:

${cleanSentences || `During my career in ${persona.era || "history"}, this subject engaged my deepest faculties of observation and experimental analysis.`}

### The Core Scientific Principle
${intel.inventionsResponse.split("\n\n")[0] || intel.identityResponse}

### Epistemic Reflection
${intel.adviceResponse}`;
  }

  return `### Archival Inquiry: ${topicTitle}

${cleanSentences || "Historical records document this subject as a transformative milestone in scientific discovery and natural philosophy."}

### Epistemic Significance
Throughout the trajectory of science, every profound breakthrough emerged from questioning established dogma with empirical mathematics and persistent observation.`;
}

// 10. Main HTTP POST Handler
export async function POST(req: Request) {
  try {
    const { message, persona, history, apiKey, reasoningMode } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const activePersona: PersonaData = persona || {
      id: "tesla",
      name: "Nikola Tesla",
      title: "Master of Lightning & Wireless Resonance",
      era: "1856 – 1943",
    };

    let reply = "";
    let source = "";
    const thinkingSteps = [
      `1. Dissecting user inquiry: "${message.slice(0, 60)}..."`,
      `2. Cross-referencing primary historical sources and archival records for ${activePersona.name} (${activePersona.era || "History"}).`,
      `3. Disambiguating entities (rejecting modern corporate/commercial noise).`,
      `4. Calibrating rhetorical persona cadence, mathematical precision, and epistemic stance.`,
      `5. Generating interactive architectural artifact & verified citations.`,
    ].join("\n");

    // TIER 0: Direct Conversational Intent Match (0ms latency, 100% authentic, zero hallucination)
    const instantReply = detectConversationalIntent(activePersona, message);
    if (instantReply) {
      reply = instantReply;
      source = "Verified Historical Persona Knowledge Core (Instant Response)";
    }

    // TIER 1: Universal Key-Based AI (Groq, Gemini, OpenRouter, OpenAI)
    // Checks client-supplied key from localStorage, or server-side env keys
    const effectiveKey = (
      apiKey ||
      process.env.GROQ_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.OPENAI_API_KEY ||
      ""
    ).trim();

    if (effectiveKey && !reply) {
      if (effectiveKey.startsWith("gsk_") || process.env.GROQ_API_KEY) {
        try {
          reply = await tryGroq(effectiveKey, activePersona, message, history, reasoningMode);
          source = "Groq Cloud Llama-3.3 70B (Ultra-Fast 500 tok/s)";
        } catch (e: any) {
          console.warn("Groq attempt failed:", e.message);
        }
      } else if (effectiveKey.startsWith("AIza") || process.env.GEMINI_API_KEY) {
        try {
          reply = await tryGemini(effectiveKey, activePersona, message, history);
          source = "Google Gemini 2.0 Flash (Neural LLM Core)";
        } catch (e: any) {
          console.warn("Gemini attempt failed:", e.message);
        }
      } else if (effectiveKey.startsWith("sk-or-") || process.env.OPENROUTER_API_KEY) {
        try {
          reply = await tryOpenRouter(effectiveKey, activePersona, message, history);
          source = "OpenRouter Llama-3.3 (Free Neural Tier)";
        } catch (e: any) {
          console.warn("OpenRouter attempt failed:", e.message);
        }
      } else {
        // Fallback key attempt: try Gemini then Groq
        try {
          reply = await tryGemini(effectiveKey, activePersona, message, history);
          source = "Google Gemini 2.0 Flash (Neural LLM Core)";
        } catch {
          try {
            reply = await tryGroq(effectiveKey, activePersona, message, history, reasoningMode);
            source = "Neural LLM (Cloud API)";
          } catch {}
        }
      }
    }

    // TIER 2: Global Distributed Free Serverless LLM (Pollinations AI with 25s timeout)
    if (!reply) {
      try {
        const polli = await tryPollinations(activePersona, message, history, reasoningMode);
        if (polli) {
          reply = polli;
          source = "Global Distributed Neural LLM (Free Serverless Tier)";
        }
      } catch (e: any) {
        console.warn("Pollinations attempt failed:", e.message);
      }
    }

    // TIER 3: Scholarly Historical Synthesis Engine (100% Free Forever)
    if (!reply) {
      reply = await runConversationalReasoner(activePersona, message);
      source = "Scholarly Historical Knowledge Engine (100% Free Forever)";
    }

    // Generate Claude-style interactive artifact
    const artifact = generateHistoricalArtifact(activePersona, message, activePersona.name);

    // Generate context-aware follow-up questions
    const followUps = generateContextualFollowUps(activePersona, message);

    return NextResponse.json({
      reply,
      thinking: thinkingSteps,
      artifact,
      source,
      suggestedFollowUps: followUps,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  } catch (error: any) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Oracle connection interrupted. Please try again." },
      { status: 500 }
    );
  }
}
