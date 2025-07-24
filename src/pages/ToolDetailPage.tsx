import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Star, 
  Download, 
  Users, 
  Calendar,
  Tag,
  Heart,
  Share2
} from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { ToolCard } from '@/components/ToolCard'
import { cn } from '@/lib/utils'

export function ToolDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getToolById, getRelatedTools } = useSearch()
  const [isFavorited, setIsFavorited] = useState(false)
  
  const tool = id ? getToolById(id) : null
  const relatedTools = tool ? getRelatedTools(tool.id, tool.category) : []
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            工具不存在
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            抱歉，我们找不到您要查找的工具。
          </p>
          <button
            onClick={() => navigate('/tools')}
            className="btn-primary"
          >
            返回工具列表
          </button>
        </div>
      </div>
    )
  }
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container py-8">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="btn-ghost p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                首页
              </Link>
              <span>/</span>
              <Link to="/tools" className="hover:text-primary-600 dark:hover:text-primary-400">
                工具
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">{tool.name}</span>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Tool Icon & Basic Info */}
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="h-20 w-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">{tool.icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="badge-primary">{tool.category}</span>
                  <span className="badge-secondary">{tool.type}</span>
                  {tool.isPopular && (
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">热门</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4 lg:ml-auto">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={cn(
                  'btn-ghost p-3',
                  isFavorited && 'text-red-500'
                )}
              >
                <Heart className={cn('h-5 w-5', isFavorited && 'fill-current')} />
              </button>
              <button
                onClick={handleShare}
                className="btn-ghost p-3"
              >
                <Share2 className="h-5 w-5" />
              </button>
              {tool.website && (
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>访问官网</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                项目统计
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tool.stars && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tool.stars}k
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Stars</div>
                  </div>
                )}
                {tool.forks && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Github className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tool.forks}k
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
                  </div>
                )}
                {tool.downloads && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Download className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tool.downloads}M
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">下载量</div>
                  </div>
                )}
                {tool.contributors && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-blue-500 mr-1" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tool.contributors}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">贡献者</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            {tool.longDescription && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  详细介绍
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.longDescription}
                  </p>
                </div>
              </div>
            )}
            
            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  主要特性
                </h2>
                <ul className="space-y-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                快速信息
              </h3>
              <div className="space-y-4">
                {tool.license && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">许可证</div>
                    <div className="font-medium text-gray-900 dark:text-white">{tool.license}</div>
                  </div>
                )}
                {tool.language && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">编程语言</div>
                    <div className="font-medium text-gray-900 dark:text-white">{tool.language}</div>
                  </div>
                )}
                {tool.updatedAt && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">最后更新</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {new Date(tool.updatedAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Links */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                相关链接
              </h3>
              <div className="space-y-3">
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>官方网站</span>
                  </a>
                )}
                {tool.github && (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {tool.documentation && (
                  <a
                    href={tool.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>文档</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="badge-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              相关工具
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.slice(0, 3).map((relatedTool) => (
                <ToolCard
                  key={relatedTool.id}
                  tool={relatedTool}
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}