
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Quote, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatedItem } from "../animated-item";
import { supabase } from "@/lib/supabase/client";

interface Testimonial {
    name: string;
    title: string;
    quote: string;
    avatar: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error.message || error);
        setError('Error loading testimonials.');
      } else {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </section>
    );
  }
  
  if (error) {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container text-center">
                <p className="text-destructive">{error}</p>
            </div>
        </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

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
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedItem key={index} delay={index * 0.1}>
              <Card className="flex flex-col justify-between h-full bg-transparent border p-6">
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
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
