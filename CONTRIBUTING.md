# 贡献指南

感谢您考虑为 DevOps Tools Navigator 项目做出贡献！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告和修复 Bug
- ✨ 添加新功能
- 📝 改进文档
- 🛠️ 添加新的 DevOps 工具
- 🎨 改进用户界面
- 🧪 编写测试
- 🔧 优化性能

## 🚀 快速开始

### 1. Fork 项目

点击 GitHub 页面右上角的 "Fork" 按钮，将项目 fork 到你的账户下。

### 2. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/devops-tools-navigator.git
cd devops-tools-navigator
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

## 📋 贡献类型

### 🛠️ 添加新工具

这是最常见的贡献类型。要添加新的 DevOps 工具：

1. 打开 `src/data/tools.ts` 文件
2. 在 `allTools` 数组中添加新的工具对象
3. 确保包含所有必需的字段：

```typescript
{
  id: 'unique-tool-id',              // 必需：唯一标识符
  name: 'Tool Name',                 // 必需：工具名称
  description: '工具的简短描述',        // 必需：简短描述
  longDescription: '详细描述...',     // 可选：详细描述
  category: '工具分类',              // 必需：从现有分类中选择
  type: 'Open Source',              // 必需：工具类型
  icon: '🔧',                       // 必需：emoji 图标
  website: 'https://example.com',   // 可选：官方网站
  github: 'https://github.com/...',// 可选：GitHub 地址
  documentation: 'https://docs...', // 可选：文档地址
  license: 'MIT',                   // 可选：开源许可证
  language: 'JavaScript',          // 可选：主要编程语言
  tags: ['tag1', 'tag2'],           // 必需：相关标签
  features: ['特性1', '特性2'],      // 可选：主要特性
  isPopular: false,                 // 可选：是否为热门工具
  stars: 12.5,                      // 可选：GitHub Stars (k)
  forks: 3.2,                       // 可选：GitHub Forks (k)
  downloads: 100,                   // 可选：下载量 (M)
  contributors: 50,                 // 可选：贡献者数量
  createdAt: '2020-01-01',          // 可选：创建日期
  updatedAt: '2024-01-15'           // 可选：最后更新日期
}
```

#### 工具分类

请从以下现有分类中选择：
- `CI/CD`
- `容器化`
- `监控与日志`
- `基础设施`
- `安全`
- `版本控制`
- `测试`
- `云平台`
- `协作与沟通`

#### 工具类型

- `Open Source` - 开源软件
- `Commercial` - 商业软件
- `Freemium` - 免费基础版 + 付费高级版
- `SaaS` - 软件即服务

### 🐛 报告 Bug

在报告 Bug 之前，请先搜索现有的 Issues 以避免重复。报告 Bug 时请包含：

1. **Bug 描述**：清晰简洁地描述 Bug
2. **重现步骤**：详细的重现步骤
3. **预期行为**：你期望发生什么
4. **实际行为**：实际发生了什么
5. **环境信息**：浏览器版本、操作系统等
6. **截图**：如果适用，请添加截图

### ✨ 添加新功能

在开始开发新功能之前，请先创建一个 Issue 讨论你的想法。这有助于：

- 确保功能符合项目方向
- 避免重复工作
- 获得社区反馈

### 📝 改进文档

文档改进总是受欢迎的！你可以：

- 修复拼写错误
- 改进说明
- 添加示例
- 翻译文档

## 🔄 提交流程

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 2. 进行更改

确保你的代码符合项目规范：

```bash
# 检查代码格式
npm run lint

# 自动修复格式问题
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check

# 运行测试
npm run test
```

### 3. 提交更改

使用清晰的提交信息：

```bash
git add .
git commit -m "✨ Add support for new DevOps tool: ToolName"
```

#### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `✨ feat:` 新功能
- `🐛 fix:` Bug 修复
- `📝 docs:` 文档更新
- `💄 style:` 代码格式修改
- `♻️ refactor:` 代码重构
- `⚡ perf:` 性能优化
- `🧪 test:` 测试相关
- `🔧 chore:` 构建过程或辅助工具的变动

### 4. 推送更改

```bash
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

1. 访问你的 fork 页面
2. 点击 "Compare & pull request"
3. 填写 PR 标题和描述
4. 确保通过所有检查
5. 等待代码审查

## 📋 Pull Request 检查清单

在提交 PR 之前，请确保：

- [ ] 代码通过所有测试
- [ ] 代码符合项目编码规范
- [ ] 添加了必要的测试（如果适用）
- [ ] 更新了相关文档
- [ ] PR 描述清晰，说明了更改内容
- [ ] 链接到相关的 Issue（如果有）

## 🎨 代码规范

### TypeScript

- 使用 TypeScript 进行类型检查
- 优先使用 `interface` 而不是 `type`
- 导出的函数和组件必须有类型定义

### React

- 使用函数组件和 Hooks
- 组件名使用 PascalCase
- 文件名使用 PascalCase（组件）或 camelCase（工具函数）

### 样式

- 使用 Tailwind CSS 进行样式设计
- 避免内联样式，使用 CSS 类
- 响应式设计优先

### 命名规范

- 变量和函数使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 组件使用 PascalCase
- 文件名与组件名保持一致

## 🧪 测试

我们使用 Vitest 和 React Testing Library 进行测试：

```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

### 测试指南

- 为新功能添加测试
- 确保测试覆盖率不降低
- 测试应该简单、清晰、有意义
- 使用描述性的测试名称

## 🤔 需要帮助？

如果你在贡献过程中遇到任何问题：

1. 查看现有的 [Issues](https://github.com/PercyLqx/devops-tools-navigator/issues)
2. 创建新的 Issue 询问
3. 在 Discussions 中提问

## 🏆 贡献者

感谢所有为这个项目做出贡献的人！你的贡献将被记录在项目的 Contributors 列表中。

## 📄 许可证

通过贡献代码，您同意您的贡献将在与项目相同的 [MIT License](LICENSE) 下获得许可。

---

再次感谢您的贡献！🎉