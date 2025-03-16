import { Briefcase, Route, Code, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useRef, useState } from "react";

const AboutUs = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-black/90 flex flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-[900px] mx-auto">
          <div className="relative rounded-xl overflow-hidden mb-12">
            <div className={`absolute inset-0 bg-black ${isVideoLoaded ? 'bg-opacity-70' : 'bg-opacity-100'} z-10 transition-opacity duration-500`}></div>
            
            <AspectRatio ratio={16/9} className="w-full">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/cinema-about-edit.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">OUR EXPERTISE</h1>
              <p className="text-xl md:text-2xl text-white/90 italic font-playfair">
                Accessing the Hidden Pathways Others Can&apos;t See
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-lg leading-relaxed mb-8">
              At Trial & Tribulations, we operate where most never venture, the powerful intersection of legal expertise, 
              technological disruption, and media evolution. While others remain trapped in conventional thinking, 
              our community gain access to opportunities <strong>invisible to the mainstream</strong>.
            </p>

            <Separator className="my-10 bg-indigo-900/50 h-[2px]" />

            <h2 className="text-2xl font-playfair mb-6 mt-8">Core Capabilities:</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-secondary/50 p-3 rounded-md mt-1">
                  <Briefcase className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2"><strong>Legal Career Architecture™</strong></h3>
                  <p>
                    Our proprietary system identifies emerging patterns in the professional landscape 
                    <strong> before they become obvious</strong>. We've guided professionals to secure positions 
                    commanding <strong>40-70% higher compensation</strong> by positioning them at critical 
                    inflection points others fail to recognize.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-secondary/50 p-3 rounded-md mt-1">
                  <Route className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2"><strong>Strategic Career Transitions</strong></h3>
                  <p>
                    We've developed exclusive frameworks for both entering and exiting the legal profession. 
                    The transition points we've identified enable professionals to leverage their existing expertise 
                    in ways their peers can't imagine—<strong>preserving years of investment</strong> while escaping 
                    the constraints most believe are inescapable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-secondary/50 p-3 rounded-md mt-1">
                  <Code className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2"><strong>Technical Translation Mastery</strong></h3>
                  <p>
                    Unlike conventional trainings that leave professionals with theoretical knowledge, 
                    our approach <strong>bridges the critical implementation gap</strong>. Our clients develop 
                    the rare ability to apply technological understanding where others struggle with basic concepts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-secondary/50 p-3 rounded-md mt-1">
                  <Film className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2"><strong>Media Intelligence Framework</strong></h3>
                  <p>
                    Our elite analysis of entertainment, media and cultural movements provides 
                    <strong> early signals that translate into career leverage</strong>. This intelligence creates 
                    unprecedented positioning for those who understand how to capitalize on it before market 
                    awareness develops.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-10 bg-indigo-900/50 h-[2px]" />

            <h2 className="text-2xl font-playfair mb-6 mt-8">What Sets Us Apart:</h2>
            <p className="mb-4">
              We've identified psychological patterns in career development that reveal 
              <strong> opportunities and threats most professionals never see</strong>. Our methodologies combine 
              techniques from fields most would never connect, creating results conventional approaches cannot achieve.
            </p>
            <p>
              While others share general advice that leaves you competing with thousands, our customized approach 
              positions you where <strong>competition is minimal and leverage is maximal</strong>. Clients who 
              implement our methods often report experiencing initial disbelief from colleagues who cannot comprehend 
              how such transitions are possible.
            </p>

            <Separator className="my-10 bg-indigo-900/50 h-[2px]" />

            <h2 className="text-2xl font-playfair mb-6 mt-8">The Critical Choice:</h2>
            <p className="mb-6">
              The legal landscape is dividing into two distinct groups: those who understand the hidden forces 
              reshaping the profession, and <strong>those who will be displaced by them</strong>. Our expertise is 
              exclusively available to professionals serious about positioning themselves in the former category.
            </p>

            <div className="bg-secondary/30 p-6 rounded-lg border border-indigo-900/50 mt-8 mb-8">
              <p className="mb-4 font-medium text-white">
                For confidential consultation on your specific situation, contact us through our secure 
                collaboration channel. Due to our personalized approach, we maintain limited availability.
              </p>
              <Link to="/collaborate">
                <Button className="bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-6 h-auto">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
