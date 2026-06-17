"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Text, Image as DreiImage } from "@react-three/drei";
import aboutImageFile from "../../1780107069499.jpg";
import gdgImageFile from "../../WhatsApp Image 2026-06-16 at 4.44.44 PM.jpeg";

interface CardVisualsProps {
  index: number;
  active: boolean;
}

export default function CardVisuals({ index, active }: CardVisualsProps) {
  const imageSrc = useMemo(() => {
    switch (index) {
      case 0: return "/images/cover.png";
      case 1: return aboutImageFile.src; // about
      case 2: return "/images/skills.png";
      case 3: return "/images/projects.png";
      case 4: return gdgImageFile.src; // leadership
      case 5: return "/images/experience.png";
      case 6: return "/images/coding.png";
      case 7: return "/images/contact.png";
      default: return null;
    }
  }, [index]);

  // Determine positions: 2D image on one side with a clean gap from the document
  const isImageRight = index % 2 === 0;
  const imageX = isImageRight ? 2.4 : -2.4;

  return (
    <group>
      {/* Floating 2D Illustration Image */}
      {imageSrc && (
        <Float floatIntensity={1.0} speed={1.2}>
          <group position={[imageX, 0, 0.35]}>
            {/* Ambient backing glow */}
            <mesh position={[0, 0, -0.02]}>
              <planeGeometry args={[1.5, 1.5]} />
              <meshBasicMaterial
                color={active ? "#8B5CF6" : "#000000"}
                transparent
                opacity={active ? 0.15 : 0.08}
              />
            </mesh>

            {/* The 2D Image */}
            <DreiImage
              url={imageSrc}
              transparent
              opacity={active ? 1.0 : 0.45}
              scale={[1.4, 1.4]}
            />

            {/* Clean border frame */}
            <mesh position={[0, 0, 0.01]}>
              <ringGeometry args={[1.0, 1.01, 4]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
            </mesh>
          </group>
        </Float>
      )}
    </group>
  );
}

// Wrappers to override local positions and align them dynamically
function HeroVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x - 1.8, 0, 0]}>
      <HeroVisuals />
    </group>
  );
}

function AboutVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x + 1.5, -0.2, 0]}>
      <AboutVisuals />
    </group>
  );
}

function SkillsPlanetVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x + 1.5, -0.1, 0]}>
      <SkillsPlanetVisuals />
    </group>
  );
}

function AICTEVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x - 1.5, -0.2, 0.1]}>
      <AICTEVisuals />
    </group>
  );
}

function GDGVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x + 1.5, 0, 0]}>
      <GDGVisuals />
    </group>
  );
}

function LaptopVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x + 1.6, 0, 0]}>
      <LaptopVisuals />
    </group>
  );
}

function HologramDashboardVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x + 1.5, -0.1, 0]}>
      <HologramDashboardVisuals />
    </group>
  );
}

function ContactHologramVisualsWrapper({ x }: { x: number }) {
  return (
    <group position={[x - 1.5, 0, 0]}>
      <ContactHologramVisuals />
    </group>
  );
}

