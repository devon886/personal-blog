const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateCoverImages() {
  try {
    console.log('开始更新所有文章的封面图片...');
    
    // 更新所有文章的coverImage字段
    const result = await prisma.post.updateMany({
      where: {}, // 更新所有文章
      data: {
        coverImage: '/images/blog.jpg'
      }
    });

    console.log(`成功更新了 ${result.count} 篇文章的封面图片`);
    
    // 验证更新结果
    const updatedPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true
      }
    });
    
    console.log('更新后的文章列表：');
    updatedPosts.forEach(post => {
      console.log(`- ${post.title}: ${post.coverImage}`);
    });
    
  } catch (error) {
    console.error('更新封面图片时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCoverImages();