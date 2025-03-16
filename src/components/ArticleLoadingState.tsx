
import { Loader2 } from "lucide-react";

const ArticleLoadingState = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading articles...</p>
      </div>
      
      {/* Article card shimmer loading effect */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted animate-pulse rounded" />
                <div className="h-3 bg-muted animate-pulse rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleLoadingState;
