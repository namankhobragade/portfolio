
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedItem } from "../animated-item";
import { Button } from "../ui/button";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { allIcons } from "@/lib/icons";
import { SERVICES_DATA } from "@/lib/dynamic-data";

const iconMap = allIcons.reduce((map, icon) => {
    map[icon.name] = icon.component;
    return map;
}, {} as Record<string, React.FC<any>>);


export async function Services() {
  const servicesData = SERVICES_DATA;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Services Offered</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Providing expert solutions in web development, cybersecurity, and AI to help you build secure and intelligent applications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || iconMap['Settings'];
            return (
                <AnimatedItem key={service.title} delay={index * 0.1}>
                <Card className="flex h-full flex-col items-start text-left p-6 transition-all hover:shadow-lg hover:-translate-y-1 bg-transparent border-2">
                    <CardHeader className="p-0 mb-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-3">
                        <Icon className="h-8 w-8" />
                    </div>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col flex-grow">
                    <CardTitle className="text-lg font-bold font-headline mb-2">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex-grow">{service.description}</p>
                    </CardContent>
                </Card>
                </AnimatedItem>
            );
          })}
        </div>
         <div className="text-center">
            <Button asChild size="lg">
                <Link href="/#contact">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Hire Me
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
