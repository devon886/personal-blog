import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">关于我</span>
            关于
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">隐私政策</span>
            隐私
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">联系我</span>
            联系
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2025 栖川闻鹤. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}