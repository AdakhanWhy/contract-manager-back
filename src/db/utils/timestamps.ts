import { type SQL, sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const now = (): SQL<string> => sql`CURRENT_TIMESTAMP(3)`;

export const createdAt = () =>
  timestamp('created_at', { withTimezone: true, precision: 3, mode: 'date' })
    .default(now())
    .notNull();

export const updatedAt = () =>
  timestamp('updated_at', { withTimezone: true, precision: 3, mode: 'string' })
    .default(now())
    .$onUpdate(() => now())
    .notNull();

export const timestamps = () => ({
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
