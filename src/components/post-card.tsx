
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "./animated-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Post } from "@/lib/blog";

type PostCardProps = {
  post: Post;
  orientation?: "vertical" | "horizontal";
  priority?: boolean;
};

export function PostCard({ post, orientation = "vertical", priority = false }: PostCardProps) {
  const postImage = PlaceHolderImages.find(p => p.id === post.image_id);

  return (
    <AnimatedItem>
        <Link href={`/blog/${post.slug}`} className="group block">
            <div className={cn(
                "flex gap-6 rounded-lg transition-all",
                orientation === "vertical" ? "flex-col" : "flex-col md:flex-row items-center",
            )}>
                {postImage && (
                <div className={cn(
                    "overflow-hidden rounded-lg", 
                    orientation === 'horizontal' ? 'w-full md:w-1/2' : 'w-full'
                )}>
                    <Image
                        src={postImage.imageUrl}
                        alt={post.title}
                        data-ai-hint={postImage.imageHint}
                        width={orientation === 'horizontal' ? 800 : 600}
                        height={orientation === 'horizontal' ? 450 : 400}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={priority}
                    />
                </div>
                )}
                <div className={cn(
                    "flex flex-col",
                     orientation === 'horizontal' ? 'w-full md:w-1/2' : 'w-full'
                )}>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="/images/avatar.png" alt="Sunil Khobragade" />
                            <AvatarFallback>SK</AvatarFallback>
                        </Avatar>
                        <span>Sunil Khobragade</span>
                        <span className="text-xs">·</span>
                        <time dateTime={post.created_at}>
                            {format(new Date(post.created_at), "MMMM d, yyyy")}
                        </time>
                    </div>
                    <h3 className="text-xl font-bold font-headline tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                        {post.description}
                    </p>
                </div>
            </div>
        </Link>
    </AnimatedItem>
  );
}
