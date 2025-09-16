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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Sunil Khobragade
              </h1>
              <p className="text-xl text-primary font-medium">
                Technical Lead | Full-Stack Developer | CEH-Certified Cybersecurity Researcher
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A Full-Stack Developer and Cybersecurity enthusiast with over 5 years of hands-on experience delivering robust, secure web applications. Currently pursuing a Master’s in Information Security and holding a CEH v13 AI certification.
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
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-[400px] lg:order-last"
              />
          )}
        </div>
      </div>
    </section>
  );
}
