import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import YouTubeEmbed from './YouTubeEmbed';
import mdxComponents from './mdx-components';
import 'highlight.js/styles/github-dark.css'; // Import a highlight.js theme

// Define custom components for ReactMarkdown
const components = {
  ...mdxComponents,
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
