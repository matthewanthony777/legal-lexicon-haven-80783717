
import { LucideIcon } from "lucide-react";

interface CapabilityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CapabilityItem = ({ icon: Icon, title, description }: CapabilityItemProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-secondary/50 p-3 rounded-md mt-1">
        <Icon className="h-6 w-6 text-indigo-400" />
      </div>
      <div>
        <h3 className="text-xl font-playfair mb-2"><strong>{title}</strong></h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CapabilityItem;
