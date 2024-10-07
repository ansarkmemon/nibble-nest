import { ZodError, ZodType, ZodObject } from 'zod';

export function validatePayload<T extends ZodType>(
  schema: T,
  payload: unknown
) {
  try {
    const parsedData = schema.parse(payload);
    return { success: true, data: parsedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues.map((issue) => ({
        [issue.path[0]]: issue.message,
      }));
      return { success: false, data: issues };
    }
    return { success: false, data: ['An unexpected error occurred'] };
  }
}
