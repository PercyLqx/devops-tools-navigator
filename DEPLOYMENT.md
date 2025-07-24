# 部署指南

本文档详细说明了 DevOps Tools Navigator 项目的各种部署方式。

## 🚀 快速部署

### Vercel 部署（推荐）

1. **连接 GitHub 仓库**
   ```bash
   # 1. Fork 或克隆项目到你的 GitHub 账户
   # 2. 访问 https://vercel.com
   # 3. 点击 "New Project" 并导入 GitHub 仓库
   ```

2. **环境变量配置**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   VITE_APP_NAME=DevOps Tools Navigator
   VITE_APP_VERSION=1.0.0
   VITE_ENABLE_PWA=true
   VITE_ENABLE_ANALYTICS=true
   ```

3. **自动部署**
   - `main` 分支 → 生产环境
   - `develop` 分支 → 预览环境
   - Pull Request → 预览环境

### Netlify 部署

1. **构建设置**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

2. **环境变量**
   在 Netlify 设置中配置相同的环境变量

3. **重定向规则**
   创建 `public/_redirects` 文件：
   ```
   /*    /index.html   200
   ```

## 🐳 Docker 部署

### 使用 Docker Compose（推荐）

```bash
# 克隆项目
git clone https://github.com/PercyLqx/devops-tools-navigator.git
cd devops-tools-navigator

# 构建并启动
docker-compose up -d

# 访问应用
open http://localhost:3000
```

### 使用 Dockerfile

```bash
# 构建镜像
docker build -t devops-navigator .

# 运行容器
docker run -d -p 3000:80 devops-navigator
```

## ☁️ 云平台部署

### AWS S3 + CloudFront

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传到 S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **配置 CloudFront**
   - 设置默认根对象为 `index.html`
   - 配置错误页面重定向到 `index.html`

### Google Cloud Platform

```bash
# 使用 Google Cloud Build
gcloud builds submit --config cloudbuild.yaml

# 或使用 App Engine
gcloud app deploy
```

### Azure Static Web Apps

1. **GitHub Actions 自动部署**
2. **配置 `staticwebapp.config.json`**

## 🔧 环境配置

### 生产环境变量

```bash
# 必需变量
VITE_APP_NAME="DevOps Tools Navigator"
VITE_APP_VERSION="1.0.0"
VITE_APP_URL="https://your-domain.com"

# 功能开关
VITE_ENABLE_PWA="true"
VITE_ENABLE_ANALYTICS="true"
VITE_ENABLE_ERROR_REPORTING="true"

# 可选：第三方服务
VITE_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
VITE_SENTRY_DSN="https://your-sentry-dsn"
```

### 开发环境

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
echo 'VITE_ENABLE_DEBUG_MODE="true"' >> .env.local
```

## 🔍 部署验证

### 健康检查

```bash
# 检查应用状态
curl -f http://your-domain.com/health

# 检查构建版本
curl http://your-domain.com/api/version
```

### 性能测试

```bash
# 使用 Lighthouse CLI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# 或使用在线工具
# - PageSpeed Insights
# - GTmetrix
# - WebPageTest
```

## 🚨 故障排除

### 常见问题

1. **路由 404 错误**
   - 确保配置了 SPA 重定向规则
   - 检查 `vercel.json` 或 `_redirects` 文件

2. **环境变量未生效**
   - 变量名必须以 `VITE_` 开头
   - 重新构建项目以应用新变量

3. **PWA 不工作**
   - 检查 HTTPS 配置
   - 验证 Service Worker 注册

4. **样式加载失败**
   - 检查 CSP 头配置
   - 验证静态资源路径

### 调试命令

```bash
# 本地预览生产构建
npm run preview

# 分析构建产物
npm run build -- --analyze

# 检查 TypeScript 错误
npm run type-check

# 运行所有检查
npm run lint && npm run type-check && npm run test
```

## 📊 监控与分析

### 推荐监控工具

- **错误监控**: Sentry
- **性能监控**: Vercel Analytics, Google Analytics
- **正常运行时间**: UptimeRobot, Pingdom
- **日志聚合**: LogRocket, FullStory

### 监控配置

```javascript
// 在 main.tsx 中添加
if (import.meta.env.PROD) {
  // 错误监控
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  })
  
  // 性能监控
  gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID)
}
```

## 🔄 CI/CD 流程

### GitHub Actions

项目已配置完整的 CI/CD 流程：

1. **代码检查** - ESLint, Prettier, TypeScript
2. **测试运行** - 单元测试和集成测试
3. **安全扫描** - 依赖漏洞检查
4. **构建验证** - 生产构建测试
5. **自动部署** - Vercel 部署
6. **性能测试** - Lighthouse 检查

### 部署策略

- **Blue-Green 部署**: 零停机部署
- **金丝雀发布**: 渐进式发布
- **回滚机制**: 快速回退到稳定版本

---

如需帮助，请查看 [Issues](https://github.com/PercyLqx/devops-tools-navigator/issues) 或创建新的问题报告。