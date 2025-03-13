
import React from 'react';

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  // Process content to handle custom components and markdown elements
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

  // Handle code blocks with syntax highlighting
  processedContent = processedContent.replace(
    /```([a-z]*)\n([\s\S]*?)\n```/gim,
    (match, language, code) => {
      // Clean up and properly format the code
      const cleanedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\/\/(.*)/g, '<span class="code-comment">// $1</span>');
      
      // Add language indicator if available
      const langLabel = language ? `<div class="code-language-label">${language}</div>` : '';
      
      return `<div class="code-block-wrapper">
        ${langLabel}
        <pre class="language-${language || 'plaintext'}"><code class="language-${language || 'plaintext'}">${cleanedCode}</code></pre>
      </div>`;
    }
  );

  // Handle inline code
  processedContent = processedContent.replace(
    /`([^`]+)`/g,
    (match, code) => {
      return `<code class="inline-code">${code}</code>`;
    }
  );

  // Handle headings (h1, h2, h3, h4, h5, h6)
  processedContent = processedContent.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-bold mb-4 mt-8 font-playfair">$1</h1>');
  processedContent = processedContent.replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold mb-3 mt-6 font-playfair">$1</h2>');
  processedContent = processedContent.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold mb-3 mt-5 font-playfair">$1</h3>');
  processedContent = processedContent.replace(/^#### (.*$)/gim, '<h4 class="text-lg md:text-xl font-bold mb-2 mt-4 font-playfair">$1</h4>');
  processedContent = processedContent.replace(/^##### (.*$)/gim, '<h5 class="text-base md:text-lg font-bold mb-2 mt-4 font-playfair">$1</h5>');
  processedContent = processedContent.replace(/^###### (.*$)/gim, '<h6 class="text-sm md:text-base font-bold mb-2 mt-4 font-playfair">$1</h6>');

  // Handle bold text
  processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic text
  processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Handle links
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-opacity-80 transition-colors">$1</a>'
  );

  // Handle unordered lists
  processedContent = processedContent.replace(/^\* (.*$)/gim, '<ul class="list-disc pl-6 mb-4"><li>$1</li></ul>');
  processedContent = processedContent.replace(/^- (.*$)/gim, '<ul class="list-disc pl-6 mb-4"><li>$1</li></ul>');
  
  // Handle ordered lists
  processedContent = processedContent.replace(/^\d+\. (.*$)/gim, '<ol class="list-decimal pl-6 mb-4"><li>$1</li></ol>');
  
  // Fix consecutive list items
  processedContent = processedContent.replace(/<\/ul>\s*<ul[^>]*>/g, '');
  processedContent = processedContent.replace(/<\/ol>\s*<ol[^>]*>/g, '');

  // Handle blockquotes
  processedContent = processedContent.replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-muted italic my-4">$1</blockquote>');

  // Handle horizontal rules
  processedContent = processedContent.replace(/^---$/gim, '<hr class="my-6 border-t border-muted" />');

  // Handle paragraphs (must come last to avoid interfering with other elements)
  processedContent = processedContent.replace(
    /^([^<].*)\s*$/gim, 
    (match, text) => {
      // Avoid wrapping already processed elements in paragraph tags
      if (text.trim().length > 0 && !text.includes('<')) {
        return `<p class="mb-4 font-playfair">${text}</p>`;
      }
      return match;
    }
  );

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-playfair prose-p:font-playfair">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
};

export default MDXRenderer;
