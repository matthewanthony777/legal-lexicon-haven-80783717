
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { Article } from '@/types/article';

// This file now serves primarily as a type definition and utility provider
// All the actual article loading is done by the plugins/article-loader.ts

export async function getArticle(slug: string): Promise<Article | undefined> {
  // This is now just a compatibility layer for the Article component
  // The actual implementation is in utils/articles.ts
  return undefined;
}

export async function getAllArticles(): Promise<Article[]> {
  // This is now just a compatibility layer
  // The actual implementation is in utils/articles.ts
  return [];
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  // This is now just a compatibility layer
  // The actual implementation is in utils/articles.ts
  return [];
}

export function getAllTags(): string[] {
  // This is now just a compatibility layer
  // The actual implementation is in utils/articles.ts
  return [];
}
