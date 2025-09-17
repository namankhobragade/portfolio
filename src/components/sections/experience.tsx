
import { EXPERIENCE_DATA } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { AnimatedItem } from "../animated-item";

export function Experience() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-12 lg:px-24">
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Work Experience</h2>
            </div>
            <div className="space-y-12">
                {EXPERIENCE_DATA.map((item, index) => (
                    <AnimatedItem key={`${item.role}-${item.company}-${index}`} delay={index * 0.2}>
                        <div className="grid gap-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl md:text-2xl font-semibold font-headline">{item.company}</h3>
                                <p className="text-sm text-muted-foreground">{item.period}</p>
                            </div>
                             <p className="text-primary">{item.role}</p>
                            <ul className="space-y-4 text-muted-foreground list-disc pl-6">
                                {item.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedItem>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
