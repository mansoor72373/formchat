import { sql } from 'drizzle-orm';
import { index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { FORM_STATUSES } from '@/config/constants';
import type { Answers, FormSettings, Question } from '@/types/form';

export const formStatusEnum = pgEnum('form_status', FORM_STATUSES);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const forms = pgTable(
  'forms',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    description: text('description').notNull().default(''),
    slug: text('slug').notNull().unique(),
    status: formStatusEnum('status').notNull().default('draft'),
    questions: jsonb('questions')
      .$type<Question[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    settings: jsonb('settings').$type<FormSettings>().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('forms_user_id_idx').on(t.userId)],
);

export const responses = pgTable(
  'responses',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    formId: uuid('form_id')
      .notNull()
      .references(() => forms.id, { onDelete: 'cascade' }),
    answers: jsonb('answers').$type<Answers>().notNull(),
    submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('responses_form_id_idx').on(t.formId, t.submittedAt)],
);
