
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
    const decodedContent = Base64.decode(fileData.content);
    console.log(`Successfully decoded content for ${filename}, content length: ${decodedContent.length}`);
    // Log the first 150 characters to help debug front matter issues
    console.log(`Content preview: ${decodedContent.substring(0, 150)}...`);
    return decodedContent;
  } catch (error) {
    console.error(`Error fetching MDX file content for ${filename}:`, error);
    return null;
  }
}

/**
 * Standardized function to safely extract YAML front matter fields
 */
function extractFrontMatter(rawFrontMatter: Record<string, any>, field: string, defaultValue: any): any {
  if (rawFrontMatter && field in rawFrontMatter) {
    const value = rawFrontMatter[field];
    // Additional validation can be added here based on field type
    return value !== undefined && value !== null ? value : defaultValue;
  }
  console.log(`Front matter field '${field}' not found, using default: ${defaultValue}`);
  return defaultValue;
}

/**
 * Process MDX content to extract front matter and format content
 * Browser-compatible version with improved consistency
 */
export function processMdxContent(content: string, slug: string): Article | null {
  try {
    console.log(`Processing content for slug: ${slug}`);
    
    // Use consistent front matter processing for all files
    let frontMatter: Record<string, any> = {};
    let mdxContent = content;
    
    // Check if content starts with front matter delimiter
    if (content.trim().startsWith('---')) {
      try {
        // Try to use gray-matter for parsing if available in browser context
        const matterResult = matter(content);
        frontMatter = matterResult.data;
        mdxContent = matterResult.content;
        console.log(`Successfully parsed front matter with gray-matter for ${slug}`);
      } catch (matterError) {
        console.warn(`gray-matter failed, falling back to manual parsing: ${matterError}`);
        
        // Manual fallback if gray-matter fails (likely in certain browser contexts)
        const frontMatterMatch = content.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
        if (frontMatterMatch && frontMatterMatch.length >= 3) {
          const frontMatterText = frontMatterMatch[1].trim();
          mdxContent = frontMatterMatch[2].trim();
          
          console.log(`Found front matter for ${slug}, length: ${frontMatterText.length}`);
          
          // Parse front matter text into object using consistent rules
          frontMatterText.split('\n').forEach(line => {
            // Skip empty lines
            if (!line.trim()) return;
            
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
              const key = line.substring(0, colonIndex).trim();
              let value = line.substring(colonIndex + 1).trim();
              
              // Remove quotes if present (consistent handling)
              if ((value.startsWith('"') && value.endsWith('"')) || 
                  (value.startsWith("'") && value.endsWith("'"))) {
                value = value.substring(1, value.length - 1);
              }
              
              // Handle arrays (tags: [tag1, tag2] or comma-separated)
              if (value.startsWith('[') && value.endsWith(']')) {
                const arrayContent = value.substring(1, value.length - 1);
                frontMatter[key] = arrayContent
                  .split(',')
                  .map(item => item.trim().replace(/['"]/g, '')) // Remove quotes from items
                  .filter(item => item.length > 0);
              } else {
                frontMatter[key] = value;
              }
            }
          });
        } else {
          console.warn(`Malformed front matter in ${slug}: Cannot extract content correctly`);
        }
      }
    } else {
      console.warn(`No front matter found in ${slug}, using defaults`);
    }
    
    // Validate and extract fields using the standardized function
    const title = extractFrontMatter(frontMatter, 'title', 'Untitled Article');
    const date = extractFrontMatter(frontMatter, 'date', new Date().toISOString());
    const author = extractFrontMatter(frontMatter, 'author', 'Unknown Author');
    const description = extractFrontMatter(frontMatter, 'description', 'No description available');
    const category = extractFrontMatter(frontMatter, 'category', 'Uncategorized');
    const coverImage = extractFrontMatter(frontMatter, 'coverImage', 
                        extractFrontMatter(frontMatter, 'imageUrl', undefined));
    const coverVideo = extractFrontMatter(frontMatter, 'coverVideo', 
                        extractFrontMatter(frontMatter, 'videoUrl', undefined));
    
    // Handle tags with special attention to ensure consistency
    let tags: string[] = [];
    if (Array.isArray(frontMatter.tags)) {
      tags = frontMatter.tags;
    } else if (typeof frontMatter.tags === 'string') {
      // Handle comma-separated tags in string format
      tags = frontMatter.tags.split(',').map((tag: string) => tag.trim());
    } else if (category) {
      // Fallback to category as a tag
      tags = [category];
    }
    
    // If no tags found but category exists, use category
    if (tags.length === 0 && category) {
      tags = [category];
    }
    
    // Construct the article object with all validated fields
    const article: Article = {
      slug,
      title,
      date,
      author,
      description,
      tags,
      category,
      coverImage,
      coverVideo,
      content: mdxContent
    };
    
    console.log(`Successfully processed article "${article.title}" with ${article.tags.length} tags`);
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
      console.log('No MDX files found in GitHub');
      return [];
    }
    
    const articles: Article[] = [];
    
    // Filter out README.md files
    const contentFiles = mdxFiles.filter(file => !file.toLowerCase().includes('readme'));
    
    console.log(`Processing ${contentFiles.length} content files from GitHub...`);
    
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
    
    console.log(`Successfully processed ${articles.length} articles from GitHub`);
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching all articles from GitHub:', error);
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
      console.log(`Article ${slug} not found on GitHub`);
      return null;
    }
    
    return processMdxContent(content, slug);
  } catch (error) {
    console.error(`Error fetching article for slug ${slug} from GitHub:`, error);
    return null;
  }
}
