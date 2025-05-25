import { pgEnum } from 'drizzle-orm/pg-core';

export const contractStatusEnum = pgEnum('contract_status', [
  'draft',
  'active',
  'expired',
  'terminated',
]);
