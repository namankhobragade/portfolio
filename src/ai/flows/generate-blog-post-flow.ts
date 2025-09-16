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
import { generateImage } from './generate-image-flow';

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
  imageDataUri: z.string().describe("The generated blog post image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  imagePrompt: z.string().describe("The prompt that was used to generate the blog post's featured image."),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: z.object({
    topic: z.string(),
    userSkills: z.array(z.string()),
  })},
  output: {schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    imagePrompt: z.string(),
  })},
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
5.  **Image Prompt:** Based on the blog post content, create a detailed, descriptive prompt for an AI image generator to create a visually appealing featured image. The prompt should describe an abstract or conceptual image, not a literal one. For example, for a post about API security, a good prompt would be "An abstract visualization of a secure data network, with glowing lines of light representing data flowing through digital tunnels, protected by crystalline shields."

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
    const { output: textOutput } = await prompt(input);
    if (!textOutput) {
        throw new Error('Failed to generate blog post text content.');
    }
    
    const { imageDataUri } = await generateImage({ prompt: textOutput.imagePrompt });

    return {
        ...textOutput,
        imageDataUri: imageDataUri,
    };
  }
);
