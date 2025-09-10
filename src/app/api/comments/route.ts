import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// 获取评论
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const postSlug = searchParams.get('postSlug')

    if (!postId && !postSlug) {
      return NextResponse.json({ error: 'Post ID or slug is required' }, { status: 400 })
    }

    let targetPostId = postId
    
    // 如果使用slug，先查找对应的postId
    if (postSlug && !postId) {
      const post = await prisma.post.findUnique({
        where: { slug: postSlug },
        select: { id: true }
      })
      
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      
      targetPostId = post.id
    }

    const comments = await prisma.comment.findMany({
      where: { 
        postId: targetPostId!,
        approved: true 
      },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        }
      }
    })

    return NextResponse.json(comments)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

// 创建评论 - 需要昵称和邮箱但无需认证
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, postId, postSlug, authorName, authorEmail } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: '评论内容不能为空' }, { status: 400 })
    }

    if (!authorName?.trim()) {
      return NextResponse.json({ error: '昵称不能为空' }, { status: 400 })
    }

    if (!authorEmail?.trim()) {
      return NextResponse.json({ error: '邮箱不能为空' }, { status: 400 })
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json({ error: '请输入有效的邮箱地址' }, { status: 400 })
    }

    let targetPostId = postId
    
    // 如果使用slug，先查找对应的postId
    if (postSlug && !postId) {
      const post = await prisma.post.findUnique({
        where: { slug: postSlug },
        select: { id: true }
      })
      
      if (!post) {
        return NextResponse.json({ error: '文章不存在' }, { status: 404 })
      }
      
      targetPostId = post.id
    } else if (!postId) {
      return NextResponse.json({ error: '文章ID或slug不能为空' }, { status: 400 })
    }

    // 根据邮箱查找或创建用户
    let user = await prisma.user.findUnique({
      where: { email: authorEmail.trim() }
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: authorName.trim(),
          email: authorEmail.trim(),
          password: 'placeholder_password' // 临时密码，无需登录
        }
      })
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        postId: targetPostId,
        authorId: user.id,
        approved: true
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true }
        }
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch {
    return NextResponse.json({ error: '评论创建失败' }, { status: 500 })
  }
}