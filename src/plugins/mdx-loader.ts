import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

function getAllArticlesData(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));

  const articles = fileNames.map(fileName => {
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

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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