
import { Youtube, Instagram, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TikTokIcon from "@/components/icons/TikTokIcon";

interface HeroSectionProps {
  openNewsletterModal: () => void;
}

const HeroSection = ({ openNewsletterModal }: HeroSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6 order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-bold font-playfair leading-tight">
            Where Law Meets Tomorrow's Technology
          </h1>
          <h2 className="text-xl md:text-2xl font-playfair text-primary/80">
            Helping legal professionals navigate and thrive in an AI-transformed landscape
          </h2>
          <div className="pt-4 flex flex-wrap gap-3">
            <Button className="group" size="lg" asChild>
              <Link to="/articles">
                Explore Our Insights
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              onClick={openNewsletterModal}
            >
              Newsletter
              <Mail className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </div>
          
          {/* Social media links */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-red-500 hover:border-red-500 transition-colors"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-pink-500 hover:border-pink-500 transition-colors"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:border-[#25F4EE] transition-colors"
              asChild
            >
              <a 
                href="https://www.tiktok.com/@thescreenscholar" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Right side - Video */}
        <div className="relative rounded-xl overflow-hidden shadow-xl h-[400px] md:h-[500px] order-1 md:order-2">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/lawyer-edit-homepage.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
