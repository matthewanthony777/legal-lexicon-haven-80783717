
import { Article } from '@/types/article';
import { fetchAllArticles } from '@/utils/github';
import { articlesCache, getCache, sampleArticles } from '@/utils/articles';

// Sample career insights articles to use as fallback
const sampleCareerInsights: Article[] = [
  {
    slug: 'legal-career-paths',
    title: 'Exploring Legal Career Paths in 2024',
    date: new Date().toISOString(),
    author: 'The Legal Frontier',
    description: 'An exploration of emerging career opportunities in the legal field and how to position yourself for success.',
    tags: ['Career Advice', 'Legal Jobs', 'Professional Development'],
    category: 'career',
    content: '## Exploring Legal Career Paths in 2024\n\nThe legal profession continues to evolve with new specializations emerging in response to technological and societal changes.'
  },
  {
    slug: 'remote-legal-work',
    title: 'The Rise of Remote Legal Work',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    author: 'The Legal Frontier',
    description: 'How remote work is transforming legal practice and creating new opportunities for legal professionals.',
    tags: ['Remote Work', 'Future of Law', 'Legal Tech'],
    category: 'career',
    content: '## The Rise of Remote Legal Work\n\nRemote legal work has become increasingly prevalent, accelerated by technological advancements and changing workplace norms.'
  }
];

export const getAllCareerInsights = async (): Promise<Article[]> => {
  try {
    // First check if we have cached articles
    const cachedArticles = getCache();
    if (cachedArticles && cachedArticles.length > 0) {
      console.log('Using cached articles for career insights');
      return cachedArticles.filter(article => article.category === 'career');
    }
    
    // If no cache, try to fetch from GitHub
    console.log('Fetching all articles for career insights');
    const articles = await fetchAllArticles();
    
    if (articles.length > 0) {
      // Filter only career category articles
      const careerArticles = articles.filter(article => article.category === 'career');
      
      if (careerArticles.length > 0) {
        console.log(`Found ${careerArticles.length} career articles from GitHub`);
        return careerArticles;
      } else {
        console.warn('No career articles found, using sample career content');
        return sampleCareerInsights;
      }
    } else {
      console.warn('No articles returned from GitHub, using sample career content');
      return sampleCareerInsights;
    }
  } catch (error) {
    console.error('Error getting career insights:', error);
    
    // Check if we have cached articles as a fallback
    if (articlesCache) {
      const cachedCareerArticles = articlesCache.filter(article => article.category === 'career');
      if (cachedCareerArticles.length > 0) {
        console.log('Using cached career articles as fallback');
        return cachedCareerArticles;
      }
    }
    
    // Last resort fallback to sample content
    console.log('Using sample career articles as fallback due to error');
    return sampleCareerInsights;
  }
};

export const getCareerInsightBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    // Get all career insights
    const careerInsights = await getAllCareerInsights();
    
    // Find the one with matching slug
    return careerInsights.find(article => article.slug === slug);
  } catch (error) {
    console.error(`Error getting career insight by slug ${slug}:`, error);
    
    // Check sample career insights when API fails
    const sampleInsight = sampleCareerInsights.find(article => article.slug === slug);
    if (sampleInsight) {
      console.log(`Using sample career insight as fallback for: ${slug}`);
      return sampleInsight;
    }
    
    return undefined;
  }
};

export const getLatestCareerInsights = async (count: number = 5): Promise<Article[]> => {
  const careerInsights = await getAllCareerInsights();
  return careerInsights.slice(0, count);
};
