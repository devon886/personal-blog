'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Comment {
  id: string
  content: string
  author: {
    name: string
    email: string
  }
  createdAt: string
}

interface CommentSectionProps {
  postSlug: string
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?postSlug=${postSlug}`)
      const data = await response.json()
      setComments(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }, [postSlug])

  useEffect(() => {
    fetchComments()
  }, [postSlug, fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) return

    setSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
          content: newComment,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setComments([...comments, data])
        setNewComment('')
        setAuthorName('')
        setAuthorEmail('')
      }
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        评论 ({comments.length})
      </h3>

      {/* 评论列表 */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {comment.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-gray-900">{comment.author.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), 'MM月dd日 HH:mm', { locale: zhCN })}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}

        {comments.length === 0 && !loading && (
          <p className="text-gray-500 text-center py-4">暂无评论，快来发表第一条评论吧！</p>
        )}
      </div>

      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
              昵称 *
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="请输入您的昵称"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">
              邮箱 *
            </label>
            <input
              type="email"
              id="authorEmail"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="请输入您的邮箱"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            评论内容 *
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="写下您的评论..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !newComment.trim() || !authorName.trim() || !authorEmail.trim()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {submitting ? '提交中...' : '发表评论'}
        </button>
      </form>
    </div>
  )
}