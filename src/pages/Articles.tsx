import { useState } from "react";
import { getAllArticles } from "@/utils/articles";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";

const Articles = () => {
  const allArticles = getAllArticles();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

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

          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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