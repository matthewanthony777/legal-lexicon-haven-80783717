import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import YouTubeEmbed from './YouTubeEmbed';

// Define custom components for ReactMarkdown
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl font-bold mt-8 mb-4", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl font-semibold mt-6 mb-3", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl font-semibold mt-4 mb-2", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("my-4 leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list-disc list-inside my-4 space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("ml-4", className)} {...props} />
  ),
  img: ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const isExternalUrl = src?.startsWith('http') || src?.startsWith('https');
    const imageSrc = isExternalUrl ? src : src?.startsWith('/') ? src : `/${src}`;
    
    return (
      <img 
        src={imageSrc} 
        alt={alt} 
        className={cn("w-full rounded-lg my-4", className)} 
        {...props} 
      />
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm",
        "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary-500",
        "text-[#9b87f5] dark:text-[#D6BCFA]",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mt-4 mb-4 overflow-x-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4",
        "border border-zinc-200 dark:border-zinc-700",
        className
      )}
      {...props}
    />
  ),
};

interface MDXRendererProps {
  content: string;
}

// Custom component to handle YouTube embeds (parse from markdown)
const CustomRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  // Simple pattern to find YouTube embed markers in the content
  // This allows keeping a YouTube embedding capability with the simpler markdown parser
  const youtubePattern = /\<YouTube videoId="([^"]+)"\s*\/\>/g;
  
  // Replace any YouTube tags with placeholders
  const placeholderContent = content.replace(youtubePattern, (match, videoId) => {
    return `YOUTUBE_EMBED_${videoId}_PLACEHOLDER`;
  });

  // Convert Markdown to React components
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown components={components}>
        {placeholderContent}
      </ReactMarkdown>
      
      {/* Add back YouTube embeds */}
      {Array.from(content.matchAll(youtubePattern)).map((match, index) => {
        const videoId = match[1];
        const placeholder = `YOUTUBE_EMBED_${videoId}_PLACEHOLDER`;
        
        // Only render if the placeholder is in the processed content
        if (placeholderContent.includes(placeholder)) {
          return (
            <div key={`youtube-${index}`} id={`youtube-${videoId}`} className="my-6">
              <YouTubeEmbed videoId={videoId} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  if (!content) {
    return <div className="text-red-500 p-4 border border-red-300 rounded">No content provided</div>;
  }

  try {
    return <CustomRenderer content={content} />;
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        Failed to render content. Please check console for details.
      </div>
    );
  }
};

export default MDXRenderer;
