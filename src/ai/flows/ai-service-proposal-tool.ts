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
  proposalText: z.string().describe('The generated sales proposal text.'),
});
export type GenerateProposalOutput = z.infer<typeof GenerateProposalOutputSchema>;

export async function generateProposal(input: GenerateProposalInput): Promise<GenerateProposalOutput> {
  return generateProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProposalPrompt',
  input: {schema: GenerateProposalInputSchema},
  output: {schema: GenerateProposalOutputSchema},
  prompt: `You are an expert freelance proposal writer. Generate a compelling and personalized sales proposal based on the client's needs and the service offered.\n\nClient Needs: {{{clientNeeds}}}\nService Description: {{{serviceDescription}}}\nUser Skills: {{#each userSkills}}{{{this}}} {{/each}}\n\nWrite a proposal that addresses the client's needs and highlights the benefits of the service. Focus on how the service and the user's skills can provide value to the client.`, // Updated prompt
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
