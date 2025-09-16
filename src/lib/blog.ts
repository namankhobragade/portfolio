import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type PostFrontmatter = {
  title: string;
  date: string;
  imageId: string;
  description: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data as PostFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return undefined;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Filter out any undefined posts and sort by date
  return posts
    .filter((post): post is Post => !!post)
    .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
}
