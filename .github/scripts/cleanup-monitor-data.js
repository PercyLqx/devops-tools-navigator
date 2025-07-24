const core = require('@actions/core');
const github = require('@actions/github');

class MonitorDataCleanup {
  constructor() {
    this.octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    this.repository = process.env.REPOSITORY;
    
    const [owner, repo] = this.repository.split('/');
    this.owner = owner;
    this.repo = repo;
    
    // 清理配置
    this.config = {
      // 关闭超过 7 天的监控 Issue
      issueMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 天（毫秒）
      // 删除超过 30 天的监控评论（可选，谨慎使用）
      commentMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 天（毫秒）
      // 每次最多处理的项目数量
      maxItemsPerRun: 50
    };

    this.stats = {
      closedIssues: 0,
      deletedComments: 0,
      processedItems: 0
    };
  }

  async run() {
    try {
      console.log('🧹 开始清理监控数据...');
      console.log(`📁 仓库: ${this.repository}`);

      // 清理过期的监控 Issue
      await this.cleanupStaleIssues();

      // 可选：清理过期的监控评论（默认禁用）
      // await this.cleanupStaleComments();

      await this.outputStats();
      console.log('✅ 监控数据清理完成');

    } catch (error) {
      console.error('❌ 监控数据清理失败:', error);
      core.setFailed(error.message);
    }
  }

  async cleanupStaleIssues() {
    console.log('\n🔍 清理过期的监控 Issue...');

    try {
      // 获取带有监控标签的开放 Issue
      const { data: issues } = await this.octokit.rest.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: 'pr-monitoring',
        state: 'open',
        per_page: this.config.maxItemsPerRun
      });

      console.log(`📋 找到 ${issues.length} 个监控相关的开放 Issue`);

      const now = new Date();
      const staleIssues = [];

      for (const issue of issues) {
        const issueAge = now - new Date(issue.updated_at);
        
        // 检查 Issue 是否过期
        if (issueAge > this.config.issueMaxAge) {
          staleIssues.push(issue);
          continue;
        }

        // 检查关联的 PR 是否仍然开放
        const prNumber = this.extractPRNumber(issue);
        if (prNumber) {
          const isStale = await this.isPRStale(prNumber);
          if (isStale) {
            staleIssues.push(issue);
          }
        }

        this.stats.processedItems++;
      }

      console.log(`📊 发现 ${staleIssues.length} 个需要清理的 Issue`);

      // 关闭过期的 Issue
      for (const issue of staleIssues) {
        await this.closeStaleIssue(issue);
        this.stats.closedIssues++;
      }

    } catch (error) {
      console.error('❌ 清理 Issue 时出错:', error);
    }
  }

  async closeStaleIssue(issue) {
    try {
      const reason = this.getCloseReason(issue);
      
      // 添加关闭说明评论
      await this.octokit.rest.issues.createComment({
        owner: this.owner,
        repo: this.repo,
        issue_number: issue.number,
        body: `🧹 **自动清理通知**

${reason}

此 Issue 已被自动关闭。如果问题仍然存在，请重新打开或创建新的 Issue。

_清理时间: ${new Date().toISOString()}_`
      });

      // 关闭 Issue
      await this.octokit.rest.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: issue.number,
        state: 'closed',
        labels: [...(issue.labels.map(l => l.name)), 'auto-closed']
      });

      console.log(`  ✅ 已关闭 Issue #${issue.number}: ${issue.title}`);

    } catch (error) {
      console.error(`  ❌ 关闭 Issue #${issue.number} 时出错:`, error.message);
    }
  }

  getCloseReason(issue) {
    const prNumber = this.extractPRNumber(issue);
    const issueAge = new Date() - new Date(issue.updated_at);
    const daysSinceUpdate = Math.floor(issueAge / (24 * 60 * 60 * 1000));

    if (prNumber) {
      return `关联的 PR #${prNumber} 已关闭或合并，此监控 Issue 不再需要。`;
    } else if (daysSinceUpdate > 7) {
      return `此 Issue 已超过 ${daysSinceUpdate} 天未更新，可能已过期。`;
    } else {
      return `根据清理策略，此监控 Issue 需要关闭。`;
    }
  }

  extractPRNumber(issue) {
    // 从 Issue 标题或标签中提取 PR 编号
    const titleMatch = issue.title.match(/PR #(\d+)/);
    if (titleMatch) {
      return parseInt(titleMatch[1]);
    }

    // 从标签中提取
    const labelMatch = issue.labels.find(label => label.name.startsWith('pr-'));
    if (labelMatch) {
      const match = labelMatch.name.match(/pr-(\d+)-/);
      if (match) {
        return parseInt(match[1]);
      }
    }

    return null;
  }

  async isPRStale(prNumber) {
    try {
      const { data: pr } = await this.octokit.rest.pulls.get({
        owner: this.owner,
        repo: this.repo,
        pull_number: prNumber
      });

      // PR 已关闭或合并
      return pr.state !== 'open';

    } catch (error) {
      // PR 不存在或无法访问，认为是过期的
      if (error.status === 404) {
        return true;
      }
      console.warn(`  ⚠️  检查 PR #${prNumber} 状态时出错:`, error.message);
      return false;
    }
  }

  async cleanupStaleComments() {
    console.log('\n💬 清理过期的监控评论...');
    console.log('⚠️  此功能默认禁用，如需启用请谨慎考虑');

    // 这个功能可能会删除有用的历史信息，默认禁用
    // 如果需要启用，请仔细测试并确保不会误删重要评论
    
    /*
    try {
      // 获取最近的 Issue 和 PR 评论
      const { data: comments } = await this.octokit.rest.issues.listCommentsForRepo({
        owner: this.owner,
        repo: this.repo,
        per_page: this.config.maxItemsPerRun,
        sort: 'updated',
        direction: 'desc'
      });

      const now = new Date();
      const staleComments = comments.filter(comment => {
        // 只处理由监控系统创建的评论
        if (!comment.body.includes('PR 监控系统') && 
            !comment.body.includes('自动清理通知')) {
          return false;
        }

        const commentAge = now - new Date(comment.updated_at);
        return commentAge > this.config.commentMaxAge;
      });

      console.log(`📊 发现 ${staleComments.length} 个过期的监控评论`);

      for (const comment of staleComments) {
        await this.octokit.rest.issues.deleteComment({
          owner: this.owner,
          repo: this.repo,
          comment_id: comment.id
        });

        this.stats.deletedComments++;
        console.log(`  🗑️  已删除评论 #${comment.id}`);
      }

    } catch (error) {
      console.error('❌ 清理评论时出错:', error);
    }
    */
  }

  async outputStats() {
    console.log('\n📊 清理统计:');
    console.log(`  处理的项目: ${this.stats.processedItems}`);
    console.log(`  关闭的 Issue: ${this.stats.closedIssues}`);
    console.log(`  删除的评论: ${this.stats.deletedComments}`);

    // 输出给 GitHub Actions
    core.setOutput('processed_items', this.stats.processedItems);
    core.setOutput('closed_issues', this.stats.closedIssues);
    core.setOutput('deleted_comments', this.stats.deletedComments);
  }
}

// 执行清理
const cleanup = new MonitorDataCleanup();
cleanup.run();