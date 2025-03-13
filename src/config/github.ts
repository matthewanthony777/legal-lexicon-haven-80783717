
// GitHub configuration
export const GITHUB_CONFIG = {
  owner: 'matthewanthony777', // Updated with the correct GitHub username
  repo: 'legal-lexicon-haven-80783717', // Updated with the correct repository name
  branch: 'main',
  articlesPath: 'content/articles',
  careerInsightsPath: 'content/career-insights',
  token: import.meta.env.VITE_GITHUB_TOKEN || '' // For private repos (optional)
};
