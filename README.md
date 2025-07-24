# 🛠️ DevOps Tools Navigator

> 收集和整理常用的 DevOps 工具和资源，提供便捷的导航和搜索功能

[![CI/CD Pipeline](https://github.com/PercyLqx/devops-tools-navigator/actions/workflows/ci.yml/badge.svg)](https://github.com/PercyLqx/devops-tools-navigator/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://devops-navigator.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ 特性

- 🔍 **智能搜索** - 支持模糊匹配和多维度筛选
- 🎨 **现代界面** - 响应式设计，支持暗色主题
- 📊 **详细信息** - 每个工具都有详细的介绍和使用指南
- 🚀 **高性能** - 基于 Vite 构建，支持 PWA
- 🌐 **国际化** - 支持中英文界面
- 📱 **移动优先** - 完美适配各种设备

## 🎯 功能

### 工具分类

- **CI/CD** - 持续集成和持续部署工具
- **容器化** - Docker、Kubernetes 等容器技术
- **监控与日志** - 系统监控和日志分析工具
- **基础设施** - 基础设施即代码 (IaC) 工具
- **安全** - DevSecOps 相关安全工具
- **版本控制** - 代码版本控制和协作平台
- **测试** - 自动化测试和质量保证工具
- **云平台** - 主流云服务提供商
- **协作与沟通** - 团队协作和项目管理工具

### 搜索和筛选

- 全文搜索支持
- 按分类筛选
- 按类型筛选（开源/商业/免费/SaaS）
- 按标签筛选
- 热门工具筛选

## 🚀 快速开始

### 在线访问

访问 [DevOps Navigator](https://devops-navigator.vercel.app) 开始使用。

### 本地开发

1. **克隆仓库**

```bash
git clone https://github.com/PercyLqx/devops-tools-navigator.git
cd devops-tools-navigator
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm run dev
```

4. **构建生产版本**

```bash
npm run build
```

5. **预览生产版本**

```bash
npm run preview
```

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router v6
- **搜索**: Fuse.js (模糊搜索)
- **图标**: Lucide React
- **测试**: Vitest + React Testing Library
- **部署**: Vercel
- **CI/CD**: GitHub Actions
- **PWA**: Vite PWA Plugin

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Layout/         # 布局组件
│   ├── SearchBar/      # 搜索组件
│   ├── ToolCard/       # 工具卡片组件
│   └── FilterSidebar/  # 筛选侧边栏
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── ToolsPage.tsx   # 工具列表页
│   ├── ToolDetailPage.tsx # 工具详情页
│   ├── AboutPage.tsx   # 关于页面
│   └── NotFoundPage.tsx # 404页面
├── context/            # React Context
│   ├── ThemeContext.tsx # 主题上下文
│   └── SearchContext.tsx # 搜索上下文
├── data/               # 数据文件
│   ├── tools.ts        # 工具数据
│   └── categories.ts   # 分类数据
├── lib/                # 工具函数
│   └── utils.ts        # 通用工具函数
├── types/              # TypeScript 类型定义
│   └── index.ts        # 类型定义
└── __tests__/          # 测试文件
    └── components/     # 组件测试
```

## 🧪 测试

```bash
# 运行测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

## 🔧 开发脚本

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解如何参与项目。

### 添加新工具

1. 在 `src/data/tools.ts` 中添加工具信息
2. 确保包含必要的字段：`id`, `name`, `description`, `category`, `type`, `icon`, `tags`
3. 可选字段：`website`, `github`, `documentation`, `stars`, `features` 等
4. 提交 Pull Request

### 报告问题

如果您发现了 bug 或有功能建议，请在 [Issues](https://github.com/PercyLqx/devops-tools-navigator/issues) 中报告。

## 📈 路线图

- [ ] 工具对比功能
- [ ] 用户收藏系统
- [ ] 工具评分和评论
- [ ] 学习路径推荐
- [ ] 工具使用统计
- [ ] 多语言支持扩展
- [ ] 移动端原生应用
- [ ] 工具更新通知

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

- 感谢 [Lucide](https://lucide.dev/) 提供漂亮的图标
- 感谢 [Tailwind CSS](https://tailwindcss.com/) 提供优秀的样式框架
- 感谢所有开源工具的维护者们

## 📞 联系我们

- **GitHub**: [@PercyLqx](https://github.com/PercyLqx)
- **Issues**: [项目 Issues](https://github.com/PercyLqx/devops-tools-navigator/issues)
- **邮箱**: 通过 GitHub Issues 联系

---

如果这个项目对你有帮助，请给我们一个 ⭐️ Star！

[Live Demo](https://devops-navigator.vercel.app) | [Issues](https://github.com/PercyLqx/devops-tools-navigator/issues) | [Contributing](CONTRIBUTING.md)