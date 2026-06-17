"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, CornerDownRight, HelpCircle, Sun, Moon } from "lucide-react";
import gdgImage from "../../WhatsApp Image 2026-06-16 at 4.44.44 PM.jpeg";
import aboutImage from "../../1780107069499.jpg";
import { portfolioCards } from "../data/portfolioData";
import { usePortfolioStore } from "../store/usePortfolioStore";

export default function OverlayUI() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const clickedCard = usePortfolioStore((state) => state.clickedCard);
  const setClickedCard = usePortfolioStore((state) => state.setClickedCard);
  const isLightTheme = usePortfolioStore((state) => state.isLightTheme);
  const toggleTheme = usePortfolioStore((state) => state.toggleTheme);

  const [formName, setFormName] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formMessage, setFormMessage] = React.useState("");

  // Scroll to section based on card index (0 to 17)
  const scrollToSection = (index: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / (portfolioCards.length - 1)) * docHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const activeCard = clickedCard !== null ? portfolioCards[clickedCard] : null;

  return (
    <div className="fixed inset-0 z-10 w-full h-full pointer-events-none flex flex-col justify-between p-8 sm:p-12 select-none">
      {/* 1. Header Bar */}
      <header className="w-full flex justify-between items-start pointer-events-auto">
        {/* Left: Branding */}
        <div className="flex flex-col">
          <span className={`font-space text-2xl font-bold tracking-tight transition-colors duration-700 ${
            isLightTheme ? "text-neutral-900" : "text-white"
          }`}>
            NIRANJANA
          </span>
          <span className={`font-inter text-xs font-semibold tracking-wider mt-1 transition-colors duration-700 ${
            isLightTheme ? "text-accentPurple" : "text-accentPurple/80"
          }`}>
            CREATIVE PORTFOLIO 3D
          </span>
        </div>

        {/* Center: Dynamic Category Indicator */}
        <div className={`hidden md:flex items-center space-x-4 px-6 py-2 rounded-full border shadow-lg backdrop-blur-md transition-colors duration-700 ${
          isLightTheme
            ? "bg-white/85 border-black/5 text-neutral-800"
            : "glassmorphism border-white/5 text-white/90"
        }`}>
          <div className="w-2 h-2 rounded-full bg-accentPurple animate-ping" />
          <span className="font-space text-sm font-medium uppercase tracking-wider">
            {activeSection > 0 && activeSection <= portfolioCards.length
              ? `SECTION ${portfolioCards[activeSection - 1].number} : ${portfolioCards[activeSection - 1].category}`
              : "HERO SPACE"}
          </span>
        </div>

        {/* Right: Awards Badge & Theme Toggle */}
        <div className="flex flex-col items-end space-y-2 pointer-events-auto">
          <div className="flex items-center space-x-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors flex items-center justify-center shadow-md ${
                isLightTheme
                  ? "bg-white/80 hover:bg-neutral-100 border-black/10 text-neutral-900"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isLightTheme ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
            
            <div className={`transition-colors border px-4 py-2 rounded-lg text-[11px] font-space tracking-widest uppercase font-bold shadow-sm ${
              isLightTheme
                ? "bg-white/90 border-black/10 text-accentPurple"
                : "bg-white/10 border-white/10 text-accentBeige"
            }`}>
              ★ FWA / AWWWARDS SELECTED
            </div>
          </div>
          <span className={`text-[10px] mt-1 font-inter transition-colors duration-700 ${
            isLightTheme ? "text-black/50" : "text-white/40"
          }`}>
            Scroll Progress: {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </header>

      {/* 2. Premium Interactive Vertical Page Navigator */}
      <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 pointer-events-auto select-none z-20">
        {/* Page counter display */}
        <div className="flex flex-col items-center mb-2">
          <span className={`font-space text-3xl font-extrabold transition-all duration-500 leading-none ${
            isLightTheme ? "text-stone-900" : "text-white"
          }`}>
            {Math.max(1, Math.min(portfolioCards.length, activeSection)).toString().padStart(2, '0')}
          </span>
          <span className={`font-space text-[10px] tracking-widest mt-1.5 font-bold ${
            isLightTheme ? "text-stone-400" : "text-white/40"
          }`}>
            / {portfolioCards.length.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Vertical dotted track navigation */}
        <div className="flex flex-col items-center space-y-3">
          {portfolioCards.map((card, idx) => {
            const isActive = idx === Math.max(0, Math.min(portfolioCards.length - 1, activeSection - 1));
            return (
              <button
                key={card.id}
                onClick={() => scrollToSection(idx)}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
                title={`Go to Section ${card.number}: ${card.title}`}
              >
                {/* Dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-accentPurple scale-150 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                    : isLightTheme 
                      ? "bg-stone-300 group-hover:bg-stone-500 group-hover:scale-125" 
                      : "bg-white/20 group-hover:bg-white/50 group-hover:scale-125"
                }`} />

                {/* Section Title Tooltip */}
                <span className={`absolute right-8 scale-0 group-hover:scale-100 transition-all duration-300 origin-right text-[10px] font-space font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md border ${
                  isLightTheme 
                    ? "bg-white border-stone-200 text-stone-900" 
                    : "bg-stone-900 border-stone-800 text-white"
                }`}>
                  {card.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Footer Overlay UI */}
      <footer className="w-full flex justify-between items-end z-10">
        {/* Left: Author / Details */}
        <div className={`flex flex-col text-[10px] font-inter space-y-1 ${
          isLightTheme ? "text-black/50" : "text-white/40"
        }`}>
          <span>DESIGN & WEBGL DEVELOPMENT</span>
          <span className={`font-space font-semibold tracking-widest ${
            isLightTheme ? "text-black/80" : "text-white/80"
          }`}>
            © 2026 NIRANJANA STUDIO.
          </span>
        </div>

        {/* Center: Scroll Down Indicator (Fades out when scrolling) */}
        <AnimatePresence>
          {scrollProgress < 0.03 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center space-y-3 pb-4"
            >
              <span className={`font-space text-[9px] tracking-[0.3em] font-bold ${
                isLightTheme ? "text-black/50" : "text-white/50"
              }`}>
                SCROLL TO EXPLORE
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className={`w-4 h-7 rounded-full border flex justify-center p-1 ${
                  isLightTheme ? "border-black/20" : "border-white/20"
                }`}
              >
                <div className="w-1 h-1.5 bg-accentPurple rounded-full animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Interaction hints */}
        <div className={`flex flex-col items-end text-[10px] font-inter space-y-1 ${
          isLightTheme ? "text-black/50" : "text-white/40"
        }`}>
          <span>INTERACTION FEED</span>
          <span className={`font-space font-semibold tracking-widest flex items-center ${
            isLightTheme ? "text-black/80" : "text-white/80"
          }`}>
            DRAG TO ROTATE <ArrowRight className="w-3 h-3 ml-2 text-accentPurple" />
          </span>
        </div>
      </footer>

      {/* 5. Expanding Glassmorphic Drawer (Slides in from the right on card click) */}
      <AnimatePresence>
        {clickedCard !== null && activeCard && (
          <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm pointer-events-auto z-40 flex justify-end">
            {/* Click outside to close */}
            <div
              className="absolute inset-0 w-full h-full"
              onClick={() => setClickedCard(null)}
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-lg h-full border-l p-8 sm:p-12 shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-md transition-colors duration-700 ${
                isLightTheme
                  ? "bg-white/95 border-black/10 text-neutral-800"
                  : "glassmorphism border-white/10 text-white"
              }`}
            >
              {/* Header: Close button & Section tag (Fixed) */}
              <div className="flex justify-between items-center mb-4 shrink-0">
                <div className="flex items-center space-x-3">
                  <span className="text-accentPurple font-space text-lg font-bold">
                    {activeCard.number}
                  </span>
                  <span className={`text-xs font-inter uppercase tracking-widest transition-colors duration-700 ${
                    isLightTheme ? "text-black/45" : "text-white/40"
                  }`}>
                    {activeCard.category}
                  </span>
                </div>

                <button
                  onClick={() => setClickedCard(null)}
                  className={`p-2 rounded-full border transition-colors ${
                    isLightTheme
                      ? "bg-black/5 hover:bg-black/10 border-black/5 text-black/70 hover:text-black"
                      : "bg-white/5 hover:bg-white/10 border-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="flex-1 overflow-y-auto pr-2 my-4 space-y-6 select-text pointer-events-auto min-h-0 scrollbar-thin">
                {/* Body Content */}
                <div className="flex flex-col space-y-6">
                  <span className="text-xs tracking-wider text-accentPurple font-space uppercase">
                    PROJECT ARCHIVE
                  </span>
                  
                  <h2 className={`text-4xl sm:text-5xl font-space font-extrabold leading-none transition-colors duration-700 ${
                    isLightTheme ? "text-neutral-900" : "text-white"
                  }`}>
                    {activeCard.title}
                  </h2>

                  {activeCard.subtitle && (
                    <h4 className={`text-lg font-space font-medium transition-colors duration-700 ${
                      isLightTheme ? "text-neutral-800/80" : "text-white/80"
                    }`}>
                      {activeCard.subtitle}
                    </h4>
                  )}

                  {activeCard.id === 2 && (
                    <div className="w-44 h-44 my-3 rounded-full overflow-hidden border-2 border-stone-200/50 shadow-md">
                      <img
                        src={aboutImage.src}
                        alt="Niranjana M R"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {activeCard.id === 5 && (
                    <div className="w-full h-56 my-2 rounded-xl overflow-hidden border border-white/10 relative shadow-lg">
                      <img
                        src={gdgImage.src}
                        alt="GDG Inauguration PSNA"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="w-12 h-1 bg-accentPurple" />

                  <p className={`font-inter text-sm sm:text-base leading-relaxed whitespace-pre-line transition-colors duration-700 ${
                    isLightTheme ? "text-neutral-700" : "text-white/60"
                  }`}>
                    {activeCard.description}
                  </p>

                  {activeCard.id === 8 && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const subject = encodeURIComponent(`Portfolio Inquiry from ${formName}`);
                        const body = encodeURIComponent(
                          `Hi Niranjana,\n\n${formMessage}\n\nBest regards,\n${formName}\nEmail: ${formEmail}`
                        );
                        window.location.href = `mailto:mrniranjana.it@gmail.com?subject=${subject}&body=${body}`;
                      }}
                      className="space-y-4 pt-4 border-t border-black/10 dark:border-white/5 pointer-events-auto"
                    >
                      <span className={`text-xs font-space font-bold tracking-widest uppercase transition-colors duration-700 ${
                        isLightTheme ? "text-neutral-900/50" : "text-white/50"
                      }`}>
                        SEND AN EMAIL
                      </span>
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider transition-colors duration-700 ${
                            isLightTheme ? "text-neutral-500" : "text-white/40"
                          }`}>
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full px-4 py-2 rounded-lg border text-sm font-inter focus:outline-none focus:ring-1 transition-all duration-300 ${
                              isLightTheme
                                ? "bg-white/80 border-black/10 focus:border-accentPurple focus:ring-accentPurple text-neutral-800"
                                : "bg-white/5 border-white/10 focus:border-accentPurple focus:ring-accentPurple text-white"
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider transition-colors duration-700 ${
                            isLightTheme ? "text-neutral-500" : "text-white/40"
                          }`}>
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-2 rounded-lg border text-sm font-inter focus:outline-none focus:ring-1 transition-all duration-300 ${
                              isLightTheme
                                ? "bg-white/80 border-black/10 focus:border-accentPurple focus:ring-accentPurple text-neutral-800"
                                : "bg-white/5 border-white/10 focus:border-accentPurple focus:ring-accentPurple text-white"
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider transition-colors duration-700 ${
                            isLightTheme ? "text-neutral-500" : "text-white/40"
                          }`}>
                            Your Message
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Write your message here..."
                            className={`w-full px-4 py-2 rounded-lg border text-sm font-inter focus:outline-none focus:ring-1 transition-all duration-300 ${
                              isLightTheme
                                ? "bg-white/80 border-black/10 focus:border-accentPurple focus:ring-accentPurple text-neutral-800"
                                : "bg-white/5 border-white/10 focus:border-accentPurple focus:ring-accentPurple text-white"
                            }`}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full mt-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 transition-colors text-white dark:text-black py-2.5 px-6 rounded-lg font-space font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 pointer-events-auto"
                        >
                          <span>SEND MAIL</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Highlights/Details bullet points */}
                  {activeCard.details && activeCard.details.length > 0 && (
                    <div className={`flex flex-col space-y-3 pt-4 border-t transition-colors duration-700 ${
                      isLightTheme ? "border-black/10" : "border-white/5"
                    }`}>
                      <span className={`text-xs font-space font-bold tracking-widest uppercase transition-colors duration-700 ${
                        isLightTheme ? "text-neutral-900/50" : "text-white/50"
                      }`}>
                        SPECIFICATIONS & FOCUS
                      </span>
                      <ul className="space-y-2">
                        {activeCard.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start text-xs sm:text-sm font-inter transition-colors duration-700 ${
                              isLightTheme ? "text-neutral-850" : "text-white/80"
                            }`}
                          >
                            <CornerDownRight className="w-4 h-4 text-accentPurple shrink-0 mr-2.5 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to action footer in drawer (Fixed) */}
              <div className={`flex flex-col space-y-3 pt-4 border-t shrink-0 transition-colors duration-700 ${
                isLightTheme ? "border-black/10" : "border-white/5"
              }`}>
                {activeCard.liveLink && (
                  <a
                    href={activeCard.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white py-3 px-6 rounded-lg font-space font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 pointer-events-auto"
                  >
                    <span>VISIT LIVE PROJECT</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>
                )}

                <button
                  onClick={() => setClickedCard(null)}
                  className="w-full bg-accentPurple hover:bg-accentPurple/80 transition-colors text-white py-3 px-6 rounded-lg font-space font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
                >
                  <span>RETURN TO GALLERY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className={`text-[10px] text-center font-inter transition-colors duration-700 ${
                  isLightTheme ? "text-black/40" : "text-white/30"
                }`}>
                  Interactive WebGL Viewer • Press ESC to Close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
