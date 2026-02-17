"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// Context
interface ThemeTransitionContextType {
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  }
  return context;
};

// Provider & Controller
export const ThemeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  // We need to track the "next" theme to set the curtain color correctly before the switch
  const [targetTheme, setTargetTheme] = useState<string | null>(null);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTargetTheme(nextTheme);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (!isTransitioning || !targetTheme) return;

    // Sequence:
    // 1. Curtain expands (handled by AnimatePresence + motion.div in Curtain)
    // 2. Wait for expansion to finish
    // 3. Switch theme
    // 4. Curtain collapses (handled by exit animation)

    const timer = setTimeout(() => {
      setTheme(targetTheme);
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetTheme(null);
      }, 30); 
    }, 150); // Fast curtain cover

    return () => clearTimeout(timer);
  }, [isTransitioning, targetTheme, setTheme]);

  return (
    <ThemeTransitionContext.Provider value={{ toggleTheme, isTransitioning }}>
      {children}
      <Curtain isTransitioning={isTransitioning} targetTheme={targetTheme} />
    </ThemeTransitionContext.Provider>
  );
};

// Curtain Component
const Curtain = ({ isTransitioning, targetTheme }: { isTransitioning: boolean; targetTheme: string | null }) => {
  // Determine curtain color based on the target (incoming) theme
  const curtainColor = targetTheme === "dark" ? "#0a0a0a" : "#ffffff";
  
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          style={{ backgroundColor: curtainColor }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
};

// Toggle Button Component
export const ThemeToggle = () => {
  const { toggleTheme, isTransitioning } = useThemeTransition();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="relative w-9 h-9 flex items-center justify-center rounded-md border border-border bg-secondary hover:bg-accent text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            y: isDark ? 20 : 0,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 45 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={18} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            y: isDark ? 0 : -20,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -45
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={18} />
        </motion.div>
      </div>
    </button>
  );
};
