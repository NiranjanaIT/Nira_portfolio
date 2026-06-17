"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PortfolioCardData } from "../data/portfolioData";
import { drawCardCanvas } from "./canvasDrawers";
import { usePortfolioStore } from "../store/usePortfolioStore";
import gdgImageFile from "../../WhatsApp Image 2026-06-16 at 4.44.44 PM.jpeg";
import aboutImageFile from "../../1780107069499.jpg";
import CardVisuals from "./CardVisuals";

interface ScrollCard3DProps {
  data: PortfolioCardData;
  index: number;
  position: [number, number, number];
}

export default function ScrollCard3D({ data, index, position }: ScrollCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textureRef = useRef<THREE.CanvasTexture>(null);

  const hoveredCard = usePortfolioStore((state) => state.hoveredCard);
  const clickedCard = usePortfolioStore((state) => state.clickedCard);
  const mousePosition = usePortfolioStore((state) => state.mousePosition);
  const setHoveredCard = usePortfolioStore((state) => state.setHoveredCard);
  const setClickedCard = usePortfolioStore((state) => state.setClickedCard);
  const activeSection = usePortfolioStore((state) => state.activeSection);

  const [hovered, setHovered] = useState(false);
  const [gdgImgElement, setGdgImgElement] = useState<HTMLImageElement | null>(null);
  const [aboutImgElement, setAboutImgElement] = useState<HTMLImageElement | null>(null);
  const [coverImgElement, setCoverImgElement] = useState<HTMLImageElement | null>(null);
  const [skillsImgElement, setSkillsImgElement] = useState<HTMLImageElement | null>(null);
  const [projectsImgElement, setProjectsImgElement] = useState<HTMLImageElement | null>(null);
  const [experienceImgElement, setExperienceImgElement] = useState<HTMLImageElement | null>(null);
  const [codingImgElement, setCodingImgElement] = useState<HTMLImageElement | null>(null);
  const [contactImgElement, setContactImgElement] = useState<HTMLImageElement | null>(null);

  // Load images asynchronously on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const img1 = new Image();
    img1.src = gdgImageFile.src;
    img1.onload = () => {
      setGdgImgElement(img1);
    };

    const img2 = new Image();
    img2.src = aboutImageFile.src;
    img2.onload = () => {
      setAboutImgElement(img2);
    };

    const loadImg = (src: string, setter: (img: HTMLImageElement) => void) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setter(img);
    };

    loadImg("/images/cover.png", setCoverImgElement);
    loadImg("/images/skills.png", setSkillsImgElement);
    loadImg("/images/projects.png", setProjectsImgElement);
    loadImg("/images/experience.png", setExperienceImgElement);
    loadImg("/images/coding.png", setCodingImgElement);
    loadImg("/images/contact.png", setContactImgElement);
  }, []);

  // Shader uniforms for bending animation
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  // 1. Create client-side canvas for offline rendering (2x resolution for high-DPI clarity)
  const canvas = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 2800; // 2x resolution (logical: 1024x1400)
    return c;
  }, []);

  // 2. Draw content on canvas whenever data/canvas changes
  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      ctx.scale(2, 2); // scale context by 2x for high-DPI drawing
      drawCardCanvas(ctx, data, 1024, 1400, gdgImgElement, aboutImgElement);
      if (textureRef.current) {
        textureRef.current.needsUpdate = true;
      }
    }
  }, [canvas, data, gdgImgElement, aboutImgElement]);

  // Handle hovered change to update global state
  useEffect(() => {
    if (hovered) {
      setHoveredCard(index);
    } else if (hoveredCard === index) {
      setHoveredCard(null);
    }
  }, [hovered, index, hoveredCard, setHoveredCard]);

  // 3. Render loop animation (parallaxes & floats & uniforms updating)
  useFrame((state) => {
    // Update shader elapsed time uniform
    uniforms.uTime.value = state.clock.getElapsedTime();

    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const isThisClicked = clickedCard === index;
    const isThisHovered = hoveredCard === index;

    // A. Gentle floating animation (sine wave)
    const floatOffset = Math.sin(t + index * 1.5) * 0.08;
    const targetY = position[1] + floatOffset;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.05
    );

    // B. Parallax rotation on mouse move (only if hovered or if it is active)
    let targetRotX = Math.sin(index * 2) * 0.05; // base rotation
    let targetRotY = Math.cos(index) * 0.05;
    let targetRotZ = Math.sin(index) * 0.02;

    if (isThisHovered && !isThisClicked) {
      // Rotate towards mouse pointer
      targetRotX += -mousePosition.y * 0.25;
      targetRotY += mousePosition.x * 0.25;
    }

    // Smooth transition
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.1);

    // C. Click/active scaling
    const targetScale = isThisClicked ? 1.15 : isThisHovered ? 1.03 : 1.0;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
  });

  // Material settings matching colors
  const cardColor = data.bgColor;
  const cylinderRadius = 0.06;
  const cardWidth = 2.4;
  const cardHeight = 3.3;

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClickedCard(clickedCard === index ? null : index);
      }}
    >
      {/* 1. Main Sheet Plane */}
      <mesh castShadow position={[0, 0, 0]}>
        <planeGeometry args={[cardWidth, cardHeight, 32, 32]} />
        <meshStandardMaterial
          roughness={0.9}
          metalness={0.0}
          side={THREE.DoubleSide}
          onBeforeCompile={(shader) => {
            shader.uniforms.uTime = uniforms.uTime;
            shader.vertexShader = `
              uniform float uTime;
              ${shader.vertexShader}
            `.replace(
              "#include <begin_vertex>",
              `
              #include <begin_vertex>
              // Enveloped bending so top & bottom edges remain fixed (cos factor)
              float factor = cos((position.y / 1.4) * (3.14159265 / 2.0));
              float bend = sin(position.y * 1.5 + uTime * 1.2) * 0.12 * factor;
              transformed.z += bend;
              `
            );
          }}
        >
          {canvas && (
            <canvasTexture
              ref={textureRef}
              attach="map"
              args={[canvas]}
              colorSpace={THREE.SRGBColorSpace}
              minFilter={THREE.LinearFilter}
              magFilter={THREE.LinearFilter}
              generateMipmaps={false}
              anisotropy={16}
            />
          )}
        </meshStandardMaterial>
      </mesh>

      {/* 2. Top cylinder scroll roll */}
      <mesh
        position={[0, cardHeight / 2, -cylinderRadius / 2]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[cylinderRadius, cylinderRadius, cardWidth + 0.02, 32]} />
        <meshStandardMaterial
          color={cardColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 3. Bottom cylinder scroll roll */}
      <mesh
        position={[0, -cardHeight / 2, -cylinderRadius / 2]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[cylinderRadius, cylinderRadius, cardWidth + 0.02, 32]} />
        <meshStandardMaterial
          color={cardColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* 4. Tailored visual 3D asset floating alongside card */}
      <CardVisuals index={index} active={activeSection === index + 1} />
    </group>
  );
}
