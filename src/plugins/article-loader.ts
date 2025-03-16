
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const futureInsightsDirectory = path.join(process.cwd(), 'content/future-insights');

/**
 * Helper function to load MDX files from a directory
 */
function loadMdxFiles(directory: string, defaultCategory: string): Article[] {
  if (!fs.existsSync(directory)) {
    console.warn(`Directory not found: ${directory}`);
    return [];
  }

  return fs.readdirSync(directory)
    .filter(fileName => (fileName.endsWith('.mdx') || fileName.endsWith('.md')) && fileName !== 'README.md')
    .map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);
      
      // Ensure category is set
      const articleData = { ...data, category: data.category || defaultCategory };
      
      return createArticleFromFrontMatter(slug, processMarkdown(content), articleData);
    });
}

/**
 * Loads all articles and future insights from the content directories
 */
export function getAllArticlesData(): Article[] {
  try {
    console.log(`Loading articles from ${articlesDirectory}`);
    console.log(`Loading future insights from ${futureInsightsDirectory}`);
    
    // Load articles from regular articles directory
    const articles = loadMdxFiles(articlesDirectory, 'article');
    
    // Load articles from future insights directory
    const futureInsights = loadMdxFiles(futureInsightsDirectory, 'future');
    
    console.log(`Loaded ${articles.length} articles and ${futureInsights.length} future insights`);

    // Process regular articles to see if any should be categorized as future insights
    const processedArticles = articles.map(article => {
      // Check if this article should be categorized as a future insight
      const isFutureInsight = 
        (article.tags && 
         Array.isArray(article.tags) && 
         article.tags.some(tag => 
           tag.toLowerCase().includes('future') || 
           tag.toLowerCase().includes('ai') || 
           tag.toLowerCase().includes('tech') ||
           tag.toLowerCase().includes('legal')));
      
      // If it's related to future insights, mark it as such
      if (isFutureInsight) {
        return { ...article, category: 'future' };
      }
      
      return article;
    });

    // Combine all articles and sort by date
    return [...processedArticles, ...futureInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}
