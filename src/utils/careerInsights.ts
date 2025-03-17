
import { getCareerInsightsArticles, getArticleBySlug } from '@/utils/local-articles';
import { Article } from '@/types/article';

export const getAllCareerInsights = (): Article[] => {
    return getCareerInsightsArticles();
};

export const getCareerInsightBySlug = (slug: string): Article | undefined => {
    return getArticleBySlug(slug);
};

export const getLatestCareerInsights = (count: number = 5): Article[] => {
    return getAllCareerInsights().slice(0, count);
};
