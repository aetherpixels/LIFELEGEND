"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, Line } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import Link from "next/link";
import { Sparkles, ArrowLeft, Info, Compass, ArrowRight, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpaceAmbientAudio from "@/components/SpaceAmbientAudio";
import { sfx } from "@/lib/soundfx";

interface StarNode {
  id: string;
  name: string;
  category: string;
  era: string;
  position: [number, number, number];
  color: string;
  slug: string;
  description: string;
  connections: number[];
}

const CONSTELLATION_NODES: StarNode[] = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    category: "Innovator",
    era: "1856 - 1943",
    position: [-2.8, 1.2, 0.5],
    color: "#22d3ee",
    slug: "nikola-tesla",
    description: "Architect of polyphase alternating current, radio propagation, and electromagnetic resonance.",
    connections: [1, 4, 13],
  },
  {
    id: "lovelace",
    name: "Ada Lovelace",
    category: "Pioneer",
    era: "1815 - 1852",
    position: [-1.2, -1.8, 1.2],
    color: "#e879f9",
    slug: "ada-lovelace",
    description: "Prophet of general-purpose algorithmic computing and symbolic digital poetry.",
    connections: [0, 3, 6],
  },
  {
    id: "curie",
    name: "Marie Curie",
    category: "Scientist",
    era: "1867 - 1934",
    position: [2.5, 1.8, -0.6],
    color: "#f59e0b",
    slug: "marie-curie",
    description: "Double Nobel laureate who revealed atomic structure and discovered radium & polonium.",
    connections: [4, 3, 10],
  },
  {
    id: "vinci",
    name: "Leonardo da Vinci",
    category: "Polymath",
    era: "1452 - 1519",
    position: [0.2, 2.5, 1.8],
    color: "#10b981",
    slug: "leonardo-da-vinci",
    description: "Universal Renaissance genius intertwining mechanical engineering, anatomy, and high art.",
    connections: [1, 2, 11],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    category: "Theoretical Physicist",
    era: "1879 - 1955",
    position: [1.8, -1.5, -1.2],
    color: "#6366f1",
    slug: "albert-einstein",
    description: "Transformative thinker behind spacetime curvature, relativistic mass, and the quantum photon.",
    connections: [0, 2, 5, 9],
  },
  {
    id: "newton",
    name: "Sir Isaac Newton",
    category: "Scientist",
    era: "1642 - 1727",
    position: [2.9, 0.4, 1.6],
    color: "#38bdf8",
    slug: "isaac-newton",
    description: "Formulated universal gravitation, laws of classical motion, and the calculus of fluxions.",
    connections: [4, 8, 9, 12],
  },
  {
    id: "turing",
    name: "Alan Turing",
    category: "Pioneer",
    era: "1912 - 1954",
    position: [-2.2, -2.4, -0.8],
    color: "#06b6d4",
    slug: "alan-turing",
    description: "Father of theoretical computer science, Enigma codebreaking, and artificial intelligence.",
    connections: [1, 7, 12],
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    category: "Physicist",
    era: "1918 - 1988",
    position: [0.8, -2.8, 1.4],
    color: "#f43f5e",
    slug: "richard-feynman",
    description: "Pioneer of quantum electrodynamics, intuitive Feynman Diagrams, and nanotechnology.",
    connections: [4, 6],
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    category: "Astronomer",
    era: "1564 - 1642",
    position: [-0.6, 2.8, -1.4],
    color: "#a855f7",
    slug: "galileo-galilei",
    description: "Father of observational astronomy who championed heliocentrism and empirical physics.",
    connections: [5, 14],
  },
  {
    id: "hawking",
    name: "Stephen Hawking",
    category: "Cosmologist",
    era: "1942 - 2018",
    position: [2.1, -2.2, -2.0],
    color: "#818cf8",
    slug: "stephen-hawking",
    description: "Theoretical visionary who revealed black hole radiation and gravitational singularities.",
    connections: [4, 5],
  },
  {
    id: "franklin",
    name: "Rosalind Franklin",
    category: "Biophysicist",
    era: "1920 - 1958",
    position: [1.4, 2.2, 0.8],
    color: "#ec4899",
    slug: "rosalind-franklin",
    description: "X-ray crystallographer whose famous Photo 51 unlocked the double-helix geometry of DNA.",
    connections: [2, 11],
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    category: "Naturalist",
    era: "1809 - 1882",
    position: [-1.8, 0.2, 2.4],
    color: "#84cc16",
    slug: "charles-darwin",
    description: "Architect of evolutionary biology who discovered natural selection on the HMS Beagle.",
    connections: [3, 10],
  },
  {
    id: "ramanujan",
    name: "Srinivasa Ramanujan",
    category: "Mathematician",
    era: "1887 - 1920",
    position: [-0.4, -1.2, -2.6],
    color: "#fbbf24",
    slug: "srinivasa-ramanujan",
    description: "Intuitive genius who unlocked infinite series, modular forms, and partition mathematics.",
    connections: [5, 6, 14],
  },
  {
    id: "kalam",
    name: "A. P. J. Abdul Kalam",
    category: "Visionary",
    era: "1931 - 2015",
    position: [-2.6, 2.0, -1.2],
    color: "#2dd4bf",
    slug: "apj-abdul-kalam",
    description: "Pioneer of satellite launch vehicle rocketry and beloved advocate for youth innovation.",
    connections: [0, 14],
  },
  {
    id: "aryabhata",
    name: "Aryabhata",
    category: "Astronomer",
    era: "476 - 550 CE",
    position: [0.0, 3.2, 0.0],
    color: "#fb923c",
    slug: "aryabhata",
    description: "Classical Indian astronomer who formulated the spherical rotating Earth and computed pi.",
    connections: [8, 12, 13],
  },
];

