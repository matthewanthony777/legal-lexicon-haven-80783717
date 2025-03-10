
import Navigation from "@/components/Navigation";
import { Youtube, Instagram, ArrowRight, Scale, Brain, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section with smaller video */}
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Legal Excellence & Future Vision
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-playfair italic">
              Expert legal commentary and career guidance for the modern legal professional in an evolving landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Smaller video container - approximately 1/4 of the page */}
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border shadow-xl">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
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
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center font-playfair mb-12">Legal Innovation for Tomorrow</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Scale className="h-10 w-10 text-blue-500" />}
                title="Legal Excellence" 
                description="Cutting-edge legal strategies and insights from industry experts." 
              />
              <FeatureCard 
                icon={<Brain className="h-10 w-10 text-purple-500" />}
                title="Future-Forward Thinking" 
                description="Anticipating legal challenges in an evolving technological landscape." 
              />
              <FeatureCard 
                icon={<Globe className="h-10 w-10 text-green-500" />}
                title="Global Perspective" 
                description="International legal frameworks and cross-border solutions." 
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="relative bg-gradient-to-r from-blue-900/90 to-indigo-900/90 rounded-xl p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-grid-white-900/10"></div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold text-white font-playfair mb-4">Ready to Transform Your Legal Career?</h2>
                <p className="text-blue-100 mb-6">Join our community of forward-thinking legal professionals shaping the future of law.</p>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-medium">
                  Get Started <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Social media links */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-red-500 hover:border-red-500"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-pink-500 hover:border-pink-500"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-black hover:border-black"
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
      </main>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-background/60 backdrop-blur-sm p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 font-playfair">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
