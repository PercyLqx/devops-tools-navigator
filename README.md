# 🛠️ DevOps Tools Navigator

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![CI/CD](https://github.com/PercyLqx/devops-tools-navigator/actions/workflows/ci.yml/badge.svg)](https://github.com/PercyLqx/devops-tools-navigator/actions)

> 🚀 一个现代化的 DevOps 工具导航站，收集和整理常用的 DevOps 工具和资源，提供便捷的导航和搜索功能。

## ✨ 核心特性

### 🔍 智能搜索与导航
- **模糊搜索**: 基于 Fuse.js 的智能搜索算法
- **分类浏览**: 按工具类型、技术栈分类展示
- **标签过滤**: 多维度标签筛选系统
- **快速访问**: 键盘快捷键支持

### 🎨 现代化用户体验
- **响应式设计**: 完美适配桌面端、平板和移动设备
- **深色模式**: 护眼的暗色主题支持
- **渐进式 Web 应用**: PWA 支持，离线可用
- **无障碍访问**: 符合 WCAG 2.1 AA 标准

### 🤖 智能 CI/CD 监控系统
- **自动化监控**: 每 5 分钟检查所有 PR 的流水线状态
- **智能告警**: 失败时自动创建详细的跟踪 Issue
- **及时反馈**: 在 PR 中自动评论状态和修复建议
- **生命周期管理**: 自动管理失败 Issue 的完整生命周期
- **数据清理**: 定期清理过期的监控数据

### ⚡ 高性能架构
- **快速加载**: Vite 构建工具，毫秒级热更新
- **代码分割**: 智能的代码分割和懒加载
- **缓存策略**: 多层缓存优化，提升访问速度
- **CDN 加速**: 静态资源 CDN 分发

## 📁 项目结构

```
devops-tools-navigator/
├── 📂 src/                          # 源代码目录
│   ├── 📂 components/               # React 组件
│   │   ├── 📂 common/              # 通用组件
│   │   ├── 📂 layout/              # 布局组件
│   │   └── 📂 tools/               # 工具相关组件
│   ├── 📂 data/                    # 数据文件
│   │   ├── tools.json              # 工具数据
│   │   └── categories.json         # 分类数据
│   ├── 📂 hooks/                   # 自定义 Hooks
│   ├── 📂 types/                   # TypeScript 类型定义
│   ├── 📂 utils/                   # 工具函数
│   └── 📂 styles/                  # 样式文件
├── 📂 .github/                     # GitHub 配置
│   ├── 📂 workflows/               # GitHub Actions 工作流
│   │   ├── ci.yml                  # CI/CD 流水线
│   │   └── pr-monitor.yml          # PR 监控系统
│   └── 📂 scripts/                 # 自动化脚本
│       ├── pr-monitor.js           # PR 监控核心逻辑
│       ├── cleanup-monitor-data.js # 数据清理脚本
│       └── package.json            # 脚本依赖管理
├── 📂 docs/                        # 文档目录
│   └── pr-monitor-guide.md         # PR 监控系统使用指南
├── 📂 public/                      # 静态资源
└── 📄 配置文件
    ├── package.json                # 项目依赖和脚本
    ├── vite.config.ts             # Vite 配置
    ├── tailwind.config.js         # Tailwind CSS 配置
    ├── tsconfig.json              # TypeScript 配置
    └── vercel.json                # Vercel 部署配置
```

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0

### 🛠️ 安装与启动

```bash
# 克隆项目
git clone https://github.com/PercyLqx/devops-tools-navigator.git
cd devops-tools-navigator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 🧪 测试与质量检查

```bash
# 运行单元测试
npm run test

# 运行测试覆盖率检查
npm run test:coverage

# 代码风格检查
npm run lint

# 代码格式化
npm run format

# TypeScript 类型检查
npm run type-check
```

## 🎯 工具收录标准

我们按照以下标准收录 DevOps 工具：

### ✅ 收录条件
- **活跃维护**: 最近 6 个月内有更新
- **社区认可**: GitHub Stars > 100 或广泛使用
- **文档完善**: 具备完整的使用文档
- **开源友好**: 开源或提供免费版本
- **实用性强**: 解决实际 DevOps 场景问题

### 📊 工具分类

| 分类 | 描述 | 示例工具 |
|------|------|----------|
| **容器化** | Docker、Kubernetes 相关 | Docker, K8s, Helm |
| **CI/CD** | 持续集成与持续部署 | Jenkins, GitHub Actions, GitLab CI |
| **监控告警** | 系统监控与告警通知 | Prometheus, Grafana, AlertManager |
| **日志管理** | 日志收集、存储与分析 | ELK Stack, Fluentd, Loki |
| **基础设施** | 基础设施即代码 | Terraform, Ansible, CloudFormation |
| **版本控制** | 代码版本管理系统 | Git, GitLab, Bitbucket |
| **云平台** | 云服务提供商 | AWS, Azure, GCP, 阿里云 |
| **安全扫描** | 安全检测与漏洞扫描 | SonarQube, Snyk, OWASP ZAP |

## 🤖 PR 监控系统

本项目集成了智能的 PR 流水线监控系统，提供全自动化的 CI/CD 状态监控和反馈。

### 🔍 监控功能

- **🔄 持续监控**: 每 5 分钟自动检查所有开放 PR
- **🎯 智能分析**: 自动提取和分析失败日志的关键错误
- **💬 及时反馈**: 在 PR 中自动评论状态更新和修复建议
- **📋 Issue 管理**: 失败时创建跟踪 Issue，成功时自动关闭
- **🧹 数据清理**: 定期清理过期监控数据，保持仓库整洁

### ⚙️ 监控配置

系统支持以下自定义配置：

```yaml
# 监控频率（默认每 5 分钟）
schedule:
  - cron: '*/5 * * * *'

# 清理策略
cleanup:
  issue_max_age: 7 days      # Issue 过期时间
  comment_max_age: 30 days   # 评论过期时间
  max_items_per_run: 50      # 每次处理上限
```

### 📊 监控效果

| 指标 | 效果 |
|------|------|
| **响应时间** | ≤ 5 分钟 |
| **覆盖率** | 100% PR 监控 |
| **准确率** | > 95% 状态识别 |
| **自动化程度** | 完全自动化 |

详细使用指南：[PR 监控系统文档](./docs/pr-monitor-guide.md)

## 🎨 自定义配置

### 🛠️ 添加新工具

1. 编辑 `src/data/tools.json` 文件
2. 按照以下格式添加工具信息：

```json
{
  "id": "tool-unique-id",
  "name": "工具名称",
  "description": "简短描述",
  "category": "工具分类",
  "website": "https://example.com",
  "github": "https://github.com/owner/repo",
  "tags": ["tag1", "tag2"],
  "logo": "/logos/tool-logo.png",
  "featured": false,
  "pricing": "free|freemium|paid",
  "popularity": 5
}
```

### 🎨 主题定制

项目使用 Tailwind CSS，支持高度自定义：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 🌐 国际化支持

项目预留了国际化接口，支持多语言：

```typescript
// src/i18n/locales/zh-CN.ts
export default {
  common: {
    search: '搜索',
    category: '分类',
    filter: '筛选'
  }
}
```

## 📈 性能优化

### ⚡ 核心指标

- **首屏加载**: < 1.5s
- **交互响应**: < 100ms
- **Lighthouse 评分**: > 95
- **包体积**: < 500KB (gzipped)

### 🔧 优化策略

1. **代码分割**: 路由级别的懒加载
2. **图片优化**: WebP 格式 + 响应式图片
3. **缓存策略**: Service Worker + HTTP 缓存
4. **CDN 加速**: 静态资源全球分发
5. **预加载**: 关键资源预加载

## 🚀 部署指南

### 🌍 Vercel 部署（推荐）

1. Fork 本项目到您的 GitHub 账户
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量（如有需要）
4. 自动部署完成

### 🐳 Docker 部署

```bash
# 构建镜像
docker build -t devops-tools-navigator .

# 运行容器
docker run -p 3000:3000 devops-tools-navigator
```

### 📦 静态部署

```bash
# 构建静态文件
npm run build

# 部署 dist 目录到任意静态托管服务
# 如：GitHub Pages, Netlify, Cloudflare Pages
```

### ☁️ 云平台部署

- **AWS**: S3 + CloudFront
- **阿里云**: OSS + CDN
- **腾讯云**: COS + CDN
- **Azure**: Static Web Apps

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 🎯 贡献方式

1. **🔧 功能开发**: 添加新功能或优化现有功能
2. **🐛 问题修复**: 修复 Bug 和性能问题
3. **📝 文档完善**: 改进文档和示例
4. **🛠️ 工具收录**: 提交新的 DevOps 工具
5. **🎨 设计优化**: UI/UX 改进建议
6. **🌐 国际化**: 多语言翻译支持

### 📋 贡献流程

1. **Fork** 项目到您的 GitHub 账户
2. **创建** 功能分支 (`git checkout -b feature/amazing-feature`)
3. **提交** 更改 (`git commit -m 'Add amazing feature'`)
4. **推送** 到分支 (`git push origin feature/amazing-feature`)
5. **创建** Pull Request

### 📏 代码规范

- **ESLint**: 代码风格检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型安全
- **测试覆盖率**: > 80%
- **提交规范**: 使用 [Conventional Commits](https://conventionalcommits.org/)

### 🏷️ 提交消息规范

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型说明**:
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 📊 项目统计

- **工具收录**: 100+ DevOps 工具
- **技术栈**: 15+ 现代前端技术
- **代码质量**: A+ 级别
- **测试覆盖率**: > 85%
- **性能评分**: Lighthouse 95+
- **贡献者**: 欢迎加入我们

## 📞 联系我们

### 🔗 项目链接

- **GitHub**: https://github.com/PercyLqx/devops-tools-navigator
- **在线演示**: https://devops-tools-navigator.vercel.app
- **文档**: https://devops-tools-navigator.vercel.app/docs
- **问题反馈**: https://github.com/PercyLqx/devops-tools-navigator/issues

### 👨‍💻 维护者

- **Percy** - [@PercyLqx](https://github.com/PercyLqx)
  - 邮箱: percyattrt@gmail.com
  - 专业: DevOps 工程师 & 全栈开发

### 💬 社区交流

- **GitHub Discussions**: 技术讨论和问答
- **Issue Tracker**: Bug 报告和功能请求
- **Pull Requests**: 代码贡献和审查

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE) - 查看 LICENSE 文件了解详情。

## 🙏 致谢

感谢以下开源项目和社区的支持：

- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Fuse.js](https://fusejs.io/) - 轻量级模糊搜索库
- [React Router](https://reactrouter.com/) - React 路由管理
- [Heroicons](https://heroicons.com/) - 精美的 SVG 图标集

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=PercyLqx/devops-tools-navigator&type=Date)](https://star-history.com/#PercyLqx/devops-tools-navigator&Date)

---

<div align="center">

**🚀 让 DevOps 工具触手可及 | Made with ❤️ by Percy**

[⭐ Star 这个项目](https://github.com/PercyLqx/devops-tools-navigator) | [🐛 报告问题](https://github.com/PercyLqx/devops-tools-navigator/issues) | [💡 功能建议](https://github.com/PercyLqx/devops-tools-navigator/issues/new)

</div>