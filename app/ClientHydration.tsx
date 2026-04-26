"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientHydration({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Kurze Verzögerung für den "System-Check" Effekt (optional, wirkt aber hochwertiger)
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!mounted ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center"
        >
          {/* Minimalistischer Vision-Loader */}
          <div className="relative">
            <div className="w-12 h-12 border-2 border-blue-500/20 rounded-full"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-12 h-12 border-t-2 border-blue-400 rounded-full"
            />
          </div>
          <span className="mt-4 text-[10px] font-mono uppercase tracking-[0.4em] text-blue-400/60 animate-pulse">
            Initializing Systems...
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}