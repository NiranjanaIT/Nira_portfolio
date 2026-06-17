"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

interface SkillObjects3DProps {
  cardPosition: [number, number, number];
}

export default function SkillObjects3D({ cardPosition }: SkillObjects3DProps) {
  const [cx, cy, cz] = cardPosition;

  // Render 5 floating objects arranged around the card
  // Position offsets:
  // React: Top Left
  // Figma: Top Right
  // Photoshop: Bottom Left
  // Illustrator: Bottom Right
  // Blender: Center front (slightly floating closer)

  return (
    <group position={[cx, cy, cz]}>
      {/* 1. React Icon (Orbital Rings + Center Sphere) */}
      <ReactLogo position={[-1.4, 0.7, 0.4]} />

      {/* 2. Figma Icon (Stack of colored cylinders) */}
      <FigmaLogo position={[1.4, 0.7, 0.4]} />

      {/* 3. Photoshop Icon (Sleek blue tile) */}
      <AdobeTile position={[-1.4, -0.7, 0.4]} letter="Ps" color="#00C8FF" />

      {/* 4. Illustrator Icon (Sleek orange tile) */}
      <AdobeTile position={[1.4, -0.7, 0.4]} letter="Ai" color="#FF9A00" />

      {/* 5. Blender Icon (Abstract Orange/Blue metallic sculpture) */}
      <BlenderLogo position={[0, 0, 0.6]} />
    </group>
  );
}

// React Logo component
function ReactLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float floatIntensity={1} speed={1.5}>
      <group ref={groupRef} position={position} scale={[0.25, 0.25, 0.25]}>
        {/* Core Sphere */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#00F0FF" emissive="#003344" roughness={0.1} />
        </mesh>

        {/* Orbit Ring 1 */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.9, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00F0FF" roughness={0.2} />
        </mesh>

        {/* Orbit Ring 2 */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.9, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00F0FF" roughness={0.2} />
        </mesh>

        {/* Orbit Ring 3 */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.9, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00F0FF" roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Figma Logo component (procedural circles stack)
function FigmaLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Float floatIntensity={1.2} speed={1.2}>
      <group ref={groupRef} position={position} scale={[0.22, 0.22, 0.22]}>
        {/* Orange Segment (Top Left) */}
        <mesh position={[-0.4, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#F24E1E" roughness={0.3} />
        </mesh>
        {/* Red/Purple Segment (Top Right) */}
        <mesh position={[0.4, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#A259FF" roughness={0.3} />
        </mesh>
        {/* Purple Segment (Middle Left) */}
        <mesh position={[-0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#A259FF" roughness={0.3} />
        </mesh>
        {/* Blue Segment (Middle Right) */}
        <mesh position={[0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#1ABC9C" roughness={0.3} />
        </mesh>
        {/* Green Segment (Bottom Left) */}
        <mesh position={[-0.4, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#0ACF83" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Adobe Tiles component (Photoshop / Illustrator)
function AdobeTile({
  position,
  color,
}: {
  position: [number, number, number];
  letter: string;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float floatIntensity={0.8} speed={1.8}>
      <mesh ref={meshRef} position={position} scale={[0.4, 0.4, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Blender Logo component
function BlenderLogo({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <Float floatIntensity={1.5} speed={2.0}>
      <group ref={meshRef} position={position} scale={[0.25, 0.25, 0.25]}>
        {/* Core Orange Ring */}
        <mesh>
          <torusGeometry args={[0.8, 0.15, 16, 100]} />
          <meshStandardMaterial color="#EA7638" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Center Blue Sphere */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#2E75B6" metalness={0.7} roughness={0.1} />
        </mesh>

        {/* Floating Eye Pieces / Arms */}
        <mesh position={[0.4, 0.6, 0.2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#EA7638" />
        </mesh>
        <mesh position={[0.7, 0.3, 0.2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#EA7638" />
        </mesh>
        <mesh position={[0.6, -0.4, 0.2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#EA7638" />
        </mesh>
      </group>
    </Float>
  );
}
