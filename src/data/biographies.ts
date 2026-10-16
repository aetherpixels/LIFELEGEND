export interface BiographyRecord {
  _id: string;
  name: string;
  slug: { current: string };
  era: string;
  category: string;
  shortDescription: string;
  imageUrl: string;
  quotes: string[];
  rawContentText: string;
  content: Array<{
    _type: string;
    _key: string;
    children: Array<{ _type: string; _key: string; text: string }>;
  }>;
}

export const BIOGRAPHIES_DATA: BiographyRecord[] = [
  {
    _id: "bio-nikola-tesla",
    name: "Nikola Tesla",
    slug: { current: "nikola-tesla" },
    era: "1856 – 1943",
    category: "Innovators",
    shortDescription:
      "Serbian-American electrical engineer, futurist, and visionary inventor who developed alternating current (AC) electricity, the induction motor, and early wireless transmission.",
    imageUrl: "/portraits/nikola-tesla.jpg",
    quotes: [
      "The present is theirs; the future, for which I really worked, is mine.",
      "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    ],
    rawContentText:
      "Nikola Tesla was born in Smiljan, Croatia, and rose to become one of history's most brilliant electrical innovators. After studying engineering and physics, he immigrated to the United States in 1884, working briefly for Thomas Edison before embarking on his own pioneering ventures. Tesla developed the polyphase alternating current (AC) system, teaming with George Westinghouse to defeat Edison's direct current in the legendary War of the Currents. His invention of the AC induction motor revolutionized industrial power worldwide. At his laboratory in Colorado Springs and Wardenclyffe on Long Island, Tesla conducted daring experiments in wireless power transmission, radio communication, and resonant frequencies. Although he died impoverished in New York City, Tesla's groundbreaking patents laid the foundation for modern power grids, radio, robotics, and global telecommunications.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Nikola Tesla was born in Smiljan, Croatia, in 1856, into a world lit by gas lamps and driven by steam. From early youth, Tesla demonstrated an astonishing photographic memory and the uncanny ability to visualize complex electrical mechanisms entirely in his mind before drafting blue prints or cutting metal.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "In 1884, Tesla arrived in New York City with four cents in his pocket and a letter of recommendation to Thomas Edison. While Edison championed Direct Current (DC), which suffered crippling transmission losses over short distances, Tesla recognized that polyphase Alternating Current (AC) was the true electrical language of the cosmos. Partnering with industrialist George Westinghouse, Tesla illuminated the 1893 Chicago World's Fair, winning the 'War of the Currents' and cementing AC as the global standard for planetary electrification.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Tesla's ambitions soared far beyond lighting streets. At Wardenclyffe Tower, he sought to transmit limitless clean energy and information wirelessly across the globe using Earth's natural electromagnetic resonance. While modern society took decades to catch up to his foresight, humanity now thrives in the wireless digital era that Tesla dreamed into reality.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-ada-lovelace",
    name: "Ada Lovelace",
    slug: { current: "ada-lovelace" },
    era: "1815 – 1852",
    category: "Pioneers",
    shortDescription:
      "English mathematician and writer widely celebrated as the world's first computer programmer for her visionary work on Charles Babbage's mechanical general-purpose computer.",
    imageUrl: "/portraits/ada-lovelace.jpg",
    quotes: [
      "The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.",
      "That brain of mine is something more than merely mortal; as time will show.",
    ],
    rawContentText:
      "Augusta Ada King, Countess of Lovelace, was the daughter of the Romantic poet Lord Byron and mathematician Anne Isabella Milbanke. Determined that Ada should avoid her father's volatile poetic temperament, her mother educated her rigorously in mathematics and science. In 1833, Ada met inventor Charles Babbage, who had designed the Analytical Engine. Lovelace translated an Italian paper on the engine and added extensive annotations, titled 'Note G', which contained an algorithm for calculating Bernoulli numbers—the first computer program ever published. Lovelace foresaw that calculating machines could manipulate symbols, compose music, generate visual graphics, and collaborate with human thought, earning her the title of prophet of modern computing.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Born in 1815, Augusta Ada Byron was educated under an unusual curriculum of mathematics, logic, and astronomy. She coined the term 'Poetical Science' to describe her methodology: combining strict analytical rigor with creative metaphorical imagination to comprehend the hidden laws of the universe.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "When Charles Babbage designed his mechanical steam-driven Analytical Engine, most saw only a faster calculator for arithmetic tables. Lovelace alone envisioned that the machine could manipulate any symbolic system. In Note G of her 1843 publication, she detailed loops, memory memory allocations, and conditional operations to compute Bernoulli numbers.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Lovelace anticipated modern artificial intelligence, questioning whether mechanical engines could originate genuine thoughts or merely perform what humans instructed. Her vision remains a guiding light across computer science.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-marie-curie",
    name: "Marie Curie",
    slug: { current: "marie-curie" },
    era: "1867 – 1934",
    category: "Scientists",
    shortDescription:
      "Polish-French physicist and chemist who conducted pioneering research on radioactivity, discovered radium and polonium, and remains the only person to win Nobel Prizes in two different scientific fields.",
    imageUrl: "/portraits/marie-curie.jpg",
    quotes: [
      "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      "I was taught that the way of progress was neither swift nor easy.",
    ],
    rawContentText:
      "Marie Skłodowska Curie was born in Warsaw, Poland. Denied higher education under Russian rule because of her gender, she attended the clandestine 'Flying University' before emigrating to Paris to study at the Sorbonne under grueling conditions. Collaborating with her husband Pierre Curie, she analyzed uranium ore pitchblende, discovering two new radioactive elements: polonium and radium. Marie Curie received the 1903 Nobel Prize in Physics and the 1911 Nobel Prize in Chemistry. During World War I, she developed mobile radiography units ('Petites Curies') to assist battlefield surgeons. Her tireless work pioneered atomic physics and modern radiotherapy in cancer treatment.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Marie Curie demonstrated unmatched tenacity against systemic prejudice and financial hardship. Arriving in Paris in 1891, she survived on bread and tea in a freezing garret while mastering physics and mathematics at the Sorbonne.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Working alongside Pierre Curie in a rudimentary, drafty wooden shed, she manually processed tons of radioactive pitchblende residues. Through thousands of fractional crystallizations, she isolated pure radium salts, uncovering the subatomic disintegration that fundamentally rewrote classical physics.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Refusing to patent her discovery so that medicine could freely use radium, Curie exemplified scientific altruism. She was the first woman to win a Nobel Prize, the first person to win twice, and the first female professor at the University of Paris.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-leonardo-da-vinci",
    name: "Leonardo da Vinci",
    slug: { current: "leonardo-da-vinci" },
    era: "1452 – 1519",
    category: "Polymaths",
    shortDescription:
      "Florentine Italian Renaissance polymath who excelled in painting, sculpture, architecture, music, engineering, anatomy, geology, and astronomy.",
    imageUrl: "/portraits/leonardo-da-vinci.jpg",
    quotes: [
      "Learning never exhausts the mind.",
      "Simplicity is the ultimate sophistication.",
    ],
    rawContentText:
      "Leonardo di ser Piero da Vinci was born near Florence, Italy, and emerged as the archetypal Renaissance man. Renowned globally for masterworks such as the Mona Lisa and The Last Supper, Leonardo's genius extended far beyond fine art. His notebooks reveal extraordinary scientific acumen, including detailed anatomical dissections that anticipated modern biomechanics, designs for flying machines, helicopters, submarines, and hydraulic systems. Leonardo lived by the principle of 'Saper vedere' (knowing how to see), treating art and science not as separate domains, but as indivisible methods for uncovering cosmic harmony.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Leonardo da Vinci was gifted with an insatiable, omnivorous curiosity. Trained in Florence under master Andrea del Verrocchio, Leonardo mastered metallurgy, chemistry, draughtsmanship, and optics.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "His anatomical studies, conducted through clandestine nighttime dissections in hospital morgues, produced the most accurate depictions of human muscles, vascular systems, and the four-chambered heart centuries ahead of medical science. He pioneered 'sfumato'—the delicate smoke-like gradation of light and shadow.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "To Leonardo, observation was sacred. His mirror-written notebooks contain blue prints for automated armored vehicles, parachute canopies, and concentric gears, proving that an integrated creative mind knows no intellectual borders.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-albert-einstein",
    name: "Albert Einstein",
    slug: { current: "albert-einstein" },
    era: "1879 – 1955",
    category: "Physicists",
    shortDescription:
      "German-born theoretical physicist who developed the theories of special and general relativity, formulated E=mc², and reshaped modern cosmology and quantum theory.",
    imageUrl: "/portraits/albert-einstein.jpg",
    quotes: [
      "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
      "The most incomprehensible thing about the world is that it is comprehensible.",
    ],
    rawContentText:
      "Albert Einstein revolutionized our understanding of the universe. In 1905, while working as a patent clerk in Bern, Switzerland, Einstein published four groundbreaking papers: explaining the photoelectric effect (which earned him the 1921 Nobel Prize in Physics), Brownian motion, special relativity, and mass-energy equivalence (E = mc²). In 1915, he completed General Relativity, revealing that gravity is not a Newtonian pulling force, but the curvature of spacetime warped by mass and energy. Confirmed by Arthur Eddington's 1919 solar eclipse expedition, Einstein became a global icon of intellectual courage and pacifism.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Albert Einstein approached physics through vivid visual thought experiments ('Gedankenexperimenten'). While working quietly at the Swiss Patent Office, he questioned what the universe would look like if one could ride alongside a beam of light.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "His 1905 'Annus Mirabilis' destroyed the absolute status of Newtonian time and space. He showed that time ticks slower and space contracts for an observer in motion, keeping the speed of light invariant. In 1915, his General Theory of Relativity established that heavy bodies like stars warp the geometric fabric of space and time.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Beyond theoretical physics, Einstein stood as a fierce defender of humanitarian ideals, civil rights, and peace. His legacy continues to guide our comprehension of black holes, gravitational waves, and expanding cosmic horizons.",
          },
        ],
      },
    ],
  },
  // --- 10 NEW LEGENDARY BIOGRAPHIES ---
  {
    _id: "bio-isaac-newton",
    name: "Sir Isaac Newton",
    slug: { current: "isaac-newton" },
    era: "1642 – 1727",
    category: "Scientists",
    shortDescription:
      "English polymath who formulated the laws of motion and universal gravitation, invented calculus, and established the foundation of classical mechanics and optics.",
    imageUrl: "/portraits/isaac-newton.jpg",
    quotes: [
      "If I have seen further, it is by standing on the shoulders of giants.",
      "I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the seashore.",
    ],
    rawContentText:
      "Sir Isaac Newton was born in Woolsthorpe, England. During the Great Plague of 1665, while Cambridge University was closed, Newton retreated to his family estate and experienced his 'Year of Wonders'. In solitary contemplation, he developed the infinitesimal calculus, dissected white sunlight into its chromatic spectrum with prisms, and formulated the universal law of gravitation. In 1687, he published Philosophiae Naturalis Principia Mathematica, one of the most monumental works in scientific history, unveiling his three laws of motion. As Master of the Royal Mint and President of the Royal Society, Newton's mechanical clockwork universe guided human physics for over two centuries.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Isaac Newton was an austere, intensely focused scholar. In 1665, when plague struck England, the 23-year-old student returned to his mother's farm at Woolsthorpe. Watching an apple fall from an orchard tree, he realized that the identical force pulling the apple to the earth keeps the Moon in orbit around our world.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "In the Principia Mathematica (1687), Newton unified terrestrial and celestial mechanics under mathematical law. His three laws of motion—inertia, F=ma, and equal-and-opposite reaction—allowed humans to calculate planetary orbits, predict tides, and eventually construct spacecraft.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Newton also invented the reflecting telescope using curved mirrors, revolutionized optical theory, and formulated calculus independently. His mathematical mastery redefined humanity's place in an orderly cosmos.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-alan-turing",
    name: "Alan Turing",
    slug: { current: "alan-turing" },
    era: "1912 – 1954",
    category: "Pioneers",
    shortDescription:
      "English mathematician, cryptanalyst, and philosopher widely regarded as the father of theoretical computer science and artificial intelligence.",
    imageUrl: "/portraits/alan-turing.jpg",
    quotes: [
      "Sometimes it is the people no one imagines anything of who do the things that no one can imagine.",
      "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    ],
    rawContentText:
      "Alan Mathison Turing laid the mathematical blueprint for modern digital computers. In 1936, he published his seminal paper introducing the 'Turing Machine'—a theoretical device capable of performing any algorithmic computation. During World War II, Turing was the intellectual centerpiece at Bletchley Park's Hut 8, designing the electromechanical 'Bombe' machine that cracked Nazi Enigma ciphers, saving millions of lives. After the war, Turing pioneered artificial intelligence, formulating the celebrated 'Turing Test' for machine cognition and exploring mathematical morphogenesis in biology. Despite tragic persecution under homophobic British laws, Turing was granted a royal pardon in 2013 and is remembered as a supreme hero of human freedom and intellect.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Alan Turing possessed a singular gift for abstract reduction. At age 24, he answered David Hilbert's 'Entscheidungsproblem' by formulating a universal machine with a tape, read head, and discrete states. That mathematical abstraction became the conceptual foundation for all software and digital computing.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "At Bletchley Park during World War II, Turing led the codebreaking unit that intercepted German U-boat communications. His electromechanical 'Bombe' rapidly eliminated impossible Enigma rotor settings, deciphering secret signals and shortening the war by an estimated two to four years.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "In 1950, Turing asked: 'Can machines think?' He proposed the Imitation Game (Turing Test) and designed early computers at Manchester. Today, every smartphone, supercomputer, and AI algorithm stands as a living descendant of Turing's intellect.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-richard-feynman",
    name: "Richard Feynman",
    slug: { current: "richard-feynman" },
    era: "1918 – 1988",
    category: "Physicists",
    shortDescription:
      "American theoretical physicist renowned for his work in quantum electrodynamics, path integral formulations, nanotechnology, and his charismatic passion for teaching.",
    imageUrl: "/portraits/richard-feynman.jpg",
    quotes: [
      "The first principle is that you must not fool yourself—and you are the easiest person to fool.",
      "I would rather have questions that can't be answered than answers that can't be questioned.",
    ],
    rawContentText:
      "Richard Phillips Feynman was one of the most vibrant and iconoclastic minds in modern physics. Born in Queens, New York, Feynman joined the Manhattan Project at Los Alamos in his twenties, solving crucial calculations for uranium enrichment while amusing colleagues by picking safes. After the war, Feynman transformed quantum physics by creating Feynman Diagrams—visual, intuitive schemas for tracking subatomic particle interactions. For his reformulations of quantum electrodynamics (QED), Feynman shared the 1965 Nobel Prize in Physics. He predicted the rise of quantum computing and nanotechnology in his famous 1959 lecture 'There's Plenty of Room at the Bottom', and famously uncovered the O-ring defect in the 1986 Challenger space shuttle disaster.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Richard Feynman approached physics with irreverent curiosity, bongo drums, and an intolerance for empty pretension. He believed that if you cannot explain a concept to a freshman student, you do not truly understand it yourself.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "His Feynman Diagrams replaced intractable differential equations with elegant line drawings showing positrons traveling backward in time and photons exchanging energy. In 1965, he was awarded the Nobel Prize in Physics alongside Sin-Itiro Tomonaga and Julian Schwinger.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Feynman pioneered nanotechnology, quantum simulation, and served on the Presidential Commission investigating the Challenger disaster, demonstrating live on television how cold temperatures made rubber O-rings brittle. His passion for truth remains legendary.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-galileo-galilei",
    name: "Galileo Galilei",
    slug: { current: "galileo-galilei" },
    era: "1564 – 1642",
    category: "Astronomers",
    shortDescription:
      "Italian astronomer, physicist, and engineer often described as the 'father of observational astronomy' and the pioneer of the modern scientific method.",
    imageUrl: "/portraits/galileo-galilei.jpg",
    quotes: [
      "Eppur si muove (And yet it moves).",
      "You cannot teach a man anything; you can only help him find it within himself.",
    ],
    rawContentText:
      "Galileo Galilei was born in Pisa, Italy. Questioning the unquestioned scholastic authority of Aristotle, Galileo turned to systematic experimentation. In 1609, he built an improved 30x magnification optical telescope and directed it skyward. He discovered the four largest moons of Jupiter (proving not everything orbited the Earth), resolved craters on the Moon, tracked sunspots, and observed the phases of Venus. His observations confirmed the heliocentric model of Nicolaus Copernicus. In 1633, the Roman Inquisition condemned Galileo to house arrest for heresy. Standing firm in defense of empirical truth, Galileo's work catalyzed the European Scientific Revolution.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Galileo insisted that nature's book is written in the language of mathematics. Dropping unequal weights from towers and rolling balls down inclined planes, he proved that all objects fall at the same acceleration regardless of mass when air resistance is eliminated.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Turning his telescope to the heavens in winter 1609, Galileo saw moons orbiting Jupiter, mountains casting shadows on the Moon, and stars invisible to the naked eye. In his book Sidereus Nuncius (Starry Messenger), he showed that the celestial heavens were imperfect, dynamic, and non-geocentric.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Facing the Roman Inquisition in his old age, Galileo was forced to recant heliocentrism, yet legend whispers he muttered: 'And yet it moves.' He spent his final years completing his masterpiece on mechanics under house arrest, establishing the empirical scientific method.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-stephen-hawking",
    name: "Stephen Hawking",
    slug: { current: "stephen-hawking" },
    era: "1942 – 2018",
    category: "Cosmologists",
    shortDescription:
      "English theoretical physicist and cosmologist who discovered Hawking Radiation, proved gravitational singularity theorems, and authored A Brief History of Time.",
    imageUrl: "/portraits/stephen-hawking.jpg",
    quotes: [
      "Remember to look up at the stars and not down at your feet.",
      "Intelligence is the ability to adapt to change.",
    ],
    rawContentText:
      "Stephen William Hawking was born in Oxford, England. Diagnosed with early-onset amyotrophic lateral sclerosis (ALS) at age 21 and given two years to live, Hawking defied all medical expectations for more than half a century. Collaborating with Roger Penrose, Hawking proved that general relativity implies space and time began in a Big Bang singularity. In 1974, he made his monumental discovery: black holes are not completely black, but emit thermal subatomic radiation ('Hawking Radiation') due to quantum vacuum fluctuations near the event horizon. His 1988 bestseller A Brief History of Time introduced billions of readers to cosmological physics, establishing Hawking as a symbol of human willpower and triumph over physical adversity.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Stephen Hawking combined theoretical audacity with boundless humor. When motor neuron disease gradually stripped him of movement and speech, he navigated deep cosmic math mentally, using a computerized speech synthesizer to communicate with humanity.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "In 1974, Hawking unified Einstein's General Relativity, Thermodynamics, and Quantum Mechanics. He showed that quantum virtual particle-antiparticle pairs near a black hole's horizon cause one particle to escape, causing the black hole to slowly radiate energy and evaporate over cosmic eons.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Holding the Lucasian Professorship of Mathematics at Cambridge—the chair once held by Isaac Newton—Hawking traveled the world advocating for scientific education, space exploration, and human survival.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-rosalind-franklin",
    name: "Rosalind Franklin",
    slug: { current: "rosalind-franklin" },
    era: "1920 – 1958",
    category: "Biophysicists",
    shortDescription:
      "British chemist and X-ray crystallographer whose famous Photo 51 was critical to deciphering the double-helix structure of DNA.",
    imageUrl: "/portraits/rosalind-franklin.jpg",
    quotes: [
      "Science and everyday life cannot and should not be separated.",
      "In my view, all that is necessary for faith is the belief that by doing our best we shall come nearer to success.",
    ],
    rawContentText:
      "Rosalind Elsie Franklin was a chemist and X-ray crystallographer whose meticulous laboratory work unlocked the molecular code of life. Working at King's College London in the early 1950s, Franklin perfected X-ray diffraction techniques on DNA fibers. Her extraordinary 'Photo 51', captured with her PhD student Raymond Gosling, demonstrated the undeniable B-form helical structure of the genetic molecule. Shown to James Watson and Francis Crick without her knowledge or consent, the image provided the essential geometric parameters for their famous 1953 double-helix model. Franklin later led groundbreaking research on the structures of the tobacco mosaic virus and poliovirus before her life was cut short by ovarian cancer at age 37.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Rosalind Franklin was an experimentalist of world-class precision. After earning her doctorate at Cambridge, she mastered X-ray crystallography in Paris, studying the micro-structures of coal and carbon before applying her expertise to biological macromolecules.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "At King's College London, Franklin took 100-hour X-ray exposures of hydrated DNA fibers. In May 1952, she produced 'Photo 51'—a breathtaking diffraction pattern whose distinct 'X' shape revealed the helical pitch, diameter, and phosphate backbone configuration of DNA.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Though Watson, Crick, and Maurice Wilkins received the 1962 Nobel Prize after her death, history now universally recognizes Franklin's indispensable contribution to the greatest biological discovery of the 20th century.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-charles-darwin",
    name: "Charles Darwin",
    slug: { current: "charles-darwin" },
    era: "1809 – 1882",
    category: "Naturalists",
    shortDescription:
      "English naturalist and biologist whose theory of evolution by natural selection became the cornerstone of modern life sciences.",
    imageUrl: "/portraits/charles-darwin.jpg",
    quotes: [
      "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one.",
      "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
    ],
    rawContentText:
      "Charles Robert Darwin was born in Shrewsbury, England. In 1831, he joined the five-year global survey expedition of HMS Beagle as an unpaid naturalist. Observing giant fossils in South America and specialized mockingbirds and finches across the Galápagos Islands, Darwin questioned the dogma of immutable species. In 1859, after twenty years of exhaustive breeding experiments and botanical studies, he published On the Origin of Species by Means of Natural Selection. Darwin demonstrated that all life on Earth shares common descent, diverging through hereditary variations that confer survival advantages in natural environments.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Charles Darwin possessed exceptional powers of patient observation. During his five-year voyage on the HMS Beagle, Darwin collected thousands of specimens across South America, Tahiti, New Zealand, and Australia, constantly asking why related species differed across neighboring islands.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Drawing insight from Thomas Malthus's essays on population pressure, Darwin deduced the principle of Natural Selection: individuals with variations suited to their environment are more likely to survive and reproduce, passing favorable traits to subsequent generations.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "On the Origin of Species (1859) shook the intellectual foundations of the Western world. By uniting all flora and fauna into a single evolutionary tree, Darwin provided biology with its universal unifying theory.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-srinivasa-ramanujan",
    name: "Srinivasa Ramanujan",
    slug: { current: "srinivasa-ramanujan" },
    era: "1887 – 1920",
    category: "Mathematicians",
    shortDescription:
      "Autodidactic Indian mathematical genius who made groundbreaking contributions to mathematical analysis, number theory, infinite series, and continued fractions.",
    imageUrl: "/portraits/srinivasa-ramanujan.jpg",
    quotes: [
      "An equation for me has no meaning unless it expresses a thought of God.",
      "While asleep, I had an unusual experience. A red screen formed by flowing blood appeared... and numbers unfolded before me.",
    ],
    rawContentText:
      "Srinivasa Ramanujan was born in Erode, Tamil Nadu, India. With almost no formal training in pure mathematics, Ramanujan filled notebooks with nearly 3,900 original identities, partition theorems, and infinite series formulas. In 1913, he sent a letter containing over 100 complex mathematical theorems to Cambridge professor G. H. Hardy. Astonished by the sheer brilliance, Hardy recognized them as the work of an unprecedented genius and arranged for Ramanujan to come to Trinity College, Cambridge. Ramanujan became a Fellow of the Royal Society. His mock theta functions and modular equations continue to find critical applications in string theory and black hole physics today.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Srinivasa Ramanujan lived in profound communion with numbers. Working as a humble clerk at the Madras Port Trust, he scribbled mathematical breakthroughs on scrap wrapping paper, attributing his intuitive formulas to visions bestowed by his family goddess, Namagiri Thayar of Namakkal.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "When G.H. Hardy opened Ramanujan's letter in Cambridge in 1913, he remarked that the theorems 'must be true because, if they were not true, no one would have had the imagination to invent them.' Together, Hardy and Ramanujan developed the circle method and asymptotic formulas for integer partitions.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Though Ramanujan passed away at the tender age of 32, his 'Lost Notebook' discovered in 1976 continues to yield mathematical gold, solving modern puzzles in quantum cryptography, modular forms, and string theory.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-apj-abdul-kalam",
    name: "A. P. J. Abdul Kalam",
    slug: { current: "apj-abdul-kalam" },
    era: "1931 – 2015",
    category: "Visionaries",
    shortDescription:
      "Indian aerospace scientist and 11th President of India known as the 'Missile Man' who transformed India's civilian space program and missile defense systems.",
    imageUrl: "/portraits/apj-abdul-kalam.jpg",
    quotes: [
      "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
      "If you want to shine like a sun, first burn like a sun.",
    ],
    rawContentText:
      "Avul Pakir Jainulabdeen Abdul Kalam was born in Rameswaram, Tamil Nadu, to a boat owner. Overcoming early poverty by delivering newspapers, Kalam studied physics and aerospace engineering. Joining the Indian Space Research Organisation (ISRO), he was the project director for India's first Satellite Launch Vehicle (SLV-III), successfully deploying the Rohini satellite in near-Earth orbit in 1980. At the Defense Research and Development Organisation (DRDO), he led the Integrated Guided Missile Development Program, developing Agni and Prithvi. Serving as the 11th President of India from 2002 to 2007, the beloved 'People's President' dedicated his life to mentoring youth, scientific innovation, and national development.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Dr. A.P.J. Abdul Kalam embodied humble leadership and fierce technological self-reliance. Growing up in the coastal town of Rameswaram, his childhood fascination with flying birds propelled him into aerospace engineering.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Under his direction, ISRO achieved orbital capability with the SLV-III rocket, laying the technical groundwork for India's lunar and Martian missions. At DRDO, his leadership was instrumental in the Pokhran-II nuclear tests and critical missile defense shields.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "As President of India, Dr. Kalam opened the Rashtrapati Bhavan to students and scholars. He authored inspirational books including Wings of Fire and Ignited Minds, inspiring hundreds of millions of youth to dream and innovate.",
          },
        ],
      },
    ],
  },
  {
    _id: "bio-aryabhata",
    name: "Aryabhata",
    slug: { current: "aryabhata" },
    era: "476 – 550 CE",
    category: "Astronomers",
    shortDescription:
      "Classical Indian mathematician-astronomer from the Golden Age of India who formulated the concept of zero, calculated pi to 4 decimal places, and proposed that Earth rotates on its axis.",
    imageUrl: "/portraits/aryabhata.jpg",
    quotes: [
      "Just as a man in a boat going in one direction sees the stationary objects moving in the opposite direction, so do the stationary stars appear to move.",
      "Truth shines by its own virtue; the celestial motions obey numerical rhythm.",
    ],
    rawContentText:
      "Aryabhata was the foremost mathematician and astronomer of the classical Golden Age of Indian civilization. Working in Kusumapura (modern-day Patna, Bihar), Aryabhata composed his masterwork, the Aryabhatiya, in 499 CE at the age of 23. In this poetic Sanskrit treatise, Aryabhata calculated the value of pi as approximately 3.1416, developed trigonometric tables of sines (jya), solved indeterminate linear equations, and formulated rules for extracting square and cube roots. Astonishingly, Aryabhata proposed that the Earth is a sphere that rotates daily on its axis, correctly explaining solar and lunar eclipses as shadows cast by the Earth and Moon rather than mythological demons.",
    content: [
      {
        _type: "block",
        _key: "k1",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Aryabhata was a pioneer of the Indian mathematical renaissance during the Gupta Empire. At age 23, he composed the Aryabhatiya—a concise verse compendium covering mathematics, reckoning of time, and celestial mechanics.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k2",
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Aryabhata asserted that the apparent daily motion of the stars across the night sky is an illusion caused by the Earth rotating on its own axis from west to east—a revolutionary insight over a millennium before Copernicus and Galileo.",
          },
        ],
      },
      {
        _type: "block",
        _key: "k3",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "He calculated the circumference of the Earth to within 1% of modern satellite measurements and approximated pi as 3.1416, explicitly noting it was an approximation ('asanna'). India's first satellite launched into space in 1975 was proudly named 'Aryabhata' in his eternal honor.",
          },
        ],
      },
    ],
  },
];
