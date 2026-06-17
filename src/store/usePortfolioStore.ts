import { create } from "zustand";

interface PortfolioState {
  activeSection: number; // 0 for Hero, 1-18 for the cards
  scrollProgress: number; // 0 to 1
  hoveredCard: number | null; // index of the hovered card (0-17)
  clickedCard: number | null; // index of the clicked/expanded card (0-17)
  isLoaded: boolean;
  mousePosition: { x: number; y: number };
  isLightTheme: boolean;
  
  setActiveSection: (section: number) => void;
  setScrollProgress: (progress: number) => void;
  setHoveredCard: (index: number | null) => void;
  setClickedCard: (index: number | null) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setMousePosition: (x: number, y: number) => void;
  toggleTheme: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 0,
  scrollProgress: 0,
  hoveredCard: null,
  clickedCard: null,
  isLoaded: false,
  mousePosition: { x: 0, y: 0 },
  isLightTheme: true,
  
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setHoveredCard: (index) => set({ hoveredCard: index }),
  setClickedCard: (index) => set({ clickedCard: index }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  toggleTheme: () => set((state) => ({ isLightTheme: !state.isLightTheme })),
}));
