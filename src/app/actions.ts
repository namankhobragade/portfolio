
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

type Contact = {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
};

const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

async function getContacts(): Promise<Contact[]> {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error("Error reading contacts file:", error);
    throw new Error("Could not read contacts data.");
  }
}

async function saveContacts(contacts: Contact[]) {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing contacts file:", error);
    throw new Error("Could not save contacts data.");
  }
}

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }

  // Honeypot check for bots
  if (parsedData.data.honeypot) {
    return { success: false, message: "Bot detected." };
  }
  
  const { name, email, message } = parsedData.data;

  try {
    const contacts = await getContacts();
    
    const newContact: Contact = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    await saveContacts(contacts);

    return { success: true, message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}


// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});

type Subscriber = {
  email: string;
  subscribedAt: string;
};

const subscribersFilePath = path.join(process.cwd(), 'data', 'subscribers.json');

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(subscribersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error("Error reading subscribers file:", error);
    throw new Error("Could not read subscribers data.");
  }
}

async function saveSubscribers(subscribers: Subscriber[]) {
  try {
    await fs.writeFile(subscribersFilePath, JSON.stringify(subscribers, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing subscribers file:", error);
    throw new Error("Could not save subscribers data.");
  }
}

export async function subscribeToNewsletter(data: z.infer<typeof newsletterFormSchema>) {
  const parsedData = newsletterFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid email address." };
  }
  
  const { email } = parsedData.data;

  try {
    const subscribers = await getSubscribers();
    
    if (subscribers.some(sub => sub.email === email)) {
      return { success: false, message: "This email is already subscribed." };
    }

    const newSubscriber: Subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return { success: true, message: "Thanks for subscribing! You're on the list." };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
