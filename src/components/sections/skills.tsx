"use client";

import { SKILLS_DATA } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion";

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
        
        <Tabs defaultValue={SKILLS_DATA[0].category} orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <TabsList className="flex-col h-auto justify-start p-2 bg-secondary rounded-lg">
            {SKILLS_DATA.map((category) => (
              <TabsTrigger 
                key={category.category} 
                value={category.category}
                className="w-full justify-start data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-lg py-3"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="md:col-span-3">
            {SKILLS_DATA.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-0">
                  <motion.div 
                    key={category.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  >
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex flex-col items-center text-center gap-3 p-4 rounded-lg transition-all hover:bg-background/80 hover:shadow-lg">
                        <div className="bg-accent/10 text-accent rounded-full p-4">
                          <skill.icon className="h-8 w-8" />
                        </div>
                        <p className="text-sm font-medium">{skill.name}</p>
                      </div>
                    ))}
                  </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}