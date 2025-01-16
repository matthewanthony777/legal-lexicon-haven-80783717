import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Pen, Users } from "lucide-react";

const Collaborate = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const vision = formData.get('vision') as string;
    const support = formData.get('support') as string;

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { name, email, vision, support }
      });

      if (error) throw error;

      toast({
        title: "Vision shared!",
        description: "Thank you for sharing your vision with us. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send your vision. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12 mt-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Join Our Film Community</h1>
            <p className="text-lg text-muted-foreground">
              Whether you're dreaming of a career in film, looking to develop your creative voice, or seeking to connect with fellow film enthusiasts - you've found your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Career Transition Card */}
            <Card className="bg-card animate-[fade-in_0.6s_ease-out,scale-in_0.4s_ease-out] hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Career Transition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>One-on-one career guidance</p>
                <p>Industry insights and pathways</p>
                <p>Skills assessment and planning</p>
                <p>Portfolio development support</p>
              </CardContent>
            </Card>

            {/* Creative Development Card */}
            <Card className="bg-card animate-[fade-in_0.6s_ease-out,scale-in_0.4s_ease-out] hover:scale-105 transition-transform duration-300 delay-[150ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pen className="w-6 h-6 text-blue-500" />
                  Creative Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Writing workshops and feedback</p>
                <p>Script analysis sessions</p>
                <p>Creative collaboration opportunities</p>
                <p>Mentorship programs</p>
              </CardContent>
            </Card>

            {/* Community Support Card */}
            <Card className="bg-card animate-[fade-in_0.6s_ease-out,scale-in_0.4s_ease-out] hover:scale-105 transition-transform duration-300 delay-[300ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Monthly virtual meetups</p>
                <p>Peer review groups</p>
                <p>Networking events</p>
                <p>Collaborative projects</p>
              </CardContent>
            </Card>
          </div>

          <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-card space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Share Your Vision</h2>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vision" className="text-sm font-medium">
                Tell Us About Your Journey
              </label>
              <Textarea
                id="vision"
                name="vision"
                required
                placeholder="Share your ideas and journey with us..."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="support" className="text-sm font-medium">
                What kind of support are you looking for?
              </label>
              <Textarea
                id="support"
                name="support"
                required
                placeholder="Tell us about your goals and how we can help..."
                className="min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Join Our Community
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collaborate;