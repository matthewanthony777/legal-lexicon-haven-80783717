
import path from 'path';
import fs from 'fs';

/**
 * Processes markdown content by normalizing line breaks and preserving
 * code blocks for proper MDX rendering
 */
export function processMarkdown(content: string): string {
  // Extract and remove front matter if present
  content = content.replace(/^---\s*[\s\S]*?---\s*/m, '');
  
  // Normalize line breaks - join lines that are part of the same paragraph
  content = content.replace(/([^\n])\n([^\n])/g, '$1 $2');
  
  // YouTube embeds with consistent parsing
  content = content.replace(
    /<YouTube\s+videoId="([^"]+)"[^>]*\/>/g,
    (match, videoId) => {
      return `<YouTube videoId="${videoId}" />`;
    }
  );
  
  return content;
}
