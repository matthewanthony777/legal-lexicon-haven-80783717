
import React from 'react';
import { cn } from "@/lib/utils";

const components = {
  // Preserve whitespace in paragraphs
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ whiteSpace: 'pre-wrap' }} className={cn("my-4 leading-7", className)} {...props} />
  ),
  
  // Custom heading components with anchor links
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl font-bold mt-8 mb-4 scroll-m-20", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl font-semibold mt-6 mb-3 scroll-m-20", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl font-semibold mt-4 mb-2 scroll-m-20", className)} {...props} />
  ),
  
  // Custom code block rendering
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn("code-block mt-4 mb-4 overflow-x-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4", className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const language = className ? className.replace('language-', '') : '';
    return (
      <code 
        className={cn(
          "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
          language ? `language-${language}` : "language-text",
          className
        )}
        {...props}
      />
    );
  },
  
  // Special handling for emphasis and other elements
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("special-text", className)} {...props} />
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
};

export default components;
