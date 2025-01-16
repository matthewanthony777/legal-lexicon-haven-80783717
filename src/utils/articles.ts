import { Article } from "@/types/article";
import { articles } from 'virtual:mdx-data';

export const getAllArticles = (): Article[] => {
  return articles;
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getLatestArticles = (count: number = 5): Article[] => {
  return getAllArticles().slice(0, count);
};