# 分支管理策略

本文档描述了 DevOps Tools Navigator 项目的分支管理策略和工作流程。

## 🌿 分支结构

### 主要分支

```
main (protected)
├── develop (protected)
│   ├── feature/user-authentication
│   ├── feature/tool-comparison
│   ├── feature/advanced-search
│   └── bugfix/search-input-validation
├── release/v1.0.0
└── hotfix/critical-security-fix
```

### 分支说明

| 分支类型 | 命名规范 | 用途 | 生命周期 | 合并目标 |
|---------|----------|------|----------|----------|
| `main` | `main` | 生产环境代码 | 永久 | - |
| `develop` | `develop` | 开发主分支 | 永久 | `main` |
| `feature/*` | `feature/功能名称` | 功能开发 | 临时 | `develop` |
| `bugfix/*` | `bugfix/问题描述` | Bug修复 | 临时 | `develop` |
| `hotfix/*` | `hotfix/紧急修复` | 紧急修复 | 临时 | `main` & `develop` |
| `release/*` | `release/v版本号` | 发布准备 | 临时 | `main` & `develop` |

## 🔄 工作流程

### 1. 功能开发流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/new-awesome-feature

# 2. 开发功能
# ... coding ...

# 3. 提交代码
git add .
git commit -m "✨ feat: add awesome new feature"

# 4. 推送分支
git push origin feature/new-awesome-feature

# 5. 创建 Pull Request
# develop ← feature/new-awesome-feature

# 6. 代码审查通过后合并
# 7. 删除功能分支
git branch -d feature/new-awesome-feature
git push origin --delete feature/new-awesome-feature
```

### 2. Bug修复流程

```bash
# 1. 从 develop 创建修复分支
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-search-issue

# 2. 修复问题
# ... fixing ...

# 3. 提交修复
git add .
git commit -m "🐛 fix: resolve search input validation issue"

# 4. 推送并创建 PR
git push origin bugfix/fix-search-issue
# develop ← bugfix/fix-search-issue
```

### 3. 紧急修复流程

```bash
# 1. 从 main 创建热修复分支
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. 修复紧急问题
# ... fixing ...

# 3. 提交修复
git add .
git commit -m "🚨 hotfix: resolve critical security vulnerability"

# 4. 推送分支
git push origin hotfix/critical-security-fix

# 5. 创建两个 PR
# main ← hotfix/critical-security-fix
# develop ← hotfix/critical-security-fix

# 6. 合并后打标签
git tag -a v1.0.1 -m "Hotfix release v1.0.1"
git push origin v1.0.1
```

### 4. 发布流程

```bash
# 1. 从 develop 创建发布分支
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0

# 2. 准备发布
# - 更新版本号
# - 更新 CHANGELOG
# - 最后的测试和修复

# 3. 提交发布准备
git add .
git commit -m "🔖 release: prepare v1.1.0"

# 4. 推送发布分支
git push origin release/v1.1.0

# 5. 创建 PR 到 main
# main ← release/v1.1.0

# 6. 合并后打标签
git checkout main
git pull origin main
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

# 7. 合并回 develop
# develop ← release/v1.1.0
```

## 🛡️ 分支保护规则

### main 分支保护

- ✅ 禁止直接推送
- ✅ 要求 Pull Request 审查
- ✅ 要求通过状态检查
- ✅ 要求分支为最新状态
- ✅ 要求管理员也遵循规则
- ✅ 限制推送访问

### develop 分支保护

- ✅ 禁止直接推送
- ✅ 要求 Pull Request 审查
- ✅ 要求通过状态检查
- ✅ 要求分支为最新状态

### 状态检查要求

所有保护分支必须通过以下检查：

- ✅ CI/CD Pipeline
- ✅ ESLint 代码检查
- ✅ TypeScript 类型检查
- ✅ 单元测试通过
- ✅ 构建成功
- ✅ 安全扫描通过

## 📋 Pull Request 规范

### PR 标题规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
✨ feat: add user authentication system
🐛 fix: resolve mobile layout issues
📝 docs: update API documentation
♻️ refactor: optimize search performance
🎨 style: improve button hover effects
✅ test: add integration tests for auth
🚀 perf: implement virtual scrolling
🔧 chore: update dependencies
```

