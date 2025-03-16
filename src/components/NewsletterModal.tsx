
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          name: "Newsletter Subscriber",
          email,
          vision: "Newsletter Subscription Request",
          support: "Please add me to your newsletter."
        }
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      toast({
        title: "Thank you for subscribing!",
        description: "You have been added to our newsletter."
      });
      
      setEmail("");
      onClose();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe to the newsletter. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-md p-6 relative animate-in fade-in-90 slide-in-from-bottom-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest insights on law and technology
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newsletter-email" className="text-sm font-medium">
              Email address
            </label>
            <Input 
              id="newsletter-email" 
              type="email" 
              placeholder="your.email@example.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            We respect your privacy and will never share your information
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;
