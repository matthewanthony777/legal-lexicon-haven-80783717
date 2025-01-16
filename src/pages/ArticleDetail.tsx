import { useParams } from "react-router-dom";
import { getArticleBySlug } from "@/utils/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MDXRenderer from "@/components/MDXRenderer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-1 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link to="/articles">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isVideoFile = (filename: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isImageFile = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <article className="container mx-auto px-4 py-4 md:py-8 max-w-3xl mt-16 flex-1">
        <Link to="/articles">
          <Button variant="ghost" className="mb-4 md:mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        
        <div className="space-y-4 md:space-y-6">
          {article.coverVideo && isVideoFile(article.coverVideo) && (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <video 
                src={article.coverVideo} 
                controls
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {article.coverImage && isImageFile(article.coverImage) && (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <time className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString()}
              </time>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold">{article.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">By</span>
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags && article.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8 prose dark:prose-invert max-w-none">
            <MDXRenderer content={article.content} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ArticleDetail;