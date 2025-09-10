'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface SearchSectionProps {
  posts: BlogPost[];
}

export default function SearchSection({ posts }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    let filtered = posts;

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter(post => {
        const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        return (
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
          tagsArray.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    }

    // Category filtering
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Tags filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => {
        const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        return selectedTags.every(tag => tagsArray.includes(tag));
      });
    }

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.publishedAt.getTime() - b.publishedAt.getTime();
        default:
          return b.publishedAt.getTime() - a.publishedAt.getTime();
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSortBy('latest');
  };

  return (
    <div className="space-y-6">
      {/* 搜索栏 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 过滤和排序选项 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">筛选选项</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            清除所有
          </button>
        </div>

        <div className="space-y-4">
          {/* 排序 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="latest">最新发布</option>
              <option value="oldest">最早发布</option>
            </select>
          </div>

          {/* 分类 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">全部分类</option>
              <option value="technology">技术</option>
              <option value="life">生活</option>
              <option value="tutorial">教程</option>
              <option value="thinking">思考</option>
              <option value="project">项目</option>
            </select>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'TypeScript', 'Next.js', 'TailwindCSS', 'Node.js'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 搜索结果统计 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          找到 <span className="font-semibold">{filteredPosts.length}</span> 篇文章
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到文章</h3>
          <p className="mt-1 text-sm text-gray-500">请尝试调整搜索条件</p>
        </div>
      )}
    </div>
  );
}