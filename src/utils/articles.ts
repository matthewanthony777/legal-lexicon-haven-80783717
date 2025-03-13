
import { Article } from '@/types/article';
import { fetchAllArticles, fetchArticleBySlug } from '@/utils/github';

// In-memory cache for articles to avoid refetching
let articlesCache: Article[] | null = null;

export const getAllArticles = async (): Promise<Article[]> => {
    if (articlesCache) {
        return articlesCache;
    }
    
    try {
        const articles = await fetchAllArticles();
        articlesCache = articles;
        return articles;
    } catch (error) {
        console.error('Error getting all articles:', error);
        return [];
    }
};

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
    try {
        // First check the cache
        if (articlesCache) {
            const cachedArticle = articlesCache.find(article => article.slug === slug);
            if (cachedArticle) {
                return cachedArticle;
            }
        }
        
        // If not in cache, fetch directly
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
