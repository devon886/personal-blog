const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateSiteName() {
  try {
    console.log('开始更新网站名称为 "栖川闻鹤"...');
    
    // 更新或创建站点配置
    const existingConfig = await prisma.siteConfig.findFirst();
    
    if (existingConfig) {
      await prisma.siteConfig.update({
        where: { id: existingConfig.id },
        data: {
          name: '栖川闻鹤',
          description: '栖川闻鹤的个人技术博客，分享前端开发、技术思考和项目经验',
          socialLinks: {
            github: 'https://github.com/Devon886',
            twitter: 'https://twitter.com/your-twitter',
      linkedin: 'https://linkedin.com/in/your-linkedin'
          }
        }
      });
      console.log('✅ 已更新现有站点配置');
    } else {
      await prisma.siteConfig.create({
        data: {
          name: '栖川闻鹤',
          description: '栖川闻鹤的个人技术博客，分享前端开发、技术思考和项目经验',
          socialLinks: {
            github: 'https://github.com/Devon886',
            twitter: 'https://twitter.com/your-twitter',
      linkedin: 'https://linkedin.com/in/your-linkedin'
          }
        }
      });
      console.log('✅ 已创建新的站点配置');
    }
    
    // 验证更新结果
    const updatedConfig = await prisma.siteConfig.findFirst();
    console.log('更新后的配置：', {
      name: updatedConfig?.name,
      title: updatedConfig?.title,
      description: updatedConfig?.description
    });
    
  } catch (error) {
    console.error('更新网站名称时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSiteName();