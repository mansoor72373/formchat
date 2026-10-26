import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { db } from '@/db';
import { users } from '@/db/schema';
import { AppError, Errors } from '@/lib/api/errors';
import type { loginSchema, registerSchema } from '@/schemas/auth.schema';
import type { UserDTO } from '@/types/form';
import { toUserDTO } from './mappers';

export async function registerUser(input: z.output<typeof registerSchema>): Promise<UserDTO> {
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, input.email));
  if (existing) throw Errors.conflict('An account with this email already exists');

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [user] = await db
    .insert(users)
    .values({ name: input.name, email: input.email, passwordHash })
    .returning();
  return toUserDTO(user!);
}

export async function authenticate(input: z.output<typeof loginSchema>): Promise<UserDTO> {
  const [user] = await db.select().from(users).where(eq(users.email, input.email));
  // Same message for unknown email and wrong password to avoid account enumeration.
  const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
  if (!user || !valid)
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Incorrect email or password');
  return toUserDTO(user);
}

export async function getUserById(id: string): Promise<UserDTO | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ? toUserDTO(user) : null;
}
