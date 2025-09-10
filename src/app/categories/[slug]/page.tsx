import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug }
  });
  
  return {
    title: `${category?.name || '分类'} - 栖川闻鹤`,
    description: `浏览${category?.name || ''}分类下的所有技术文章，包括${category?.name || ''}相关的最新内容和学习资源`,
  };
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true }
  });
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug }
  });
  
  if (!category) {
    notFound();
  }

  const categoryPosts = await prisma.post.findMany({
    where: {
      category: category.name
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* 分类头部 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📁</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            探索{category.name}分类下的精彩文章和技术分享
          </p>
          
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              共 {categoryPosts.length} 篇文章
            </span>
          </div>
        </div>

        {/* 文章列表 */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={post.coverImage || '/images/default-cover.jpg'}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</time>
                    <span className="mx-2">•</span>
                    <span>5 分钟阅读</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-indigo-600">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.split(',').slice(0, 3).map((tag) => (
                      <span
                        key={tag.trim()}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
            <p className="text-gray-600">这个分类下还没有文章，敬请期待！</p>
          </div>
        )}

        {/* 返回按钮 */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← 返回分类列表
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}