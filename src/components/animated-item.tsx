"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up';
}

export function AnimatedItem({ children, className, delay = 0, duration = 0.5, direction = 'up' }: AnimatedItemProps) {
  const directionVariants = {
    up: { y: 20, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 },
  };
  
  const itemVariants = {
    hidden: { ...directionVariants[direction], opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
