import { type SQL, type SQLWrapper, sql } from 'drizzle-orm';
import { geometry } from 'drizzle-orm/pg-core';

export const locationColumn = <TName extends string>(name: TName) => {
  return geometry<TName, 'xy'>(name, { type: 'point', mode: 'xy', srid: 4326 });
};

export const sqlPoint = (x: number, y: number) =>
  sql`ST_SetSRID(ST_MakePoint(${x}, ${y}), 4326)`;

export const ST_Distance = (
  pointA: SQLWrapper,
  pointB: SQLWrapper,
): SQL<number> => sql`ST_Distance(${pointA}, ${pointB})`;
