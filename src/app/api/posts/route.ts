import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 获取所有文章
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where = {
      published: true,
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { tags: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, name: true, email: true, image: true }
          },
          _count: {
            select: { comments: true }
          }
        }
      }),
      prisma.post.count({ where })
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, category, tags, coverImage, published = false } = body

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 生成slug，支持中文
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\w\s-]+/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || 
      Math.random().toString(36).substring(2, 15);

    // 获取第一个用户作为作者，如果没有则创建匿名作者
    let author = await prisma.user.findFirst();
    if (!author) {
      author = await prisma.user.create({
        data: {
          email: 'anonymous@example.com',
          name: '匿名用户',
          password: '$2b$10$dummy.password.hash'
        }
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        tags: Array.isArray(tags) ? tags.join(',') : (tags || ''),
        coverImage,
        published,
        authorId: author.id
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json({ 
      error: 'Failed to create post',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}