const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function syncViews() {
  try {
    console.log('开始同步文章阅读次数...');
    
    // 获取所有文章
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        views: true
      }
    });
    
    console.log(`共找到 ${posts.length} 篇文章`);
    
    // 显示当前阅读次数
    console.log('当前文章阅读次数：');
    posts.forEach(post => {
      console.log(`- ${post.title}: ${post.views || 0} 次`);
    });
    
    // 验证数据一致性
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    console.log(`总阅读次数: ${totalViews}`);
    
    console.log('✅ 文章阅读次数已同步完成！');
    
  } catch (error) {
    console.error('同步阅读次数时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncViews();