import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

export const getAllCareerInsights = (): Article[] => {
    return articles?.filter(article => article.category === 'career') || [];
};

export const getCareerInsightBySlug = (slug: string): Article | undefined => {
    return articles?.find(article => article.slug === slug && article.category === 'career');
};

export const getLatestCareerInsights = (count: number = 5): Article[] => {
    return getAllCareerInsights().slice(0, count);
};