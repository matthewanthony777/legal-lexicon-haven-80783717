
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterModal from "@/components/NewsletterModal";
import HeroSection from "@/components/home/HeroSection";
import FeatureBoxesSection from "@/components/home/FeatureBoxesSection";
import ProfessionCTA from "@/components/home/ProfessionCTA";

const Index = () => {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero section */}
        <HeroSection openNewsletterModal={() => setIsNewsletterModalOpen(true)} />

        {/* Feature boxes section */}
        <FeatureBoxesSection />
        
        {/* Profession CTA section */}
        <ProfessionCTA />
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
