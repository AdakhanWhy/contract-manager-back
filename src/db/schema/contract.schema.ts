import { boolean, varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../utils/createTable';
import { defaultColumns } from '../utils/defaultColumns';
import { contractStatusEnum } from './enums';
import { contractTemplate } from './contract-template.schema';
import { foreignKeyColumn } from '../utils/idColumn';
import { users } from './users.schema';

export const contract = createTable('contract', {
  ...defaultColumns(),
  title: varchar('title', { length: 255 }).notNull(),
  templateId: foreignKeyColumn('template_id')
    .references(() => contractTemplate.id)
    .notNull(),
  status: contractStatusEnum('status').default('draft'),
  isSigned: boolean('is_signed').default(false),
  userId: foreignKeyColumn('user_id')
    .references(() => users.id)
    .notNull(),
});

export type SelectContractData = typeof contract.$inferSelect;
export type InsertContractData = typeof contract.$inferInsert;