function HeroVisuals() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
    }
  });

  return (
    <Float floatIntensity={1.2} speed={1.5}>
      <group ref={groupRef} position={[1.8, 0, 0.4]} scale={[0.6, 0.6, 0.6]}>
        {/* Core Glowing Orb */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#6366F1" emissiveIntensity={1.2} roughness={0.1} />
        </mesh>
        
        {/* Orbiting Ring 1 */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 8, 64]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.8} />
        </mesh>

        {/* Orbiting Ring 2 */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[1.4, 0.015, 8, 64]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

// 1. About Me (Oceanic / Gaia Planet)
function AboutVisuals() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.getElapsedTime() * -0.22;
      cloudRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <group position={[-1.5, 0.2, 0.4]} scale={[0.55, 0.55, 0.55]}>
        {/* Core Ocean Sphere */}
        <mesh ref={groupRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#60A5FA" roughness={0.4} metalness={0.1} />
          
          {/* Sub-meshes for Continents */}
          <mesh position={[0.2, 0.3, 0.8]} scale={[0.25, 0.15, 0.15]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#34D399" roughness={0.9} />
          </mesh>
          <mesh position={[-0.4, -0.2, 0.7]} scale={[0.3, 0.2, 0.2]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#34D399" roughness={0.9} />
          </mesh>
          <mesh position={[-0.3, 0.4, -0.7]} scale={[0.3, 0.3, 0.2]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#34D399" roughness={0.9} />
          </mesh>
        </mesh>

        {/* Orbiting Clouds Ring */}
        <group ref={cloudRef}>
          <mesh position={[0.8, 0.6, 0.8]} scale={[0.15, 0.1, 0.2]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} roughness={0.9} />
          </mesh>
          <mesh position={[-0.9, -0.4, 0.7]} scale={[0.2, 0.12, 0.25]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} roughness={0.9} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// 2. Journey Index (Winding Neon Spline)
function JourneyVisuals() {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
      const t = i / 29;
      const angle = t * Math.PI * 4;
      const r = 0.4 + t * 0.6;
      arr.push(new THREE.Vector3(Math.cos(angle) * r, (t - 0.5) * 1.8, Math.sin(angle) * r));
    }
    return arr;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0.2]}>
      <mesh>
        <tubeGeometry args={[curve, 40, 0.03, 8, false]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// 3. GDG Coordinator (Neon / Energy Ring Planet)
function GDGVisuals() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = state.clock.getElapsedTime() * -0.5;
    }
  });

  return (
    <Float floatIntensity={1.1} speed={1.3}>
      <group position={[-1.5, 0, 0.4]} scale={[0.5, 0.5, 0.5]}>
        {/* Dark Indigo core */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#4338CA" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Intersecting Energy Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 8, 64]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.6} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
          <torusGeometry args={[1.6, 0.05, 8, 64]} />
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

// 4. AICTE Waste Swap (Recycling green torus knot)
function AICTEVisuals() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.3;
    }
  });
  return (
    <Float floatIntensity={1.2} speed={1.5}>
      <mesh ref={ref} position={[1.5, 0.2, 0.3]}>
        <torusKnotGeometry args={[0.3, 0.08, 64, 8, 3, 4]} />
        <meshStandardMaterial color="#10b981" emissive="#065f46" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

// 5. SIH Low Cost Flush (Metallic sanitary pipes/valve mechanism)
function SIHVisuals() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });
  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <group ref={ref} position={[-1.5, 0, 0.3]}>
        {/* Main cylinder tank */}
        <mesh position={[0, 0.2, 0]} scale={[0.22, 0.45, 0.22]}>
          <cylinderGeometry args={[1, 1, 1, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Flush pipe */}
        <mesh position={[0.2, -0.15, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.08, 0.3, 0.08]}>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Water droplet symbol */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#00d0ff" emissive="#004466" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// 6. Bit N Build (Jupiter-like Gaseous Planet)
function BitNBuildVisuals() {
  const planetRef = useRef<THREE.Mesh>(null);
  const moonsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
    if (moonsRef.current) {
      moonsRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Float floatIntensity={0.9} speed={1.1}>
      <group position={[1.5, 0.1, 0.4]} scale={[0.55, 0.55, 0.55]}>
        {/* Coral/Rose Gaseous Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#F43F5E" roughness={0.5} metalness={0.15} />

          {/* Jupiter Great Red Spot symbol or band */}
          <mesh position={[0, -0.15, 0.9]} scale={[0.15, 0.15, 0.1]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#BE123C" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.1, 0]} scale={[1.01, 0.15, 1.01]}>
            <cylinderGeometry args={[0.99, 0.99, 1, 32, 1, true]} />
            <meshStandardMaterial color="#FDA4AF" roughness={0.8} />
          </mesh>
        </mesh>

        {/* Orbiting Moon Set */}
        <group ref={moonsRef}>
          {/* Moon 1 */}
          <mesh position={[1.8, 0.2, 0]} scale={[0.12, 0.12, 0.12]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
          </mesh>
          {/* Moon 2 */}
          <mesh position={[-1.7, -0.3, 0.5]} scale={[0.08, 0.08, 0.08]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// 7. GirlScript SoC (Floating green commit nodes / brackets)
function GirlScriptVisuals() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float floatIntensity={1} speed={1.5}>
      <group ref={ref} position={[-1.5, 0, 0.4]}>
        {/* Open source green branch */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#10b981" emissive="#047857" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#34d399" emissive="#047857" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.2, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#059669" emissive="#047857" emissiveIntensity={0.2} />
        </mesh>
        {/* Connecting wireframe lines */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.02, 0.8, 0.02]}>
          <cylinderGeometry args={[1, 1, 1, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 8. Codsoft (Glass mobile screen phone deck)
function MobileUIVisuals() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.3;
      ref.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.1;
    }
  });
  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <group ref={ref} position={[1.5, 0, 0.4]}>
        {/* Outer Phone Shell */}
        <mesh scale={[0.55, 1.0, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen Glass */}
        <mesh position={[0, 0, 0.035]} scale={[0.5, 0.94, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            transmission={0.7}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Small details */}
        <mesh position={[0, 0.43, 0.04]} scale={[0.12, 0.02, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </Float>
  );
}

// 9. Octanet Laptop (Sleek floating 3D laptop mock)
function LaptopVisuals() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float floatIntensity={0.6} speed={1.0}>
      <group ref={ref} position={[-1.6, 0, 0.4]} scale={[0.9, 0.9, 0.9]}>
        {/* Base Keyboard */}
        <mesh position={[0, -0.2, 0]} scale={[1.1, 0.03, 0.75]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Screen Lid */}
        <mesh position={[0, 0.18, -0.36]} rotation={[0.2, 0, 0]} scale={[1.1, 0.72, 0.03]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Inner screen glow */}
        <mesh position={[0, 0.18, -0.34]} rotation={[0.2, 0, 0]} scale={[1.04, 0.66, 0.01]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8c7a5c" emissive="#8c7a5c" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// 10. Programming Languages (Three cubes: Java, C, Python letters)
function LanguageCubesVisuals() {
  const groupRef = useRef<THREE.Group>(null);
  const items = [
    { label: "Java", pos: [-0.4, 0.4, 0] as [number, number, number], color: "#ff4444" },
    { label: "C", pos: [0.4, 0.1, 0.2] as [number, number, number], color: "#00d0ff" },
    { label: "Py", pos: [0, -0.4, -0.1] as [number, number, number], color: "#ffb700" }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.children.forEach((mesh, idx) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.015;
      });
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0.4]}>
      {items.map((item, idx) => (
        <group key={idx} position={item.pos}>
          <mesh scale={[0.3, 0.3, 0.3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={item.color} roughness={0.3} metalness={0.6} />
          </mesh>
          <Text position={[0, 0, 0.16]} fontSize={0.16} color="#ffffff">
            {item.label[0]}
          </Text>
        </group>
      ))}
    </group>
  );
}

// 11. UX/UI Figma (Stack of procedural Figma cylinders)
function FigmaVisuals() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <Float floatIntensity={1} speed={1.5}>
      <group ref={groupRef} position={[-1.5, 0.1, 0.4]} scale={[0.18, 0.18, 0.18]}>
        <mesh position={[-0.4, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#F24E1E" roughness={0.3} />
        </mesh>
        <mesh position={[0.4, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#A259FF" roughness={0.3} />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#A259FF" roughness={0.3} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#1ABC9C" roughness={0.3} />
        </mesh>
        <mesh position={[-0.4, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#0ACF83" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// 12. Education (Academic Graduation Scroll with red ribbon)
function EducationVisuals() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
    }
  });
  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <group ref={ref} position={[1.5, 0, 0.4]} rotation={[0, 0, Math.PI / 6]}>
        {/* Main diploma scroll cylinder */}
        <mesh scale={[0.12, 0.75, 0.12]}>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#fffff5" roughness={0.4} />
        </mesh>
        {/* Ribbon ring tie */}
        <mesh position={[0, 0, 0]} scale={[0.14, 0.1, 0.14]}>
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// 13. Skills Overview (Saturn-like Ringed Planet)
function SkillsPlanetVisuals() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.getElapsedTime() * -0.05;
    }
  });

  return (
    <Float floatIntensity={1.0} speed={1.3}>
      <group position={[-1.5, 0.1, 0.4]} scale={[0.5, 0.5, 0.5]}>
        {/* Saturn Planet Sphere */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.6} metalness={0.1} />
          
          {/* Surface texture bands */}
          <mesh position={[0, 0.25, 0]} scale={[1.01, 0.12, 1.01]}>
            <cylinderGeometry args={[0.99, 0.99, 1, 32, 1, true]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.25, 0]} scale={[1.01, 0.12, 1.01]}>
            <cylinderGeometry args={[0.99, 0.99, 1, 32, 1, true]} />
            <meshStandardMaterial color="#D97706" roughness={0.8} />
          </mesh>
        </mesh>

        {/* Flat Saturn Ring system */}
        <mesh ref={ringsRef} rotation={[Math.PI / 2.3, Math.PI / 8, 0]}>
          <torusGeometry args={[1.7, 0.12, 2, 64]} />
          <meshStandardMaterial color="#FCD34D" transparent opacity={0.65} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// 14. Certifications (Crystal / Ice Planet)
function GlassBubblesVisuals() {
  const planetRef = useRef<THREE.Mesh>(null);
  const iceRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      planetRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
    if (iceRef.current) {
      iceRef.current.rotation.y = state.clock.getElapsedTime() * -0.3;
    }
  });

  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <group position={[1.5, 0, 0.4]} scale={[0.5, 0.5, 0.5]}>
        {/* Translucent Icy Core */}
        <mesh ref={planetRef}>
          <dodecahedronGeometry args={[1.0, 1]} />
          <meshPhysicalMaterial
            color="#93C5FD"
            transmission={0.85}
            roughness={0.15}
            thickness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Floating small shards */}
        <group ref={iceRef}>
          <mesh position={[1.4, 0.4, 0.5]} scale={[0.15, 0.15, 0.15]}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial color="#60A5FA" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[-1.3, -0.4, -0.6]} scale={[0.1, 0.1, 0.1]}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial color="#93C5FD" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0.2, -1.2, 0.8]} scale={[0.13, 0.13, 0.13]}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial color="#3B82F6" roughness={0.2} metalness={0.7} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// 15. Coding Profiles (Holographic terminal code panel)
function HologramDashboardVisuals() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <mesh ref={ref} position={[-1.5, 0.1, 0.4]} scale={[0.8, 0.5, 0.03]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#10b981"
          transmission={0.85}
          roughness={0.2}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// 16. Contact Details (Magma Golden Planet)
function ContactHologramVisuals() {
  const planetRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.getElapsedTime() * -0.25;
    }
  });

  return (
    <Float floatIntensity={1.0} speed={1.5}>
      <group position={[1.5, 0, 0.4]} scale={[0.5, 0.5, 0.5]}>
        {/* Core Glowing Ball */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} roughness={0.1} />
        </mesh>

        {/* Golden metallic wireframe cage planet shell */}
        <mesh ref={planetRef}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.1}
            metalness={0.9}
            wireframe
            wireframeLinewidth={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 17. Thank You (Cosmic glowing Ring representing black hole/portal)
function ThankYouNebulaVisuals() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.6;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float floatIntensity={1.5} speed={2}>
      <mesh ref={ref} position={[0, 0, 1.2]}>
        <torusKnotGeometry args={[0.5, 0.12, 100, 16, 2, 3]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.8} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}
