import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">联系我</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              感谢您访问我的博客！如果您有任何问题、建议或合作意向，欢迎通过以下方式与我联系。
            </p>

            <div className="grid gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📧 邮箱联系</h3>
                <p className="text-gray-600">
                  您可以发送邮件至：
                  <a 
                    href="mailto:minecraftlove1902@outlook.com" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    minecraftlove1902@outlook.com
                  </a>
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">💬 评论留言</h3>
                <p className="text-gray-600">
                  您也可以在任何文章下方发表评论，我会定期查看并回复。
                  这是与我交流技术问题的最佳方式。
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🤝 合作咨询</h3>
                <p className="text-gray-600">
                  如果您有技术合作、内容创作或项目咨询的需求，
                  欢迎通过邮件详细沟通，我会尽快回复您。
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 社交媒体</h3>
                <p className="text-gray-600 mb-3">
                  您也可以通过以下平台关注我：
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/Devon886" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://www.douyin.com/" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    抖音
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">⚡ 响应时间</h3>
              <p className="text-blue-800">
                我通常会在24小时内回复邮件，周末可能会有延迟。
                对于紧急事项，请在邮件标题中注明【紧急】字样。
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/about" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                了解更多关于我的信息 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}