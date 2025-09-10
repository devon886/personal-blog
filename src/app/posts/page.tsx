import SearchSection from "@/components/blog/SearchSection";
import { prisma } from "@/lib/db";
import { BlogPost } from "@/types/blog";

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
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

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      publishedAt: post.createdAt,
      updatedAt: post.updatedAt,
      category: post.category,
      tags: post.tags,
      author: {
        name: post.author?.name || "匿名作者",
        email: post.author?.email || "",
        avatar: post.author?.image || null,
      },
      views: post.views,
    }));
  } catch (error) {
    console.error("获取文章列表失败:", error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchSection posts={posts} />
    </div>
  );
}