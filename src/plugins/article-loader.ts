
import fs from 'fs';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { createArticleFromFrontMatter } from './front-matter-utils';
import path from 'path';

// Use a consistent path that will work in both development and production
const localArticlesDirectory = path.resolve('./src/content/articles');

/**
 * Loads all articles from the local content directories
 */
export function getAllArticlesData(): Article[] {
  try {
    const articles: Article[] = [];
    
    // First try to load from local src/content/articles since that's most reliable
    if (fs.existsSync(localArticlesDirectory)) {
      console.log('Loading articles from local directory:', localArticlesDirectory);
      const localArticleFiles = fs.readdirSync(localArticlesDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .filter(fileName => !fileName.toLowerCase().includes('readme'));
      
      console.log(`Found ${localArticleFiles.length} local article files:`, localArticleFiles);
      
      localArticleFiles.forEach(fileName => {
        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const fullPath = path.join(localArticlesDirectory, fileName);
        
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          
          // Use consistent front matter parsing
          const { data, content } = matter(fileContents);
          
          // Check if this is a future insight by looking at category or filename
          const isFutureInsight = 
            data.category?.toLowerCase() === 'future' || 
            fileName.toLowerCase().includes('future') ||
            (data.tags && data.tags.some((tag: string) => 
              tag.toLowerCase().includes('future') || 
              tag.toLowerCase().includes('legal tech') ||
              tag.toLowerCase().includes('legal innovation')
            ));
          
          // Set category to 'future' for future insights
          const category = isFutureInsight ? 'future' : (data.category || 'article');
          const articleData = { ...data, category };

          articles.push(createArticleFromFrontMatter(
            slug,
            content,
            articleData
          ));
          
          console.log(`Successfully loaded article: ${slug} (Category: ${category})`);
        } catch (err) {
          console.error(`Error processing article file ${fileName}:`, err);
        }
      });
      
      console.log(`Loaded ${articles.length} articles from local directory`);
    } else {
      console.warn('Local articles directory not found at:', localArticlesDirectory);
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
