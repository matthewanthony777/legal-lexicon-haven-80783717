import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllArticles, getAllTags } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles,
  });

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getAllTags,
  });

  return (
    <div className="container py-8 animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Legal Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Expert analysis and commentary on the latest legal developments
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-semibold mb-4">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold mb-6">Latest Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;