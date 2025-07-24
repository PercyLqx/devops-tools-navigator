import { Link } from 'react-router-dom'
import { Search, ArrowRight, Star, Users, Zap } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { toolCategories } from '@/data/categories'
import { featuredTools } from '@/data/tools'

export function HomePage() {
  const { popularTools } = useSearch()

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🛠️</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  DevOps Navigator
                </span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                发现最佳的 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                  DevOps 工具
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                收集和整理常用的 DevOps 工具和资源，提供便捷的导航和搜索功能。<br />
                帮助开发者和运维人员快速找到所需的工具。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link
                to="/tools"
                className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center space-x-2"
              >
                <span>浏览工具</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary px-8 py-3 text-lg font-semibold"
              >
                了解更多
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  100+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  精选工具
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  12
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  工具分类
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  持续更新
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              工具分类
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              按照不同的 DevOps 阶段和功能分类，快速找到你需要的工具
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category) => (
              <Link
                key={category.id}
                to={`/tools?category=${category.id}`}
                className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.toolCount} 个工具
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              热门工具
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              为你精选的热门和实用的 DevOps 工具
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 6).map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="badge-primary">{tool.category}</span>
                      {tool.isPopular && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{tool.type}</span>
                  {tool.stars && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{tool.stars}k</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/tools"
              className="btn-primary px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>查看所有工具</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              为什么选择我们
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              我们致力于为 DevOps 工作者提供最优质的工具导航服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                智能搜索
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                强大的搜索功能，支持模糊匹配和多维度筛选，让你快速找到所需工具。
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
                由社区成员共同维护和更新，保证内容的实时性和准确性。
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
                我们会持续跟踪最新的 DevOps 趋势，及时添加新的工具和技术。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}