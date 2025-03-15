
import { useState, useEffect } from "react";
import { getAllArticles } from "@/utils/articles";
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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchArticles = async () => {
    try {
      console.log("Fetching articles in Articles component");
      setLoading(true);
      setError(null);
      
      // Show simpler loading toast
      toast({
        title: "Loading articles...",
      });
      
      const fetchedArticles = await getAllArticles();
      
      console.log(`Fetched ${fetchedArticles.length} articles in Articles component`);
      setArticles(fetchedArticles);
      
      if (fetchedArticles.length === 0) {
        setError("No articles found. Please check your GitHub repository to make sure it contains markdown files in the content/articles directory.");
        toast({
          variant: "destructive",
          title: "No articles found",
          description: "Check GitHub repository configuration",
        });
      } else {
        toast({
          title: "Articles loaded",
          description: `Successfully loaded ${fetchedArticles.length} articles`,
        });
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Check browser console for details.");
      toast({
        variant: "destructive",
        title: "Error loading articles",
        description: "See console for technical details",
      });
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
    fetchArticles();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="space-y-4">
          <div className="text-center space-y-2 mt-16">
            <h1 className="text-2xl md:text-4xl font-bold font-playfair">The Cinema Vault</h1>
            <p className="text-sm md:text-base text-muted-foreground font-playfair">
              Unraveling film's mysteries from script to screen and beyond
            </p>
          </div>
          
          <ArticleFilters
            onSearchChange={setSearchQuery}
          />

          {error && <ArticleErrorState error={error} onRetry={handleRetry} />}

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

export default Articles;
