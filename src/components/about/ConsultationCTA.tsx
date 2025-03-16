
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ConsultationCTA = () => {
  return (
    <div className="bg-secondary/30 p-6 rounded-lg border border-indigo-900/50 mt-8 mb-8">
      <p className="mb-4 font-medium text-white">
        For confidential consultation on your specific situation, contact us through our secure 
        collaboration channel. Due to our personalized approach, we maintain limited availability.
      </p>
      <Link to="/collaborate">
        <Button className="bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-6 h-auto">
          Schedule Consultation
        </Button>
      </Link>
    </div>
  );
};

export default ConsultationCTA;
