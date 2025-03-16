
import { LightbulbIcon, GraduationCap, Film } from "lucide-react";
import FeatureBox from "./FeatureBox";

const FeatureBoxes = () => {
  const featureData = [
    {
      icon: LightbulbIcon,
      title: "Legal Innovation Mastery",
      description: "Transform your legal practice through cutting-edge technology",
      bulletPoints: [
        "Stay ahead with cutting-edge legal tech analysis",
        "Master AI tools reshaping the legal landscape",
        "Transform traditional legal processes with innovative methodologies",
        "Access exclusive insights on emerging legal technologies"
      ]
    },
    {
      icon: GraduationCap,
      title: "Future-Proof Career Architecture",
      description: "Build a resilient legal career that thrives in disruption",
      bulletPoints: [
        "Design a career path immune to market disruption",
        "Develop essential future skills before they become mandatory",
        "Position yourself as an innovation leader in your organization",
        "Create a personal brand that attracts high-value opportunities"
      ]
    },
    {
      icon: Film,
      title: "Strategic Media Intelligence",
      description: "Gain unique legal insights through media analysis",
      bulletPoints: [
        "Decode legal futures through film, TV and literature analysis",
        "Apply fiction-inspired strategies to real-world legal challenges",
        "Connect theoretical concepts with practical legal applications",
        "Gain unique perspectives that differentiate you from peers"
      ]
    }
  ];

  return (
    <div className="py-0 bg-muted/20 rounded-xl mt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureData.map((feature, index) => (
          <FeatureBox 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            bulletPoints={feature.bulletPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxes;
