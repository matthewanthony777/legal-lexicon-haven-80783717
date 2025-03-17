
import { Article, getCareerArticles, getArticleBySlug } from './local-articles';

export function getAllCareerInsights(): Article[] {
  return getCareerArticles();
}

export function getCareerInsightBySlug(slug: string): Article | undefined {
  const article = getArticleBySlug(slug);
  
  // Only return if it's a career article
  if (article && (article.category === 'career' || (article.tags && article.tags.includes('Career')))) {
    return article;
  }
  
  return undefined;
}
