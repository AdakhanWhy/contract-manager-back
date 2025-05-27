import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../utils/createTable';
import { defaultColumns } from '../utils/defaultColumns';

export const users = createTable('users', {
  ...defaultColumns(),
  phone: varchar('phone', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  encryptedPassword: varchar('encrypted_password', { length: 255 }).notNull(),
});

export type SelectUsersData = typeof users.$inferSelect;
export type InsertUsersData = typeof users.$inferInsert;
