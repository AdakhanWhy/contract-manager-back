import { varchar } from 'drizzle-orm/pg-core';
import { createTable } from '../utils/createTable';
import { defaultColumns } from '../utils/defaultColumns';

export const contractTemplate = createTable('contract_template', {
  ...defaultColumns(),
  name: varchar('name', { length: 255 }).notNull(),
  content: varchar('content', { length: 255 }).notNull(),
});

export type SelectContractTemplateData = typeof contractTemplate.$inferSelect;
export type InsertContractTemplateData = typeof contractTemplate.$inferInsert;
