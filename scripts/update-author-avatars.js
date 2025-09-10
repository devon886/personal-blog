const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAuthorAvatars() {
  try {
    console.log('开始更新所有用户的头像...');
    
    // 更新所有用户的头像为指定路径
    const result = await prisma.user.updateMany({
      where: {}, // 更新所有用户
      data: {
        image: '/images/touxiang.jpg'
      }
    });

    console.log(`成功更新了 ${result.count} 个用户的头像`);
    
    // 验证更新结果
    const updatedUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    });
    
    console.log('更新后的用户列表：');
    updatedUsers.forEach(user => {
      console.log(`- ${user.name || '匿名用户'} (${user.email}): ${user.image}`);
    });
    
  } catch (error) {
    console.error('更新头像时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAuthorAvatars();