import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schema';

export default defineConfig({
  basePath: '/studio',
  projectId: 'dku4omlj',
  dataset: 'production',
  title: 'LifeLegends Admin',
  schema,
  plugins: [structureTool()],
});
