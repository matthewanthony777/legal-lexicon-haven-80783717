
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const careerInsightsDirectory = path.join(process.cwd(), 'content/career-insights');
const futureInsightsDirectory = path.join(process.cwd(), 'content/future-insights');
const localArticlesDirectory = path.join(process.cwd(), 'src/content/articles');

// Debug logs for content directories
console.log('Article directories:');
console.log('- Main content directory exists:', fs.existsSync(path.join(process.cwd(), 'content')));
console.log('- Articles directory exists:', fs.existsSync(articlesDirectory));
console.log('- Career insights directory exists:', fs.existsSync(careerInsightsDirectory));
console.log('- Future insights directory exists:', fs.existsSync(futureInsightsDirectory));
console.log('- Local articles directory exists:', fs.existsSync(localArticlesDirectory));

/**
 * Loads all articles and career insights from the content directories
 */
export function getAllArticlesData(): Article[] {
  try {
    const articles: Article[] = [];
    
    // Load from content/articles if it exists
    if (fs.existsSync(articlesDirectory)) {
      console.log('Loading articles from:', articlesDirectory);
      const articleFiles = fs.readdirSync(articlesDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .filter(fileName => !fileName.toLowerCase().includes('readme'));
      
      console.log(`Found ${articleFiles.length} article files`);
      
      articleFiles.forEach(fileName => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use consistent front matter parsing
        const { data, content } = matter(fileContents);

        articles.push(createArticleFromFrontMatter(
          slug,
          processMarkdown(content),
          data
        ));
      });
    } else {
      console.warn('Articles directory not found at:', articlesDirectory);
    }
    
    // Load from content/career-insights if it exists
    if (fs.existsSync(careerInsightsDirectory)) {
      console.log('Loading career insights from:', careerInsightsDirectory);
      const careerInsightFiles = fs.readdirSync(careerInsightsDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .filter(fileName => !fileName.toLowerCase().includes('readme'));
      
      console.log(`Found ${careerInsightFiles.length} career insight files`);
      
      careerInsightFiles.forEach(fileName => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(careerInsightsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use consistent front matter parsing
        const { data, content } = matter(fileContents);

        // Mark this as a career article
        const articleData = { ...data, category: 'career' };

        articles.push(createArticleFromFrontMatter(
          slug,
          processMarkdown(content),
          articleData
        ));
      });
    }
    
    // Load from content/future-insights if it exists
    if (fs.existsSync(futureInsightsDirectory)) {
      console.log('Loading future insights from:', futureInsightsDirectory);
      const futureInsightFiles = fs.readdirSync(futureInsightsDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .filter(fileName => !fileName.toLowerCase().includes('readme'));
      
      console.log(`Found ${futureInsightFiles.length} future insight files`);
      
      futureInsightFiles.forEach(fileName => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(futureInsightsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use consistent front matter parsing
        const { data, content } = matter(fileContents);

        // Mark this as a future article
        const articleData = { ...data, category: 'future' };

        articles.push(createArticleFromFrontMatter(
          slug,
          processMarkdown(content),
          articleData
        ));
      });
    }
    
    // Fallback: Load from src/content/articles if other directories failed or are empty
    if (articles.length === 0 && fs.existsSync(localArticlesDirectory)) {
      console.log('Using fallback local content from:', localArticlesDirectory);
      const localArticleFiles = fs.readdirSync(localArticlesDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
      
      console.log(`Found ${localArticleFiles.length} local article files`);
      
      localArticleFiles.forEach(fileName => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(localArticlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use consistent front matter parsing
        const { data, content } = matter(fileContents);
        
        // If these are for future insights, mark them accordingly
        const category = data.category || (fileName.includes('future') ? 'future' : 'article');
        const articleData = { ...data, category };

        articles.push(createArticleFromFrontMatter(
          slug,
          processMarkdown(content),
          articleData
        ));
      });
    }

    console.log(`Total articles loaded: ${articles.length}`);
    
    // Sort by date, newest first
    return articles.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading articles:', error);
    // Last-resort fallback: return empty array
    return [];
  }
}
