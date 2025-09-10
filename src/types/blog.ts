export interface Author {
  name: string;
  avatar: string;
  bio: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  publishedAt: Date;
  updatedAt: Date;
  category: string;
  tags: string; // Prisma schema中是字符串，需要解析为数组
  author: {
    name: string;
    email: string;
    avatar: string | null;
  };
  views: number;
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export interface SearchFilters {
  query: string;
  category: string;
  tags: string[];
  sortBy: 'latest' | 'oldest' | 'popular';
}