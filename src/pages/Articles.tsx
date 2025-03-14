
import { useState, useEffect } from "react";
import { getAllArticles } from "@/utils/articles";
import { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";
import { Youtube, Instagram, AlertCircle, RefreshCw, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

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
      
      // Show fetching toast
      toast({
        title: "Loading articles...",
        description: "Fetching content from GitHub repository",
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

          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p>Loading articles...</p>
              <p className="text-xs text-muted-foreground mt-2">Fetching content from GitHub...</p>
            </div>
          ) : filteredArticles.length === 0 && !error ? (
            <div className="text-center py-8">
              <Book className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No articles found matching your criteria." : "No articles available."}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                className="mt-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Articles
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* Social Media Links Section */}
          <div className="mt-16 border-t pt-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Follow Us</h2>
              <div className="flex justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full hover:bg-muted"
                  asChild
                >
                  <a
                    href="https://www.tiktok.com/@thescreenscholar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <TikTokIcon className="w-6 h-6" />
                    <span className="sr-only">TikTok</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full hover:bg-muted"
                  asChild
                >
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <Instagram className="w-6 h-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full hover:bg-muted"
                  asChild
                >
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <Youtube className="w-6 h-6" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </Button>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="rounded-full px-8"
                  asChild
                >
                  <a href="#" className="font-medium">
                    Subscribe
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
