
// GitHub configuration
export const GITHUB_CONFIG = {
  owner: 'YOUR_GITHUB_USERNAME', // Replace with your GitHub username or organization
  repo: 'YOUR_REPO_NAME',        // Replace with your repository name
  branch: 'main',                // Or whichever branch contains your content
  articlesPath: 'content/articles',
  careerInsightsPath: 'content/career-insights',
  token: import.meta.env.VITE_GITHUB_TOKEN || '' // For private repos (optional)
};
