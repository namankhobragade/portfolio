
// src/app/sitemap.ts
import { getAllPosts } from '@/lib/blog';
import { MetadataRoute } from 'next';

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devsec-portfolio.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const routes = [
    '',
    '/blog',
    '/#about',
    '/#services',
    '/#skills',
    '/#projects',
    '/#experience',
    '/#studies',
    '/#certifications',
    '/#testimonials',
    '/#proposal',
    '/#contact'
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...blogPosts];
}
