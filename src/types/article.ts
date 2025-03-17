
export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  category?: string; // Make category optional to match Article type
  tags?: string[]; // Make tags optional to match Article type
  coverImage?: string;
  coverVideo?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
  rawContent?: string;
}

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}
