// src/components/header.tsx
"use client";

import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative hidden md:flex items-center gap-4 px-3 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg"
        >
          <Link href="/" className="flex items-center gap-2 pr-2 text-foreground/80 hover:text-foreground transition-colors">
            <Code2 className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline">DevSec</span>
          </Link>
          
          <div className="h-6 border-l border-border/50"></div>
          
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                 pathname === href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/#contact">Contact Me</Link>
          </Button>
          <ThemeToggle />
        </motion.nav>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-[calc(100vw-2rem)] p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg">
           <Link href="/" className="flex items-center gap-2 pl-2 text-foreground/80 hover:text-foreground transition-colors">
            <Code2 className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline">DevSec</span>
          </Link>
          <div className="flex items-center gap-1">
             <ThemeToggle />
             <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={toggleMobileMenu}
                    className="text-3xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
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
