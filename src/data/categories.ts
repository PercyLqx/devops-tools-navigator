import { Category } from '@/types'

export const toolCategories: Category[] = [
  {
    id: 'ci-cd',
    name: 'CI/CD',
    description: '持续集成和持续部署工具，自动化构建、测试和部署流程',
    icon: '🔄',
    toolCount: 15
  },
  {
    id: 'container',
    name: '容器化',
    description: '容器化和编排工具，包括 Docker、Kubernetes 等',
    icon: '📦',
    toolCount: 12
  },
  {
    id: 'monitoring',
    name: '监控与日志',
    description: '监控系统性能、日志收集和分析工具',
    icon: '📈',
    toolCount: 18
  },
  {
    id: 'infrastructure',
    name: '基础设施',
    description: '基础设施即代码 (IaC) 和云资源管理工具',
    icon: '🏧',
    toolCount: 10
  },
  {
    id: 'security',
    name: '安全',
    description: 'DevSecOps 相关的安全工具和漏洞扫描',
    icon: '🔒',
    toolCount: 8
  },
  {
    id: 'version-control',
    name: '版本控制',
    description: '代码版本控制和协作开发平台',
    icon: '🔀',
    toolCount: 6
  },
  {
    id: 'testing',
    name: '测试',
    description: '自动化测试、性能测试和质量保证工具',
    icon: '🧪',
    toolCount: 9
  },
  {
    id: 'cloud',
    name: '云平台',
    description: '主流云服务提供商和云原生工具',
    icon: '☁️',
    toolCount: 14
  },
  {
    id: 'collaboration',
    name: '协作与沟通',
    description: '团队协作、项目管理和沟通工具',
    icon: '🤝',
    toolCount: 7
  }
]