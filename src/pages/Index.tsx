import Navigation from "@/components/Navigation";
import { Youtube, Instagram, ArrowRight, Mail, LightbulbIcon, GraduationCap, Film, BookText, Zap, Crosshair, Brain, Shield, Eye, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import NewsletterModal from "@/components/NewsletterModal";

const Index = () => {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Modern hero section with side-by-side layout */}
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
                  onClick={() => setIsNewsletterModalOpen(true)}
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

        {/* Three feature boxes section - adjusted top spacing by reducing py-16 to py-8 */}
        <div className="container mx-auto px-4 py-8 bg-muted/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1: Strategic Innovation Mastery™ */}
            <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group">
              <CardContent className="p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-archivo">Strategic Innovation Mastery™</h3>
                <p className="text-lg font-playfair">Transform your expertise into unmatched market advantage</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Master emerging technologies reshaping professional landscapes</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Develop unique methodologies that create competitive immunity</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Position yourself at high-value intersection points others overlook</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Access exclusive insights on innovation patterns before they become obvious</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Box 2: Future-Proof Career Architecture™ */}
            <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group">
              <CardContent className="p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-archivo">Future-Proof Career Architecture™</h3>
                <p className="text-lg font-playfair">Build a resilient career that thrives in disruption</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Design career paths immune to market and technological disruption</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Develop essential skills & capabilities before they become mandatory</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Position yourself as an innovation leader in your field</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Create a brand that attracts high-value opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Box 3: Strategic Media Intelligence™ */}
            <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group">
              <CardContent className="p-6 space-y-4">
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-archivo">Strategic Media Intelligence™</h3>
                <p className="text-lg font-playfair">Gain unique insights through media and cultural analysis</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Decode future trends through legal, technology, media, film, and literature analysis</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Apply narrative-derived strategies to real-world professional challenges</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Connect theoretical concepts with practical applications</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                    <span>Gain perspectives that differentiate you from peers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
