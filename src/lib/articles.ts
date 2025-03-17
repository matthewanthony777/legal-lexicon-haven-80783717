import { Article } from '@/types/article';
import { getAllArticlesData } from '@/plugins/article-loader';

// Interfaces remain the same
export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

/**
 * Get a specific article by slug
 */
export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = getAllArticlesData();
  return articles.find(article => article.slug === slug);
}

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
  return getAllArticlesData();
}

/**
 * Get articles filtered by tag
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = getAllArticlesData();
  return articles.filter(article => article.tags.includes(tag));
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
