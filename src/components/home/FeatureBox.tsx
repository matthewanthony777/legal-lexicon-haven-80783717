
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureBoxProps {
  title: string;
  description: string;
  icon: ReactNode;
  bulletPoints: string[];
}

const FeatureBox = ({ title, description, icon, bulletPoints }: FeatureBoxProps) => {
  return (
    <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1 group">
      <CardContent className="p-6 space-y-4">
        <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold font-archivo">{title}</h3>
        <p className="text-lg font-playfair">{description}</p>
        <ul className="space-y-2 text-sm">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureBox;
