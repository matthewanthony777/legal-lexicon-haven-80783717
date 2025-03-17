
import { Brain, Shield, Eye } from "lucide-react";
import FeatureBox from "./FeatureBox";

const FeatureBoxesSection = () => {
  const featureBoxData = [
    {
      title: "Strategic Innovation Mastery™",
      description: "Transform your expertise into unmatched market advantage",
      icon: <Brain className="h-8 w-8 text-primary" />,
      bulletPoints: [
        "Master emerging technologies reshaping professional landscapes",
        "Develop unique methodologies that create competitive immunity",
        "Position yourself at high-value intersection points others overlook",
        "Access exclusive insights on innovation patterns before they become obvious"
      ]
    },
    {
      title: "Future-Proof Career Architecture™",
      description: "Build a resilient career that thrives in disruption",
      icon: <Shield className="h-8 w-8 text-primary" />,
      bulletPoints: [
        "Design career paths immune to market and technological disruption",
        "Develop essential skills & capabilities before they become mandatory",
        "Position yourself as an innovation leader in your field",
        "Create a brand that attracts high-value opportunities"
      ]
    },
    {
      title: "Strategic Media Intelligence™",
      description: "Gain unique insights through media and cultural analysis",
      icon: <Eye className="h-8 w-8 text-primary" />,
      bulletPoints: [
        "Decode future trends through legal, technology, media, film, and literature analysis",
        "Apply narrative-derived strategies to real-world professional challenges",
        "Connect theoretical concepts with practical applications",
        "Gain perspectives that differentiate you from peers"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-muted/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureBoxData.map((feature, index) => (
          <FeatureBox
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            bulletPoints={feature.bulletPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxesSection;
