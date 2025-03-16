import { processApiError } from './error-handling';
import { getAllArticles as fetchAllArticlesFromGitHub } from './github';
import { Article, ArticleMetadata } from '@/types/article';
import { getAllArticlesData } from '@/plugins/article-loader';
import { articles } from '@/lib/articles';

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
    
    // If no local articles, try GitHub API
    console.log('No local articles found, trying GitHub API');
    const articles = await fetchAllArticlesFromGitHub();
    console.log(`Successfully loaded ${articles.length} articles from GitHub API`);
    return articles;
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    processApiError(error);
    
    // Last resort fallback - use inline hardcoded articles from lib/articles.ts
    console.warn('Using fallback hardcoded articles');
    return articles;
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
    const article = allArticles.find(article => article.slug === slug);
    
    if (!article) {
      console.warn(`Article with slug "${slug}" not found`);
      return undefined;
    }
    
    return article as Article;
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
