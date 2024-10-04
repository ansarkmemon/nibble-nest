import { z } from 'zod';

export const Recipe = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string(),
});

export type Recipe = z.infer<typeof Recipe>;
