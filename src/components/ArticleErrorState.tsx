
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ArticleErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ArticleErrorState = ({ error, onRetry }: ArticleErrorStateProps) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="ml-4"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ArticleErrorState;
