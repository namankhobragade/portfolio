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
             I'm a Full-Stack Developer and Cybersecurity enthusiast with over 5 years of hands-on experience delivering robust, secure web applications. Currently pursuing my Master’s in Information Security and holding a CEH v13 AI certification, I specialize in bridging the gap between software engineering and ethical hacking.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My interests lie in AI-powered cybersecurity, secure code audits, and SOC automation using large language models.
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
