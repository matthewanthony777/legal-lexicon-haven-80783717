
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
        console.log('Loading MDX data for virtual module...');
        const articles = getAllArticlesData();
        console.log(`Loaded ${articles.length} articles for virtual module`);
        
        // Log the first few articles to help with debugging
        if (articles.length > 0) {
          console.log('First article:', {
            title: articles[0].title,
            slug: articles[0].slug,
            category: articles[0].category || 'none',
            tags: articles[0].tags || []
          });
        }
        
        return `export const articles = ${JSON.stringify(articles)}`
      }
    }
  }
}
