
import React from 'react';

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  // Process content to handle custom components
  let processedContent = content;
  
  // Handle YouTube embeds
  processedContent = processedContent.replace(
    /<YouTube\s+videoId="([^"]+)"[^>]*\/>/g,
    (match, videoId) => {
      return `<div class="youtube-embed-container">
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>`;
    }
  );

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-playfair prose-p:font-playfair">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
};

export default MDXRenderer;
