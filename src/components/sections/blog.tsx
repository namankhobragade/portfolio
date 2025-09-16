
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { format } from "date-fns";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AnimatedItem } from "../animated-item";

export async function Blog() {
  const posts = await getAllPosts();
  
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
        <div className="py-12">
            <Carousel
              opts={{
                align: "start",
                loop: posts.length > 3,
              }}
              className="w-full max-w-sm md:max-w-3xl lg:max-w-6xl mx-auto"
            >
              <CarouselContent>
                {posts.slice(0, 5).map((post, index) => {
                  const postImage = PlaceHolderImages.find(p => p.id === post.frontmatter.imageId);
                  return (
                    <CarouselItem key={post.slug} className="sm:basis-1/2 lg:basis-1/3">
                      <AnimatedItem delay={index * 0.1} className="h-full p-2" direction={index % 2 === 0 ? 'left' : 'right'}>
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
                            <CardTitle className="font-headline">{post.frontmatter.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}
                            </p>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-muted-foreground line-clamp-3">{post.frontmatter.description}</p>
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
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </div>
        <div className="text-center">
            <Button asChild size="lg">
                <Link href="/blog">
                    View All Blogs
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
