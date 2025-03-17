
export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  coverVideo?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
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
