
import { Book, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleEmptyStateProps {
  searchQuery?: string;
  message?: string;
  suggestion?: string;
  onRetry?: () => void;
}

const ArticleEmptyState = ({ searchQuery, message, suggestion, onRetry }: ArticleEmptyStateProps) => {
  // Use message if provided, otherwise use default based on searchQuery
  const displayMessage = message || 
    (searchQuery ? "No articles found matching your criteria." : "No articles available.");
  
  // Use suggestion if provided
  const displaySuggestion = suggestion || "";
  
  return (
    <div className="text-center py-8">
      <Book className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">{displayMessage}</p>
      {displaySuggestion && (
        <p className="text-muted-foreground mt-2">{displaySuggestion}</p>
      )}
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="mt-4"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Articles
        </Button>
      )}
    </div>
  );
};

export default ArticleEmptyState;
