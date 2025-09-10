import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { formatContent } from "@/lib/utils";
import CommentSection from "@/components/blog/CommentSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      notFound();
    }

    // 增加浏览量
    await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    const tagsArray = post.tags ? post.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">栖川闻鹤</h1>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-lg p-8">
            {post.coverImage && (
              <div className="mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span>{format(post.createdAt, 'yyyy年MM月dd日', { locale: zhCN })}</span>
                <span>阅读 {post.views + 1} 次</span>
              </div>

              {post.author && (
                <div className="flex items-center space-x-4">
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.name || "作者"}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name || "匿名作者"}</p>
                    <p className="text-sm text-gray-600">{post.author.email}</p>
                  </div>
                </div>
              )}
            </header>

            {post.excerpt && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 italic">{post.excerpt}</p>
              </div>
            )}

            <div 
              className="text-gray-800 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {tagsArray.length > 0 && (
              <footer className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </footer>
            )}
          </article>
          
          {/* 评论区域 */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <CommentSection postSlug={slug} />
          </div>
        </main>
        
        <footer className="bg-gray-800 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <p>&copy; 2025 栖川闻鹤. 保留所有权利.</p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
