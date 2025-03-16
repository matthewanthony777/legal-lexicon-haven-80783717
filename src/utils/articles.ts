
import { Article } from '@/types/article';
import { fetchAllArticles, fetchArticleBySlug } from '@/utils/github';

// In-memory cache for articles to avoid refetching
export let articlesCache: Article[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Sample articles to use as fallback content when API fails
export const sampleArticles: Article[] = [
  {
    slug: 'understanding-contract-law',
    title: 'Understanding the Basics of Contract Law',
    date: new Date().toISOString(),
    author: 'The Legal Frontier',
    description: 'A comprehensive guide to the fundamental principles of contract law and its practical applications in modern business.',
    tags: ['Contracts', 'Business Law', 'Legal Basics'],
    category: 'Business Law',
    content: '## Understanding the Basics of Contract Law\n\nContract law is one of the most fundamental areas of legal practice. It governs the formation and enforcement of agreements between parties, whether individuals or organizations.'
  },
  {
    slug: 'intellectual-property-rights',
    title: 'A Guide to Intellectual Property Rights',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    author: 'The Legal Frontier',
    description: 'Explore the different types of intellectual property protection and how they can benefit your business.',
    tags: ['Intellectual Property', 'Business Law', 'Innovation'],
    category: 'Intellectual Property',
    content: '## A Guide to Intellectual Property Rights\n\nIntellectual property (IP) rights are crucial for protecting creative and innovative work in today\'s digital age.'
  },
  {
    slug: 'legal-tech-innovations',
    title: 'Top Legal Tech Innovations of 2024',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    author: 'The Legal Frontier',
    description: 'Discover the latest technological innovations transforming the legal industry.',
    tags: ['Legal Tech', 'Innovation', 'Future of Law'],
    category: 'Legal Tech',
    content: '## Top Legal Tech Innovations of 2024\n\nThe legal industry is increasingly embracing technology to improve efficiency, accuracy, and client service.'
  }
];

// Helper function to get cache for other modules
export const getCache = (): Article[] | null => {
    const now = Date.now();
    if (articlesCache && now - lastFetchTime < CACHE_DURATION) {
        return articlesCache;
    }
    return null;
};

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
            console.warn('No articles were returned from GitHub, using sample articles');
            // If GitHub returns empty array, use sample articles as fallback
            return sampleArticles;
        }
    } catch (error: any) {
        console.error('Error getting all articles:', error);
        
        // Check if error is related to rate limiting
        const isRateLimitError = 
            error.message?.includes('rate limit') || 
            error.message?.includes('API rate limit exceeded');
        
        if (isRateLimitError) {
            console.log('Rate limit exceeded, using sample articles');
            
            // Keep the error in the console for debugging
            console.error('GitHub API rate limit exceeded:', error);
            
            // Return cached articles as fallback if available, even if expired
            if (articlesCache && articlesCache.length > 0) {
                console.log('Returning expired cached articles as fallback');
                return articlesCache;
            }
            
            // If no cache, use sample content
            return sampleArticles;
        }
        
        // Return cached articles as fallback if available for other errors
        if (articlesCache) {
            console.log('Returning expired cached articles as fallback');
            return articlesCache;
        }
        
        // Last resort fallback to sample content
        return sampleArticles;
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
        
        if (article) {
            return article;
        }
        
        // If article not found through API, check sample articles
        const sampleArticle = sampleArticles.find(article => article.slug === slug);
        if (sampleArticle) {
            console.log(`Found article in sample content: ${slug}`);
            return sampleArticle;
        }
        
        return undefined;
    } catch (error) {
        console.error(`Error getting article by slug ${slug}:`, error);
        
        // Check sample articles when API fails
        const sampleArticle = sampleArticles.find(article => article.slug === slug);
        if (sampleArticle) {
            console.log(`Using sample article as fallback for: ${slug}`);
            return sampleArticle;
        }
        
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
