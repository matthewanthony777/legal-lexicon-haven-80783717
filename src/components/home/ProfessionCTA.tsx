
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Code, Film } from "lucide-react";

const ProfessionCTA = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 font-archivo">Choose Your Professional Path</h2>
      <p className="text-lg mb-8 max-w-3xl mx-auto">
        Select your profession to discover tailored insights and strategies for your field
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
        <Button 
          className="group px-6 py-8 h-auto text-lg flex-1"
          variant="outline"
          asChild
        >
          <Link to="/about#" className="flex flex-col items-center space-y-2">
            <Briefcase className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" />
            <span>Legal Mind</span>
          </Link>
        </Button>
        
        <Button 
          className="group px-6 py-8 h-auto text-lg flex-1"
          variant="outline"
          asChild
        >
          <Link to="/about#" className="flex flex-col items-center space-y-2">
            <Code className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" />
            <span>Technology Expert</span>
          </Link>
        </Button>
        
        <Button 
          className="group px-6 py-8 h-auto text-lg flex-1"
          variant="outline"
          asChild
        >
          <Link to="/about#" className="flex flex-col items-center space-y-2">
            <Film className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" />
            <span>Media Professional</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfessionCTA;
