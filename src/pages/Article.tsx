import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/lib/articles';
import ArticleContent from '@/components/ArticleContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Article = () => {
  const { slug } = useParams();
  
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug || ''),
  });

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!article) {
    return <div className="container py-8">Article not found</div>;
  }

  return (
    <div className="container animate-fade-in">
      <Link to="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>
      </Link>
      <ArticleContent article={article} />
    </div>
  );
};

export default Article;