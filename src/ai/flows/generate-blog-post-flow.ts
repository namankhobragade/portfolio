
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
import { supabase } from '@/lib/supabase/client';

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
  imageUrl: z.string().optional().describe('An optional URL for a user-provided image.'),
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

async function urlToDataUri(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${url}`);
    }
    const contentType = response.headers.get('content-type') || 'image/png';
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64}`;
}


const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async ({ topic, imageUrl }) => {
    const { data: skillsData, error } = await supabase
      .from('skills')
      .select('skills');

    if (error) {
      console.error('Error fetching skills for blog post generation:', error);
      throw new Error('Could not fetch skills from database.');
    }
    
    const userSkills = skillsData.flatMap((category: any) => category.skills.map((skill: any) => skill.name));

    const { output: textOutput } = await prompt({ topic, userSkills });
    if (!textOutput) {
        throw new Error('Failed to generate blog post text content.');
    }
    
    let finalImageDataUri;
    if (imageUrl) {
        finalImageDataUri = await urlToDataUri(imageUrl);
    } else {
        const { imageDataUri } = await generateImage({ prompt: textOutput.imagePrompt });
        finalImageDataUri = imageDataUri;
    }

    return {
        ...textOutput,
        imageDataUri: finalImageDataUri,
    };
  }
);
