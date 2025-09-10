# 🤝 贡献指南

感谢您对栖川闻鹤博客项目的关注！我们欢迎所有形式的贡献。

## 🚀 如何开始

### 1. Fork 项目
1. 点击右上角的 "Fork" 按钮
2. 将项目克隆到本地：
   ```bash
   git clone https://github.com/yourusername/personal-blog.git
   cd personal-blog
   ```

### 2. 安装依赖
```bash
npm install
```

### 3. 创建功能分支
```bash
git checkout -b feature/your-feature-name
# 或者
git checkout -b fix/issue-description
```

## 📝 提交规范

### 分支命名
- `feature/` - 新功能
- `fix/` - 修复bug
- `docs/` - 文档更新
- `style/` - 代码格式
- `refactor/` - 代码重构
- `test/` - 测试相关

### 提交消息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

示例：
```
feat(posts): 添加文章搜索功能

- 实现全文搜索
- 添加搜索建议
- 优化搜索性能

Closes #123
```

### 类型说明
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 🔍 开发流程

### 1. 代码规范
- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 TypeScript 最佳实践
- 添加必要的注释和文档

### 2. 测试
- 运行测试确保没有破坏现有功能
- 为新功能添加相应的测试
- 确保代码覆盖率不低于80%

```bash
# 运行测试
npm run test

# 运行代码检查
npm run lint

# 检查类型
npm run type-check
```

### 3. 提交前检查
```bash
# 确保所有测试通过
npm run test

# 确保代码格式正确
npm run lint:fix

# 构建项目确保没有错误
npm run build
```

## 🎨 UI/UX 指南

### 设计原则
- **一致性**: 保持界面元素和交互的一致性
- **简洁性**: 避免过度设计，保持界面简洁
- **可访问性**: 遵循WCAG 2.1标准
- **响应式**: 确保在所有设备上都有良好体验

### 组件开发
- 使用 Tailwind CSS 进行样式开发
- 遵循组件化开发原则
- 为组件添加必要的props类型定义
- 提供组件使用示例

## 📚 文档贡献

### 需要文档的内容
- 新功能的说明文档
- API接口文档
- 部署指南更新
- 常见问题解答

### 文档格式
- 使用 Markdown 格式
- 提供中英文版本（如果可能）
- 包含代码示例和截图

## 🐛 报告问题

### Bug报告模板
```markdown
**问题描述**
简要描述遇到的问题

**复现步骤**
1. 第一步
2. 第二步
3. 第三步

**期望行为**
描述期望的结果

**实际行为**
描述实际发生的结果

**环境信息**
- 操作系统: [例如 Windows 11]
- 浏览器: [例如 Chrome 120]
- Node.js版本: [例如 18.17.0]
- 项目版本: [例如 1.0.0]

**截图**
如果适用，添加截图
```

### 功能请求模板
```markdown
**功能描述**
简要描述希望添加的功能

**使用场景**
描述这个功能的使用场景

**预期效果**
描述期望的行为和效果

**替代方案**
如果适用，描述当前的替代方案
```

## 🔄 提交 Pull Request

### 1. 推送分支
```bash
git push origin feature/your-feature-name
```

### 2. 创建 Pull Request
1. 在GitHub上点击 "New Pull Request"
2. 选择你的分支
3. 填写PR模板
4. 等待代码审查

### 3. PR模板
```markdown
## 变更内容
简要描述这次PR的变更内容

## 相关Issues
Fixes #(issue编号)

## 测试说明
- [ ] 本地测试通过
- [ ] 添加/更新了测试用例
- [ ] 文档已更新

## 截图
如果涉及UI变更，请提供截图
```

## 📋 代码审查

### 审查标准
- 代码是否符合项目规范
- 功能是否正常
- 测试是否充分
- 文档是否完整

### 审查流程
1. 至少需要一个维护者批准
2. 所有CI检查必须通过
3. 代码覆盖率不能下降

## 🎯 贡献者奖励

### 贡献者列表
所有贡献者将被添加到项目的贡献者列表中。

### 特别贡献
对于特别重要的贡献，我们将：
- 在README中特别致谢
- 邀请成为项目维护者
- 提供技术支持

## 📞 联系方式

如有任何问题，请通过以下方式联系：

- **Issues**: [GitHub Issues](https://github.com/yourusername/personal-blog/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/personal-blog/discussions)
- **邮箱**: minecraftlove1902@outlook.com

## 📄 许可证

本项目采用 MIT 许可证。通过贡献代码，你同意将你的贡献在相同的许可证下发布。

---

再次感谢你的贡献！让我们一起打造更好的技术博客系统。