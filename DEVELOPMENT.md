# 开发指南

本文档描述了 DevOps Tools Navigator 项目的开发流程、规范和最佳实践。

## 🏗️ 开发环境设置

### 系统要求

- **Node.js**: >= 16.0.0 (推荐使用 18.x LTS)
- **npm**: >= 8.0.0
- **Git**: >= 2.30.0
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### 环境配置

1. **克隆项目**
   ```bash
   git clone https://github.com/PercyLqx/devops-tools-navigator.git
   cd devops-tools-navigator
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env.local
   # 编辑 .env.local 文件
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 🌿 分支管理策略

### Git Flow 工作流

```
main        ←── 生产环境，只接受来自 develop 的合并
│
develop     ←── 开发主分支，功能开发的集成分支
│
feature/*   ←── 功能开发分支，从 develop 分出，合并回 develop
│
hotfix/*    ←── 紧急修复分支，从 main 分出，合并回 main 和 develop
│
release/*   ←── 发布准备分支，从 develop 分出，合并回 main 和 develop
```

### 分支命名规范

```bash
# 功能开发
feature/user-authentication
feature/tool-comparison
feature/advanced-search

# Bug 修复
bugfix/search-input-error
bugfix/mobile-layout-issue

# 紧急修复
hotfix/security-vulnerability
hotfix/critical-bug-fix

# 发布分支
release/v1.0.0
release/v1.1.0
```

### 分支操作流程

```bash
# 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# 开发完成后推送
git add .
git commit -m "✨ feat: add new feature"
git push origin feature/new-feature

# 创建 Pull Request
# develop ← feature/new-feature
```

## 💻 开发规范

### 代码规范

1. **TypeScript 规范**
   ```typescript
   // ✅ 好的实践
   interface Tool {
     id: string
     name: string
     description: string
   }
   
   const fetchTools = async (): Promise<Tool[]> => {
     // 实现
   }
   
   // ❌ 避免的做法
   const fetchTools = async () => {
     return data as any
   }
   ```

2. **React 组件规范**
   ```tsx
   // ✅ 好的实践
   interface ToolCardProps {
     tool: Tool
     onSelect?: (tool: Tool) => void
   }
   
   export function ToolCard({ tool, onSelect }: ToolCardProps) {
     const handleClick = useCallback(() => {
       onSelect?.(tool)
     }, [tool, onSelect])
     
     return (
       <div className="card" onClick={handleClick}>
         {/* 组件内容 */}
       </div>
     )
   }
   ```

3. **样式规范**
   ```tsx
   // ✅ 使用 Tailwind CSS 类
   <div className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
   
   // ✅ 使用 cn 工具函数处理条件样式
   <div className={cn(
     'base-styles',
     isActive && 'active-styles',
     variant === 'primary' && 'primary-styles'
   )}>
   ```

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能添加
git commit -m "✨ feat: add tool comparison feature"

# Bug 修复
git commit -m "🐛 fix: resolve search input validation issue"

# 文档更新
git commit -m "📝 docs: update README with deployment guide"

# 样式更新
git commit -m "💄 style: improve mobile responsive design"

# 重构
git commit -m "♻️ refactor: optimize search performance"

# 性能优化
git commit -m "⚡ perf: implement virtual scrolling for tool list"

# 测试
git commit -m "✅ test: add unit tests for search functionality"

# 构建相关
git commit -m "🔧 chore: update build dependencies"
```

### 文件命名规范

```
# 组件文件
ToolCard.tsx
SearchBar.tsx
FilterSidebar.tsx

# 页面文件
HomePage.tsx
ToolsPage.tsx
AboutPage.tsx

# 工具函数文件
utils.ts
api.ts
constants.ts

# 类型定义文件
types.ts
interfaces.ts

# 样式文件
index.css
components.css
```

## 🧪 测试规范

### 测试类型

1. **单元测试**
   ```typescript
   // src/__tests__/utils.test.ts
   import { formatNumber } from '@/lib/utils'
   
   describe('formatNumber', () => {
     it('should format numbers correctly', () => {
       expect(formatNumber(1234)).toBe('1.2K')
       expect(formatNumber(1234567)).toBe('1.2M')
     })
   })
   ```

