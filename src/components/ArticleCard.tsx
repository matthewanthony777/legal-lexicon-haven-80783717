
import { ArticleMetadata } from "@/types/article";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle } from "lucide-react";

interface ArticleCardProps {
  article: ArticleMetadata;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Helper function to determine if a file is a video
  const isVideoFile = (filename: string) => {
    if (!filename) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  // Helper function to determine if a file is an image
  const isImageFile = (filename: string) => {
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  // Helper function to get the full path
  const getMediaPath = (path: string) => {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  };

  const hasCoverMedia = article.coverVideo || article.coverImage;
  const coverVideo = article.coverVideo && isVideoFile(article.coverVideo) ? getMediaPath(article.coverVideo) : null;
  const coverImage = article.coverImage && isImageFile(article.coverImage) ? getMediaPath(article.coverImage) : null;
  
  // Check if article has minimal required metadata
  const hasMinimalMetadata = article.title && article.title !== 'Untitled Article';
  const warningMessage = hasMinimalMetadata ? null : "This article may have missing or incomplete metadata";

  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-300 ${!hasMinimalMetadata ? 'border-yellow-400' : ''}`}>
      <Link to={`/articles/${article.slug}`}>
        <div className="w-full aspect-video rounded-t-lg overflow-hidden">
          {coverVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={coverVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : coverImage ? (
            <img
              src={coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              {!hasMinimalMetadata ? (
                <div className="flex flex-col items-center text-yellow-500 p-4 text-center">
                  <AlertCircle className="w-8 h-8 mb-2" />
                  <span>Front matter issues</span>
                </div>
              ) : (
                <span className="text-muted-foreground">No preview available</span>
              )}
            </div>
          )}
        </div>
        <CardHeader>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
              {article.title}
              {!hasMinimalMetadata && <span className="text-yellow-500 ml-2">⚠️</span>}
            </h3>
            {warningMessage && (
              <p className="text-xs text-yellow-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {warningMessage}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {article.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {article.tags && article.tags.length > 0 ? (
              article.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">Uncategorized</Badge>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ArticleCard;
