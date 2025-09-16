import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS_DATA } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BlogSummary } from "./blog-summary";
import { AnimatedItem } from "../animated-item";

export function Blog() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From the Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Insights on secure coding, AI in cybersecurity, and industry trends.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {BLOG_POSTS_DATA.map((post, index) => {
            const postImage = PlaceHolderImages.find(p => p.id === post.imageId);
            return (
            <AnimatedItem key={post.title} delay={index * 0.1} className="h-full">
              <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 glow-card">
                {postImage && (
                  <Image
                    src={postImage.imageUrl}
                    alt={postImage.description}
                    data-ai-hint={postImage.imageHint}
                    width={600}
                    height={400}
                    className="aspect-video w-full object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle className="font-headline">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <BlogSummary content={post.fullContent} />
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedItem>
          )})}
        </div>
      </div>
    </section>
  );
}
