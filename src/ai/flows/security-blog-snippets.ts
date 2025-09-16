// src/ai/flows/security-blog-snippets.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing security-related blog post snippets.
 *
 * - summarizeSecurityBlogSnippet - A function that takes security blog post content as input and returns a concise summary highlighting key security insights.
 * - SummarizeSecurityBlogSnippetInput - The input type for the summarizeSecurityBlogSnippet function.
 * - SummarizeSecurityBlogSnippetOutput - The return type for the summarizeSecurityBlogSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityBlogSnippetInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the security-related blog post to be summarized.'),
});
export type SummarizeSecurityBlogSnippetInput = z.infer<typeof SummarizeSecurityBlogSnippetInputSchema>;

const SummarizeSecurityBlogSnippetOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the security-related blog post, highlighting key security insights.'),
});
export type SummarizeSecurityBlogSnippetOutput = z.infer<typeof SummarizeSecurityBlogSnippetOutputSchema>;

export async function summarizeSecurityBlogSnippet(input: SummarizeSecurityBlogSnippetInput): Promise<SummarizeSecurityBlogSnippetOutput> {
  return summarizeSecurityBlogSnippetFlow(input);
}

const summarizeSecurityBlogSnippetPrompt = ai.definePrompt({
  name: 'summarizeSecurityBlogSnippetPrompt',
  input: {schema: SummarizeSecurityBlogSnippetInputSchema},
  output: {schema: SummarizeSecurityBlogSnippetOutputSchema},
  prompt: `Summarize the following security-related blog post content in a single sentence, focusing on key insights related to secure coding practices or AI in cybersecurity:\n\n  {{{blogPostContent}}}`,
});

const summarizeSecurityBlogSnippetFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityBlogSnippetFlow',
    inputSchema: SummarizeSecurityBlogSnippetInputSchema,
    outputSchema: SummarizeSecurityBlogSnippetOutputSchema,
  },
  async input => {
    const {output} = await summarizeSecurityBlogSnippetPrompt(input);
    return output!;
  }
);
