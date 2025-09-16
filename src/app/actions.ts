
"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// ========= Contact Form Logic =========

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional(),
});


export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }

  // Honeypot check for bots
  if (parsedData.data.honeypot) {
    return { success: false, message: "Bot detected." };
  }
  
  return { success: true, message: "Thank you for your message! I'll get back to you soon." };

}


// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});


export async function subscribeToNewsletter(data: z.infer<typeof newsletterFormSchema>) {
  const parsedData = newsletterFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid email address." };
  }
  
  return { success: true, message: "Thanks for subscribing! You're on the list." };
}
