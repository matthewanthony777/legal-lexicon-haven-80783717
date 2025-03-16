
import { AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ArticleErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ArticleErrorState = ({ error, onRetry }: ArticleErrorStateProps) => {
  const isGitHubError = error.includes("GitHub") || error.includes("repository");
  
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col">
        <div className="flex justify-between items-start">
          <span>{error}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="ml-4 shrink-0"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
        
        {isGitHubError && (
          <div className="mt-2 text-xs">
            <p>
              To fix this issue, ensure your GitHub repository is correctly configured and accessible.
              {error.includes("rate limit") && " Consider adding a GitHub token to increase rate limits."}
            </p>
            <a 
              href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center mt-1 underline"
            >
              Learn about GitHub tokens
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ArticleErrorState;
