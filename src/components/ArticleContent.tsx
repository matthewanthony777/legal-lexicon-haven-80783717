
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in bg-background text-foreground">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4 text-foreground">{article.title}</h1>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <time className="text-muted-foreground">{article.date}</time>
      </header>
      <div className="prose prose-lg max-w-none text-foreground">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleContent;
