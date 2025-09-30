'use server';

/**
 * @fileOverview A conflict detection and alerting AI agent.
 *
 * - conflictDetectionAndAlerting - A function that handles the conflict detection and alerting process.
 * - ConflictDetectionAndAlertingInput - The input type for the conflictDetectionAndAlerting function.
 * - ConflictDetectionAndAlertingOutput - The return type for the conflictDetectionAndAlerting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConflictDetectionAndAlertingInputSchema = z.object({
  trainsetData: z
    .string()
    .describe(
      'The current trainset data as a JSON string.'
    ),
  userRole: z
    .string()
    .describe(
      'The role of the user triggering the conflict detection (admin, supervisor, viewer).'
    ),
});

export type ConflictDetectionAndAlertingInput = z.infer<typeof ConflictDetectionAndAlertingInputSchema>;

const ConflictDetectionAndAlertingOutputSchema = z.object({
  alerts: z.array(z.string()).describe('A list of conflict alerts.'),
});

export type ConflictDetectionAndAlertingOutput = z.infer<typeof ConflictDetectionAndAlertingOutputSchema>;

export async function conflictDetectionAndAlerting(input: ConflictDetectionAndAlertingInput): Promise<ConflictDetectionAndAlertingOutput> {
  return conflictDetectionAndAlertingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conflictDetectionAndAlertingPrompt',
  input: {schema: ConflictDetectionAndAlertingInputSchema},
  output: {schema: ConflictDetectionAndAlertingOutputSchema},
  prompt: `You are an expert in identifying potential conflicts in trainset data for Kochi Metro.

You will receive trainset data and the user role, and you will generate a list of conflict alerts.

Conflicts include expiring certificates, overdue cleaning, and any other issues that could disrupt operations.

Consider the user role when generating alerts. Admins should receive all alerts, while supervisors may receive a subset.

Trainset Data: {{{trainsetData}}}
User Role: {{{userRole}}}

Output a JSON array of strings, each string being an alert message.
`, // added extra newline
});

const conflictDetectionAndAlertingFlow = ai.defineFlow(
  {
    name: 'conflictDetectionAndAlertingFlow',
    inputSchema: ConflictDetectionAndAlertingInputSchema,
    outputSchema: ConflictDetectionAndAlertingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
