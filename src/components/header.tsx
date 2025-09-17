// src/components/header.tsx
"use client";

import Link from "next/link";
import { Code2, Home, User, Briefcase, Wrench, FolderKanban, BookOpen, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const navLinks = [
  { href: "/#home", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#services", label: "Services", icon: Briefcase },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#projects", label: "Projects", icon: FolderKanban },
  { href: "/blog", label: "Blog", icon: BookOpen },
];

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="fixed top-12 left-1/2 -translate-x-1/2 z-50">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg"
        >
          <Link href="/" className="flex items-center gap-2 pr-2 text-foreground/80 hover:text-foreground transition-colors">
            <Code2 className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline">DevSec</span>
          </Link>
          
          <div className="h-6 border-l border-border/50"></div>
          
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-2",
                 (pathname === href || (href.includes('#') && pathname === '/')) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/#contact">Contact Me</Link>
          </Button>
          <ThemeToggle />
        </motion.nav>

        {/* Mobile Header - Top Right (Hamburger menu) */}
        <div className="md:hidden fixed top-4 right-4 z-[101]">
           <div className="flex items-center gap-1 p-1 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg">
             <ThemeToggle />
             <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg">
        <TooltipProvider>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "p-3 text-sm font-medium rounded-full transition-colors flex items-center justify-center h-12 w-12",
                    (pathname === href || (href.includes('#') && pathname === '/')) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-lg"
          >
            <div className="container p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <Link href="/" className="flex items-center gap-2 pl-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMobileMenu}>
                  <Code2 className="h-6 w-6 text-accent" />
                  <span className="font-bold font-headline">DevSec</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col items-center justify-center flex-1 gap-6">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={toggleMobileMenu}
                    className="text-3xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-4"
                  >
                    <Icon className="h-8 w-8" />
                    {label}
                  </Link>
                ))}
                 <Button asChild size="lg" className="mt-4">
                  <Link href="/#contact" onClick={toggleMobileMenu}>Contact Me</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
