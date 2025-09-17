
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
      const text = "DevSec";

      const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 0,
          y: '-100vh',
          transition: {
            duration: 0.75,
            ease: 'easeInOut',
          },
        },
      };

      const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99],
          },
        },
      };
      
      return (
        <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold font-headline tracking-tighter text-foreground"
                variants={containerVariants}
                aria-busy="true"
              >
                {text.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
        </AnimatePresence>
      )
  }

  return null;
}
