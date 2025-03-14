
import path from 'path';
import fs from 'fs';

/**
 * Processes markdown content by converting markdown syntax to HTML
 * with consistent styling classes
 */
export function processMarkdown(content: string): string {
  // Process code blocks first to prevent other transformations from affecting them
  content = content.replace(/```([a-z]*)\n([\s\S]*?)\n```/gim, (match: string, language: string, code: string) => {
    // Clean code and escape HTML entities while preserving whitespace
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
        (match: string) => `<span class="code-comment">${match}</span>`
      );
    }
    
    // Add language label
    const langLabel = language ? `<div class="code-language-label">${language}</div>` : '';
    
    return `<div class="code-block-wrapper my-6">
      ${langLabel}
      <pre class="language-${language || 'plaintext'}"><code class="language-${language || 'plaintext'}">${processedCode}</code></pre>
    </div>`;
  });
  
  // Inline code
  content = content.replace(/`([^`]+)`/gim, '<code class="inline-code">$1</code>');
  
  // Process headings with consistent classes, spacing and Archivo font
  content = content.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold mb-3 mt-4 font-archivo">$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold mb-3 mt-5 font-archivo">$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-bold mb-4 mt-6 font-archivo">$1</h1>');
  
  // Bold and italic
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // List processing with consistent spacing
  content = content.replace(/^\* (.*$)/gim, '<ul class="list-disc pl-5 mb-3"><li class="mb-1">$1</li></ul>');
  content = content.replace(/^- (.*$)/gim, '<ul class="list-disc pl-5 mb-3"><li class="mb-1">$1</li></ul>');
  content = content.replace(/^\d+\. (.*$)/gim, '<ol class="list-decimal pl-5 mb-3"><li class="mb-1">$1</li></ol>');
  
  // Fix consecutive list items
  content = content.replace(/<\/ul>\s*<ul[^>]*>/g, '');
  content = content.replace(/<\/ol>\s*<ol[^>]*>/g, '');
  
  // Image processing with consistent spacing
  content = content.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" class="w-full rounded-lg my-5" />');
  
  // Links
  content = content.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-opacity-80 transition-colors">$1</a>'
  );
  
  // Blockquotes with consistent spacing
  content = content.replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-muted italic my-4 py-1">$1</blockquote>');
  
  // Horizontal rules with consistent spacing
  content = content.replace(/^---$/gim, '<hr class="my-6 border-t border-muted" />');
  
  // Paragraphs (must come last) with consistent spacing and line height
  content = content.replace(/^([^<].*)\s*$/gim, (match: string, text: string) => {
    if (text.trim().length > 0 && !text.includes('<')) {
      return `<p class="mb-3 font-roboto leading-relaxed">${text}</p>`;
    }
    return match;
  });
  
  // Fix multiple consecutive paragraphs
  content = content.replace(/<\/p>\s*<p>/g, '</p>\n<p>');
  
  return content;
}
