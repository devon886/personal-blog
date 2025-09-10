'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/types/blog';
import { 
  EnvelopeIcon, 
  GlobeAltIcon, 
  CodeBracketIcon,
  ChatBubbleLeftEllipsisIcon 
} from '@heroicons/react/24/outline';

interface AuthorBioProps {
  author: Author;
  postCount?: number;
}

export default function AuthorBio({ author, postCount = 0 }: AuthorBioProps) {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Devon886',
      icon: CodeBracketIcon,
      color: 'hover:text-gray-900'
    },
    {
      name: '抖音',
      href: 'https://www.douyin.com/',
      icon: ChatBubbleLeftEllipsisIcon,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      href: `mailto:${author.social.email}`,
      icon: EnvelopeIcon,
      color: 'hover:text-red-600'
    }
  ].filter(link => link.href);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">关于作者</h3>
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900">{author.name}</h4>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{author.bio}</p>
          
          {postCount > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              已发布 <span className="font-semibold text-indigo-600">{postCount}</span> 篇文章
            </p>
          )}
          
          <div className="mt-4 flex space-x-3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${link.color} transition-colors`}
                title={link.name}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}