2. **组件测试**
   ```typescript
   // src/__tests__/components/ToolCard.test.tsx
   import { render, screen, fireEvent } from '@testing-library/react'
   import { ToolCard } from '@/components/ToolCard'
   
   const mockTool = {
     id: 'test-tool',
     name: 'Test Tool',
     description: 'Test description'
   }
   
   describe('ToolCard', () => {
     it('should render tool information', () => {
       render(<ToolCard tool={mockTool} />)
       expect(screen.getByText('Test Tool')).toBeInTheDocument()
     })
   })
   ```

3. **集成测试**
   ```typescript
   // 测试页面级别的功能
   describe('Tools Page', () => {
     it('should filter tools by category', async () => {
       // 测试实现
     })
   })
   ```

### 测试命令

```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

### 测试覆盖率要求

- **函数覆盖率**: >= 80%
- **语句覆盖率**: >= 80%
- **分支覆盖率**: >= 70%
- **行覆盖率**: >= 80%

## 🔧 开发工具

### VS Code 推荐配置

创建 `.vscode/settings.json`：

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

推荐扩展 `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 调试配置

`.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## 📋 开发任务清单

### 功能开发检查清单

- [ ] 功能设计和API定义
- [ ] TypeScript 类型定义
- [ ] 组件实现
- [ ] 样式实现（响应式）
- [ ] 单元测试编写
- [ ] 集成测试编写
- [ ] 文档更新
- [ ] 性能测试
- [ ] 无障碍测试
- [ ] 跨浏览器测试

### 代码审查检查清单

- [ ] 代码符合项目规范
- [ ] TypeScript 类型安全
- [ ] 没有控制台错误或警告
- [ ] 测试覆盖率满足要求
- [ ] 性能没有明显下降
- [ ] 无障碍性符合标准
- [ ] 文档已更新
- [ ] 没有硬编码的配置
- [ ] 错误处理完善
- [ ] 安全性检查通过

## 🚀 性能优化

### 代码分割

```typescript
// 路由级别的代码分割
const HomePage = lazy(() => import('@/pages/HomePage'))
const ToolsPage = lazy(() => import('@/pages/ToolsPage'))

// 组件级别的代码分割
const HeavyComponent = lazy(() => import('@/components/HeavyComponent'))
```

### 优化技巧

1. **使用 useMemo 和 useCallback**
   ```typescript
   const filteredTools = useMemo(() => {
     return tools.filter(tool => tool.category === selectedCategory)
   }, [tools, selectedCategory])
   
   const handleSearch = useCallback((query: string) => {
     // 搜索逻辑
   }, [])
   ```

2. **虚拟化长列表**
   ```typescript
   import { FixedSizeList as List } from 'react-window'
   
   const VirtualizedToolList = ({ tools }) => (
     <List
       height={600}
       itemCount={tools.length}
       itemSize={120}
     >
       {({ index, style }) => (
         <div style={style}>
           <ToolCard tool={tools[index]} />
         </div>
       )}
     </List>
   )
   ```

3. **图片优化**
   ```typescript
   // 使用 next/image 或 类似的优化组件
   <img
     src={tool.logo}
     alt={tool.name}
     loading="lazy"
     width={64}
     height={64}
   />
   ```

## 🤔 常见问题

### Q: 如何添加新的工具分类？

A: 在 `src/data/categories.ts` 中添加新分类，并更新相关的类型定义。

### Q: 如何自定义主题？

A: 修改 `tailwind.config.js` 中的颜色配置，或在 `src/index.css` 中添加自定义样式。

### Q: 如何添加新的搜索过滤器？

A: 在 `SearchContext` 中添加新的过滤逻辑，并在 `FilterSidebar` 组件中添加对应的UI。

### Q: 如何处理多语言支持？

A: 推荐使用 `react-i18next` 库，详细配置参考国际化最佳实践。

---

更多问题请查看 [GitHub Issues](https://github.com/PercyLqx/devops-tools-navigator/issues) 或创建新的问题。