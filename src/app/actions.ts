"use server";

import { z } from "zod";

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

  try {
    // Here you would typically send an email or save to a database.
    // For this example, we'll just log the data to the console.
    console.log("New contact form submission:");
    console.log("Name:", parsedData.data.name);
    console.log("Email:", parsedData.data.email);
    console.log("Message:", parsedData.data.message);

    return { success: true, message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export async function subscribeToNewsletter(data: z.infer<typeof newsletterFormSchema>) {
  const parsedData = newsletterFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid email address." };
  }

  try {
    // Here you would add the email to your mailing list (e.g., Mailchimp, ConvertKit).
    // For this example, we'll just log it to the console.
    console.log("New newsletter subscription:", parsedData.data.email);

    return { success: true, message: "Thanks for subscribing! You're on the list." };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
