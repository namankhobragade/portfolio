import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookText, Github, ExternalLink } from "lucide-react";
import { AnimatedItem } from "../animated-item";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/lib/supabase/client";
import { getImageById } from "@/lib/images";

export async function Projects() {
  const { data: projectsData, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error.message || error);
    return <p>Error loading projects.</p>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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
                loop: projectsData.length > 3,
              }}
              className="w-full max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto"
            >
              <CarouselContent>
                {projectsData.map((project, index) => {
                  return (
                    <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/3">
                      <AnimatedItem delay={index * 0.1} className="h-full p-2" direction={index % 2 === 0 ? 'left' : 'right'}>
                        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-transparent border-2">
                           <ProjectImage imageId={project.image_id} />
                          <CardHeader>
                            <CardTitle className="font-headline">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Tech Stack:</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map((tech) => (
                                  <Badge key={tech} variant="secondary">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">Security Focus:</h4>
                              <p className="text-sm text-muted-foreground">{project.security_focus}</p>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-wrap gap-2 mt-auto pt-4">
                            <Button asChild variant="default" size="sm" className="flex-1 min-w-[120px]">
                                <Link href={`/projects/${project.slug}`}>
                                    <BookText className="mr-2 h-4 w-4" /> Case Study
                                </Link>
                            </Button>
                            {project.demo_url && (
                              <Button asChild variant="outline" size="sm" className="flex-1 min-w-[120px]">
                                <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                </Link>

                              </Button>
                            )}
                            {project.github_url && (
                              <Button asChild variant="secondary" size="sm" className="flex-1 min-w-[120px]">
                                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" /> GitHub
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

async function ProjectImage({ imageId }: { imageId: string | null }) {
    if (!imageId) return null;
    const image = await getImageById(imageId);
    if (!image) return null;
    return (
        <Image
          src={image.image_url}
          alt={image.description}
          data-ai-hint={image.image_hint || ''}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
        />
    )
}
