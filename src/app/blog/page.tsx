
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { AnimatedSection } from "@/components/animated-section";
import type { Metadata } from 'next';
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: 'All Blog Posts',
  description: 'Explore all my insights on secure coding, AI in cybersecurity, and industry trends.',
};

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

            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:max-w-none">
                {posts.map((post, index) => (
                    <PostCard 
                        key={post.slug}
                        post={post}
                        orientation="vertical"
                    />
                ))}
            </div>
        </div>
    </AnimatedSection>
  );
}
