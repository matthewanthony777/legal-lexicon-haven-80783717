
import { getAllArticlesData } from '@/plugins/article-loader';
import { Article } from '@/types/article';

// In-memory cache for articles to avoid reprocessing files
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
        console.log('Loading articles from local content directory');
        // Use the article loader which reads from the filesystem
        const articles = getAllArticlesData();
        
        if (articles.length > 0) {
            console.log(`Successfully loaded ${articles.length} articles from local content`);
            articlesCache = articles;
            lastFetchTime = now;
        } else {
            console.warn('No articles were found in the content directory');
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
        // First check the cache or load all articles
        const articles = await getAllArticles();
        
        console.log(`Looking for article with slug: ${slug}`);
        const article = articles.find(article => article.slug === slug);
        
        if (article) {
            console.log(`Found article: ${article.title}`);
            return article;
        } else {
            console.log(`Article with slug "${slug}" not found`);
            return undefined;
        }
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
