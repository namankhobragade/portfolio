
"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EDUCATION_DATA } from "@/lib/data";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function Education() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and commitment to lifelong learning in the field of information security.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl justify-center gap-8 py-12">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.div
              key={edu.degree}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 5, boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="flex flex-col md:flex-row items-center text-left p-6 transition-all h-full bg-transparent border">
                <CardHeader className="p-0 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="bg-primary/10 text-primary rounded-lg p-4">
                    <edu.icon className="h-10 w-10" />
                  </div>
                </CardHeader>
                <div className="flex flex-col flex-grow">
                  <CardTitle className="text-xl font-bold font-headline mb-1">{edu.degree}</CardTitle>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <Badge variant='secondary' className="self-start">{edu.status}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
