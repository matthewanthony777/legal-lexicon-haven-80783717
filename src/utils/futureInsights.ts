
import { Article, ArticleMetadata } from '@/types/article';
import { articles } from 'virtual:mdx-data';
import { getAllArticles } from '@/utils/articles';

// Function to determine if an article is a future insight
export const isFutureInsightsArticle = (article: ArticleMetadata): boolean => {
  // Check if article has the 'future' category
  if (article.category?.toLowerCase() === 'future') {
    return true;
  }
  
  // Check for specific tags: 'future', 'legal tech', 'legal innovation', etc.
  const futureTags = ['future', 'legal tech', 'legal innovation', 'ai law', 'law tech'];
  return article.tags.some(tag => 
    futureTags.includes(tag.toLowerCase())
  );
};

// In-memory cache
let futureInsightsCache: ArticleMetadata[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get all future insights articles
export const getAllFutureInsights = async (): Promise<ArticleMetadata[]> => {
  console.log('Fetching future insights...');
  
  const now = Date.now();
  // Return cached articles if they exist and haven't expired
  if (futureInsightsCache && now - lastFetchTime < CACHE_DURATION) {
    console.log('Using cached future insights', { count: futureInsightsCache.length });
    return futureInsightsCache;
  }
  
  try {
    // First try to fetch from GitHub API
    console.log('Attempting to fetch from GitHub API...');
    const apiArticles = await getAllArticles();
    
    if (apiArticles && apiArticles.length > 0) {
      console.log(`Found ${apiArticles.length} articles from API`);
      const futureArticles = apiArticles.filter(isFutureInsightsArticle);
      console.log(`Filtered to ${futureArticles.length} future insights from API`);
      
      if (futureArticles.length > 0) {
        futureInsightsCache = futureArticles;
        lastFetchTime = now;
        return futureArticles;
      }
    }
    
    // If API fetch failed or returned no future insights, use virtual:mdx-data
    console.log('Falling back to local MDX data');
    const localArticles = articles || [];
    console.log(`Found ${localArticles.length} articles from local MDX data`);
    
    // Convert to ArticleMetadata[] to ensure type compatibility
    const localArticlesMetadata: ArticleMetadata[] = localArticles.map(article => ({
      title: article.title,
      date: article.date,
      author: article.author || 'Unknown',
      description: article.excerpt || '',
      slug: article.slug,
      category: 'uncategorized',
      tags: article.tags || [],
    }));
    
    const futureMdxArticles = localArticlesMetadata.filter(isFutureInsightsArticle);
    console.log(`Filtered to ${futureMdxArticles.length} future insights from local MDX data`);
    
    futureInsightsCache = futureMdxArticles;
    lastFetchTime = now;
    return futureMdxArticles;
  } catch (error) {
    console.error('Error fetching future insights:', error);
    
    // Last fallback: use virtual:mdx-data
    console.log('Error occurred, using local MDX data as final fallback');
    const localArticles = articles || [];
    
    // Convert to ArticleMetadata[] to ensure type compatibility
    const localArticlesMetadata: ArticleMetadata[] = localArticles.map(article => ({
      title: article.title,
      date: article.date,
      author: article.author || 'Unknown',
      description: article.excerpt || '',
      slug: article.slug,
      category: 'uncategorized',
      tags: article.tags || [],
    }));
    
    const futureMdxArticles = localArticlesMetadata.filter(isFutureInsightsArticle);
    
    return futureMdxArticles;
  }
};

// Get a specific future insight by slug
export const getFutureInsightBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    // First check the cache
    if (futureInsightsCache) {
      const cachedArticle = futureInsightsCache.find(article => article.slug === slug);
      if (cachedArticle) {
        // Convert ArticleMetadata to Article by adding content property
        return {
          ...cachedArticle,
          content: ''  // Add empty content to satisfy the Article type
        };
      }
    }
    
    // Get all future insights and look for the one with matching slug
    const futureInsights = await getAllFutureInsights();
    const article = futureInsights.find(article => article.slug === slug);
    
    if (!article) return undefined;
    
    // Convert ArticleMetadata to Article
    return {
      ...article,
      content: ''  // Add empty content to satisfy the Article type
    };
  } catch (error) {
    console.error(`Error getting future insight by slug ${slug}:`, error);
    return undefined;
  }
};

// Get the latest future insights
export const getLatestFutureInsights = async (count: number = 5): Promise<Article[]> => {
  const futureInsights = await getAllFutureInsights();
  return futureInsights.slice(0, count);
};

// Remove the "future" tag from articles when displaying
export const removeFutureTag = (article: Article): Article => {
  return {
    ...article,
    tags: article.tags.filter(tag => tag.toLowerCase() !== 'future')
  };
};
