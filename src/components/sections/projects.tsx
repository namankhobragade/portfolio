import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {PROJECTS_DATA.map((project) => {
             const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
              <Card key={project.title} className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
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
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                   <div>
                    <h4 className="font-semibold mb-2">Security Focus:</h4>
                    <p className="text-sm text-muted-foreground">{project.securityFocus}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
