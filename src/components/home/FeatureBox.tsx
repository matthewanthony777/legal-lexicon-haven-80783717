
import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureBoxProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bulletPoints: string[];
}

const FeatureBox = ({ icon: Icon, title, description, bulletPoints }: FeatureBoxProps) => {
  return (
    <Card className="border-t-4 border-t-primary transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6 space-y-4">
        <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center transition-colors mx-auto">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-archivo text-center">{title}</h3>
          <p className="text-lg font-playfair text-center mt-2">{description}</p>
          <ul className="space-y-2 text-sm mt-4">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureBox;
