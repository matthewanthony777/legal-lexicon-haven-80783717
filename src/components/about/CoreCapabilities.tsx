
import { Briefcase, Route, Code, Film } from "lucide-react";
import CapabilityItem from "./CapabilityItem";
import { Separator } from "@/components/ui/separator";

const CoreCapabilities = () => {
  return (
    <>
      <h2 className="text-2xl font-playfair mb-6 mt-8">Core Capabilities:</h2>
      
      <div className="space-y-8">
        <CapabilityItem 
          icon={Briefcase}
          title="Legal Career Architecture™"
          description="Our proprietary system identifies emerging patterns in the professional landscape before they become obvious. We've guided professionals to secure positions commanding 40-70% higher compensation by positioning them at critical inflection points others fail to recognize."
        />

        <CapabilityItem 
          icon={Route}
          title="Strategic Career Transitions"
          description="We've developed exclusive frameworks for both entering and exiting the legal profession. The transition points we've identified enable professionals to leverage their existing expertise in ways their peers can't imagine—preserving years of investment while escaping the constraints most believe are inescapable."
        />

        <CapabilityItem 
          icon={Code}
          title="Technical Translation Mastery"
          description="Unlike conventional trainings that leave professionals with theoretical knowledge, our approach bridges the critical implementation gap. Our clients develop the rare ability to apply technological understanding where others struggle with basic concepts."
        />

        <CapabilityItem 
          icon={Film}
          title="Media Intelligence Framework"
          description="Our elite analysis of entertainment, media and cultural movements provides early signals that translate into career leverage. This intelligence creates unprecedented positioning for those who understand how to capitalize on it before market awareness develops."
        />
      </div>

      <Separator className="my-10 bg-indigo-900/50 h-[2px]" />
    </>
  );
};

export default CoreCapabilities;
