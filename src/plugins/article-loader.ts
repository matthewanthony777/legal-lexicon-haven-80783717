
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const careerInsightsDirectory = path.join(process.cwd(), 'content/career-insights');

/**
 * Loads all articles and career insights from the content directories
 */
export function getAllArticlesData(): Article[] {
  try {
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found at:', articlesDirectory);
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

    const careerInsights = careerInsightFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(careerInsightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Mark this as a career article
      const articleData = { ...data, category: 'career' };

      return createArticleFromFrontMatter(
        slug,
        processMarkdown(content),
        articleData
      );
    });

    const allArticles = [...articles, ...careerInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log(`Processed ${allArticles.length} total articles`);
    return allArticles;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

/**
 * Gets a specific article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  const allArticles = getAllArticlesData();
  return allArticles.find(article => article.slug === slug);
}
