import { supabase } from '@/lib/supabase/client';

export type Post = {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  image_id: string | null;
  image_url: string | null;
  content: string;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }

  return data;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
  
  return data || [];
}
