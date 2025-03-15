
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";

const SocialMediaLinks = () => {
  return (
    <div className="mt-16 border-t pt-8">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold">Follow Us</h2>
        <div className="flex justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-muted"
            asChild
          >
            <a
              href="https://www.tiktok.com/@thescreenscholar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <TikTokIcon className="w-6 h-6" />
              <span className="sr-only">TikTok</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-muted"
            asChild
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-muted"
            asChild
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </a>
          </Button>
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="rounded-full px-8"
            asChild
          >
            <a href="#" className="font-medium">
              Subscribe
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
