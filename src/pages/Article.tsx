
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '@/lib/articles';
import ArticleContent from '@/components/ArticleContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Article = () => {
  const { slug } = useParams();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug || ''),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8 text-white">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    console.error("Article error:", error);
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8 text-white">Article not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-8 animate-fade-in">
        <Link to="/articles">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        <ArticleContent article={article} />
      </div>
      <Footer />
    </div>
  );
};

export default Article;
