
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
      const text = "</> DevSec";

      const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
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

      const subtitleVariants = {
         hidden: { opacity: 0, y: 20 },
         visible: {
           opacity: 1,
           y: 0,
           transition: {
             delay: 1.2,
             duration: 0.5,
           },
         },
      }
      
      return (
        <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-busy="true"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold font-headline tracking-tighter text-foreground"
                variants={containerVariants}
                aria-label={text}
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
              <motion.p 
                className="mt-4 text-xl md:text-2xl font-medium text-muted-foreground"
                variants={subtitleVariants}
              >
                Sunil Khobragade
              </motion.p>
            </motion.div>
        </AnimatePresence>
      )
  }

  return null;
}
