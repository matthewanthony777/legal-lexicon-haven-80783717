
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { processMarkdown } from '@/plugins/markdown-processor';
import { Article } from '@/types/article';

export function getAllArticles(): Article[] {
  // Path to your articles directory
  const articlesDirectory = path.join(process.cwd(), 'content', 'articles');
  
  // Get articles from the directory
  const articles = getArticlesFromDirectory(articlesDirectory);
  
  // Sort articles by date, newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getArticlesFromDirectory(directory: string): Article[] {
  try {
    if (!fs.existsSync(directory)) {
      console.warn(`Directory doesn't exist: ${directory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(directory)
      .filter(fileName => fileName.endsWith('.mdx') && !fileName.startsWith('README'));
    
    return fileNames.map(fileName => {
      // Remove the .mdx extension to get the slug
      const slug = fileName.replace(/\.mdx$/, '');
      
      // Read the MDX file
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents);
      
      // Process the markdown for better rendering
      const processedContent = processMarkdown(content);
      
      // Return the article data with the exact format you're using
      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Anonymous',
        category: data.category || '',
        coverImage: data.coverImage || undefined,
        coverVideo: data.coverVideo || undefined,
        tags: data.tags || [],
        content: processedContent
      };
    });
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug);
}

export function getCareerInsightsArticles(): Article[] {
  const allArticles = getAllArticles();
  // Filter articles by category
  return allArticles.filter(article => 
    article.category?.toLowerCase().includes('career')
  );
}

export function getFutureInsightsArticles(): Article[] {
  const allArticles = getAllArticles();
  // Filter articles by category or tags
  return allArticles.filter(article => 
    article.category?.toLowerCase().includes('tech') ||
    article.category?.toLowerCase().includes('future') ||
    article.tags?.some(tag => 
      tag.toLowerCase().includes('future') || 
      tag.toLowerCase().includes('ai') || 
      tag.toLowerCase().includes('tech')
    )
  );
}
