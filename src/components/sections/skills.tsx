
"use client";

import { SKILLS_DATA } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion";
import { Progress } from "../ui/progress";

export function Skills() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A blend of expertise in modern web development, robust cybersecurity practices, and cutting-edge AI.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue={SKILLS_DATA[0].category} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 h-auto">
            {SKILLS_DATA.map((category) => (
              <TabsTrigger 
                key={category.category} 
                value={category.category}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

            {SKILLS_DATA.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-8">
                  <motion.div 
                    key={category.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-accent/10 text-accent rounded-full p-2">
                            <skill.icon className="h-6 w-6" />
                          </div>
                          <span className="text-lg font-medium">{skill.name}</span>
                        </div>
                         <Progress value={skill.proficiency} aria-label={`${skill.name} proficiency`} />
                      </div>
                    ))}
                  </motion.div>
              </TabsContent>
            ))}
        </Tabs>
      </div>
    </section>
  );
}
