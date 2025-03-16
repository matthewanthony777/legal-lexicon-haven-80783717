
import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

export const getAllFutureInsights = (): Article[] => {
    return articles?.filter(article => article.category === 'future') || [];
};

export const getFutureInsightBySlug = (slug: string): Article | undefined => {
    return articles?.find(article => article.slug === slug && article.category === 'future');
};

export const getLatestFutureInsights = (count: number = 5): Article[] => {
    return getAllFutureInsights().slice(0, count);
};
