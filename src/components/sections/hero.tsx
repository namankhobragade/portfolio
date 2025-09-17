'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center overflow-hidden">
      {profileImage && (
        <Image
            src={profileImage.imageUrl}
            alt={profileImage.description}
            data-ai-hint={profileImage.imageHint}
            fill
            className="object-cover"
            priority
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container px-4 md:px-6 flex flex-col items-center justify-center space-y-6"
      >
        <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline"
        >
            Sunil Khobragade
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-2xl text-muted-foreground max-w-2xl">
            Freelance Full-Stack Developer & Cybersecurity Specialist
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground md:text-lg max-w-2xl">
            <p>
                A Hyderabad-based freelance developer and cybersecurity enthusiast with a passion for transforming complex challenges into simple, elegant solutions.
            </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
                <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Schedule a call
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/naman-mahi" target="_blank" rel="noopener noreferrer">
                    <Github />
                    GitHub
                </Link>
            </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
