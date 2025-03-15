
import { Book, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleEmptyStateProps {
  searchQuery: string;
  onRetry: () => void;
}

const ArticleEmptyState = ({ searchQuery, onRetry }: ArticleEmptyStateProps) => {
  return (
    <div className="text-center py-8">
      <Book className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">
        {searchQuery ? "No articles found matching your criteria." : "No articles available."}
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRetry}
        className="mt-4"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Articles
      </Button>
    </div>
  );
};

export default ArticleEmptyState;
