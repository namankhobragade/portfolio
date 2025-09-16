import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BlogSummary } from "@/components/sections/blog-summary";
import { format } from "date-fns";
import { AnimatedItem } from "@/components/animated-item";
import { AnimatedSection } from "@/components/animated-section";

export default async function AllBlogsPage() {
  const posts = await getAllPosts();
  
  return (
    <AnimatedSection>
        <div className="container py-12 md:py-24">
            <div className="flex justify-between items-center mb-8">
                <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">All Blog Posts</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore all my insights on secure coding, AI in cybersecurity, and industry trends.
                </p>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
                {posts.map((post, index) => {
                const postImage = PlaceHolderImages.find(p => p.id === post.frontmatter.imageId);
                return (
                    <AnimatedItem key={post.slug} delay={index * 0.1}>
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
                            <BlogSummary content={post.content} />
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
                )
                })}
            </div>
        </div>
    </AnimatedSection>
  );
}
