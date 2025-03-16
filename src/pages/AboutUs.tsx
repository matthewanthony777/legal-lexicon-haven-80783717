
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoHeader from "@/components/about/VideoHeader";
import CoreCapabilities from "@/components/about/CoreCapabilities";
import AboutSection from "@/components/about/AboutSection";
import ConsultationCTA from "@/components/about/ConsultationCTA";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-black/90 flex flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-[900px] mx-auto">
          <VideoHeader 
            title="OUR EXPERTISE" 
            subtitle="Accessing the Hidden Pathways Others Can't See" 
          />

          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-lg leading-relaxed mb-8">
              At Trial & Tribulations, we operate where most never venture, the powerful intersection of legal expertise, 
              technological disruption, and media evolution. While others remain trapped in conventional thinking, 
              our community gain access to opportunities <strong>invisible to the mainstream</strong>.
            </p>

            <Separator className="my-10 bg-indigo-900/50 h-[2px]" />

            <CoreCapabilities />

            <AboutSection title="What Sets Us Apart:">
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
            </AboutSection>

            <Separator className="my-10 bg-indigo-900/50 h-[2px]" />

            <AboutSection title="The Critical Choice:">
              <p className="mb-6">
                The legal landscape is dividing into two distinct groups: those who understand the hidden forces 
                reshaping the profession, and <strong>those who will be displaced by them</strong>. Our expertise is 
                exclusively available to professionals serious about positioning themselves in the former category.
              </p>

              <ConsultationCTA />
            </AboutSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
