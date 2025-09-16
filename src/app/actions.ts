
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

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data. Please check your entries and try again. 🤔" };
  }

  // Honeypot check for bots
  if (parsedData.data.honeypot) {
    console.log("Bot detected.");
    // Return success to avoid tipping off the bot
    return { success: true, message: "Message sent successfully! I'll be in touch soon. 🚀" };
  }

  // Here you would typically send an email or save to a database.
  // For this example, we'll just log it to the console.
  console.log("New Contact Form Submission:", parsedData.data);
  
  return { success: true, message: "Message sent successfully! I'll be in touch soon. 🚀" };
}

// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = newsletterFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Please enter a valid email address. 🤔" };
  }
  
  // Here you would typically add the email to your mailing list.
  // For this example, we'll just log it.
  console.log("New Newsletter Subscription:", parsedData.data.email);

  return { success: true, message: "You're on the list! Welcome aboard. 🎉" };
}
