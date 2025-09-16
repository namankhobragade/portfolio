
"use server";

import { z } from "zod";

// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});
