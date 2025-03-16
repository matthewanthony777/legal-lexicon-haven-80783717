
import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

export const getAllFutureInsights = (): Article[] => {
    // Filter articles to only those with the 'future' category
    return articles?.filter(article => article.category === 'future') || [];
};

export const getFutureInsightBySlug = (slug: string): Article | undefined => {
    // Find a specific article by slug that also has the 'future' category
    return articles?.find(article => article.slug === slug && article.category === 'future');
};

export const getLatestFutureInsights = (count: number = 5): Article[] => {
    // Get the most recent future insights articles
    return getAllFutureInsights()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
};

export const getFutureInsightsByTag = (tag: string): Article[] => {
    // Filter articles by tag within the future category
    return getAllFutureInsights()
        .filter(article => article.tags && article.tags.includes(tag));
};
