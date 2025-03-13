
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline ? (
      <pre className="mt-4 mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 shadow-lg border-2 border-zinc-700 glass-card">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code 
        className="bg-zinc-800 px-[0.3rem] py-[0.2rem] rounded font-mono text-sm text-[#D6BCFA]" 
        {...props}
      >
        {children}
      </code>
    );
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in text-white">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4 text-white">{article.title}</h1>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <time className="text-white">{article.date}</time>
      </header>
      <div className="prose prose-lg max-w-none text-white">
        <ReactMarkdown 
          className="text-white"
          components={{
            code: CodeBlock
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleContent;
