
import { useState, useEffect } from "react";
import { getAllCareerInsights } from "@/utils/careerInsights";
import { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import ArticleLoadingState from "@/components/ArticleLoadingState";
import ArticleErrorState from "@/components/ArticleErrorState";
import ArticleEmptyState from "@/components/ArticleEmptyState";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const CareerInsights = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsRateLimited(false);
      
      // Load articles without showing toast immediately for better UX
      const fetchedArticles = await getAllCareerInsights();
      
      console.log(`Fetched ${fetchedArticles.length} career insight articles`);
      setArticles(fetchedArticles);
      
      if (fetchedArticles.length === 0) {
        setError("No career insights found. Please check your GitHub repository configuration.");
        toast({
          variant: "destructive",
          title: "No career insights found",
          description: "Check GitHub repository configuration",
        });
      }
    } catch (err: any) {
      console.error("Error fetching career insights:", err);
      
      // Check if the error is due to rate limiting
      const isRateLimitError = 
        err.message?.includes("rate limit") || 
        err.message?.includes("API rate limit exceeded");
      
      if (isRateLimitError) {
        setIsRateLimited(true);
        setError("GitHub API rate limit exceeded. We're showing sample content in the meantime.");
        toast({
          variant: "default",
          title: "GitHub API rate limit exceeded",
          description: "Showing sample content instead. Try again later or configure a GitHub token.",
        });
      } else {
        setError("Failed to load career insights. Check browser console for details.");
        toast({
          variant: "destructive",
          title: "Error loading career insights",
          description: "See console for technical details",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleRetry = () => {
    toast({
      title: "Refreshing career insights...",
    });
    fetchArticles();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="space-y-4">
          <div className="text-center space-y-2 mt-16">
            <h1 className="text-2xl md:text-4xl font-bold font-playfair">Legal Career Insights</h1>
            <p className="text-sm md:text-base text-muted-foreground font-playfair">
              Expert advice and guidance for navigating the rapidly evolving legal career landscape
            </p>
          </div>
          
          <ArticleFilters
            onSearchChange={setSearchQuery}
          />

          {isRateLimited && (
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md mb-4">
              <h3 className="font-medium text-amber-800 dark:text-amber-300">GitHub API Rate Limit Exceeded</h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                We're showing sample content while waiting for the API rate limit to reset. 
                To fix this permanently, consider adding a GitHub token in your environment variables.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry} 
                className="mt-2 bg-amber-100 dark:bg-amber-900 border-amber-200 dark:border-amber-800"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {error && !isRateLimited && <ArticleErrorState error={error} onRetry={handleRetry} />}

          {loading ? (
            <ArticleLoadingState />
          ) : filteredArticles.length === 0 && !error ? (
            <ArticleEmptyState searchQuery={searchQuery} onRetry={handleRetry} />
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          <SocialMediaLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerInsights;
