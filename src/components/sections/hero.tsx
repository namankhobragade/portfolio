
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Github, Linkedin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture-hero');

  return (
    <section className="relative w-full overflow-hidden bg-secondary py-20 md:py-32 lg:py-40">
       <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
       <div className="container relative px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Sunil Khobragade
              </h1>
              <div className="text-lg text-primary font-medium sm:text-xl h-14 sm:h-7">
                <TypeAnimation
                  sequence={[
                    'Technical Lead', 2000,
                    'Full-stack Developer', 2000,
                    'Cybersecurity Researcher', 2000,
                    'AI & Security Innovator', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A seasoned Full-stack Developer and Technical Lead with a passion for cybersecurity, actively pursuing a Master’s in Information Security and exploring AI/LLMs for security operations.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row items-center">
              <Button asChild size="lg">
                <a href="/Sunil_Khobragade_Resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Github className="h-7 w-7" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/sunilkhobragade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Linkedin className="h-7 w-7" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            {profileImage && (
             <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={450}
                height={450}
                className="mx-auto aspect-square overflow-hidden object-cover w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full border-4 border-background shadow-2xl"
                priority
              />
          )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
