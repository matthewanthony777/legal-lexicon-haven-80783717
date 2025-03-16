
import { Article, ArticleMetadata } from '@/types/article';
import { getAllArticles } from '@/utils/articles';

// Function to determine if an article is a future insight
export const isFutureInsightsArticle = (article: ArticleMetadata): boolean => {
  // Check if article has the 'future' category
  if (article.category?.toLowerCase() === 'future') {
    return true;
  }
  
  // Check for specific tags: 'future', 'legal tech', 'legal innovation', etc.
  const futureTags = ['future', 'legal tech', 'legal innovation', 'ai law', 'law tech'];
  return article.tags?.some(tag => 
    futureTags.some(futureTag => tag.toLowerCase().includes(futureTag))
  ) || false;
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
    // Fetch from local articles via getAllArticles
    console.log('Attempting to fetch articles for future insights...');
    const allArticles = await getAllArticles();
    
    if (allArticles && allArticles.length > 0) {
      console.log(`Found ${allArticles.length} articles total`);
      
      // Log all categories to help debug
      const categories = allArticles.map(article => article.category);
      console.log('Article categories:', categories);
      
      const futureArticles = allArticles.filter(isFutureInsightsArticle);
      console.log(`Filtered to ${futureArticles.length} future insights`);
      
      // Log future insights for debugging
      if (futureArticles.length > 0) {
        console.log('Future insights found:', futureArticles.map(a => ({
          title: a.title,
          slug: a.slug,
          category: a.category,
          tags: a.tags
        })));
      } else {
        console.log('No future insights found in articles');
      }
      
      futureInsightsCache = futureArticles;
      lastFetchTime = now;
      return futureArticles;
    }
    
    // If no articles found, return empty array
    console.log('No articles found for future insights');
    return [];
  } catch (error) {
    console.error('Error fetching future insights:', error);
    return [];
  }
};

// Get a specific future insight by slug
export const getFutureInsightBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    // First check the cache
    if (futureInsightsCache) {
      const cachedArticle = futureInsightsCache.find(article => article.slug === slug);
      if (cachedArticle) {
        // Convert ArticleMetadata to Article by adding content property if needed
        if ('content' in cachedArticle) {
          return cachedArticle as Article;
        }
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
    
    // Convert ArticleMetadata to Article if needed
    if ('content' in article) {
      return article as Article;
    }
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
export const getLatestFutureInsights = async (count: number = 5): Promise<ArticleMetadata[]> => {
  const futureInsights = await getAllFutureInsights();
  return futureInsights.slice(0, count);
};

// Remove the "future" tag from articles when displaying
export const removeFutureTag = (article: Article | ArticleMetadata): Article | ArticleMetadata => {
  if (!article.tags) return article;
  
  return {
    ...article,
    tags: article.tags.filter(tag => tag.toLowerCase() !== 'future')
  };
};
