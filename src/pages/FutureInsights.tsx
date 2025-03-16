
import { useState, useEffect } from "react";
import { getAllFutureInsights } from "@/utils/futureInsights";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";
import ArticleEmptyState from "@/components/ArticleEmptyState";
import Footer from "@/components/Footer";

const FutureInsights = () => {
  const allInsights = getAllFutureInsights();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    console.log(`Found ${allInsights.length} future insights to display`);
  }, [allInsights]);

  const filteredInsights = allInsights.filter((insight) => {
    const matchesSearch = 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="space-y-4">
          <div className="text-center space-y-2 mt-16">
            <h1 className="text-2xl md:text-4xl font-bold font-playfair">Future Insights</h1>
            <p className="text-sm md:text-base text-muted-foreground font-playfair">
              Forward-thinking analysis on the future of legal practice
            </p>
          </div>
          
          <ArticleFilters
            onSearchChange={setSearchQuery}
          />

          {filteredInsights.length === 0 ? (
            <ArticleEmptyState 
              searchQuery={searchQuery}
              message="No future insights found matching your criteria."
              suggestion="Try broadening your search or check back later for new content."
            />
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInsights.map((insight) => (
                <ArticleCard key={insight.slug} article={insight} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FutureInsights;
