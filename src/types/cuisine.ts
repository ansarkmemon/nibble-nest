import { z } from 'zod';

export const CuisineEnum = z.enum([
  'Italian',
  'French',
  'American',
  'Indian',
  'Chinese',
  'Japanese',
  'Middle Eastern',
  'Greek',
  'Spanish',
  'Lebanese',
  'Turkish',
  'Indonesian',
  'Korean',
  'Mexican',
  'Thai',
  'Vietnamese',
]);

export type CuisineEnum = z.infer<typeof CuisineEnum>;
