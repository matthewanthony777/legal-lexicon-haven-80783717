
import { Button } from "@/components/ui/button";
import { Youtube, Instagram } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTokIcon";

const SocialIcons = () => {
  return (
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
  );
};

export default SocialIcons;
