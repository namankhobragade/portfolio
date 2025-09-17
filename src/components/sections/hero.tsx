
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Send, ArrowRight } from 'lucide-react';
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

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <motion.div 
        className="container px-4 md:px-6 grid gap-10 lg:grid-cols-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="lg:col-span-5 flex justify-center items-center" variants={itemVariants}>
          {profileImage && (
             <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={450}
                height={450}
                className="relative aspect-square overflow-hidden object-cover rounded-full shadow-2xl w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
                priority
              />
          )}
        </motion.div>
        <motion.div className="lg:col-span-7 flex flex-col justify-center space-y-6" variants={itemVariants}>
            <div className="space-y-4">
                <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                    Sunil Khobragade
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-2xl text-primary font-semibold">
                    Freelance Full-Stack Developer & Cybersecurity Specialist
                </motion.h2>
                <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground md:text-xl/relaxed">
                    <p>
                        I’m a Hyderabad-based freelance developer and cybersecurity enthusiast with a passion for transforming complex challenges into simple, elegant solutions.
                    </p>
                    <p>
                        My work spans secure full-stack development, AI integration, and the convergence of robust code and proactive security. I leverage my expertise in Laravel, Next.js, and cybersecurity best practices to build applications that are not only functional but also resilient.
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
                    <a href="/Sunil_Khobragade_CV.pdf" download="Sunil_Khobragade_CV.pdf">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </a>
                </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
                <p className="text-sm text-muted-foreground">Connect with me:</p>
                <Link href="https://github.com/naman-mahi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://www.linkedin.com/in/sunilkhobragade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:text-foreground hover:scale-110">
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
