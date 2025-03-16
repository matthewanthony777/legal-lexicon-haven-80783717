
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const futureInsightsDirectory = path.join(process.cwd(), 'content/future-insights');

/**
 * Loads all articles and future insights from the content directories
 */
export function getAllArticlesData(): Article[] {
  try {
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found at:', articlesDirectory);
      return [];
    }
    
    const articleFiles = fs.readdirSync(articlesDirectory)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
    
    const futureInsightFiles = fs.existsSync(futureInsightsDirectory) 
      ? fs.readdirSync(futureInsightsDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      : [];

    const articles = articleFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      return createArticleFromFrontMatter(
        slug,
        processMarkdown(content),
        data
      );
    });

    const futureInsights = futureInsightFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(futureInsightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Mark this as a future article
      const articleData = { ...data, category: 'future' };

      return createArticleFromFrontMatter(
        slug,
        processMarkdown(content),
        articleData
      );
    });

    return [...articles, ...futureInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}
