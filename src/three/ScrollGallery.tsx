"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { portfolioCards } from "../data/portfolioData";
import ScrollCard3D from "./ScrollCard3D";
import SkillObjects3D from "./SkillObjects3D";
import { usePortfolioStore } from "../store/usePortfolioStore";

// Pre-calculate card positions in 3D space
export const cardSpacing = 12; // units apart in Z
export const cardPositions = portfolioCards.map((_, i) => {
  const z = -i * cardSpacing;
  // Winding track: alternate X and Y coordinates
  const x = Math.sin(i * 1.8) * 2.2;
  const y = Math.cos(i * 1.2) * 0.8;
  return [x, y, z] as [number, number, number];
});

function Scene() {
  const { camera } = useThree();
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const clickedCard = usePortfolioStore((state) => state.clickedCard);
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);

  const flashlightRef = useRef<THREE.PointLight>(null);

  // Keep track of current lookAt target
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // 1. Calculate camera target based on scroll progress or clicked card
    let targetX = 0;
    let targetY = 0;
    let targetZ = 6; // start in front of card 1

    let lookAtTargetX = 0;
    let lookAtTargetY = 0;
    let lookAtTargetZ = 0;

    const totalCards = portfolioCards.length;

    if (clickedCard !== null) {
      // Focus on clicked card
      const cPos = cardPositions[clickedCard];
      targetX = cPos[0];
      targetY = cPos[1];
      targetZ = cPos[2] + 4.2; // closer

      lookAtTargetX = cPos[0];
      lookAtTargetY = cPos[1];
      lookAtTargetZ = cPos[2];
    } else {
      // Smoothly interpolate along the winding track based on scrollProgress
      // scrollProgress goes from 0 to 1
      const rawIndex = scrollProgress * (totalCards - 1);
      const lowerIdx = Math.floor(rawIndex);
      const upperIdx = Math.min(totalCards - 1, Math.ceil(rawIndex));
      const frac = rawIndex - lowerIdx;

      const posLower = cardPositions[lowerIdx];
      const posUpper = cardPositions[upperIdx];

      // Interpolate camera coordinates
      const currentCardX = THREE.MathUtils.lerp(posLower[0], posUpper[0], frac);
      const currentCardY = THREE.MathUtils.lerp(posLower[1], posUpper[1], frac);
      const currentCardZ = THREE.MathUtils.lerp(posLower[2], posUpper[2], frac);

      // Camera stays 5.5 units back in Z, slightly offset in X/Y for dynamic angles
      targetX = currentCardX;
      targetY = currentCardY + 0.1;
      targetZ = currentCardZ + 5.5;

      // Look at current card
      lookAtTargetX = currentCardX;
      lookAtTargetY = currentCardY;
      lookAtTargetZ = currentCardZ;

      // Update active section index in Zustand
      const activeIdx = Math.round(rawIndex) + 1; // 1-indexed
      if (activeSection !== activeIdx) {
        setActiveSection(activeIdx);
      }
    }

    // 2. Smoothly Lerp Camera Position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // 3. Smoothly Lerp LookAt Target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookAtTargetX, 0.08);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookAtTargetY, 0.08);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookAtTargetZ, 0.08);
    camera.lookAt(currentLookAt.current);

    // 4. Position flashlight at camera
    if (flashlightRef.current) {
      flashlightRef.current.position.copy(camera.position);
    }
  });

  return (
    <>
      {/* WebGL Canvas clear background color */}
      <color attach="background" args={[isLightTheme ? "#FAF8F5" : "#050505"]} />

      {/* 3D Cinematic Fog - Fades distant scrolls dynamically */}
      <fog attach="fog" args={[isLightTheme ? "#FAF8F5" : "#050505", 2, 20]} />

      {/* Lighting Setup - brighter ambient light in light mode */}
      <ambientLight
        intensity={isLightTheme ? 0.85 : 0.45}
        color={isLightTheme ? "#FAF8F5" : "#FAF8F5"}
      />

      {/* Moveable Spotlight following camera */}
      <pointLight
        ref={flashlightRef}
        distance={22}
        intensity={0}
        color={isLightTheme ? "#FFFFFF" : "#D9CCFF"}
        decay={1.2}
      />

      {/* Fixed scene directional light for overall shadow definition */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={isLightTheme ? 0.85 : 1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* 8 Scroll Cards */}
      {portfolioCards.map((card, index) => (
        <ScrollCard3D
          key={card.id}
          data={card}
          index={index}
          position={cardPositions[index]}
        />
      ))}

      {/* Glowing neon tunnel rings to anchor perspective */}
      <GlowingTunnelRings count={8} />

      {/* Floating Particles in Background */}
      <BackgroundParticles count={300} />
    </>
  );
}

// Floating Rock Asteroids
function FloatingRocks({ count = 40 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const zSpan = portfolioCards.length * cardSpacing;

  const rocks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const scale = 0.15 + Math.random() * 0.45;
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 9;
      // Scatter throughout the tunnel depth
      const z = -Math.random() * zSpan + 10;
      const speed = 0.1 + Math.random() * 0.35;
      const rotSpeed = 0.2 + Math.random() * 0.6;
      return { position: [x, y, z] as [number, number, number], scale, speed, rotSpeed };
    });
  }, [count, zSpan]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((rock, idx) => {
        const r = rocks[idx];
        if (r) {
          rock.rotation.x += 0.003 * r.rotSpeed;
          rock.rotation.y += 0.005 * r.rotSpeed;
          rock.position.y += Math.sin(state.clock.getElapsedTime() * r.speed + idx) * 0.001;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.position} scale={r.scale}>
          <dodecahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#1d1d26"
            roughness={0.9}
            metalness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

// Glowing Neon Tunnel Rings
function GlowingTunnelRings({ count = 8 }: { count?: number }) {
  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);
  const zSpan = portfolioCards.length * cardSpacing;
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const z = -i * (zSpan / count) + 6;
        return (
          <mesh key={i} position={[0, 0, z]}>
            <torusGeometry args={[6.8, 0.025, 8, 64]} />
            <meshBasicMaterial color={isLightTheme ? "#7C2D12" : "#8B5CF6"} transparent opacity={0.12} />
          </mesh>
        );
      })}
    </group>
  );
}

// Background Particles
function BackgroundParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions randomly scattered along the Z track
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const zSpan = portfolioCards.length * cardSpacing;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      pos[i * 3 + 2] = -Math.random() * zSpan + 10; // Z
    }
    return pos;
  }, [count]);

  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle drift
      pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={isLightTheme ? "#6C4EE8" : "#8B5CF6"}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isLightTheme ? 0.45 : 0.35}
      />
    </Points>
  );
}

export default function ScrollGallery() {
  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);

  return (
    <div className={`fixed inset-0 w-screen h-screen z-0 transition-colors duration-700 ${isLightTheme ? "bg-[#FAF8F5]" : "bg-bgMain"
      }`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
