
import { Article } from '@/types/article';
import { fetchAllArticles, fetchArticleBySlug, getLocalArticles } from '@/utils/github';

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
        // First try to load local content as it's faster
        const localArticles = getLocalArticles();
        if (localArticles.length > 0) {
            console.log(`Successfully loaded ${localArticles.length} articles from local content`);
            articlesCache = localArticles;
            lastFetchTime = now;
            return localArticles;
        }
        
        // If local content is empty, try GitHub API
        console.log('No local articles found, fetching from GitHub');
        const articles = await fetchAllArticles();
        
        if (articles.length > 0) {
            console.log(`Successfully loaded ${articles.length} articles from GitHub`);
            articlesCache = articles;
            lastFetchTime = now;
        } else {
            console.warn('No articles were returned from GitHub or local content');
        }
        
        return articles;
    } catch (error) {
        console.error('Error getting all articles:', error);
        // Return cached articles as fallback if available, even if expired
        if (articlesCache) {
            console.log('Returning expired cached articles as fallback');
            return articlesCache;
        }
        return [];
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
        
        // Then check local content
        const localArticles = getLocalArticles();
        const localArticle = localArticles.find(article => article.slug === slug);
        if (localArticle) {
            console.log(`Found article in local content: ${slug}`);
            return localArticle;
        }
        
        // If not in cache or local content, fetch directly
        console.log(`Fetching article directly: ${slug}`);
        const article = await fetchArticleBySlug(slug);
        return article || undefined;
    } catch (error) {
        console.error(`Error getting article by slug ${slug}:`, error);
        return undefined;
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
