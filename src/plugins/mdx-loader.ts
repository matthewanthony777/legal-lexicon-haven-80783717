
import { Plugin } from 'vite';
import { getAllArticlesData } from './article-loader';

/**
 * Vite plugin that provides MDX content data to the application
 * through a virtual module
 */
export function mdxDataPlugin(): Plugin {
  const virtualModuleId = 'virtual:mdx-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-mdx-data',
    
    configResolved(config) {
      console.log('Vite MDX plugin initialized');
      console.log('Root directory:', config.root);
    },
    
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    
    load(id) {
      if (id === resolvedVirtualModuleId) {
        console.log('Loading virtual MDX data module');
        const articles = getAllArticlesData();
        console.log(`Loaded ${articles.length} articles into virtual module`);
        return `export const articles = ${JSON.stringify(articles)}`
      }
    }
  }
}
