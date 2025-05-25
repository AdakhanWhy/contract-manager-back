import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function createPostgresClient<
  TSchema extends Record<string, unknown> = Record<string, never>,
>(DATABASE_URL: string, schema: TSchema) {
  const client = postgres(DATABASE_URL);
  const db = drizzle(client, {
    schema,
  });

  return db;
}
