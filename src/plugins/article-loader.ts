
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';
import { processMarkdown } from './markdown-processor';
import { createArticleFromFrontMatter } from './front-matter-utils';

// Use path.resolve to ensure absolute paths
const articlesDirectory = path.resolve(process.cwd(), 'content/articles');

/**
 * Loads all articles from the content directory
 */
export function getAllArticlesData(): Article[] {
  try {
    console.log('Loading local articles from:', articlesDirectory);
    
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found at:', articlesDirectory);
      return [];
    }
    
    const articleFiles = fs.readdirSync(articlesDirectory)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .filter(fileName => !fileName.toLowerCase().includes('readme'));
    
    console.log(`Found ${articleFiles.length} article files:`, articleFiles);
      
    const articles = articleFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);
      
      console.log(`Processing article: ${slug} with category: ${data.category || 'uncategorized'}`);

      return createArticleFromFrontMatter(
        slug,
        processMarkdown(content),
        data
      );
    });

    const allArticles = [...articles].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log(`Total articles loaded: ${allArticles.length}`);
    return allArticles;
  } catch (error) {
    console.error('Error loading local articles:', error);
    return [];
  }
}
