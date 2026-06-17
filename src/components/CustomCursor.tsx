"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const setMousePosition = usePortfolioStore((state) => state.setMousePosition);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseMoveEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update Zustand state for Three.js camera parallax
      // Map to normalized range [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(nx, ny);
    };

    // Smooth cursor movement (lerp)
    const updateCursor = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      currentX += dx * 0.1;
      currentY += dy * 0.1;

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }

      requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animFrame = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [setMousePosition]);

  return <div ref={cursorRef} className="cursor-glow fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />;
}

// Simple type for internal mouse move event
type MouseMoveEvent = {
  clientX: number;
  clientY: number;
};
