
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { compile } from '@mdx-js/mdx';
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';
import YouTubeEmbed from './YouTubeEmbed';

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
  YouTube: YouTubeEmbed,
};

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  const [mdxModule, setMdxModule] = useState<any>(null);

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const compiled = await compile(content, {
          outputFormat: 'function-body',
          development: false
        });
        
        const code = String(compiled);
        const func = new Function('React', 'jsx', '_components', '_props', code);
        const module = func(runtime, runtime.jsx, components, {});
        setMdxModule(module);
      } catch (error) {
        console.error('Error compiling MDX:', error);
      }
    };

    compileMDX();
  }, [content]);

  if (!mdxModule) {
    return <div>Loading...</div>;
  }

  const MDXContent = mdxModule.default;

  return (
    <MDXProvider components={components}>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <MDXContent />
      </div>
      <style>
        {`
          .code-block-wrapper {
            margin: 1.5rem 0;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          .code-language-label {
            background: #1a1a1a;
            color: #f8f8f8;
            font-family: monospace;
            font-size: 0.8rem;
            padding: 0.3rem 1rem;
            border-bottom: 1px solid #333;
          }
          pre {
            margin: 0 !important;
            padding: 1rem !important;
            background: #121212 !important;
            border-radius: 0 0 0.5rem 0.5rem;
            overflow-x: auto;
          }
          code {
            font-family: 'Fira Code', Menlo, Monaco, Consolas, monospace;
            font-size: 0.9rem;
            line-height: 1.5 !important;
            white-space: pre !important;
            word-break: normal;
            word-wrap: normal;
          }
          .code-comment {
            color: #6a9955;
            font-style: italic;
          }
          .markdown-content pre code {
            display: block;
            padding: 0;
            overflow-x: auto;
            background: transparent;
          }
          .inline-code {
            font-family: 'Fira Code', Menlo, Monaco, Consolas, monospace;
            background: rgba(30, 30, 30, 0.9);
            color: #e6e6e6;
            border-radius: 0.25rem;
            padding: 0.1rem 0.3rem;
            font-size: 0.9em;
          }
        `}
      </style>
    </MDXProvider>
  );
};

export default MDXRenderer;
