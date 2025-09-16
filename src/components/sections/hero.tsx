'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'profile-picture-hero');
  
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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 bg-grid-pattern"></div>
      
      <div className="container relative z-20 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          {heroImage && (
            <motion.div variants={itemVariants}>
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                priority
              />
            </motion.div>
          )}

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
              <a href="/Sunil_Khobragade_Resume.pdf" download>
                Download CV
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
