
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFutureInsightBySlug } from "@/utils/futureInsights";
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MDXRenderer from "@/components/MDXRenderer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FutureInsightDetail = () => {
  const { slug } = useParams();
  const [insight, setInsight] = useState<Article | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchedInsight = getFutureInsightBySlug(slug);
      setInsight(fetchedInsight);
      setLoading(false);
      if (!fetchedInsight) {
        setError("Future insight not found");
      }
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-playfair">Loading future insight...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-1 text-center">
          <h1 className="text-2xl font-bold font-playfair">Future insight not found</h1>
          <Link to="/future-insights">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Future Insights
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <article className="container mx-auto px-4 py-4 md:py-8 max-w-3xl mt-16 flex-1">
        <Link to="/future-insights">
          <Button variant="ghost" className="mb-4 md:mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Future Insights
          </Button>
        </Link>
        
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <time className="text-sm text-muted-foreground font-playfair">
                {new Date(insight.date).toLocaleDateString()}
              </time>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold font-playfair">{insight.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground font-playfair">By</span>
              <span className="font-medium font-playfair">{insight.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {insight.tags && insight.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8 prose dark:prose-invert max-w-none leading-relaxed markdown-content">
            <MDXRenderer content={insight.content} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default FutureInsightDetail;
