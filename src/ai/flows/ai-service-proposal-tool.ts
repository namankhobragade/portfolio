// src/ai/flows/ai-service-proposal-tool.ts
'use server';
/**
 * @fileOverview Generates tailored freelance proposals based on client requirements.
 *
 * - generateProposal - A function that generates the freelance proposal.
 * - GenerateProposalInput - The input type for the generateProposal function.
 * - GenerateProposalOutput - The return type for the generateProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProposalInputSchema = z.object({
  clientNeeds: z.string().describe('The client needs and requirements for the project.'),
  serviceDescription: z.string().describe('A detailed description of the service being offered.'),
  userSkills: z.array(z.string()).describe('The skills that the user has.'),
});
export type GenerateProposalInput = z.infer<typeof GenerateProposalInputSchema>;

const GenerateProposalOutputSchema = z.object({
  proposalText: z.string().describe('The generated sales proposal text in Markdown format.'),
});
export type GenerateProposalOutput = z.infer<typeof GenerateProposalOutputSchema>;

export async function generateProposal(input: GenerateProposalInput): Promise<GenerateProposalOutput> {
  return generateProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProposalPrompt',
  input: {schema: GenerateProposalInputSchema},
  output: {schema: GenerateProposalOutputSchema},
  prompt: `You are an expert freelance proposal writer. Generate a compelling and personalized sales proposal based on the client's needs and the service offered.

**Client Needs:**
{{{clientNeeds}}}

**Service Description:**
{{{serviceDescription}}}

**Key Skills to Highlight:**
{{#each userSkills}}
- {{{this}}}
{{/each}}

---

**Instructions:**
1.  Write a proposal that directly addresses the client's needs.
2.  Use Markdown for formatting (e.g., headings, bold text, and numbered or bulleted lists).
3.  Structure the proposal logically with sections like "Introduction," "Our Solution," "Why Choose My Expertise," and "Benefits."
4.  Highlight how the provided skills and services create value for the client.
5.  Conclude the proposal with the name "Sunil Khobragade" instead of a placeholder.
`,
});

const generateProposalFlow = ai.defineFlow(
  {
    name: 'generateProposalFlow',
    inputSchema: GenerateProposalInputSchema,
    outputSchema: GenerateProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
