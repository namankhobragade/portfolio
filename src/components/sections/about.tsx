import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function About() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">About Me</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I am a passionate and driven professional with a dual focus on full-stack web development and cybersecurity. My journey in technology is fueled by a desire to build things that are not only functional and user-friendly but also robust and secure.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Currently, I'm deepening my expertise in cloud security and exploring the fascinating intersection of Artificial Intelligence and cybersecurity. My vision is to leverage these cutting-edge technologies to create innovative solutions that can anticipate and neutralize digital threats, making the web a safer place for everyone.
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
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
              />
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
