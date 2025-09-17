
"use client";

import { EDUCATION_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { AnimatedItem } from "../animated-item";

export function Education() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-12 lg:px-24">
        <div className="flex flex-col items-start justify-center space-y-4 text-left mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Studies</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and commitment to lifelong learning in the field of information security.
            </p>
          </div>
        </div>
        <div className="space-y-12">
          {EDUCATION_DATA.map((edu, index) => (
             <AnimatedItem key={edu.degree} delay={index * 0.2}>
              <div className="grid gap-2">
                  <h3 className="text-xl md:text-2xl font-semibold font-headline">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution} &middot; {edu.status}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
