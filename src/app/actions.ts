
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

// ========= Contact Form Logic =========

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
    const validatedFields = contactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "There was an error with your submission.",
        };
    }
    
    // This is a server action, so we can safely handle form submissions here
    // without exposing sensitive info to the client-side.
    // In a real application, you would send an email or save to a database.
    console.log('Contact form submitted:', validatedFields.data);

    return {
        success: true,
        message: "Message sent successfully! 🚀 I'll be in touch soon.",
    };
}


// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const validatedFields = newsletterFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
        success: false,
        message: "Please enter a valid email address.",
    };
  }

  // Same as above, handle the subscription server-side.
  console.log('New newsletter subscription:', validatedFields.data.email);

  return {
    success: true,
    message: "You're on the list! 🎉 Welcome aboard.",
  };
}


// ========= Blog Post Saving Logic =========

const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  imageId: z.string(),
});

export async function saveBlogPost(post: z.infer<typeof blogPostSchema>) {
  const validatedPost = blogPostSchema.safeParse(post);

  if (!validatedPost.success) {
    return {
      success: false,
      message: 'Invalid post data.',
    };
  }

  const { title, slug, description, content, imageId } = validatedPost.data;
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  try {
    // Check if file already exists
    await fs.access(filePath);
    return {
        success: false,
        message: `A post with the slug "${slug}" already exists.`,
    };
  } catch (error) {
    // File does not exist, which is good.
  }

  const frontmatter = {
    title,
    slug,
    date: format(new Date(), 'yyyy-MM-dd'),
    imageId,
    description,
  };

  const fileContent = matter.stringify(content, frontmatter);

  try {
    await fs.writeFile(filePath, fileContent);
    return {
      success: true,
      message: 'Blog post saved successfully!',
    };
  } catch (error: any) {
    console.error('Failed to write blog post file:', error);
    return {
      success: false,
      message: `Failed to save file: ${error.message}`,
    };
  }
}
