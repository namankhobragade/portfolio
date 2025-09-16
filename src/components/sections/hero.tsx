'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative w-full h-dvh min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10"></div>
      
      <div className="container relative z-20 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none font-headline"
          >
            Secure by Design, <br /> Powerful by Code.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-[700px] text-muted-foreground md:text-xl"
          >
            I'm Sunil Khobragade, a Technical Lead and Full-stack Developer
            specializing in building secure, scalable web applications with a focus
            on AI integration and cybersecurity.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 min-[400px]:flex-row items-center"
          >
            <Button asChild size="lg">
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                <Briefcase className="mr-2 h-4 w-4" />
                Hire Me
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
