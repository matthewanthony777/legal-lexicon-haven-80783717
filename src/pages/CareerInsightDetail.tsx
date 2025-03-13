
import { useParams } from "react-router-dom";
import { getCareerInsightBySlug } from "@/utils/careerInsights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MDXRenderer from "@/components/MDXRenderer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CareerInsightDetail = () => {
  const { slug } = useParams();
  const insight = getCareerInsightBySlug(slug || "");

  if (!insight) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">Career insight not found</h1>
          <Link to="/career-insights">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Career Insights
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <article className="container mx-auto px-4 py-4 md:py-8 max-w-3xl mt-16 flex-1 text-white">
        <Link to="/career-insights">
          <Button variant="ghost" className="mb-4 md:mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Career Insights
          </Button>
        </Link>
        
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-white" />
              <time className="text-sm text-white">
                {new Date(insight.date).toLocaleDateString()}
              </time>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{insight.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-white">By</span>
              <span className="font-medium text-white">{insight.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {insight.tags && insight.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8 prose dark:prose-invert max-w-none text-white">
            <MDXRenderer content={insight.content} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default CareerInsightDetail;
