
import matter from 'gray-matter';
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
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Add authorization if token is available
    if (GITHUB_CONFIG.token) {
      headers['Authorization'] = `token ${GITHUB_CONFIG.token}`;
    }
    
    const response = await fetch(`${GITHUB_API_BASE}?ref=${GITHUB_CONFIG.branch}`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API error:', response.status, response.statusText, errorData);
      throw new Error(`Failed to fetch files list: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();
    
    if (!Array.isArray(files)) {
      console.error('Unexpected response format:', files);
      return [];
    }
    
    const mdxFiles = files
      .filter((file: any) => file.name.endsWith('.md') || file.name.endsWith('.mdx'))
      .map((file: any) => file.name);
      
    console.log(`Found ${mdxFiles.length} MDX files`);
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
    
    const response = await fetch(`${GITHUB_API_BASE}/${filename}?ref=${GITHUB_CONFIG.branch}`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }

    const fileData: GitHubFile = await response.json();
    // GitHub API returns content as base64 encoded
    return Buffer.from(fileData.content, 'base64').toString('utf-8');
  } catch (error) {
    console.error(`Error fetching MDX file content for ${filename}:`, error);
    return null;
  }
}

/**
 * Process MDX content to extract front matter and format content
 */
export function processMdxContent(content: string, slug: string): Article | null {
  try {
    // Parse front matter and content
    const { data, content: mdxContent } = matter(content);
    
    // Extract and format front matter data
    const article: Article = {
      slug: slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Unknown',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.category ? [data.category] : []),
      category: data.category || '',
      coverImage: data.coverImage || undefined,
      coverVideo: data.coverVideo || undefined,
      content: mdxContent
    };
    
    return article;
  } catch (error) {
    console.error(`Error processing MDX content for ${slug}:`, error);
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
    
    for (const filename of mdxFiles) {
      const content = await fetchMdxFileContent(filename);
      if (content) {
        const slug = filename.replace(/\.mdx?$/, '');
        const article = processMdxContent(content, slug);
        if (article) {
          articles.push(article);
        }
      }
    }
    
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
