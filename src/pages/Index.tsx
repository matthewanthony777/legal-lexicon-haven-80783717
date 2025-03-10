
import Navigation from "@/components/Navigation";
import { Youtube, Instagram, ArrowRight, Scale, Brain, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-white pointer-events-none"></div>
      
      <Navigation />
      
      <main className="relative">
        {/* Hero Section with smaller video */}
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-16 px-4 md:px-6 relative z-10">
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  Legal Excellence & Future Vision
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 h-px w-24 bg-white/50"></div>
            </div>
            
            <p className="text-xl text-muted-foreground font-light">
              Expert legal commentary and career guidance for the modern legal professional in an evolving landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Smaller video container - 1/3 column width */}
          <div className="relative h-[300px] md:h-[400px] glass-card rounded-lg overflow-hidden border-white/10">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <video 
                className="w-full h-full object-cover opacity-80"
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
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-diagonal-lines relative">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-center mb-3">Legal Innovation for Tomorrow</h2>
              <div className="h-1 w-24 bg-white/20"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Scale className="h-10 w-10 text-white" />}
                title="Legal Excellence" 
                description="Cutting-edge legal strategies and insights from industry experts." 
              />
              <FeatureCard 
                icon={<Brain className="h-10 w-10 text-white" />}
                title="Future-Forward Thinking" 
                description="Anticipating legal challenges in an evolving technological landscape." 
              />
              <FeatureCard 
                icon={<Globe className="h-10 w-10 text-white" />}
                title="Global Perspective" 
                description="International legal frameworks and cross-border solutions." 
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-dot-pattern">
          <div className="container mx-auto">
            <div className="relative future-gradient rounded-lg p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-grid-white"></div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Legal Career?</h2>
                <p className="text-white/80 mb-6">Join our community of forward-thinking legal professionals shaping the future of law.</p>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium">
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
              className="rounded-full border-white/20 hover:border-white hover:bg-white/10"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 hover:border-white hover:bg-white/10"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 hover:border-white hover:bg-white/10"
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
    <div className="glass-card p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
