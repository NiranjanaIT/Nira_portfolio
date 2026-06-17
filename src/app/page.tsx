"use client";

import React, { useEffect } from "react";
import ScrollGallery from "../three/ScrollGallery";
import OverlayUI from "../components/OverlayUI";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";
import { usePortfolioStore } from "../store/usePortfolioStore";

export default function Home() {
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const setClickedCard = usePortfolioStore((state) => state.setClickedCard);
  const setIsLoaded = usePortfolioStore((state) => state.setIsLoaded);
  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);

  useEffect(() => {
    // 1. Synchronize native scroll position with Three.js camera movement
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Safely fetch current store state without subscribing to prevent feedback loops
      const currentProgress = usePortfolioStore.getState().scrollProgress;
      if (Math.abs(currentProgress - progress) > 0.00001) {
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initially
    handleScroll();

    // 2. Add ESC key listener to exit detail overlays
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClickedCard(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Set loaded state to remove load overlays
    setIsLoaded(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setScrollProgress, setClickedCard, setIsLoaded]);

  // Sync theme selection to document root for global transitions
  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [isLightTheme]);

  return (
    <SmoothScroll>
      <main className={`relative w-full min-h-screen text-white select-none transition-colors duration-700 ${
        isLightTheme ? "bg-accentBeige text-neutral-900" : "bg-bgMain text-white"
      }`}>
        {/* A. 3D WebGL Canvas Scene (fixed background) */}
        <ScrollGallery />

        {/* B. Elegant HTML Controls, Titles, & Slide-out Panels (fixed foreground) */}
        <OverlayUI />

        {/* C. Interactive Ambient Glow Cursor (floating layer) */}
        <CustomCursor />

        {/* D. Native scrollbar spacer track to drive WebGL scroll events */}
        {/* We have 7 sections: Hero (Cover) + 6 other sections.
            Setting height to 700vh provides a long, responsive scrolling experience. */}
        <div className="w-full h-[700vh] pointer-events-none" />
      </main>
    </SmoothScroll>
  );
}
