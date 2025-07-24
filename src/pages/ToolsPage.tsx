import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Grid, List, SortAsc } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { ToolCard } from '@/components/ToolCard'
import { FilterSidebar } from '@/components/FilterSidebar'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'popularity' | 'category' | 'updated'

export function ToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [showFilters, setShowFilters] = useState(false)
  
  const { allTools, searchResults, searchTools, isLoading } = useSearch()
  
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || ''
  
  useEffect(() => {
    if (initialSearch) {
      searchTools(initialSearch)
    }
  }, [initialSearch, searchTools])
  
  const displayTools = initialSearch ? searchResults : allTools
  
  const handleSearchChange = (query: string) => {
    if (query) {
      setSearchParams({ search: query })
      searchTools(query)
    } else {
      setSearchParams({})
      searchTools('')
    }
  }
  
  const sortedTools = [...displayTools].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'popularity':
        return (b.stars || 0) - (a.stars || 0)
      case 'category':
        return a.category.localeCompare(b.category)
      case 'updated':
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      default:
        return 0
    }
  })
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              DevOps 工具导航
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              发现和探索最优秀的 DevOps 工具和资源
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="搜索工具名称、描述或标签..."
              defaultValue={initialSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input w-full pl-12"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'btn-secondary inline-flex items-center space-x-2',
                  showFilters && 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                )}
              >
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input w-auto min-w-[120px]"
              >
                <option value="popularity">热门度</option>
                <option value="name">名称</option>
                <option value="category">分类</option>
                <option value="updated">更新时间</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                共 {sortedTools.length} 个工具
              </span>
              
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 rounded transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 rounded transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <FilterSidebar />
            </div>
          )}
          
          {/* Tools Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">加载中...</p>
              </div>
            ) : sortedTools.length > 0 ? (
              <div className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              )}>
                {sortedTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  {initialSearch ? '没有找到相关工具' : '暂无工具数据'}
                </div>
                {initialSearch && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="btn-primary"
                  >
                    查看所有工具
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}