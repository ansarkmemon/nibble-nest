import { z } from 'zod';

export const CUISINE_TYPES = [
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
] as const;

export const CuisineEnum = z.enum(CUISINE_TYPES);

export type CuisineEnum = z.infer<typeof CuisineEnum>;
