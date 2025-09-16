
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation';

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
