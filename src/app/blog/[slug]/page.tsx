
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MarkdownContent } from '@/components/markdown-content';
import { ShareButtons } from '@/components/share-buttons';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { NewsletterModal } from '@/components/newsletter-modal';
import { PostCard } from '@/components/post-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postImage = PlaceHolderImages.find((p) => p.id === post.frontmatter.imageId);
  const imageUrl = postImage ? `${siteUrl}${postImage.imageUrl.startsWith('/') ? '' : '/'}${postImage.imageUrl}` : `${siteUrl}/og-image.png`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: [{ name: 'Sunil Khobragade', url: 'https://www.linkedin.com/in/sunilkhobragade' }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: new Date(post.frontmatter.date).toISOString(),
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [imageUrl],
      creator: '@naman-mahi',
    }
  };
}

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

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug) // Exclude current post
    .slice(0, 2); // Get the next 2 posts

  const postImage = PlaceHolderImages.find((p) => p.id === post.frontmatter.imageId);
  const imageUrl = postImage ? `${siteUrl}${postImage.imageUrl.startsWith('/') ? '' : '/'}${postImage.imageUrl}` : `${siteUrl}/og-image.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.frontmatter.title,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": "Sunil Khobragade",
      "url": "https://www.linkedin.com/in/sunilkhobragade"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSec",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.svg`
      }
    },
    "datePublished": new Date(post.frontmatter.date).toISOString(),
    "description": post.frontmatter.description
  };

  return (
    <>
      <NewsletterModal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            alt={post.frontmatter.title}
            data-ai-hint={postImage.imageHint}
            width={1200}
            height={675}
            className="aspect-video w-full object-cover rounded-lg mb-8"
            priority
          />
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          <MarkdownContent content={post.content} />
        </div>
        
        <Separator className="my-12" />

         {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight font-headline mb-8 text-center">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} orientation="vertical" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
