
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const careerInsightsDirectory = path.join(process.cwd(), 'content/career-insights');

// Cache for articles - persists between builds in development
let articlesCache: Article[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache for development

/**
 * Loads all articles and career insights from the content directories
 * with enhanced error handling and logging
 */
export function getAllArticlesData(): Article[] {
  try {
    // Use cache if available and not expired (dev mode only)
    if (process.env.NODE_ENV === 'development' && 
        articlesCache && 
        (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      console.log('Using cached articles data');
      return articlesCache;
    }
    
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.error('Articles directory not found at:', articlesDirectory);
      return [];
    }
    
    const articleFiles = fs.readdirSync(articlesDirectory)
      .filter(fileName => (fileName.endsWith('.mdx') || fileName.endsWith('.md')) && 
              fileName !== 'README.md');
    
    const careerInsightFiles = fs.existsSync(careerInsightsDirectory) 
      ? fs.readdirSync(careerInsightsDirectory)
        .filter(fileName => (fileName.endsWith('.mdx') || fileName.endsWith('.md')) && 
                fileName !== 'README.md')
      : [];

    console.log(`Found ${articleFiles.length} article files and ${careerInsightFiles.length} career insight files`);

    const articles = loadArticlesFromFiles(articleFiles, articlesDirectory);
    const careerInsights = loadArticlesFromFiles(careerInsightFiles, careerInsightsDirectory, 'career');

    const allArticles = [...articles, ...careerInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log(`Processed ${allArticles.length} total articles`);
    
    // Update cache in development mode
    if (process.env.NODE_ENV === 'development') {
      articlesCache = allArticles;
      cacheTimestamp = Date.now();
    }
    
    return allArticles;
  } catch (error) {
    console.error('Error loading articles:', error);
    // In production, don't return empty array, attempt to use stale cache
    if (process.env.NODE_ENV === 'production' && articlesCache) {
      console.warn('Using stale cache due to error');
      return articlesCache;
    }
    return [];
  }
}

/**
 * Load articles from a list of files in a directory
 */
function loadArticlesFromFiles(files: string[], directory: string, defaultCategory: string = ''): Article[] {
  return files.map(fileName => {
    try {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);
      
      // Add default category if specified
      const articleData = defaultCategory ? { ...data, category: defaultCategory } : data;

      return createArticleFromFrontMatter(
        slug,
        processMarkdown(content),
        articleData
      );
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      // Return a placeholder article for this file to prevent entire load from failing
      return {
        slug: fileName.replace(/\.(mdx|md)$/, ''),
        title: `Error loading: ${fileName}`,
        date: new Date().toISOString(),
        author: 'System',
        description: 'There was an error loading this article.',
        content: 'Content unavailable due to loading error.',
        tags: ['error'],
        category: 'error'
      };
    }
  });
}

/**
 * Gets a specific article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  try {
    const allArticles = getAllArticlesData();
    return allArticles.find(article => article.slug === slug);
  } catch (error) {
    console.error(`Error getting article by slug ${slug}:`, error);
    return undefined;
  }
}

/**
 * Gets articles by category
 */
export function getArticlesByCategory(category: string): Article[] {
  try {
    const allArticles = getAllArticlesData();
    return allArticles.filter(article => 
      article.category?.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error(`Error getting articles by category ${category}:`, error);
    return [];
  }
}

/**
 * Gets all unique tags from articles
 */
export function getAllTags(): string[] {
  try {
    const allArticles = getAllArticlesData();
    const tags = new Set<string>();
    
    allArticles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => tags.add(tag));
      }
    });
    
    return Array.from(tags);
  } catch (error) {
    console.error('Error getting all tags:', error);
    return [];
  }
}
