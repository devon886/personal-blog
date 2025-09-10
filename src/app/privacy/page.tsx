import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">隐私政策</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              最后更新时间：2025年9月6日
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. 信息收集与使用</h2>
            <p className="text-gray-600 mb-4">
              栖川闻鹤是一个技术分享博客，我们致力于保护您的隐私。本站目前采用静态博客模式，
              不强制要求用户注册即可浏览所有内容。
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">1.1 评论信息</h3>
            <p className="text-gray-600 mb-4">
              当您对文章发表评论时，我们会收集您主动提供的信息，包括：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>您的昵称（可匿名）</li>
              <li>您的邮箱地址（用于接收回复通知，不会公开显示）</li>
              <li>您的评论内容</li>
              <li>评论时间戳</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">1.2 技术数据</h3>
            <p className="text-gray-600 mb-4">
              当您访问本站时，我们的服务器会自动记录一些技术信息，包括：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>您的IP地址（用于安全防护和统计分析）</li>
              <li>浏览器类型和版本</li>
              <li>操作系统信息</li>
              <li>访问时间和日期</li>
              <li>引荐页面信息</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Cookie政策</h2>
            <p className="text-gray-600 mb-4">
              我们使用必要的Cookie来改善用户体验：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li><strong>会话Cookie</strong>：用于维持您的浏览会话</li>
              <li><strong>偏好设置Cookie</strong>：记住您的显示偏好（如深色模式）</li>
              <li><strong>分析Cookie</strong>：用于统计网站访问量（通过匿名方式）</li>
            </ul>
            <p className="text-gray-600 mb-4">
              我们不会使用Cookie进行跨站跟踪或向第三方出售您的信息。
              您可以通过浏览器设置禁用Cookie，但这可能会影响某些功能的正常使用。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. 数据存储与安全</h2>
            <p className="text-gray-600 mb-4">
              我们使用SQLite数据库存储网站内容：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>评论数据存储在本地SQLite数据库中</li>
              <li>所有数据传输使用HTTPS加密</li>
              <li>定期备份数据以防止丢失</li>
              <li>实施访问控制，防止未授权访问</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. 第三方服务</h2>
            <p className="text-gray-600 mb-4">
              本站使用以下第三方服务，这些服务可能收集额外信息：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li><strong>Vercel</strong>：网站托管服务，可能会收集访问日志</li>
              <li><strong>Next.js</strong>：网站框架，用于性能优化</li>
              <li><strong>TailwindCSS</strong>：样式框架，无数据收集</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. 用户权利</h2>
            <p className="text-gray-600 mb-4">
              根据相关法律法规，您享有以下权利：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li><strong>访问权</strong>：查看我们持有的关于您的个人信息</li>
              <li><strong>更正权</strong>：更新或更正您的个人信息</li>
              <li><strong>删除权</strong>：要求删除您的个人信息</li>
              <li><strong>限制处理权</strong>：限制对您个人信息的处理</li>
              <li><strong>数据可携权</strong>：获取您的个人信息副本</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">5.1 评论管理</h3>
            <p className="text-gray-600 mb-4">
              您可以随时通过以下方式管理您的评论：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>使用相同的邮箱地址发布新评论来更新您的显示名称</li>
              <li>通过联系邮箱请求删除特定评论</li>
              <li>要求导出您发布的所有评论</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. 数据保留期限</h2>
            <p className="text-gray-600 mb-4">
              我们仅在实现收集目的所必需的期限内保留您的个人信息：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>评论信息：保留至文章删除或您主动要求删除</li>
              <li>访问日志：保留30天后自动删除</li>
              <li>技术数据：用于改进网站性能，不用于个人识别</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. 儿童隐私</h2>
            <p className="text-gray-600 mb-4">
              我们的网站不面向13岁以下儿童。如果我们发现收集了13岁以下儿童的个人信息，
              我们将立即删除相关数据。如果您认为我们无意中收集了儿童信息，请立即联系我们。
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. 政策变更</h2>
            <p className="text-gray-600 mb-4">
              我们可能会不时更新本隐私政策。任何变更都会在本页面发布，
              重大变更我们会通过以下方式通知：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>网站首页公告</li>
              <li>重要变更的邮件通知（如适用）</li>
              <li>隐私政策页面顶部的更新提示</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如果您对本隐私政策有任何疑问，或希望行使您的数据权利，请通过以下方式联系我们：
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                <strong>邮箱：</strong>
                <a href="mailto:minecraftlove1902@outlook.com" className="text-blue-600 hover:text-blue-800">
                  minecraftlove1902@outlook.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>响应时间：</strong>我们会在收到您的请求后7个工作日内回复
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                本隐私政策遵循《中华人民共和国个人信息保护法》及相关法律法规制定。
              </p>
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}