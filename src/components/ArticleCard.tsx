import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.slug}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="font-serif text-xl">{article.title}</CardTitle>
          <div className="flex gap-2 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{article.excerpt}</p>
          <p className="text-sm text-muted-foreground mt-4">{article.date}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;