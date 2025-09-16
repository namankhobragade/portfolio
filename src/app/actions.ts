
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { ImagePlaceholder } from "@/lib/placeholder-images";

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
  imageDataUri: z.string(),
  imagePrompt: z.string(),
});

export async function saveBlogPost(post: z.infer<typeof blogPostSchema>) {
  const validatedPost = blogPostSchema.safeParse(post);

  if (!validatedPost.success) {
    return {
      success: false,
      message: 'Invalid post data.',
    };
  }

  const { title, slug, description, content, imageDataUri, imagePrompt } = validatedPost.data;
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const imagesDirectory = path.join(process.cwd(), 'public/images/blog');
  const placeholderImagesPath = path.join(process.cwd(), 'src/lib/placeholder-images.json');
  
  const mdFilePath = path.join(postsDirectory, `${slug}.md`);
  const imageFileName = `${slug}.png`;
  const imageFilePath = path.join(imagesDirectory, imageFileName);
  const publicImageUrl = `/images/blog/${imageFileName}`;
  const imageId = `blog-${slug}`;

  try {
    // Check if markdown file already exists
    await fs.access(mdFilePath);
    return {
        success: false,
        message: `A post with the slug "${slug}" already exists.`,
    };
  } catch (error) {
    // File does not exist, which is good.
  }
  
  try {
     // Check if image file already exists
     await fs.access(imageFilePath);
     return {
         success: false,
         message: `An image with the name "${imageFileName}" already exists.`,
     };
   } catch (error) {
     // File does not exist, which is good.
   }


  // 1. Save the image file
  try {
    await fs.mkdir(imagesDirectory, { recursive: true });
    const base64Data = imageDataUri.split(';base64,').pop();
    if (!base64Data) throw new Error('Invalid image data URI.');
    await fs.writeFile(imageFilePath, base64Data, 'base64');
  } catch (error: any) {
    console.error('Failed to write image file:', error);
    return {
      success: false,
      message: `Failed to save image file: ${error.message}`,
    };
  }

  // 2. Update placeholder-images.json
  try {
    const placeholderImagesFile = await fs.readFile(placeholderImagesPath, 'utf-8');
    const placeholderData = JSON.parse(placeholderImagesFile);
    
    const newImageEntry: ImagePlaceholder = {
        id: imageId,
        description: `Featured image for blog post titled: ${title}`,
        imageUrl: publicImageUrl,
        imageHint: imagePrompt.split(' ').slice(0, 2).join(' '),
    };

    placeholderData.placeholderImages.unshift(newImageEntry); // Add to the beginning

    await fs.writeFile(placeholderImagesPath, JSON.stringify(placeholderData, null, 2));

  } catch (error: any) {
     console.error('Failed to update placeholder-images.json:', error);
     return {
       success: false,
       message: `Failed to update image manifest: ${error.message}`,
     };
  }

  // 3. Save the blog post markdown file
  const frontmatter = {
    title,
    slug,
    date: format(new Date(), 'yyyy-MM-dd'),
    imageId: imageId,
    description,
  };

  const fileContent = matter.stringify(content, frontmatter);

  try {
    await fs.writeFile(mdFilePath, fileContent);
    return {
      success: true,
      message: 'Blog post saved successfully!',
    };
  } catch (error: any) {
    console.error('Failed to write blog post file:', error);
    return {
      success: false,
      message: `Failed to save markdown file: ${error.message}`,
    };
  }
}
