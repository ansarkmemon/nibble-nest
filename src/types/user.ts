import { z } from 'zod';

export const User = z.object({
  email: z.string().email(),
  lastName: z.string(),
  firstName: z.string(),
  picture: z.string().optional(),
  auth0Id: z.string(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
});
