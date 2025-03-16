
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoHeaderProps {
  title: string;
  subtitle: string;
}

const VideoHeader = ({ title, subtitle }: VideoHeaderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    // Add preload hint to help browser prioritize the video
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/cinema-about-edit.mp4';
    preloadLink.as = 'video';
    preloadLink.type = 'video/mp4';
    document.head.appendChild(preloadLink);
    
    if (videoElement) {
      // Event listeners with proper cleanup
      const handleLoadedData = () => setIsVideoLoaded(true);
      const handlePlaying = () => setIsVideoPlaying(true);
      const handleWaiting = () => setIsVideoPlaying(false);
      
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('playing', handlePlaying);
      videoElement.addEventListener('waiting', handleWaiting);
      
      // Start loading the video
      videoElement.load();
      
      return () => {
        // Clean up all event listeners
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('playing', handlePlaying);
        videoElement.removeEventListener('waiting', handleWaiting);
        
        // Clean up preload hint
        if (document.head.contains(preloadLink)) {
          document.head.removeChild(preloadLink);
        }
      };
    }
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden mb-12">
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isVideoLoaded && isVideoPlaying ? 'bg-opacity-70' : 'bg-opacity-100'
        } z-10`}
      ></div>
      
      <AspectRatio ratio={16/9} className="w-full">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          aria-hidden="true"
          // Removed the fetchpriority attribute as it's not supported in TypeScript's HTML video element types
        >
          <source src="/cinema-about-edit.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
      
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">{title}</h1>
        <p className="text-xl md:text-2xl text-white/90 italic font-playfair">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default VideoHeader;
