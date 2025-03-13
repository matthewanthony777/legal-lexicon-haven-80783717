
import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

export const getAllArticles = (): Article[] => {
    return articles || [];
};

export const getArticleBySlug = (slug: string): Article | undefined => {
    return articles?.find(article => article.slug === slug);
};

export const getLatestArticles = (count: number = 5): Article[] => {
    return getAllArticles().slice(0, count);
};

export const getArticlesByCategory = (category: string): Article[] => {
    return getAllArticles().filter(article => 
        article.category && article.category.toLowerCase() === category.toLowerCase()
    );
};

export const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    getAllArticles().forEach(article => {
        if (article.category) {
            categories.add(article.category);
        }
    });
    return Array.from(categories);
};
