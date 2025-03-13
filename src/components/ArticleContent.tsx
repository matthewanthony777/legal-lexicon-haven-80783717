
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in bg-black text-white">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4 text-white">{article.title}</h1>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-800 text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <time className="text-gray-400">{article.date}</time>
      </header>
      <div className="prose prose-lg max-w-none text-white prose-headings:text-white prose-p:text-white prose-strong:text-white prose-a:text-blue-400">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleContent;
