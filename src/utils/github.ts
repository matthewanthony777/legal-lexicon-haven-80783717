
import matter from 'gray-matter';
import { Base64 } from 'js-base64';
import { Article, GitHubFile } from '@/types/article';
import { GITHUB_CONFIG } from '@/config/github';

// Base URL for GitHub API requests
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.articlesPath}`;

/**
 * Fetch a list of all MDX files in the specified GitHub repository directory
 */
export async function fetchMdxFilesList(): Promise<string[]> {
  try {
    console.log(`Fetching files from: ${GITHUB_API_BASE}`);
    console.log(`Using GitHub config: owner=${GITHUB_CONFIG.owner}, repo=${GITHUB_CONFIG.repo}`);
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Add authorization if token is available
    if (GITHUB_CONFIG.token) {
      headers['Authorization'] = `token ${GITHUB_CONFIG.token}`;
      console.log('Using GitHub token for authentication');
    } else {
      console.log('No GitHub token provided - using public access');
    }
    
    const response = await fetch(`${GITHUB_API_BASE}?ref=${GITHUB_CONFIG.branch}`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API error:', response.status, response.statusText, errorData);
      console.error(`Failed to fetch from ${GITHUB_API_BASE}`);
      throw new Error(`Failed to fetch files list: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();
    
    if (!Array.isArray(files)) {
      console.error('Unexpected response format:', files);
      return [];
    }
    
    const mdxFiles = files
      .filter((file: any) => 
        (file.name.endsWith('.md') || file.name.endsWith('.mdx')) && 
        !file.name.toLowerCase().includes('readme')
      )
      .map((file: any) => file.name);
      
    console.log(`Found ${mdxFiles.length} MDX files:`, mdxFiles);
    return mdxFiles;
  } catch (error) {
    console.error('Error fetching MDX files list:', error);
    return [];
  }
}

/**
 * Fetch a specific MDX file content from GitHub
 */
export async function fetchMdxFileContent(filename: string): Promise<string | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Add authorization if token is available
    if (GITHUB_CONFIG.token) {
      headers['Authorization'] = `token ${GITHUB_CONFIG.token}`;
    }
    
    console.log(`Fetching content for ${filename} from ${GITHUB_API_BASE}/${filename}`);
    
    const response = await fetch(`${GITHUB_API_BASE}/${filename}?ref=${GITHUB_CONFIG.branch}`, {
      headers
    });

    if (!response.ok) {
      console.error(`Failed to fetch file content for ${filename}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }

    const fileData: GitHubFile = await response.json();
    
    if (!fileData.content) {
      console.error(`No content found in response for ${filename}`, fileData);
      return null;
    }
    
    // GitHub API returns content as base64 encoded
    return Base64.decode(fileData.content);
  } catch (error) {
    console.error(`Error fetching MDX file content for ${filename}:`, error);
    return null;
  }
}

/**
 * Process MDX content to extract front matter and format content
 * Browser-compatible version that doesn't rely on Buffer
 */
export function processMdxContent(content: string, slug: string): Article | null {
  try {
    // Browser-friendly front matter extraction
    let frontMatter: Record<string, any> = {};
    let mdxContent = content;
    
    // Simple front matter extraction for browser environment
    if (content.startsWith('---')) {
      const secondDelimiterIndex = content.indexOf('---', 4);
      if (secondDelimiterIndex !== -1) {
        const frontMatterText = content.substring(4, secondDelimiterIndex).trim();
        mdxContent = content.substring(secondDelimiterIndex + 3).trim();
        
        // Parse front matter text into object
        frontMatterText.split('\n').forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            }
            
            frontMatter[key] = value;
          }
        });
      }
    } else {
      console.log(`No front matter found in ${slug}`);
    }
    
    // Extract and format front matter data
    const article: Article = {
      slug: slug,
      title: frontMatter.title || 'Untitled',
      date: frontMatter.date || new Date().toISOString(),
      author: frontMatter.author || 'Unknown',
      description: frontMatter.description || '',
      tags: frontMatter.tags ? 
        (typeof frontMatter.tags === 'string' ? [frontMatter.tags] : frontMatter.tags) : 
        (frontMatter.category ? [frontMatter.category] : []),
      category: frontMatter.category || '',
      coverImage: frontMatter.coverImage || undefined,
      coverVideo: frontMatter.coverVideo || undefined,
      content: mdxContent
    };
    
    return article;
  } catch (error) {
    console.error(`Error processing MDX content for ${slug}:`, error);
    console.error('Content sample:', content.substring(0, 100));
    return null;
  }
}

/**
 * Fetch all articles from GitHub repository
 */
export async function fetchAllArticles(): Promise<Article[]> {
  try {
    const mdxFiles = await fetchMdxFilesList();
    
    if (mdxFiles.length === 0) {
      console.log('No MDX files found, falling back to local content');
      
      // Fallback to local content for development
      return [
        {
          slug: 'sample-article',
          title: 'Sample Article',
          date: new Date().toISOString(),
          author: 'The Screen Scholar',
          description: 'This is a sample article for development.',
          tags: ['sample', 'development'],
          category: 'development',
          content: '## This is a sample article\n\nThis content is shown when GitHub API requests fail.'
        }
      ];
    }
    
    const articles: Article[] = [];
    
    // Filter out README.md files
    const contentFiles = mdxFiles.filter(file => !file.toLowerCase().includes('readme'));
    
    console.log(`Processing ${contentFiles.length} content files...`);
    
    for (const filename of contentFiles) {
      console.log(`Fetching content for ${filename}`);
      const content = await fetchMdxFileContent(filename);
      
      if (content) {
        console.log(`Content received for ${filename}, length: ${content.length} characters`);
        const slug = filename.replace(/\.mdx?$/, '');
        
        try {
          const article = processMdxContent(content, slug);
          if (article) {
            articles.push(article);
            console.log(`Successfully processed article: ${article.title}`);
          } else {
            console.error(`Failed to process ${filename}: processMdxContent returned null`);
          }
        } catch (error) {
          console.error(`Failed to process ${filename}:`, error);
        }
      } else {
        console.error(`No content received for ${filename}`);
      }
    }
    
    console.log(`Successfully processed ${articles.length} articles`);
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}

/**
 * Fetch a specific article by slug from GitHub repository
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // Try both .md and .mdx extensions
    let content = await fetchMdxFileContent(`${slug}.mdx`);
    if (!content) {
      content = await fetchMdxFileContent(`${slug}.md`);
    }
    
    if (!content) {
      return null;
    }
    
    return processMdxContent(content, slug);
  } catch (error) {
    console.error(`Error fetching article for slug ${slug}:`, error);
    return null;
  }
}
