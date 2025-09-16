
"use client";

import { useState, useEffect } from "react";
import { QUOTES } from "@/lib/quotes";
import { Info } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

export function QuoteRotator() {
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Set initial quote
    const initialQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setCurrentQuote(initialQuote);

    const interval = setInterval(() => {
        setCurrentQuote(prevQuote => {
            let newQuote;
            do {
                newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            } while (newQuote === prevQuote);
            return newQuote;
        });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-10">
          <Info className="h-4 w-4 mr-3 flex-shrink-0 text-muted-foreground" />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-center text-muted-foreground italic"
            >
              {`"${currentQuote}" ~ Sunil Khobragade`}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
