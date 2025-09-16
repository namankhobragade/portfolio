
"use client";

import { useState, useEffect } from "react";
import { QUOTES } from "@/lib/quotes";
import { X, Info } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function QuoteRotator() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set initial quote
    setCurrentQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

    const interval = setInterval(() => {
      let newQuote;
      do {
        newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      } while (newQuote === currentQuote);
      setCurrentQuote(newQuote);
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [currentQuote]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-[100] bg-secondary text-secondary-foreground"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-center h-10">
                        <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentQuote}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5 }}
                                className="text-sm text-center"
                            >
                                {currentQuote}
                            </motion.p>
                        </AnimatePresence>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/10"
                            aria-label="Dismiss quote"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
}
