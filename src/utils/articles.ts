import { Article } from '@/types/article';
import { fetchAllArticles, fetchArticleBySlug, getWindowArticleData } from '@/utils/github';

// In-memory cache for articles to avoid refetching
let articlesCache: Article[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export const getAllArticles = async (): Promise<Article[]> => {
    const now = Date.now();
    
    // Return cached articles if they exist and cache hasn't expired
    if (articlesCache && now - lastFetchTime < CACHE_DURATION) {
        console.log('Using cached articles', { count: articlesCache.length, age: (now - lastFetchTime) / 1000 + 's' });
        return articlesCache;
    }
    
    try {
        console.log('Fetching all articles from GitHub');
        const articles = await fetchAllArticles();
        
        if (articles.length > 0) {
            console.log(`Successfully loaded ${articles.length} articles`);
            articlesCache = articles;
            lastFetchTime = now;
            return articles;
        } else {
            console.warn('No articles were returned from GitHub');
            
            // Check if we have any sample articles in window.__ARTICLE_DATA__
            const windowArticles = getWindowArticleData();
            if (windowArticles.length > 0) {
                console.log(`Found ${windowArticles.length} sample articles in window.__ARTICLE_DATA__`);
                articlesCache = windowArticles;
                lastFetchTime = now;
                return windowArticles;
            }
            
            // If all else fails, return an empty array
            return [];
        }
    } catch (error) {
        console.error('Error getting all articles:', error);
        
        // Return cached articles as fallback if available, even if expired
        if (articlesCache) {
            console.log('Returning expired cached articles as fallback');
            return articlesCache;
        }
        
        // As a last resort, try window.__ARTICLE_DATA__
        return getWindowArticleData();
    }
};

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
    try {
        // First check the cache
        if (articlesCache) {
            console.log(`Checking cache for article: ${slug}`);
            const cachedArticle = articlesCache.find(article => article.slug === slug);
            if (cachedArticle) {
                console.log(`Found article in cache: ${slug}`);
                return cachedArticle;
            }
        }
        
        // If not in cache, fetch directly
        console.log(`Fetching article directly: ${slug}`);
        const article = await fetchArticleBySlug(slug);
        return article || undefined;
    } catch (error) {
        console.error(`Error getting article by slug ${slug}:`, error);
        
        // Try window.__ARTICLE_DATA__ as last resort
        console.log(`Trying window.__ARTICLE_DATA__ for article: ${slug}`);
        const windowArticles = getWindowArticleData();
        return windowArticles.find(article => article.slug === slug);
    }
};

export const getLatestArticles = async (count: number = 5): Promise<Article[]> => {
    const articles = await getAllArticles();
    return articles.slice(0, count);
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
    const articles = await getAllArticles();
    return articles.filter(article => 
        article.category && article.category.toLowerCase() === category.toLowerCase()
    );
};

export const getAllCategories = async (): Promise<string[]> => {
    const articles = await getAllArticles();
    const categories = new Set<string>();
    articles.forEach(article => {
        if (article.category) {
            categories.add(article.category);
        }
    });
    return Array.from(categories);
};
