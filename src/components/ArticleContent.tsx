
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/types/article';
import MDXRenderer from './MDXRenderer';
import { Calendar } from 'lucide-react';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  // Convert any potential MDX-specific syntax to more standard markdown
  // This helps with the transition from MDX to regular markdown
  const prepareContent = (content: string) => {
    if (!content) return '';
    
    // Handle imports (remove them as they're not needed in react-markdown)
    const withoutImports = content.replace(/import.*from\s+['"].*['"];?\n?/g, '');
    
    // Handle potential JSX component syntax that might appear in MDX files
    return withoutImports;
  };

  // Format the date
  const formattedDate = article.date ? new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  const isVideoFile = (filename?: string) => {
    if (!filename) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isImageFile = (filename?: string) => {
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-muted-foreground">
          {article.author && (
            <span className="inline-flex items-center mr-2">
              By {article.author}
            </span>
          )}
          
          {article.date && (
            <span className="inline-flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </span>
          )}
        </div>
        
        {article.coverImage && isImageFile(article.coverImage) && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full object-cover"
            />
          </div>
        )}
        
        {article.coverVideo && isVideoFile(article.coverVideo) && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <video 
              src={article.coverVideo} 
              controls
              className="w-full"
            />
          </div>
        )}
        
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {article.description && (
          <p className="text-lg font-medium mb-6">{article.description}</p>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        <MDXRenderer content={prepareContent(article.content)} />
      </div>
    </article>
  );
};

export default ArticleContent;
