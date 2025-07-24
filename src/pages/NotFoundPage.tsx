import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🛠️</div>
          <div className="text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          页面不存在
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          抱歉，我们找不到您要访问的页面。
          该页面可能已被移动、删除或从未存在过。
        </p>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center space-x-2 px-6 py-3"
            >
              <Home className="h-5 w-5" />
              <span>返回首页</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center justify-center space-x-2 px-6 py-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>返回上页</span>
            </button>
          </div>
          
          <div className="pt-4">
            <Link
              to="/tools"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">或者去搜索您需要的工具</span>
            </Link>
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            您可能在找：
          </h3>
          <div className="space-y-2">
            <Link
              to="/tools?category=ci-cd"
              className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              CI/CD 工具
            </Link>
            <Link
              to="/tools?category=container"
              className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              容器化工具
            </Link>
            <Link
              to="/tools?category=monitoring"
              className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              监控工具
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}