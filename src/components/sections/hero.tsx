
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Send, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';
import { SITE_CONFIG } from '@/lib/data';

export function Hero() {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  const lightImage = "/images/sunil-khobragade-light.png";
  const darkImage = "/images/sunil-khobragade-dark.png";

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <motion.div 
        className="container px-4 md:px-6 grid gap-10 lg:grid-cols-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="lg:col-span-5 flex justify-center items-center" variants={itemVariants}>
            <div className="w-full max-w-[400px] lg:max-w-none">
             <Image
                key={theme}
                src={theme === 'dark' ? darkImage : lightImage}
                alt={`Professional headshot of ${SITE_CONFIG.name}`}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full h-auto hero-image-effect"
                priority
              />
            </div>
        </motion.div>
        <motion.div className="lg:col-span-7 flex flex-col justify-center space-y-6" variants={itemVariants}>
            <div className="space-y-4">
                <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                    {SITE_CONFIG.name}
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-2xl text-primary font-semibold">
                    {SITE_CONFIG.jobTitle}
                </motion.h2>
                <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground md:text-xl/relaxed">
                    <p>
                        {SITE_CONFIG.heroDescription1}
                    </p>
                    <p>
                        {SITE_CONFIG.heroDescription2}
                    </p>
                </motion.div>
            </div>
             <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild size="lg">
                    <Link href="#contact">
                        <Send className="mr-2 h-4 w-4" />
                        Hire Me
                    </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                    <Link href="#projects">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        View My Work
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <a href="/Sunil_Khobragade_CV.pdf" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </a>
                </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
                <p className="text-sm text-muted-foreground">Connect with me:</p>
                <Link href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                </Link>
                <Link href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