### PR 描述模板

```markdown
## 📝 变更说明

简要描述本次变更的内容和目的。

## 🔄 变更类型

- [ ] ✨ 新功能
- [ ] 🐛 Bug 修复
- [ ] 📝 文档更新
- [ ] 🎨 样式调整
- [ ] ♻️ 代码重构
- [ ] ⚡ 性能优化
- [ ] ✅ 测试相关
- [ ] 🔧 构建相关

## 🧪 测试

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成
- [ ] 跨浏览器测试
- [ ] 移动端测试

## 📱 截图/录屏

如果涉及 UI 变更，请提供截图或录屏。

## 🔗 相关链接

- Closes #123
- Related to #456
- [Design Document](link)

## 📋 检查清单

- [ ] 代码符合项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 变更日志已更新
- [ ] 无破坏性变更
- [ ] 已测试向后兼容性
```

### 代码审查清单

#### 功能审查
- [ ] 功能按预期工作
- [ ] 边界情况处理正确
- [ ] 错误处理完善
- [ ] 性能影响可接受

#### 代码质量
- [ ] 代码清晰易读
- [ ] 符合项目规范
- [ ] 没有重复代码
- [ ] 适当的注释

#### 安全性
- [ ] 没有安全漏洞
- [ ] 输入验证正确
- [ ] 敏感信息处理安全

#### 测试
- [ ] 测试覆盖充分
 - [ ] 单元测试
- [ ] 测试用例有意义
- [ ] 测试通过

## 🏷️ 版本标签规范

### 语义化版本控制

遵循 [Semantic Versioning](https://semver.org/) 规范：

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的新功能
- **PATCH**: 向后兼容的问题修复

### 标签命名

```bash
# 正式版本
v1.0.0
v1.2.3
v2.0.0

# 预发布版本
v1.0.0-alpha.1
v1.0.0-beta.2
v1.0.0-rc.1

# 开发版本
v1.0.0-dev.20231201
```

### 创建标签

```bash
# 创建带注释的标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

## 🔧 自动化工具

### Git Hooks

项目使用 husky 和 lint-staged 进行自动化检查：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-push": "npm run type-check && npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

### GitHub Actions

每个 PR 和推送都会触发自动化流程：

1. **代码检查**: ESLint, Prettier, TypeScript
2. **测试运行**: 单元测试和集成测试
3. **构建验证**: 确保代码可以正确构建
4. **安全扫描**: 依赖漏洞检查
5. **部署预览**: 自动部署 PR 预览环境

## 🚨 紧急情况处理

### 生产环境问题

1. **立即评估**: 确定问题严重程度
2. **创建热修复分支**: 从 `main` 分支创建
3. **快速修复**: 最小化变更，只修复问题
4. **紧急部署**: 跳过部分流程，直接部署
5. **事后处理**: 补充测试，更新文档

### 回滚策略

```bash
# 方式1: 使用 Git revert
git revert <commit-hash>
git push origin main

# 方式2: 回退到上一个稳定版本
git checkout <stable-tag>
git checkout -b hotfix/rollback-to-stable
# 创建 PR 合并到 main

# 方式3: 使用部署平台的回滚功能
# Vercel, Netlify 等都支持一键回滚
```

## 📚 相关文档

- [开发指南](DEVELOPMENT.md)
- [贡献指南](CONTRIBUTING.md)
- [部署指南](DEPLOYMENT.md)
- [代码规范](CODE_STYLE.md)

---

有任何分支管理相关的问题，请查看 [GitHub Issues](https://github.com/PercyLqx/devops-tools-navigator/issues) 或创建新的问题。