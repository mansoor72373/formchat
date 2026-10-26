import { z } from '@/lib/openapi/zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(60),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(8, 'Use at least 8 characters').max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
