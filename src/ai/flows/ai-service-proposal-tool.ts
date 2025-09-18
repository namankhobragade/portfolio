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
import { googleAI } from '@genkit-ai/googleai';

const GenerateProposalInputSchema = z.object({
  clientName: z.string().optional().describe("The name of the client."),
  companyName: z.string().optional().describe("The name of the client's company."),
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
  model: googleAI.model('gemini-2.0-flash-exp'),
  prompt: `You are an expert freelance proposal writer. Generate a compelling and personalized sales proposal based on the client's needs and the service offered.

**Client Name:** {{{clientName}}}
**Company Name:** {{{companyName}}}
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
1.  Start with a personalized greeting. If a client name is provided (e.g., "Jane Doe"), address them directly (e.g., "Dear Jane Doe,"). If not, use a general greeting like "Dear Hiring Manager,".
2.  Write a proposal that directly addresses the client's needs. If a company name is provided, mention it to show the proposal is tailored for them.
3.  Use Markdown for formatting (e.g., headings, bold text, and numbered or bulleted lists).
4.  Structure the proposal logically with sections like "Introduction," "Our Solution," "Why Choose My Expertise," and "Benefits."
5.  Highlight how the provided skills and services create value for the client.
6.  Conclude the proposal with the name "Sunil Khobragade" instead of a placeholder.
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
