
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amir Ahmed",
    title: "Senior DevSecOps Engineer",
    quote: "Sunil’s mastery in full-stack development and dedication to security truly sets him apart. He is a proactive problem-solver and a great team player.",
    avatar: "https://i.pravatar.cc/150?u=amir-ahmed",
  },
  {
    name: "Jane Doe",
    title: "Project Manager, Acme Inc.",
    quote: "Working with Sunil was a breeze. He delivered a high-quality, secure e-commerce platform ahead of schedule and was always responsive to feedback.",
    avatar: "https://i.pravatar.cc/150?u=jane-doe",
  },
  {
    name: "John Smith",
    title: "Startup Founder",
    quote: "Sunil's expertise in both development and security was invaluable. He helped us build a scalable and robust SaaS application from the ground up.",
    avatar: "https://i.pravatar.cc/150?u=john-smith",
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Others Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Testimonials from colleagues and clients I've worked with.
            </p>
          </div>
        </div>
        <div className="py-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-4 h-full">
                    <Card className="flex flex-col justify-between h-full bg-card p-6">
                       <CardContent className="p-0 flex-grow relative">
                        <Quote className="absolute -top-2 -left-2 h-10 w-10 text-muted-foreground/10" />
                        <p className="text-muted-foreground italic z-10 relative">"{testimonial.quote}"</p>
                      </CardContent>
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
