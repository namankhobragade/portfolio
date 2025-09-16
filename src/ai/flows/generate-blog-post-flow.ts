'use server';
/**
 * @fileOverview Generates a complete blog post based on a topic.
 *
 * - generateBlogPost - A function that generates the blog post.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
  userSkills: z.array(z.string()).describe('A list of the user\'s key skills to subtly weave into the blog post.'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('A catchy and SEO-friendly title for the blog post.'),
  slug: z.string().describe('A URL-friendly slug for the blog post (e.g., "how-to-secure-apis").'),
  description: z.string().describe('A brief, compelling meta description for the blog post (1-2 sentences).'),
  content: z.string().describe('The full content of the blog post in Markdown format. It should be well-structured with headings, lists, and code blocks where appropriate.'),
  imageId: z.string().describe('A suitable image ID from the provided list for the blog post\'s featured image.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const imageIdList = [
    "blog-1", "blog-2", "blog-3", "blog-4", "blog-5", 
    "blog-zero-trust", "blog-serverless-security", "blog-api-security", 
    "blog-cloud-native", "blog-owasp-top-10", "blog-oauth-oidc", 
    "blog-pwa-nextjs", "blog-social-engineering", "blog-incident-response", "blog-es2022"
];

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: GenerateBlogPostInputSchema},
  output: {schema: GenerateBlogPostOutputSchema},
  prompt: `You are an expert tech blogger and content creator specializing in web development, cybersecurity, and AI. Your writing style is clear, informative, and engaging.

**Your Task:**
Write a comprehensive blog post about the following topic: **{{{topic}}}**

**Instructions:**
1.  **Title:** Create a catchy, descriptive, and SEO-friendly title.
2.  **Slug:** Generate a URL-friendly slug from the title (e.g., 'a-guide-to-api-security').
3.  **Description:** Write a compelling meta description (1-2 sentences) summarizing the article's content.
4.  **Content:**
    *   Write a full-length blog post in Markdown format.
    *   Structure the article logically with an introduction, main body with headings (##) and subheadings (###), and a conclusion.
    *   Include practical examples, and where appropriate, add code blocks (using Markdown like \`\`\`javascript or \`\`\`bash).
    *   Subtly reference the author's expertise by mentioning some of the following skills where relevant:
        {{#each userSkills}}
        - {{{this}}}
        {{/each}}
    *   The tone should be professional yet accessible.
5.  **Image ID:** Based on the topic, select the most appropriate 'imageId' from the following list. Do not invent a new one.
    Available Image IDs: ${imageIdList.join(', ')}

Your final output must be a single JSON object matching the defined schema.
`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
