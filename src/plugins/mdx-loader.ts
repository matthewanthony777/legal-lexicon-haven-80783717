import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const careerInsightsDirectory = path.join(process.cwd(), 'content/career-insights');

function getAllArticlesData(): Article[] {
  const articleFiles = fs.readdirSync(articlesDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));
  
  const careerInsightFiles = fs.readdirSync(careerInsightsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));

  const articles = articleFiles.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.category ? [data.category] : [],
      coverVideo: data.coverVideo,
    } as Article;
  });

  const careerInsights = careerInsightFiles.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(careerInsightsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.category ? [data.category] : [],
      coverVideo: data.coverVideo,
      category: 'career', // Mark as career insight
    } as Article;
  });

  return [...articles, ...careerInsights].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function mdxDataPlugin(): Plugin {
  const virtualModuleId = 'virtual:mdx-data'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-mdx-data',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const articles = getAllArticlesData();
        return `export const articles = ${JSON.stringify(articles)}`
      }
    }
  }
}