function StarCluster({
  activeNode,
  onSelectNode,
}: {
  activeNode: StarNode | null;
  onSelectNode: (node: StarNode) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Calculate connection line coordinates
  const linePairs = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    CONSTELLATION_NODES.forEach((node, i) => {
      node.connections.forEach((targetIdx) => {
        if (targetIdx > i && CONSTELLATION_NODES[targetIdx]) {
          pairs.push([
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...CONSTELLATION_NODES[targetIdx].position),
          ]);
        }
      });
    });
    return pairs;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Interconnecting constellation influence lines */}
      {linePairs.map((pair, idx) => (
        <Line
          key={idx}
          points={pair}
          color="#38bdf8"
          lineWidth={1.5}
          transparent
          opacity={0.35}
        />
      ))}

      {/* Star Nodes */}
      {CONSTELLATION_NODES.map((node) => {
        const isSelected = activeNode?.id === node.id;
        return (
          <group
            key={node.id}
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
              {/* Outer pulsing ring for selected node */}
              {isSelected && (
                <mesh>
                  <ringGeometry args={[0.35, 0.45, 32]} />
                  <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.8} />
                </mesh>
              )}

              {/* Glowing star sphere */}
              <mesh>
                <sphereGeometry args={[isSelected ? 0.25 : 0.18, 32, 32]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isSelected ? 1.5 : 0.8}
                  roughness={0.1}
                />
              </mesh>

              {/* Floating label */}
              <Text
                position={[0, 0.38, 0]}
                fontSize={0.18}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {node.name}
              </Text>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export default function ConstellationPage() {
  const [selectedNode, setSelectedNode] = useState<StarNode | null>(CONSTELLATION_NODES[0]);

  const handleNodeSelect = (node: StarNode) => {
    sfx.playSuccess();
    setSelectedNode(node);
  };

  return (
    <main className="min-h-screen bg-[#020510] text-white p-4 sm:p-8 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Header HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cosmic Influence Map</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300">
              3D Constellation of Human Genius
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              Click any celestial star to inspect historical ties and jump into their detailed dossier.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-slate-900/60 px-4 py-2 rounded-2xl border border-white/5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>5 INTERCONNECTED MINDS</span>
          </div>
        </div>

        {/* 3D WebGL Galaxy Viewport */}
        <div className="relative flex-1 w-full min-h-[500px] sm:min-h-[580px] rounded-3xl bg-[#030718]/90 border border-cyan-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden">
          <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
            <pointLight position={[-10, -10, -10]} intensity={1.2} color="#e879f9" />

            <Stars radius={60} depth={40} count={6000} factor={4} saturation={1} fade speed={1.2} />

            <StarCluster activeNode={selectedNode} onSelectNode={handleNodeSelect} />

            <OrbitControls enableZoom={true} maxDistance={12} minDistance={3.5} autoRotateSpeed={0.5} />
          </Canvas>

          {/* Holographic Info Card HUD for Selected Star */}
          {selectedNode && (
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 rounded-3xl bg-[#091129]/90 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-scale-up">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {selectedNode.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedNode.era}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {selectedNode.name}
              </h3>

              <p className="text-xs text-slate-300 font-light leading-relaxed mb-5">
                {selectedNode.description}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={`/biographies/${selectedNode.slug}`}
                  onClick={() => sfx.playSuccess()}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
                >
                  <span>Open Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/compare"
                  onClick={() => sfx.playClick()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer"
                >
                  Compare
                </Link>
              </div>
            </div>
          )}

          {/* Orbit Controls Hint */}
          <div className="absolute top-4 right-4 pointer-events-none text-[10px] font-mono tracking-widest text-slate-500 uppercase bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
            Click & Drag Galaxy • Scroll to Zoom
          </div>
        </div>
      </div>

      <SpaceAmbientAudio />
    </main>
  );
}
