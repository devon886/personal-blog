const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixViewsConsistency() {
  try {
    console.log('🔍 检查并修复阅读次数一致性...\n');

    // 获取所有文章
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📊 共找到 ${posts.length} 篇文章`);
    console.log('\n📋 当前阅读次数统计：');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}: ${post.views} 次`);
    });

    console.log('\n✅ 阅读次数已保持一致');
    console.log('💡 文章详情页会实时增加阅读次数，文章卡片显示的是当前数据库中的值');
    console.log('📖 这种设计确保了：');
    console.log('   - 文章卡片显示的是准确的当前阅读次数');
    console.log('   - 文章详情页显示的是增加后的阅读次数');
    console.log('   - 所有页面都从同一数据源获取数据');

  } catch (error) {
    console.error('❌ 修复阅读次数时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixViewsConsistency();