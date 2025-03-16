
import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

// Log the total articles count and how many are categorized as future
console.log(`Total articles in virtual:mdx-data: ${articles?.length || 0}`);
console.log(`Future insights count: ${articles?.filter(article => article.category === 'future').length || 0}`);

export const getAllFutureInsights = (): Article[] => {
    // Filter articles to only those with the 'future' category
    // Also include articles with relevant tags if they don't have the future category
    return articles?.filter(article => {
        // If explicitly marked as future category, include it
        if (article.category === 'future') return true;
        
        // Check if the article has future-related content based on tags or title
        const hasFutureTag = article.tags && article.tags.some(tag => 
            tag.toLowerCase().includes('future') || 
            tag.toLowerCase().includes('ai') || 
            tag.toLowerCase().includes('tech') ||
            tag.toLowerCase().includes('legal tech')
        );
        
        const hasFutureTitle = article.title.toLowerCase().includes('future') || 
                              article.title.toLowerCase().includes('ai') || 
                              article.title.toLowerCase().includes('tech') ||
                              article.title.toLowerCase().includes('legal');
                              
        return hasFutureTag || hasFutureTitle;
    }) || [];
};

export const getFutureInsightBySlug = (slug: string): Article | undefined => {
    // First try to find articles explicitly marked as future
    const explicitFuture = articles?.find(article => article.slug === slug && article.category === 'future');
    if (explicitFuture) return explicitFuture;
    
    // If not found, look for articles with future-related tags or titles
    return articles?.find(article => {
        if (article.slug !== slug) return false;
        
        const hasFutureTag = article.tags && article.tags.some(tag => 
            tag.toLowerCase().includes('future') || 
            tag.toLowerCase().includes('ai') || 
            tag.toLowerCase().includes('tech') ||
            tag.toLowerCase().includes('legal tech')
        );
        
        const hasFutureTitle = article.title.toLowerCase().includes('future') || 
                              article.title.toLowerCase().includes('ai') || 
                              article.title.toLowerCase().includes('tech') ||
                              article.title.toLowerCase().includes('legal');
                              
        return hasFutureTag || hasFutureTitle;
    });
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
