
import React from 'react';

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  // Process content to handle custom components and markdown elements
  let processedContent = content;
  
  // Extract and remove front matter if present to avoid rendering it
  processedContent = processedContent.replace(
    /^---\s*[\s\S]*?---\s*/m,
    '' // Remove front matter completely
  );
  
  // Handle YouTube embeds with consistent parsing
  processedContent = processedContent.replace(
    /<YouTube\s+videoId="([^"]+)"[^>]*\/>/g,
    (match, videoId) => {
      return `<div class="youtube-embed-container my-3">
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

  // First, normalize line breaks to prevent unwanted paragraph breaks
  // Join lines that are part of the same paragraph without empty line between them
  processedContent = processedContent.replace(/([^\n])\n([^\n])/g, '$1 $2');

  // Handle code blocks with syntax highlighting - adding proper language tag
  // Preserve exact whitespace and formatting with minimal spacing
  processedContent = processedContent.replace(
    /```([a-z]*)\n([\s\S]*?)\n```/gim,
    (match, language, code) => {
      // Preserve whitespace and properly escape HTML entities
      const cleanedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      // Apply consistent comment highlighting for all languages
      let processedCode = cleanedCode;
      
      // Process Python comments specifically
      if (language === 'python' || language === 'py') {
        processedCode = cleanedCode.replace(
          /(#.+)$/gm, 
          '<span class="code-comment">$1</span>'
        );
      }
      
      // Process JavaScript/TypeScript comments
      if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts') {
        processedCode = processedCode.replace(
          /\/\/(.*)/g, 
          '<span class="code-comment">// $1</span>'
        ).replace(
          /\/\*[\s\S]*?\*\//g,
          match => `<span class="code-comment">${match}</span>`
        );
      }
      
      // Add consistent language indicator with standardized styling
      const langLabel = language ? `<div class="code-language-label">${language}</div>` : '';
      
      return `<div class="code-block-wrapper my-3">
        ${langLabel}
        <pre class="language-${language || 'plaintext'}"><code class="language-${language || 'plaintext'}">${processedCode}</code></pre>
      </div>`;
    }
  );

  // Handle inline code with consistent styling
  processedContent = processedContent.replace(
    /`([^`]+)`/g,
    (match, code) => {
      return `<code class="inline-code">${code}</code>`;
    }
  );

  // Standardized handling for all heading levels with archivo font and improved spacing
  processedContent = processedContent.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-bold mb-3 mt-6 font-archivo">$1</h1>');
  processedContent = processedContent.replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold mb-2 mt-5 font-archivo">$1</h2>');
  processedContent = processedContent.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold mb-2 mt-4 font-archivo">$1</h3>');
  processedContent = processedContent.replace(/^#### (.*$)/gim, '<h4 class="text-lg md:text-xl font-bold mb-2 mt-3 font-archivo">$1</h4>');
  processedContent = processedContent.replace(/^##### (.*$)/gim, '<h5 class="text-base md:text-lg font-bold mb-2 mt-3 font-archivo">$1</h5>');
  processedContent = processedContent.replace(/^###### (.*$)/gim, '<h6 class="text-sm md:text-base font-bold mb-2 mt-3 font-archivo">$1</h6>');

  // Consistent formatting for text styling
  processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Standardized link formatting
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-opacity-80 transition-colors">$1</a>'
  );

  // Lists with improved spacing
  processedContent = processedContent.replace(/^\* (.*$)/gim, '<ul class="list-disc pl-5 mb-2"><li class="mb-1">$1</li></ul>');
  processedContent = processedContent.replace(/^- (.*$)/gim, '<ul class="list-disc pl-5 mb-2"><li class="mb-1">$1</li></ul>');
  processedContent = processedContent.replace(/^\d+\. (.*$)/gim, '<ol class="list-decimal pl-5 mb-2"><li class="mb-1">$1</li></ol>');
  
  // Fix consecutive list items
  processedContent = processedContent.replace(/<\/ul>\s*<ul[^>]*>/g, '');
  processedContent = processedContent.replace(/<\/ol>\s*<ol[^>]*>/g, '');

  // Blockquotes with improved spacing
  processedContent = processedContent.replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-muted italic my-3">$1</blockquote>');

  // Horizontal rules with better spacing
  processedContent = processedContent.replace(/^---$/gim, '<hr class="my-4 border-t border-muted" />');

  // Handle paragraphs with improved spacing (must come last)
  processedContent = processedContent.replace(
    /^([^<].*)\s*$/gim, 
    (match, text) => {
      // Avoid wrapping already processed elements in paragraph tags
      if (text.trim().length > 0 && !text.includes('<')) {
        return `<p class="mb-2 font-roboto">${text}</p>`;
      }
      return match;
    }
  );

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-archivo prose-p:font-roboto prose-pre:p-0 prose-pre:leading-tight markdown-content">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
};

export default MDXRenderer;
