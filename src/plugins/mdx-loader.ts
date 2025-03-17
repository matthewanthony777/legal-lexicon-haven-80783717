
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
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        console.log('Loading MDX data for virtual module');
        const articles = getAllArticlesData();
        console.log(`Virtual module loaded ${articles.length} articles`);
        return `export const articles = ${JSON.stringify(articles)}`
      }
    }
  }
}
