
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import NewsletterModal from "@/components/NewsletterModal";
import Hero from "@/components/home/Hero";
import FeatureBoxes from "@/components/home/FeatureBoxes";

const Index = () => {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero and feature boxes in a single container with reduced padding */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Hero section */}
          <Hero onOpenNewsletter={() => setIsNewsletterModalOpen(true)} />

          {/* Feature boxes section - increased vertical spacing for optimal viewing */}
          <FeatureBoxes />
        </div>
      </main>
      <Footer />
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen} 
        onClose={() => setIsNewsletterModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
