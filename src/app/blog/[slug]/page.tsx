import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MarkdownContent } from '@/components/markdown-content';
import { ShareButtons } from '@/components/share-buttons';
import { format } from 'date-fns';
import type { Metadata, ResolvingMetadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { NewsletterModal } from '@/components/newsletter-modal';
import { PostCard } from '@/components/post-card';
import { getImageById } from '@/lib/images';

type Props = {
  params: { slug: string };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  let imageUrl = `${siteUrl}/og-image.png`;
  if (post.image_url) {
      imageUrl = post.image_url.startsWith('http') ? post.image_url : `${siteUrl}${post.image_url}`;
  } else if (post.image_id) {
      const postImage = await getImageById(post.image_id);
      if (postImage) {
          imageUrl = `${siteUrl}${postImage.image_url.startsWith('/') ? '' : '/'}${postImage.image_url}`;
      }
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: 'Sunil Khobragade', url: 'https://www.linkedin.com/in/sunilkhobragade' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: new Date(post.created_at).toISOString(),
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug) // Exclude current post
    .slice(0, 2); // Get the next 2 posts
    
  let postImage: { image_url: string; image_hint?: string | null } | null = null;
  if (post.image_url) {
    postImage = { image_url: post.image_url };
  } else if (post.image_id) {
    const fetchedImage = await getImageById(post.image_id);
    if (fetchedImage) {
        postImage = { image_url: fetchedImage.image_url, image_hint: fetchedImage.image_hint };
    }
  }
  
  const schemaImageUrl = postImage ? (postImage.image_url.startsWith('http') ? postImage.image_url : `${siteUrl}${postImage.image_url}`) : `${siteUrl}/og-image.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": schemaImageUrl,
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
    "datePublished": new Date(post.created_at).toISOString(),
    "description": post.description
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
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-2">{post.title}</h1>
        <p className="text-muted-foreground mb-4">
          Posted on {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </p>
        
        {postImage && (
          <Image
            src={postImage.image_url}
            alt={post.title}
            data-ai-hint={postImage.image_hint || ''}
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
