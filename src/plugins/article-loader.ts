
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
      // Skip README.md files
      if (fileName === 'README.md') return null;
      
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Check if this article should be categorized as a future insight
      // by looking for specific tags or categories in frontmatter
      const isFutureInsight = 
        (data.category && 
         (data.category.toLowerCase().includes('future') || 
          data.category.toLowerCase().includes('ai') || 
          data.category.toLowerCase().includes('tech'))) ||
        (data.tags && 
         Array.isArray(data.tags) && 
         data.tags.some(tag => 
           tag.toLowerCase().includes('future') || 
           tag.toLowerCase().includes('ai') || 
           tag.toLowerCase().includes('tech')));

      // If it's related to future insights, mark it as such
      if (isFutureInsight) {
        const articleData = { ...data, category: 'future' };
        return createArticleFromFrontMatter(slug, processMarkdown(content), articleData);
      }
      
      return createArticleFromFrontMatter(slug, processMarkdown(content), data);
    }).filter(Boolean); // Remove null entries (README.md)

    const futureInsights = futureInsightFiles.map(fileName => {
      // Skip README.md files
      if (fileName === 'README.md') return null;
      
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(futureInsightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Mark this as a future article
      const articleData = { ...data, category: 'future' };

      return createArticleFromFrontMatter(slug, processMarkdown(content), articleData);
    }).filter(Boolean); // Remove null entries (README.md)

    console.log(`Loaded ${articles.length} articles and ${futureInsights.length} future insights`);

    return [...articles, ...futureInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}
