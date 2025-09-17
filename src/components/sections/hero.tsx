'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Download, Github, Linkedin, Mail } from 'lucide-react';
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container px-4 md:px-6 grid gap-10 lg:grid-cols-3"
        >
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                {profileImage && (
                <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    data-ai-hint={profileImage.imageHint}
                    width={150}
                    height={150}
                    className="relative aspect-square overflow-hidden object-cover rounded-full shadow-lg"
                />
                )}
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
                <motion.div variants={itemVariants}>
                    <Button asChild>
                        <Link href="#contact">
                            <Mail className="mr-2 h-4 w-4" />
                            Schedule a call
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline"
                >
                    Sunil Khobragade
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-2xl text-muted-foreground">
                    Freelance Full-Stack Developer & Cybersecurity Specialist
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
                     <Button asChild variant="outline" size="sm">
                         <Link href="https://github.com/naman-mahi" target="_blank" rel="noopener noreferrer">
                             <Github />
                             GitHub
                         </Link>
                     </Button>
                     <Button asChild variant="outline" size="sm">
                         <Link href="https://www.linkedin.com/in/sunilkhobragade" target="_blank" rel="noopener noreferrer">
                             <Linkedin />
                             LinkedIn
                         </Link>
                     </Button>
                      <Button asChild variant="outline" size="sm">
                          <Link href="#contact">
                              <Mail />
                              Email
                          </Link>
                      </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground md:text-lg max-w-2xl mx-auto lg:mx-0">
                    <p>
                        A Jakarta-based freelance developer and cybersecurity enthusiast with a passion for transforming complex challenges into simple, elegant solutions.
                    </p>
                    <p>
                        My work spans secure full-stack development, AI integration, and the convergence of robust code and proactive security.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    </section>
  );
}
