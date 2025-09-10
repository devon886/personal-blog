'use client';

import Link from 'next/link';

import { Category } from '@/types/blog';

interface CategoryNavProps {
  categories: Category[];
  currentCategory?: string;
}

export default function CategoryNav({ categories, currentCategory }: CategoryNavProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">文章分类</h3>
      
      <nav className="space-y-2">
        <Link
          href="/posts"
          className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            !currentCategory
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>全部文章</span>
          <span className="text-xs text-gray-500">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              currentCategory === category.slug
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`h-2 w-2 rounded-full ${category.color}`} />
              <span>{category.name}</span>
            </div>
            <span className="text-xs text-gray-500">{category.count}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}