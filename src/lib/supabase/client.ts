
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// You can get these from your Supabase project settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: number;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
      };
      subscribers: {
        Row: {
          id: number;
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
          created_at: string;
        };
      };
      resume_downloads: {
        Row: {
          id: number;
          name: string;
          email: string;
          purpose: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          purpose: string;
          created_at: string;
        };
      };
      skills: {
        Row: {
          id: number;
          order: number;
          category: string;
          description: string;
          skills: { name: string; icon: string }[];
        };
      };
      projects: {
        Row: {
          id: number;
          order: number;
          title: string;
          slug: string;
          description: string;
          image_id: string | null;
          tech_stack: string[];
          security_focus: string;
          case_study: string;
          github_url?: string;
          demo_url?: string;
        };
      };
      education: {
        Row: {
          id: number;
          order: number;
          degree: string;
          institution: string;
          status: string;
          icon: string;
        };
      };
      certifications: {
        Row: {
          id: number;
          order: number;
          name: string;
          issuer: string;
          icon: string;
        };
      };
      experience: {
        Row: {
          id: number;
          order: number;
          company: string;
          role: string;
          period: string;
          responsibilities: string[];
        };
      };
      services: {
        Row: {
          id: number;
          order: number;
          title: string;
          description: string;
          icon: string;
        };
      };
      testimonials: {
        Row: {
          id: number;
          order: number;
          name: string;
          title: string;
          quote: string;
          avatar: string;
        };
      };
      posts: {
        Row: {
            id: number;
            created_at: string;
            title: string;
            slug: string;
            description: string;
            image_id: string | null;
            image_url: string | null;
            content: string;
        };
        Insert: {
            created_at?: string;
            title: string;
            slug: string;
            description: string;
            image_id?: string | null;
            image_url?: string | null;
            content: string;
        };
      };
      images: {
        Row: {
            id: number;
            created_at: string;
            image_id: string;
            description: string;
            image_url: string;
            image_hint: string | null;
        };
        Insert: {
            created_at?: string;
            image_id: string;
            description: string;
            image_url: string;
            image_hint?: string | null;
        };
      };
      visitors: {
        Row: {
          id: number;
          created_at: string;
          user_agent?: string;
          platform?: string;
          language?: string;
          ip?: string;
          geolocation?: any;
          connection_type?: string;
          cpu_cores?: number;
          memory?: number;
          screen_resolution?: string;
          is_touch_enabled?: boolean;
          gpu?: string;
          network_info?: any;
          is_online?: boolean;
          do_not_track?: string;
          performance?: any;
        };
        Insert: {
          created_at: string;
          user_agent?: string;
          platform?: string;
          language?: string;
          ip?: string;
          geolocation?: any;
          connection_type?: string;
          cpu_cores?: number;
          memory?: number;
          screen_resolution?: string;
          is_touch_enabled?: boolean;
          gpu?: string;
          network_info?: any;
          is_online?: boolean;
          do_not_track?: string;
          performance?: any;
        };
      };
    };
  };
}


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
