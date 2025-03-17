
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { processMarkdown } from '@/plugins/markdown-processor';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category?: string;
  coverVideo?: string;
  coverImage?: string;
  tags?: string[];
  content: string;
  // Add raw content to preserve exact formatting
  rawContent?: string;
}

export function getAllArticles(): Article[] {
  // Path to articles directory
  const articlesDirectory = path.join(process.cwd(), 'content', 'articles');
  
  // Get articles from the directory
  const articles = getArticlesFromDirectory(articlesDirectory);
  
  // Sort all articles by date, newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getArticlesFromDirectory(directory: string): Article[] {
  try {
    if (!fs.existsSync(directory)) {
      console.warn(`Directory doesn't exist: ${directory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(directory)
      .filter(fileName => fileName.endsWith('.mdx'));
    
    return fileNames.map(fileName => {
      // Remove the .mdx extension to get the slug
      const slug = fileName.replace(/\.mdx$/, '');
      
      // Read the MDX file
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents);
      
      // Extract tags from frontmatter or generate from category
      let tags = data.tags || [];
      if (data.category && !Array.isArray(tags)) {
        // If tags isn't an array and category exists, create tags from category
        tags = data.category.split(',').map((tag: string) => tag.trim());
      }
      
      // Process the markdown content using our utility
      const processedContent = processMarkdown(content);
      
      // Return the article data
      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Anonymous',
        category: data.category,
        coverVideo: data.coverVideo,
        coverImage: data.coverImage,
        tags: Array.isArray(tags) ? tags : [],
        content: processedContent,
        // Store the original content to preserve exact formatting
        rawContent: fileContents
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

export function getCareerArticles(): Article[] {
  // Get all articles and filter by category
  return getAllArticles().filter(article => 
    article.category === 'career' || 
    (article.tags && article.tags.includes('Career'))
  );
}

// Add a function to generate HTML directly from MDX content
// This can be used as a fallback if MDX rendering is problematic
export function getArticleHtml(article: Article): string {
  if (!article) return '';
  
  // Create a basic HTML template using the article content
  // This is a very simple conversion - you may want to use a more robust MDX-to-HTML converter
  return `
    <article>
      <h1>${article.title}</h1>
      <div class="metadata">
        <span>By ${article.author}</span>
        <span>${new Date(article.date).toLocaleDateString()}</span>
      </div>
      ${article.coverVideo ? `<video controls src="${article.coverVideo}" width="100%"></video>` : ''}
      ${article.coverImage ? `<img src="${article.coverImage}" alt="${article.title}" width="100%" />` : ''}
      <div class="content">
        ${article.content
          .replace(/\n\n/g, '</p><p>') // Convert double line breaks to paragraphs
          .replace(/\n/g, '<br>') // Convert single line breaks to <br>
          .replace(/#{2}\s(.*)/g, '<h2>$1</h2>') // Convert ## headings
          .replace(/#{3}\s(.*)/g, '<h3>$1</h3>') // Convert ### headings
          .replace(/^-\s(.*)$/gm, '<li>$1</li>') // Convert list items
        }
      </div>
    </article>
  `;
}
