import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "understanding-contract-law",
    title: "Understanding the Basics of Contract Law",
    date: "2024-02-20",
    excerpt: "A comprehensive guide to the fundamental principles of contract law and its practical applications in modern business.",
    content: `
# Understanding the Basics of Contract Law

Contract law is one of the most fundamental areas of legal practice. It governs the formation and enforcement of agreements between parties, whether individuals or organizations.

## What Makes a Valid Contract?

A valid contract requires several essential elements:

1. Offer
2. Acceptance
3. Consideration
4. Intention to create legal relations
5. Capacity to contract

## Why Contract Law Matters

Contract law provides the framework for virtually all business transactions...
    `,
    tags: ["Contracts", "Business Law", "Legal Basics"]
  },
  {
    slug: "intellectual-property-rights",
    title: "A Guide to Intellectual Property Rights",
    date: "2024-02-18",
    excerpt: "Explore the different types of intellectual property protection and how they can benefit your business.",
    content: `
# A Guide to Intellectual Property Rights

Intellectual property (IP) rights are crucial for protecting creative and innovative work in today's digital age.

## Types of IP Protection

There are several main types of IP protection:

1. Patents
2. Trademarks
3. Copyrights
4. Trade Secrets

## Why IP Protection Matters

In today's knowledge-based economy...
    `,
    tags: ["Intellectual Property", "Business Law", "Innovation"]
  }
];

export async function getArticle(slug: string): Promise<Article | undefined> {
  return articles.find(article => article.slug === slug);
}

export async function getAllArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return articles.filter(article => article.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}