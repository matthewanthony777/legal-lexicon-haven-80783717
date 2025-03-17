
import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

export const getAllCareerInsights = (): Article[] => {
    console.log(`Filtering career insights from ${articles?.length || 0} local articles`);
    // Only look for articles with category set to 'career'
    const careerInsights = articles?.filter(article => article.category === 'career') || [];
    console.log(`Found ${careerInsights.length} career insights`);
    return careerInsights;
};

export const getCareerInsightBySlug = (slug: string): Article | undefined => {
    console.log(`Looking for career insight with slug: ${slug}`);
    const insight = articles?.find(article => article.slug === slug && article.category === 'career');
    if (insight) {
        console.log(`Found career insight: ${insight.title}`);
    } else {
        console.log(`Career insight not found with slug: ${slug}`);
    }
    return insight;
};

export const getLatestCareerInsights = (count: number = 5): Article[] => {
    const allInsights = getAllCareerInsights();
    console.log(`Returning ${Math.min(count, allInsights.length)} latest career insights`);
    return allInsights.slice(0, count);
};
