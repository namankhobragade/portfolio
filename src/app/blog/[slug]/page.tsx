import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MarkdownContent } from '@/components/markdown-content';
import { ShareButtons } from '@/components/share-buttons';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((p) => p.id === post.frontmatter.imageId);

  return (
    <article className="container max-w-4xl py-12 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <Button asChild variant="ghost">
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <ShareButtons title={post.frontmatter.title} slug={post.slug} />
      </div>

      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-2">{post.frontmatter.title}</h1>
      <p className="text-muted-foreground mb-4">
        Posted on {format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}
      </p>
      
      {postImage && (
        <Image
          src={postImage.imageUrl}
          alt={postImage.description}
          data-ai-hint={postImage.imageHint}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}
