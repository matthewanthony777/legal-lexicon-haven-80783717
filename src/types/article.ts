export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverVideo?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}