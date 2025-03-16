
import { processApiError } from './error-handling';
import { Article, ArticleMetadata } from '@/types/article';
import { getAllArticlesData } from '@/plugins/article-loader';
import fallbackArticles from '../data/fallback-articles.json';

/**
 * Get all articles, prioritizing local files over API requests
 */
export async function getAllArticles(): Promise<ArticleMetadata[]> {
  try {
    console.log('Fetching articles from local files first');
    // First try to get articles from local files
    const localArticles = getAllArticlesData();
    
    if (localArticles && localArticles.length > 0) {
      console.log(`Successfully loaded ${localArticles.length} articles from local files`);
      return localArticles;
    }
    
    // If no local articles, use fallback
    console.log('No local articles found, using fallback articles');
    return fallbackArticles as ArticleMetadata[];
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    processApiError(error);
    
    // Last resort fallback - use fallback articles
    console.warn('Using fallback articles due to error');
    return fallbackArticles as ArticleMetadata[];
  }
}

/**
 * Get a specific article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    // Get all articles first
    const allArticles = await getAllArticles();
    
    // Find the article with matching slug
    const articleMetadata = allArticles.find(article => article.slug === slug);
    
    if (!articleMetadata) {
      console.warn(`Article with slug "${slug}" not found`);
      return undefined;
    }
    
    // Convert ArticleMetadata to Article if it doesn't have content
    if (!('content' in articleMetadata)) {
      return {
        ...articleMetadata,
        content: '' // Add empty content to satisfy Article type
      };
    }
    
    return articleMetadata as Article;
  } catch (error) {
    console.error(`Error getting article by slug "${slug}":`, error);
    processApiError(error);
    return undefined;
  }
}

/**
 * Get articles filtered by tag
 */
export async function getArticlesByTag(tag: string): Promise<ArticleMetadata[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => 
    article.tags && article.tags.includes(tag)
  );
}

/**
 * Get all unique tags from all articles
 */
export async function getAllTags(): Promise<string[]> {
  const allArticles = await getAllArticles();
  const tags = new Set<string>();
  
  allArticles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags);
}
