
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatedItem } from "../animated-item";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Projects() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of projects that demonstrate my skills in creating secure, scalable, and intelligent applications.
            </p>
          </div>
        </div>
        <div className="py-12">
            <Carousel
              opts={{
                align: "start",
                loop: PROJECTS_DATA.length > 2,
              }}
              className="w-full max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto"
            >
              <CarouselContent>
                {PROJECTS_DATA.map((project, index) => {
                  const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
                  return (
                    <CarouselItem key={project.title} className="sm:basis-1/2 lg:basis-1/3">
                      <AnimatedItem delay={index * 0.1} className="h-full p-2" direction={index % 2 === 0 ? 'left' : 'right'}>
                        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                          {projectImage && (
                            <Image
                              src={projectImage.imageUrl}
                              alt={projectImage.description}
                              data-ai-hint={projectImage.imageHint}
                              width={600}
                              height={400}
                              className="aspect-video w-full object-cover"
                            />
                          )}
                          <CardHeader>
                            <CardTitle className="font-headline">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Tech Stack:</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                  <Badge key={tech} variant="secondary">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Security Focus:</h4>
                              <p className="text-sm text-muted-foreground">{project.securityFocus}</p>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-wrap gap-2">
                            {project.demoUrl && (
                              <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink />
                                  View Demo
                                  <ArrowUpRight className="ml-auto" />
                                </Link>

                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button asChild variant="secondary" className="flex-1 min-w-[120px]">
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github />
                                  View on GitHub
                                </Link>
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </AnimatedItem>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
