import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture-hero');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Sunil Khobragade
              </h1>
              <p className="text-lg text-primary font-medium sm:text-xl">
                Technical Lead | Freelancer Full-stack Developer | Master’s in Information Security
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A seasoned Full-stack Developer and Technical Lead with a passion for cybersecurity, actively pursuing a Master’s in Information Security and exploring AI/LLMs for security operations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          {profileImage && (
             <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={400}
                height={400}
                className="mx-auto aspect-square overflow-hidden object-cover w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:order-last rounded-lg"
                priority
              />
          )}
        </div>
      </div>
    </section>
  );
}
