import { idColumn } from './idColumn';
import { timestamps } from './timestamps';

export const defaultColumns = () => ({
  id: idColumn(),
  ...timestamps(),
});
