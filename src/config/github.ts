
// GitHub configuration
export const GITHUB_CONFIG = {
  owner: 'matthewanthony777', // GitHub username
  repo: 'legal-lexicon-haven-80783717', // Repository name
  branch: 'main',
  articlesPath: 'content/articles',
  futureInsightsPath: 'content/future-insights',
  token: import.meta.env.VITE_GITHUB_TOKEN || '' // For private repos (optional)
};
