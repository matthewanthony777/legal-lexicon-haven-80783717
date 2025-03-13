
import Navigation from "@/components/Navigation";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";

const Index = () => {
  console.log("Rendering Index page");
  return (
    <div className="min-h-screen bg-black text-white" style={{backgroundColor: 'black', color: 'white'}}>
      <Navigation />
      <main className="relative flex-1">
        <div className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
              style={{opacity: 0.7}}
            >
              <source src="/lawyer-edit-homepage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center font-playfair" style={{color: 'white'}}>Legal Excellence & Career Growth</h1>
              <p className="text-lg md:text-2xl text-center px-4 font-playfair italic" style={{color: 'white'}}>
                Expert legal commentary and career guidance for modern professionals
              </p>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 z-30">
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500 bg-black/20 hover:bg-black/30"
                onClick={() => window.open("#", "_blank", "noopener,noreferrer")}
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-pink-500 bg-black/20 hover:bg-black/30"
                onClick={() => window.open("#", "_blank", "noopener,noreferrer")}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white bg-black/20 hover:bg-black/30"
                onClick={() => window.open("https://www.tiktok.com/@thescreenscholar", "_blank", "noopener,noreferrer")}
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
