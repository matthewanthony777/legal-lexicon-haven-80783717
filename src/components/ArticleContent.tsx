
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  // Log to debug content rendering
  console.log("Rendering article:", article.title);
  
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4 text-white" style={{color: 'white'}}>
          {article.title}
        </h1>
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-800 text-white" style={{backgroundColor: '#1f2937', color: 'white'}}>
              {tag}
            </Badge>
          ))}
        </div>
        <time className="text-gray-400" style={{color: '#9ca3af'}}>{article.date}</time>
      </header>
      <div 
        className="prose prose-lg max-w-none" 
        style={{
          color: 'white',
          backgroundColor: 'black'
        }}
      >
        <ReactMarkdown components={{
          // Override default components to ensure proper styling
          h1: ({node, ...props}) => <h1 style={{color: 'white'}} {...props} />,
          h2: ({node, ...props}) => <h2 style={{color: 'white'}} {...props} />,
          h3: ({node, ...props}) => <h3 style={{color: 'white'}} {...props} />,
          p: ({node, ...props}) => <p style={{color: 'white'}} {...props} />,
          a: ({node, ...props}) => <a style={{color: '#60a5fa'}} {...props} />,
          li: ({node, ...props}) => <li style={{color: 'white'}} {...props} />,
        }}>
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleContent;
