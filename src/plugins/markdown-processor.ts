
import path from 'path';
import fs from 'fs';
import { mdxOptions } from './mdx-config';

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
  
  // Preserve code blocks (don't normalize line breaks within code blocks)
  content = preserveCodeBlocks(content);
  
  return content;
}

/**
 * Helper function to prevent normalization within code blocks
 */
function preserveCodeBlocks(content: string): string {
  // Find all code blocks
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks = content.match(codeBlockRegex) || [];
  
  // Replace code blocks with placeholders
  let processedContent = content;
  const placeholders: { placeholder: string; original: string }[] = [];
  
  codeBlocks.forEach((block, index) => {
    const placeholder = `__CODE_BLOCK_${index}__`;
    placeholders.push({ placeholder, original: block });
    processedContent = processedContent.replace(block, placeholder);
  });
  
  // Restore code blocks
  placeholders.forEach(({ placeholder, original }) => {
    processedContent = processedContent.replace(placeholder, original);
  });
  
  return processedContent;
}
