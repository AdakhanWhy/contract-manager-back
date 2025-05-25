import { createId } from '@paralleldrive/cuid2';
import { varchar } from 'drizzle-orm/pg-core';

export const foreignKeyColumn = <TName extends string>(name: TName) => {
  return varchar(name, { length: 128 });
};

export const idColumn = () =>
  varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey();
