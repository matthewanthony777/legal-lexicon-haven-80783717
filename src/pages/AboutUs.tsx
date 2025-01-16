import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              preload="auto"
            >
              <source src="/cinema-about-edit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-bold mb-6 font-playfair text-white">Screen Scholar</h1>
                <p className="text-lg mb-6 leading-relaxed text-white">
                  Screen Scholar is dedicated to exploring the depths of cinematic artistry, offering thoughtful analysis and insightful perspectives on films that shape our cultural landscape. Through our carefully curated content, we invite you to journey with us into the heart of storytelling through motion pictures.
                </p>
                <p className="text-lg leading-relaxed text-white">
                  Our platform serves as a sanctuary for film enthusiasts, critics, and casual viewers alike, fostering meaningful discussions about the art of cinema and its profound impact on our collective imagination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;