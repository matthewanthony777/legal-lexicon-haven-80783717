
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <time className="text-muted-foreground">{article.date}</time>
      </header>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </article>
  );
};

export default ArticleContent;
