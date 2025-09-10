'use client'

import { useState, useEffect, useCallback } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LikeButtonProps {
  postSlug: string
}

export default function LikeButton({ postSlug }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchLikeStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/likes?postSlug=${postSlug}`)
      const data = await response.json()
      setLiked(data.userLiked || false)
      setLikeCount(data.likes || 0)
    } catch (error) {
      console.error('Failed to fetch like status:', error)
    } finally {
      setLoading(false)
    }
  }, [postSlug])

  useEffect(() => {
    fetchLikeStatus()
  }, [postSlug, fetchLikeStatus])

  const handleLike = async () => {
    // 检查用户是否已登录
    if (status === 'loading') return
    
    if (!session?.user?.email) {
      // 未登录，跳转到登录页面
      router.push('/login?callbackUrl=/posts/' + postSlug)
      return
    }

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setLiked(data.userLiked)
        setLikeCount(data.count)
      } else if (response.status === 401) {
        // 未授权，跳转到登录页面
        router.push('/login?callbackUrl=/posts/' + postSlug)
      }
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
      </div>
    )
  }

  const isAuthenticated = status === 'authenticated'

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handleLike}
        disabled={!isAuthenticated}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
          liked
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : isAuthenticated
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        title={!isAuthenticated ? '请先登录后再点赞' : ''}
      >
        {liked ? (
          <HeartSolidIcon className="h-5 w-5" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
        <span className="font-medium">
          {liked ? '已点赞' : '点赞'}
        </span>
      </button>
      
      <span className="text-gray-600">
        {likeCount} {likeCount === 1 ? '人' : '人'} 觉得赞
      </span>

      {!isAuthenticated && (
        <p className="text-sm text-gray-500">
          <button
            onClick={() => router.push('/login?callbackUrl=/posts/' + postSlug)}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            登录
          </button>
          或
          <button
            onClick={() => router.push('/register?callbackUrl=/posts/' + postSlug)}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            注册
          </button>
          后点赞
        </p>
      )}
    </div>
  )
}