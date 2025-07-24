import { Github, Heart, Star, Users, Zap, Target } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-8">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🛠️</span>
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                DevOps Navigator
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              关于我们
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              我们致力于为 DevOps 工作者提供最全面、最实用的工具导航服务，<br />
              帮助您快速找到适合的工具，提高工作效率。
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                我们的使命
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                在快速发展的 DevOps 领域，新工具和技术层出不穷。我们的使命是整理和筛选这些工具，为您提供一个统一的平台来发现、了解和选择最适合的 DevOps 工具。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  精准定位
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  基于实际需求和使用场景，精准分类和推荐最适合的工具。
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  社区驱动
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  欢迎社区成员贡献新工具、更新信息和分享使用经验。
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  持续更新
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  紧跟技术发展趋势，及时更新工具信息和添加新工具。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                产品特性
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                我们不仅仅是一个工具列表，更是一个智能的 DevOps 工具发现平台
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  智能搜索
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  支持模糊匹配、多维度筛选，帮助您快速找到所需工具。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  美观界面
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  现代化的界面设计，支持暗色主题，提供优雅的用户体验。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  详细信息
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  为每个工具提供详细的介绍、特性对比和使用指南。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  快速加载
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  优化的性能，支持 PWA，可以离线使用部分功能。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  实时更新
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  保持工具信息的实时性，及时获取最新的版本和更新。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  开源免费
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  完全开源免费，欢迎社区贡献和反馈。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              开发团队
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12">
              由热爱 DevOps 技术的开发者和运维工程师组成
            </p>
            
            <div className="flex justify-center">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  PercyLqx
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  创始人 & 主要开发者
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/PercyLqx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              加入我们
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              DevOps Navigator 是一个开源项目，我们欢迎所有人的贡献。
              无论是添加新工具、修复 Bug、改进设计，还是提供建议，都是对项目的巨大帮助。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="https://github.com/PercyLqx/devops-tools-navigator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2 px-8 py-3"
              >
                <Github className="h-5 w-5" />
                <span>查看源代码</span>
              </a>
              
              <a
                href="https://github.com/PercyLqx/devops-tools-navigator/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2 px-8 py-3"
              >
                <Heart className="h-5 w-5" />
                <span>反馈问题</span>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                如果您觉得这个项目有用，请在 GitHub 上给我们一个 Star ⭐️
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}