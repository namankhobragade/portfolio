
"use server";

import { z } from "zod";

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
