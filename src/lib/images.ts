import { supabase } from '@/lib/supabase/client';
import { unstable_cache as cache } from 'next/cache';

export type Image = {
  id: number;
  created_at: string;
  image_id: string;
  description: string;
  image_url: string;
  image_hint: string | null;
};

export const getImageById = cache(
  async (imageId: string): Promise<Image | null> => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('image_id', imageId)
      .single();

    if (error) {
      console.error(`Error fetching image by ID "${imageId}":`, error);
      return null;
    }

    return data;
  },
  ['images'],
  { revalidate: 3600 } // Revalidate every hour
);

export const getAllImages = cache(
  async (): Promise<Image[]> => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all images:', error);
      return [];
    }
    
    return data || [];
  },
  ['images'],
  { revalidate: 3600 } // Revalidate every hour
);
