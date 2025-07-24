import { Link } from 'react-router-dom'
import { ExternalLink, Github, Star, Calendar } from 'lucide-react'
import { Tool } from '@/types'
import { cn, formatNumber } from '@/lib/utils'

interface ToolCardProps {
  tool: Tool
  viewMode?: 'grid' | 'list'
}

export function ToolCard({ tool, viewMode = 'grid' }: ToolCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center space-x-6">
          {/* Icon */}
          <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{tool.icon}</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link
                  to={`/tools/${tool.id}`}
                  className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {tool.name}
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="badge-primary">{tool.category}</span>
                  <span className="badge-secondary">{tool.type}</span>
                  {tool.isPopular && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                {tool.github && (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {tool.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              {tool.stars && (
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{formatNumber(tool.stars * 1000)}</span>
                </div>
              )}
              {tool.language && (
                <span>• {tool.language}</span>
              )}
              {tool.updatedAt && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(tool.updatedAt).toLocaleDateString('zh-CN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-2xl">{tool.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <Link
            to={`/tools/${tool.id}`}
            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1"
          >
            {tool.name}
          </Link>
          <div className="flex items-center space-x-2 mt-1">
            <span className="badge-primary text-xs">{tool.category}</span>
            {tool.isPopular && (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            )}
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {tool.description}
      </p>
      
      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge-secondary text-xs">
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{tool.type}</span>
          {tool.stars && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{formatNumber(tool.stars * 1000)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {tool.github && (
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3 w-3" />
            </a>
          )}
          {tool.website && (
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}