# 🔍 PR 监控脚本

这个目录包含了 PR 流水线监控系统的核心脚本文件。

## 📁 文件结构

```
.github/scripts/
├── pr-monitor.js              # 主监控脚本
├── cleanup-monitor-data.js    # 数据清理脚本
├── package.json              # 依赖管理文件
└── README.md                 # 本说明文档
```

## 🚀 快速开始

### 本地测试

```bash
# 进入脚本目录
cd .github/scripts

# 安装依赖
npm install

# 设置环境变量
export GITHUB_TOKEN="your_github_token"
export REPOSITORY="owner/repo"
export FORCE_CHECK="true"

# 运行监控脚本
npm run monitor

# 运行清理脚本
npm run cleanup
```

### GitHub Actions 中使用

脚本已经配置在 `.github/workflows/pr-monitor.yml` 中，会自动执行。

## 🔧 脚本说明

### pr-monitor.js

**功能**：
- 监控所有开放 PR 的流水线状态
- 失败时创建跟踪 Issue 并评论
- 成功时关闭相关 Issue 并评论

**输出**：
- `checked_prs`: 检查的 PR 数量
- `failed_pipelines`: 失败的流水线数量
- `successful_pipelines`: 成功的流水线数量
- `created_issues`: 创建的 Issue 数量
- `closed_issues`: 关闭的 Issue 数量

### cleanup-monitor-data.js

**功能**：
- 清理过期的监控 Issue
- 清理关联已关闭 PR 的 Issue
- 可选清理过期评论（默认禁用）

**输出**：
- `processed_items`: 处理的项目数量
- `closed_issues`: 关闭的 Issue 数量
- `deleted_comments`: 删除的评论数量

## 🔑 环境变量

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `GITHUB_TOKEN` | ✅ | GitHub API 访问令牌 |
| `REPOSITORY` | ✅ | 仓库名称 (owner/repo) |
| `FORCE_CHECK` | ❌ | 强制检查模式 (true/false) |

## 🛠️ 自定义配置

### 修改错误提取规则

在 `pr-monitor.js` 中修改 `extractErrorLines` 方法：

```javascript
extractErrorLines(logContent) {
  // 添加自定义错误模式
  const errorPatterns = [
    '##[error]',
    'npm ERR!',
    'FAILED',
    'ERROR',
    '自定义错误模式'  // 添加你的模式
  ];
  
  // ... 其余逻辑
}
```

### 修改清理策略

在 `cleanup-monitor-data.js` 中修改配置：

```javascript
this.config = {
  issueMaxAge: 7 * 24 * 60 * 60 * 1000,    // 修改 Issue 过期时间
  commentMaxAge: 30 * 24 * 60 * 60 * 1000,  // 修改评论过期时间
  maxItemsPerRun: 50                         // 修改处理上限
};
```

## 🐛 调试技巧

### 查看详细日志

```bash
# 启用调试模式
export DEBUG=1
npm run monitor
```

### 测试特定 PR

```javascript
// 在 pr-monitor.js 中添加调试代码
const testPR = await this.octokit.rest.pulls.get({
  owner: this.owner,
  repo: this.repo,
  pull_number: 123  // 指定 PR 编号
});

await this.monitorPR(testPR.data);
```

### 验证权限

```bash
# 检查 Token 权限
curl -H "Authorization: token $GITHUB_TOKEN" \
     https://api.github.com/user
```

## 📊 性能优化

### 限制检查范围

```javascript
// 只检查最近更新的 PR
const { data: prs } = await this.octokit.rest.pulls.list({
  owner: this.owner,
  repo: this.repo,
  state: 'open',
  sort: 'updated',
  per_page: 20  // 限制数量
});
```

### 并发控制

```javascript
// 限制并发处理
const concurrencyLimit = 3;
const chunks = this.chunkArray(prs, concurrencyLimit);

for (const chunk of chunks) {
  await Promise.all(chunk.map(pr => this.monitorPR(pr)));
}
```

## 🚨 错误处理

### 常见错误

1. **Token 权限不足**
   ```
   403 Resource not accessible by personal access token
   ```
   解决：检查 Token 是否有 `repo` 和 `issues:write` 权限

2. **API 限制**
   ```
   403 API rate limit exceeded
   ```
   解决：添加请求间隔或使用更高级别的 Token

3. **网络错误**
   ```
   ECONNRESET
   ```
   解决：添加重试机制

### 错误恢复

```javascript
async function retryOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## 📞 支持

遇到问题？查看：

1. [完整使用指南](../../docs/pr-monitor-guide.md)
2. [GitHub Issues](https://github.com/PercyLqx/devops-tools-navigator/issues)
3. 工作流运行日志

---

**版本**: v1.0.0  
**最后更新**: 2025-01-24