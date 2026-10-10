"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Float, Sphere, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.05;
      ringRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        {/* The solid inner core */}
        <Sphere ref={meshRef} args={[2.5, 64, 64]}>
          <meshStandardMaterial 
            color="#0f172a" 
            emissive="#3b82f6" 
            emissiveIntensity={0.2} 
            wireframe={true} 
            transparent 
            opacity={0.3} 
          />
        </Sphere>
        
        {/* Outer glowing rings */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.6} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <torusGeometry args={[4.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      {/* Golden and blue particles floating around */}
      <Sparkles count={300} scale={12} size={4} speed={0.4} color="#fef08a" opacity={0.8} />
      <Sparkles count={200} scale={15} size={2} speed={0.2} color="#93c5fd" opacity={0.5} />
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-[#030712] cursor-move">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#eab308" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <GlowingCore />
        
        {/* Dense starfield */}
        <Stars radius={100} depth={50} count={8000} factor={4} saturation={1} fade speed={1.5} />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
