import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function About() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">About Me</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I’m Sunil Khobragade, a Technical Lead and seasoned Full-stack Developer with over 4 years of freelance experience delivering scalable, secure web platforms using Laravel, Next.js, MongoDB, and MySQLi.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My passion for cybersecurity has led me to pursue a Post Graduate Diploma and Master’s in Information Security from IGNOU. I’m also actively exploring how artificial intelligence and large language models (LLMs) can revolutionize security operations — from automated threat analysis to smart incident response.
            </p>
          </div>
          <div className="flex items-center justify-center">
            {profileImage && (
             <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={300}
                height={300}
                className="mx-auto aspect-square overflow-hidden object-cover rounded-lg"
              />
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
