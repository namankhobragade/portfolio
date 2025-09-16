'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Download } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

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
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl xl:text-8xl/none font-headline"
          >
            <TypeAnimation
              sequence={[
                'Secure by Design.',
                2000,
                'Powerful by Code.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block"
            />
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
            className="flex flex-col sm:flex-row gap-4 items-center"
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
            <Button asChild size="lg" variant="secondary">
              <Link href="/Sunil_Khobragade_CV.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
