import { articles } from 'virtual:mdx-data';
import { Article } from '@/types/article';

// Enhanced debugging logs
console.log(`Total articles in virtual:mdx-data: ${articles?.length || 0}`);
if (articles) {
  console.log('Article slugs in virtual:mdx-data:', articles.map(a => a.slug).join(', '));
  console.log('Article categories:', articles.map(a => a.category).join(', '));
}
console.log(`Future insights count: ${articles?.filter(article => article.category === 'future').length || 0}`);

// Function to determine if an article is a future insight
const isFutureInsightsArticle = (article: Article): boolean => {
  // If explicitly marked as future category, include it
  if (article.category === 'future') return true;
  
  // Check if the article has future-related content based on tags or title
  const hasFutureTag = article.tags && article.tags.some(tag => 
    tag.toLowerCase().includes('future') || 
    tag.toLowerCase().includes('ai') || 
    tag.toLowerCase().includes('tech') ||
    tag.toLowerCase().includes('legal') ||
    tag.toLowerCase().includes('legal tech')
  );
  
  const hasFutureTitle = article.title.toLowerCase().includes('future') || 
                         article.title.toLowerCase().includes('ai') || 
                         article.title.toLowerCase().includes('tech') ||
                         article.title.toLowerCase().includes('legal');
                         
  return hasFutureTag || hasFutureTitle;
};

export const getAllFutureInsights = (): Article[] => {
  console.log('Getting all future insights...');
  const futureInsights = articles?.filter(isFutureInsightsArticle) || [];
  console.log(`Filtered to ${futureInsights.length} future insights`);
  console.log('Future insight slugs:', futureInsights.map(a => a.slug).join(', '));
  return futureInsights;
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
      tag.toLowerCase().includes('legal') ||
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
