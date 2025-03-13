
// GitHub configuration
export const GITHUB_CONFIG = {
  owner: 'lovablelovable', // Update with your actual GitHub username
  repo: 'cinema-blog-content', // Update with your actual repository name
  branch: 'main',
  articlesPath: 'content/articles',
  careerInsightsPath: 'content/career-insights',
  token: import.meta.env.VITE_GITHUB_TOKEN || '' // For private repos (optional)
};
