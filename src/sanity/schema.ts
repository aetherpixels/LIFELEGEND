import { type SchemaTypeDefinition } from 'sanity';
import { biographyType } from './schemas/biography';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [biographyType],
};
