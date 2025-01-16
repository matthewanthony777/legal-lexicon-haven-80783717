/// <reference types="vite/client" />

declare module 'virtual:mdx-data' {
  import { Article } from './types/article'
  export const articles: Article[]
}