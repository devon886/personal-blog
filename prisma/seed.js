import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始种子数据...');

  // 创建测试用户
  const hashedPassword = await bcrypt.hash('123456', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: '测试用户',
      password: hashedPassword,
      avatar: '/images/default-avatar.png',
      bio: '这是一个测试用户',
    },
  });

  console.log('✅ 创建用户:', user.email);

  // 创建分类
  const categories = [
    { name: '技术', slug: 'technology' },
    { name: '教程', slug: 'tutorial' },
    { name: '项目', slug: 'project' },
    { name: '思考', slug: 'thinking' },
    { name: '生活', slug: 'life' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log('✅ 创建分类:', category.name);
  }

  // 获取所有分类
  const allCategories = await prisma.category.findMany();

  // 创建示例文章
  const posts = [
    {
      title: 'React Hooks 完全指南',
      slug: 'react-hooks-guide',
      excerpt: '深入理解React Hooks的工作原理和最佳实践',
      content: `
        <h2>什么是React Hooks？</h2>
        <p>React Hooks 是 React 16.8 中引入的新特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。</p>
        
        <h3>useState Hook</h3>
        <p>useState 是最常用的 Hook 之一，它让你在函数组件中添加 state。</p>
        
        <pre><code>
        const [count, setCount] = useState(0);
        </code></pre>
        
        <h3>useEffect Hook</h3>
        <p>useEffect Hook 让你在函数组件中执行副作用操作。</p>
        
        <pre><code>
        useEffect(() => {
          document.title = \`You clicked ${count} times\`;
        }, [count]);
        </code></pre>
      `,
      tags: 'react,javascript,hooks',
      coverImage: '/images/react-hooks.jpg',
      categoryId: allCategories[0].id,
      authorId: user.id,
    },
    {
      title: 'Next.js 博客系统开发',
      slug: 'nextjs-blog-development',
      excerpt: '使用Next.js 14构建现代化博客系统的完整教程',
      content: `
        <h2>为什么选择Next.js？</h2>
        <p>Next.js 是一个流行的 React 框架，它提供了许多开箱即用的功能，包括：</p>
        <ul>
          <li>服务端渲染 (SSR)</li>
          <li>静态站点生成 (SSG)</li>
          <li>API路由</li>
          <li>自动代码分割</li>
        </ul>
        
        <h3>项目结构</h3>
        <p>一个典型的Next.js项目结构如下：</p>
        
        <pre><code>
        my-blog/
        ├── pages/
        ├── public/
        ├── styles/
        └── components/
        </code></pre>
      `,
      tags: 'nextjs,javascript,web开发',
      coverImage: '/images/nextjs-blog.jpg',
      categoryId: allCategories[1].id,
      authorId: user.id,
    },
    {
      title: 'Python 数据分析入门',
      slug: 'python-data-analysis',
      excerpt: '从零开始学习Python数据分析，掌握pandas和numpy的核心用法',
      content: `
        <h2>为什么选择Python进行数据分析？</h2>
        <p>Python已经成为数据分析领域的主流语言，主要优势包括：</p>
        <ul>
          <li>丰富的库生态系统</li>
          <li>简洁的语法</li>
          <li>强大的社区支持</li>
          <li>与其他工具的良好集成</li>
        </ul>
        
        <h3>核心库介绍</h3>
        <p><strong>pandas</strong> 是Python数据分析的核心库，提供了高性能、易用的数据结构和数据分析工具。</p>
        
        <pre><code>
        import pandas as pd
        
        # 创建DataFrame
        df = pd.DataFrame({
          'name': ['Alice', 'Bob', 'Charlie'],
          'age': [25, 30, 35]
        })
        </code></pre>
      `,
      tags: 'python,数据分析,pandas',
      coverImage: '/images/python.jpg',
      categoryId: allCategories[0].id,
      authorId: user.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
    console.log('✅ 创建文章:', post.title);
  }

  console.log('🎉 种子数据创建完成！');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });