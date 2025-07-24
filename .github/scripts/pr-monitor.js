const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

class PRMonitor {
  constructor() {
    this.octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    this.repository = process.env.REPOSITORY;
    this.forceCheck = process.env.FORCE_CHECK === 'true';
    
    const [owner, repo] = this.repository.split('/');
    this.owner = owner;
    this.repo = repo;
    
    // 统计数据
    this.stats = {
      checkedPRs: 0,
      failedPipelines: 0,
      successfulPipelines: 0,
      createdIssues: 0,
      closedIssues: 0
    };
  }

  async run() {
    try {
      console.log('🔍 开始 PR 流水线监控...');
      console.log(`📁 仓库: ${this.repository}`);
      console.log(`🔄 强制检查: ${this.forceCheck}`);

      // 获取所有开放的 PR
      const prs = await this.getOpenPRs();
      console.log(`📋 找到 ${prs.length} 个开放的 PR`);

      for (const pr of prs) {
        await this.monitorPR(pr);
        this.stats.checkedPRs++;
      }

      await this.outputStats();
      console.log('✅ PR 监控完成');

    } catch (error) {
      console.error('❌ PR 监控失败:', error);
      core.setFailed(error.message);
    }
  }

  async getOpenPRs() {
    const { data: prs } = await this.octokit.rest.pulls.list({
      owner: this.owner,
      repo: this.repo,
      state: 'open',
      per_page: 100
    });
    return prs;
  }

  async monitorPR(pr) {
    console.log(`\n🔎 监控 PR #${pr.number}: ${pr.title}`);

    // 获取 PR 的最新工作流运行状态
    const workflowRuns = await this.getPRWorkflowRuns(pr);
    
    if (workflowRuns.length === 0) {
      console.log(`  ⚠️  PR #${pr.number} 没有工作流运行记录`);
      return;
    }

    const latestRun = workflowRuns[0];
    console.log(`  📊 最新工作流: ${latestRun.name} (${latestRun.status}/${latestRun.conclusion})`);

    // 检查是否需要处理
    if (!this.shouldProcessRun(latestRun)) {
      console.log(`  ⏭️  跳过处理，状态: ${latestRun.status}`);
      return;
    }

    if (latestRun.conclusion === 'failure') {
      await this.handleFailedPipeline(pr, latestRun);
      this.stats.failedPipelines++;
    } else if (latestRun.conclusion === 'success') {
      await this.handleSuccessfulPipeline(pr, latestRun);
      this.stats.successfulPipelines++;
    }
  }

  async getPRWorkflowRuns(pr) {
    const { data: runs } = await this.octokit.rest.actions.listWorkflowRunsForRepo({
      owner: this.owner,
      repo: this.repo,
      head_sha: pr.head.sha,
      per_page: 10,
      status: 'completed'
    });
    
    return runs.workflow_runs.filter(run => 
      run.head_branch === pr.head.ref || 
      run.head_sha === pr.head.sha
    );
  }

  shouldProcessRun(run) {
    // 只处理已完成的工作流
    if (run.status !== 'completed') {
      return false;
    }

    // 强制检查模式下处理所有状态
    if (this.forceCheck) {
      return true;
    }

    // 正常模式下只处理失败和成功的工作流
    return ['failure', 'success'].includes(run.conclusion);
  }

  async handleFailedPipeline(pr, workflowRun) {
    console.log(`  ❌ 处理失败的流水线: ${workflowRun.name}`);

    try {
      // 获取失败日志
      const failureLogs = await this.getFailureLogs(workflowRun);
      
      // 创建或更新 Issue
      const issue = await this.createOrUpdateFailureIssue(pr, workflowRun, failureLogs);
      
      // 在 PR 下评论
      await this.commentOnPR(pr, {
        type: 'failure',
        workflowRun,
        issue,
        failureLogs
      });

      console.log(`  ✅ 已处理失败流水线，Issue #${issue.number}`);

    } catch (error) {
      console.error(`  ❌ 处理失败流水线时出错:`, error);
    }
  }

  async handleSuccessfulPipeline(pr, workflowRun) {
    console.log(`  ✅ 处理成功的流水线: ${workflowRun.name}`);

    try {
      // 查找并关闭相关的失败 Issue
      const closedIssues = await this.closeRelatedFailureIssues(pr);
      
      // 在 PR 下评论成功
      await this.commentOnPR(pr, {
        type: 'success',
        workflowRun,
        closedIssues
      });

      if (closedIssues.length > 0) {
        this.stats.closedIssues += closedIssues.length;
        console.log(`  ✅ 已关闭 ${closedIssues.length} 个相关 Issue`);
      }

    } catch (error) {
      console.error(`  ❌ 处理成功流水线时出错:`, error);
    }
  }

  async getFailureLogs(workflowRun) {
    try {
      console.log(`    📄 获取失败日志...`);
      
      // 获取失败的 job 日志
      const { data: jobs } = await this.octokit.rest.actions.listJobsForWorkflowRun({
        owner: this.owner,
        repo: this.repo,
        run_id: workflowRun.id
      });

      const failedJobs = jobs.jobs.filter(job => job.conclusion === 'failure');
      const logs = [];

      for (const job of failedJobs.slice(0, 3)) { // 最多获取3个失败job的日志
        try {
          const { data: logData } = await this.octokit.rest.actions.downloadJobLogsForWorkflowRun({
            owner: this.owner,
            repo: this.repo,
            job_id: job.id
          });

          // 提取关键错误信息
          const errorLines = this.extractErrorLines(logData);
          logs.push({
            jobName: job.name,
            url: job.html_url,
            errors: errorLines
          });

        } catch (logError) {
          console.warn(`    ⚠️  无法获取 job ${job.name} 的日志:`, logError.message);
        }
      }

      return logs;

    } catch (error) {
      console.warn(`    ⚠️  获取失败日志时出错:`, error.message);
      return [];
    }
  }

  extractErrorLines(logContent) {
    if (!logContent || typeof logContent !== 'string') {
      return ['日志内容不可用'];
    }

    const lines = logContent.split('\n');
    const errorLines = [];
    
    for (let i = 0; i < lines.length && errorLines.length < 10; i++) {
      const line = lines[i];
      if (line.includes('##[error]') || 
          line.includes('ERROR') || 
          line.includes('FAILED') ||
          line.includes('npm ERR!')) {
        errorLines.push(line.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s*/, ''));
      }
    }

    return errorLines.length > 0 ? errorLines : ['未找到具体错误信息'];
  }

  async createOrUpdateFailureIssue(pr, workflowRun, failureLogs) {
    const issueTitle = `🚨 PR #${pr.number} 流水线失败: ${workflowRun.name}`;
    const issueLabel = `pr-${pr.number}-failure`;

    // 查找现有的失败 Issue
    const existingIssue = await this.findExistingFailureIssue(pr);

    const issueBody = this.generateFailureIssueBody(pr, workflowRun, failureLogs);

    if (existingIssue) {
      // 更新现有 Issue
      const { data: updatedIssue } = await this.octokit.rest.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: existingIssue.number,
        title: issueTitle,
        body: issueBody,
        state: 'open'
      });

      console.log(`    🔄 已更新 Issue #${updatedIssue.number}`);
      return updatedIssue;

    } else {
      // 创建新 Issue
      const { data: newIssue } = await this.octokit.rest.issues.create({
        owner: this.owner,
        repo: this.repo,
        title: issueTitle,
        body: issueBody,
        labels: ['ci-failure', 'pr-monitoring', issueLabel]
      });

      this.stats.createdIssues++;
      console.log(`    ✨ 已创建 Issue #${newIssue.number}`);
      return newIssue;
    }
  }

  async findExistingFailureIssue(pr) {
    try {
      const { data: issues } = await this.octokit.rest.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: `pr-${pr.number}-failure`,
        state: 'open'
      });

      return issues.length > 0 ? issues[0] : null;
    } catch (error) {
      console.warn(`    ⚠️  查找现有 Issue 时出错:`, error.message);
      return null;
    }
  }

  generateFailureIssueBody(pr, workflowRun, failureLogs) {
    const timestamp = new Date().toISOString();
    
    let body = `## 🚨 PR 流水线失败报告

**PR 信息**
- **PR**: #${pr.number} - ${pr.title}
- **分支**: \`${pr.head.ref}\` → \`${pr.base.ref}\`
- **作者**: @${pr.user.login}
- **最后更新**: ${timestamp}

**失败的工作流**
- **名称**: ${workflowRun.name}
- **运行 ID**: [${workflowRun.id}](${workflowRun.html_url})
- **提交**: [\`${workflowRun.head_sha.substr(0, 7)}\`](https://github.com/${this.repository}/commit/${workflowRun.head_sha})
- **失败时间**: ${workflowRun.updated_at}

`;

    if (failureLogs.length > 0) {
      body += `## 📋 失败日志摘要\n\n`;
      
      failureLogs.forEach((log, index) => {
        body += `### ${log.jobName}\n`;
        body += `🔗 [查看完整日志](${log.url})\n\n`;
        body += `\`\`\`\n`;
        body += log.errors.slice(0, 5).join('\n');
        body += `\n\`\`\`\n\n`;
      });
    }

    body += `## 🔧 建议修复步骤

1. 📋 检查上述错误日志，定位具体问题
2. 🔍 在本地环境重现问题
3. 🛠️ 修复代码或配置问题
4. 📤 推送修复代码到 PR 分支
5. ✅ 验证 CI/CD 流水线通过

## 🔗 相关链接

- **PR 地址**: ${pr.html_url}
- **工作流详情**: ${workflowRun.html_url}
- **提交详情**: https://github.com/${this.repository}/commit/${workflowRun.head_sha}

---
*此 Issue 由 PR 监控系统自动创建和更新*`;

    return body;
  }

  async closeRelatedFailureIssues(pr) {
    try {
      const { data: issues } = await this.octokit.rest.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: `pr-${pr.number}-failure`,
        state: 'open'
      });

      const closedIssues = [];

      for (const issue of issues) {
        await this.octokit.rest.issues.update({
          owner: this.owner,
          repo: this.repo,
          issue_number: issue.number,
          state: 'closed'
        });

        // 添加关闭评论
        await this.octokit.rest.issues.createComment({
          owner: this.owner,
          repo: this.repo,
          issue_number: issue.number,
          body: `✅ **问题已解决**\n\nPR #${pr.number} 的流水线已通过，自动关闭此 Issue。\n\n_关闭时间: ${new Date().toISOString()}_`
        });

        closedIssues.push(issue);
      }

      return closedIssues;

    } catch (error) {
      console.warn(`    ⚠️  关闭相关 Issue 时出错:`, error.message);
      return [];
    }
  }

  async commentOnPR(pr, context) {
    try {
      let comment = '';

      if (context.type === 'failure') {
        comment = `## 🚨 流水线失败通知

**工作流**: ${context.workflowRun.name}  
**状态**: ❌ 失败  
**运行时间**: ${context.workflowRun.updated_at}

### 📋 失败摘要
${context.failureLogs.map(log => 
  `- **${log.jobName}**: [查看日志](${log.url})`
).join('\n')}

### 🔗 详细信息
- **追踪 Issue**: #${context.issue.number}
- **工作流详情**: [点击查看](${context.workflowRun.html_url})

请查看详细日志修复问题后重新推送代码。`;

      } else if (context.type === 'success') {
        comment = `## ✅ 流水线通过通知

**工作流**: ${context.workflowRun.name}  
**状态**: ✅ 成功  
**运行时间**: ${context.workflowRun.updated_at}

### 🎉 所有检查已通过！

${context.closedIssues.length > 0 ? 
  `已自动关闭 ${context.closedIssues.length} 个相关失败 Issue:\n` +
  context.closedIssues.map(issue => `- #${issue.number}`).join('\n') : 
  '无相关失败 Issue 需要关闭。'
}

PR 已准备好进行代码审查和合并。`;
      }

      await this.octokit.rest.issues.createComment({
        owner: this.owner,
        repo: this.repo,
        issue_number: pr.number,
        body: comment
      });

      console.log(`    💬 已在 PR #${pr.number} 添加评论`);

    } catch (error) {
      console.warn(`    ⚠️  添加 PR 评论时出错:`, error.message);
    }
  }

  async outputStats() {
    console.log('\n📊 监控统计:');
    console.log(`  检查的 PR: ${this.stats.checkedPRs}`);
    console.log(`  失败的流水线: ${this.stats.failedPipelines}`);
    console.log(`  成功的流水线: ${this.stats.successfulPipelines}`);
    console.log(`  创建的 Issue: ${this.stats.createdIssues}`);
    console.log(`  关闭的 Issue: ${this.stats.closedIssues}`);

    // 输出给 GitHub Actions
    core.setOutput('checked_prs', this.stats.checkedPRs);
    core.setOutput('failed_pipelines', this.stats.failedPipelines);
    core.setOutput('successful_pipelines', this.stats.successfulPipelines);
    core.setOutput('created_issues', this.stats.createdIssues);
    core.setOutput('closed_issues', this.stats.closedIssues);
  }
}

// 执行监控
const monitor = new PRMonitor();
monitor.run();