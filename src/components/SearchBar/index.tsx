import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchResults, searchTools } = useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    inputRef.current?.focus()

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    searchTools(searchQuery)
  }

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`)
    handleClose()
  }

  const handleViewAll = () => {
    navigate(`/tools?search=${encodeURIComponent(query)}`)
    handleClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-4 top-20 mx-auto max-w-2xl">
        <div
          className={cn(
            'card transform transition-all duration-200',
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-4 opacity-0 scale-95'
          )}
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索 DevOps 工具..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500"
            />
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query && searchResults.length > 0 && (
              <div className="p-2">
                <div className="mb-2 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  搜索结果 ({searchResults.length})
                </div>
                {searchResults.slice(0, 6).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-sm">{tool.icon}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {tool.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </button>
                ))}
                {searchResults.length > 6 && (
                  <button
                    onClick={handleViewAll}
                    className="w-full p-3 text-center text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    查看全部 {searchResults.length} 个结果
                  </button>
                )}
              </div>
            )}

            {query && searchResults.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-gray-500 dark:text-gray-400 mb-2">
                  没有找到相关工具
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  试试使用其他关键词进行搜索
                </div>
              </div>
            )}

            {!query && (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <div className="text-gray-500 dark:text-gray-400 mb-2">
                  搜索 DevOps 工具
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  输入关键词来查找工具
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}