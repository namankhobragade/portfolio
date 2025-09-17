
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/post-card";

export async function Blog() {
  const allPosts = await getAllPosts();
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1, 5); // Show next 4 posts

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From the Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Writing about secure development, AI, and tech...
            </p>
          </div>
        </div>

        <div className="grid gap-8">
            {featuredPost && (
                <PostCard 
                    post={featuredPost}
                    orientation="horizontal"
                    priority
                />
            )}
            <div className="grid sm:grid-cols-2 gap-8">
                {otherPosts.map((post) => (
                    <PostCard
                        key={post.slug}
                        post={post}
                        orientation="vertical"
                    />
                ))}
            </div>
        </div>
        
        <div className="text-center mt-12">
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
