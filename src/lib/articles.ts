
import { getAllArticlesData } from '@/plugins/article-loader';

// Define the Article interface locally without importing
export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

/**
 * Map the article data from plugin to match our local interface
 */
function mapArticleData(article: any): Article {
  return {
    slug: article.slug,
    title: article.title,
    date: article.date,
    // Use description as excerpt or provide a fallback
    excerpt: article.description || '',
    content: article.content,
    tags: article.tags || [],
  };
}

/**
 * Get a specific article by slug
 */
export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = getAllArticlesData();
  const article = articles.find(article => article.slug === slug);
  return article ? mapArticleData(article) : undefined;
}

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
  const articles = getAllArticlesData();
  return articles.map(mapArticleData);
}

/**
 * Get articles filtered by tag
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = getAllArticlesData();
  return articles
    .filter(article => article.tags.includes(tag))
    .map(mapArticleData);
}

/**
 * Get all unique tags from all articles
 */
export function getAllTags(): string[] {
  const articles = getAllArticlesData();
  const tags = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}
