
import { useState } from "react";
import { getAllCareerInsights } from "@/utils/careerInsights";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";
import Footer from "@/components/Footer";

const CareerInsights = () => {
  const allInsights = getAllCareerInsights();
  const [searchQuery, setSearchQuery] = useState("");

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
            <h1 className="text-2xl md:text-4xl font-bold font-playfair">Career Insights</h1>
            <p className="text-sm md:text-base text-muted-foreground font-playfair">
              Guidance and strategies for legal career advancement
            </p>
          </div>
          
          <ArticleFilters
            onSearchChange={setSearchQuery}
          />

          {filteredInsights.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No insights found matching your criteria.</p>
            </div>
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

export default CareerInsights;
