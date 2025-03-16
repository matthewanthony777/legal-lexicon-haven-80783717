
import Navigation from "@/components/Navigation";
import { Youtube, Instagram, ArrowRight, Mail, LightbulbIcon, GraduationCap, Film } from "lucide-react";
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
        {/* Hero and feature boxes in a single container with reduced padding */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Modern hero section with side-by-side layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-8">
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
            <div className="relative rounded-xl overflow-hidden shadow-xl h-[250px] md:h-[300px] order-1 md:order-2">
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

          {/* Three feature boxes section with only icons initially visible */}
          <div className="py-0 bg-muted/20 rounded-xl mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Box 1: Legal Innovation Mastery */}
              <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group overflow-hidden h-32 hover:h-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors mx-auto">
                    <LightbulbIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="invisible group-hover:visible transition-all duration-300">
                    <h3 className="text-2xl font-bold font-archivo text-center">Legal Innovation Mastery</h3>
                    <p className="text-lg font-playfair text-center mt-2">Transform your legal practice through cutting-edge technology</p>
                    <ul className="space-y-2 text-sm mt-4">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Stay ahead with cutting-edge legal tech analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Master AI tools reshaping the legal landscape</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Transform traditional legal processes with innovative methodologies</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Access exclusive insights on emerging legal technologies</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Box 2: Future-Proof Career Architecture */}
              <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group overflow-hidden h-32 hover:h-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors mx-auto">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div className="invisible group-hover:visible transition-all duration-300">
                    <h3 className="text-2xl font-bold font-archivo text-center">Future-Proof Career Architecture</h3>
                    <p className="text-lg font-playfair text-center mt-2">Build a resilient legal career that thrives in disruption</p>
                    <ul className="space-y-2 text-sm mt-4">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Design a career path immune to market disruption</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Develop essential future skills before they become mandatory</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Position yourself as an innovation leader in your organization</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Create a personal brand that attracts high-value opportunities</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Box 3: Strategic Media Intelligence */}
              <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group overflow-hidden h-32 hover:h-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors mx-auto">
                    <Film className="h-8 w-8 text-primary" />
                  </div>
                  <div className="invisible group-hover:visible transition-all duration-300">
                    <h3 className="text-2xl font-bold font-archivo text-center">Strategic Media Intelligence</h3>
                    <p className="text-lg font-playfair text-center mt-2">Gain unique legal insights through media analysis</p>
                    <ul className="space-y-2 text-sm mt-4">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Decode legal futures through film, TV and literature analysis</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Apply fiction-inspired strategies to real-world legal challenges</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Connect theoretical concepts with practical legal applications</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>Gain unique perspectives that differentiate you from peers</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
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
