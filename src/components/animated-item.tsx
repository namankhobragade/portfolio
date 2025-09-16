"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedItem({ children, className, delay = 0, duration = 0.5 }: AnimatedItemProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
