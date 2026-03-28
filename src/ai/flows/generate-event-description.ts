'use server';
/**
 * @fileOverview An AI assistant flow for generating event descriptions, titles, and optimized keywords.
 *
 * - generateEventDescription - A function that generates event details based on initial input.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('A brief name or draft title for the event.'),
  eventCategory: z.string().describe('The category of the event (e.g., concert, workshop, conference).'),
  keyDetails: z.string().describe('Important details about the event, such as date, time, location, and main topics.'),
  targetAudience: z.string().optional().describe('Who the event is for, if specified.'),
});
export type GenerateEventDescriptionInput = z.infer<typeof GenerateEventDescriptionInputSchema>;

const GenerateEventDescriptionOutputSchema = z.object({
  generatedTitle: z.string().describe('A compelling and attention-grabbing title for the event.'),
  generatedDescription: z.string().describe('An engaging and detailed description of the event, highlighting its benefits and what attendees can expect.'),
  optimizedKeywords: z.array(z.string()).describe('A list of optimized keywords (up to 10) for search engine optimization and event discovery.'),
});
export type GenerateEventDescriptionOutput = z.infer<typeof GenerateEventDescriptionOutputSchema>;

export async function generateEventDescription(input: GenerateEventDescriptionInput): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const generateEventDescriptionPrompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: { schema: GenerateEventDescriptionInputSchema },
  output: { schema: GenerateEventDescriptionOutputSchema },
  prompt: `You are an AI assistant specialized in creating engaging event listings. Your task is to generate a compelling event title, an engaging event description, and a list of optimized keywords based on the provided event details.

Event Name (draft): {{{eventName}}}
Event Category: {{{eventCategory}}}
Key Details: {{{keyDetails}}}
{{#if targetAudience}}Target Audience: {{{targetAudience}}}{{/if}}

Based on the information above, please generate:
- A compelling and attention-grabbing title.
- An engaging and detailed description, highlighting benefits and what attendees can expect.
- A list of optimized keywords (up to 10) for search engine optimization and event discovery.`,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateEventDescriptionPrompt(input);
    return output!;
  },
);
