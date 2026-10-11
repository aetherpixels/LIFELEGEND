"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Box, Eye, RotateCw, Sparkles as SparklesIcon } from "lucide-react";
import { sfx } from "@/lib/soundfx";

function RelicMesh({
  modelType,
  wireframe,
  autoRotate,
}: {
  modelType: string;
  wireframe: boolean;
  autoRotate: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      {modelType === "induction-coil" ? (
        // Tesla's Resonant Induction Coil (Torus Knot + Ring)
        <group>
          <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.5, 0.35, 128, 32]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#0891b2"
              emissiveIntensity={0.6}
              wireframe={wireframe}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.5, 0.04, 16, 100]} />
            <meshBasicMaterial color="#eab308" transparent opacity={0.6} />
          </mesh>
        </group>
      ) : modelType === "icosahedron" ? (
        // Da Vinci / Math Celestial Polyhedron
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#d946ef"
            emissive="#a21caf"
            emissiveIntensity={0.5}
            wireframe={wireframe}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ) : (
        // Radioactive Core / Einstein Energy Sphere
        <group>
          <mesh ref={meshRef}>
            <octahedronGeometry args={[1.6, 2]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#1d4ed8"
              emissiveIntensity={0.7}
              wireframe={wireframe}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[2.2, 0.03, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      <Sparkles count={80} scale={6} size={3} speed={0.4} color="#38bdf8" opacity={0.8} />
    </Float>
  );
}

export default function Artifact3DViewer({
  biographyName,
  category = "",
}: {
  biographyName: string;
  category?: string;
}) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Select suitable relic archetype
  const modelType =
    biographyName.toLowerCase().includes("tesla")
      ? "induction-coil"
      : biographyName.toLowerCase().includes("vinci") || category.toLowerCase().includes("art")
      ? "icosahedron"
      : "energy-core";

  const relicName =
    modelType === "induction-coil"
      ? "Resonant Tesla High-Frequency Coil"
      : modelType === "icosahedron"
      ? "Da Vinci Polyhedral Geometric Archetype"
      : `Quantum Relic of ${biographyName}`;

  return (
    <div className="w-full my-12 rounded-3xl bg-gradient-to-b from-[#09112a] via-[#060b1c] to-[#040814] border border-cyan-500/30 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">
                Interactive 3D Relic
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                WEBGL 4K ENGINE
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {relicName}
            </h3>
          </div>
        </div>

        {/* Viewport Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sfx.playClick();
              setWireframe(!wireframe);
            }}
            onMouseEnter={() => sfx.playHover()}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer border ${
              wireframe
                ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                : "bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{wireframe ? "SOLID" : "WIREFRAME"}</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setAutoRotate(!autoRotate);
            }}
            onMouseEnter={() => sfx.playHover()}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer border ${
              autoRotate
                ? "bg-fuchsia-500 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.4)]"
                : "bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span>ROTATE</span>
          </button>
        </div>
      </div>

      {/* Real-time 3D Viewport */}
      <div className="relative w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#e879f9" />
          <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

          <RelicMesh modelType={modelType} wireframe={wireframe} autoRotate={autoRotate} />

          <OrbitControls enableZoom={true} maxDistance={8} minDistance={2.5} />
        </Canvas>

        {/* Viewport Overlay hint */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase pointer-events-none flex items-center gap-1.5">
          <SparklesIcon className="w-3 h-3 text-cyan-400" />
          <span>Click & Drag to Orbit • Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
