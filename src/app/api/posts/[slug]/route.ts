import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 获取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, name: true, email: true, image: true }
            }
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // 增加浏览量
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

// 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { title, content, excerpt, category, tags, coverImage, published } = body

    const post = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        excerpt,
        category,
        tags,
        coverImage,
        published,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        }
      }
    })

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    await prisma.post.delete({
      where: { slug }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}