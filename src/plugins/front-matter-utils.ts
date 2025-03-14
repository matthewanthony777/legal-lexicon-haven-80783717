
import { Article } from '../types/article';

/**
 * Standardized function to safely extract YAML front matter fields
 * Ensures consistent processing across all MDX files
 */
export function extractFrontMatter(rawFrontMatter: Record<string, any>, field: string, defaultValue: any): any {
  if (rawFrontMatter && field in rawFrontMatter) {
    const value = rawFrontMatter[field];
    return value !== undefined && value !== null ? value : defaultValue;
  }
  console.log(`Front matter field '${field}' not found, using default: ${defaultValue}`);
  return defaultValue;
}

/**
 * Process article front matter into standardized Article object
 */
export function createArticleFromFrontMatter(slug: string, content: string, data: Record<string, any>): Article {
  return {
    slug,
    content,
    title: extractFrontMatter(data, 'title', 'Untitled'),
    date: extractFrontMatter(data, 'date', new Date().toISOString()),
    author: extractFrontMatter(data, 'author', 'Unknown'),
    description: extractFrontMatter(data, 'description', ''),
    tags: extractFrontMatter(data, 'tags', 
          data.category ? [data.category] : []),
    category: extractFrontMatter(data, 'category', ''),
    coverVideo: extractFrontMatter(data, 'coverVideo', null),
    coverImage: extractFrontMatter(data, 'coverImage', null),
  };
}
