
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const careerInsightsDirectory = path.join(process.cwd(), 'content/career-insights');

/**
 * Standardized function to safely extract YAML front matter fields
 * Ensures consistent processing across all MDX files
 */
function extractFrontMatter(rawFrontMatter: Record<string, any>, field: string, defaultValue: any): any {
  if (rawFrontMatter && field in rawFrontMatter) {
    const value = rawFrontMatter[field];
    return value !== undefined && value !== null ? value : defaultValue;
  }
  console.log(`Front matter field '${field}' not found, using default: ${defaultValue}`);
  return defaultValue;
}

function processMarkdown(content: string): string {
  // Process code blocks first to prevent other transformations from affecting them
  content = content.replace(/```([a-z]*)\n([\s\S]*?)\n```/gim, (match: string, language: string, code: string) => {
    // Clean code and escape HTML entities while preserving whitespace
    const cleanedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    // Apply consistent comment highlighting for all languages
    let processedCode = cleanedCode;
    
    // Process Python comments specifically
    if (language === 'python' || language === 'py') {
      processedCode = cleanedCode.replace(
        /(#.+)$/gm, 
        '<span class="code-comment">$1</span>'
      );
    }
    
    // Process JavaScript/TypeScript comments
    if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts') {
      processedCode = processedCode.replace(
        /\/\/(.*)/g, 
        '<span class="code-comment">// $1</span>'
      ).replace(
        /\/\*[\s\S]*?\*\//g,
        (match: string) => `<span class="code-comment">${match}</span>`
      );
    }
    
    // Add language label
    const langLabel = language ? `<div class="code-language-label">${language}</div>` : '';
    
    return `<div class="code-block-wrapper">
      ${langLabel}
      <pre class="language-${language || 'plaintext'}"><code class="language-${language || 'plaintext'}">${processedCode}</code></pre>
    </div>`;
  });
  
  // Inline code
  content = content.replace(/`([^`]+)`/gim, '<code class="inline-code">$1</code>');
  
  // Process headings with consistent classes
  content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold mb-3 mt-5 font-playfair">$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold mb-3 mt-6 font-playfair">$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-bold mb-4 mt-8 font-playfair">$1</h1>');
  
  // Bold and italic
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // List processing 
  content = content.replace(/^\* (.*$)/gim, '<ul class="list-disc pl-6 mb-4"><li>$1</li></ul>');
  content = content.replace(/^- (.*$)/gim, '<ul class="list-disc pl-6 mb-4"><li>$1</li></ul>');
  content = content.replace(/^\d+\. (.*$)/gim, '<ol class="list-decimal pl-6 mb-4"><li>$1</li></ol>');
  
  // Fix consecutive list items
  content = content.replace(/<\/ul>\s*<ul[^>]*>/g, '');
  content = content.replace(/<\/ol>\s*<ol[^>]*>/g, '');
  
  // Image processing
  content = content.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" class="w-full rounded-lg my-4" />');
  
  // Links
  content = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-opacity-80 transition-colors">$1</a>'
  );
  
  // Blockquotes
  content = content.replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-muted italic my-4">$1</blockquote>');
  
  // Horizontal rules
  content = content.replace(/^---$/gim, '<hr class="my-6 border-t border-muted" />');
  
  // Paragraphs (must come last)
  content = content.replace(/^([^<].*)\s*$/gim, (match: string, text: string) => {
    if (text.trim().length > 0 && !text.includes('<')) {
      return `<p class="mb-4 font-playfair">${text}</p>`;
    }
    return match;
  });
  
  // Fix multiple consecutive paragraphs
  content = content.replace(/<\/p>\s*<p>/g, '</p>\n<p>');
  
  return content;
}

function getAllArticlesData(): Article[] {
  try {
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found at:', articlesDirectory);
      return [];
    }
    
    const articleFiles = fs.readdirSync(articlesDirectory)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
    
    const careerInsightFiles = fs.existsSync(careerInsightsDirectory) 
      ? fs.readdirSync(careerInsightsDirectory)
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      : [];

    const articles = articleFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Use standardized extraction for all fields
      return {
        slug,
        content: processMarkdown(content),
        title: extractFrontMatter(data, 'title', 'Untitled'),
        date: extractFrontMatter(data, 'date', new Date().toISOString()),
        author: extractFrontMatter(data, 'author', 'Unknown'),
        description: extractFrontMatter(data, 'description', ''),
        tags: extractFrontMatter(data, 'tags', 
              data.category ? [data.category] : []),
        category: extractFrontMatter(data, 'category', ''),
        coverVideo: extractFrontMatter(data, 'coverVideo', null),
        coverImage: extractFrontMatter(data, 'coverImage', null),
      } as Article;
    });

    const careerInsights = careerInsightFiles.map(fileName => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(careerInsightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use consistent front matter parsing
      const { data, content } = matter(fileContents);

      // Use standardized extraction for all fields
      return {
        slug,
        content: processMarkdown(content),
        title: extractFrontMatter(data, 'title', 'Untitled'),
        date: extractFrontMatter(data, 'date', new Date().toISOString()),
        author: extractFrontMatter(data, 'author', 'Unknown'),
        description: extractFrontMatter(data, 'description', ''),
        tags: extractFrontMatter(data, 'tags', 
              data.category ? [data.category] : []),
        category: 'career',
        coverVideo: extractFrontMatter(data, 'coverVideo', null),
        coverImage: extractFrontMatter(data, 'coverImage', null),
      } as Article;
    });

    return [...articles, ...careerInsights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

export function mdxDataPlugin(): Plugin {
  const virtualModuleId = 'virtual:mdx-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-mdx-data',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const articles = getAllArticlesData();
        return `export const articles = ${JSON.stringify(articles)}`
      }
    }
  }
}
