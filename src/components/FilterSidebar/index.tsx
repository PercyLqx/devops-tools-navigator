import { useState } from 'react'
import { Check } from 'lucide-react'
import { toolCategories } from '@/data/categories'
import { cn } from '@/lib/utils'

const toolTypes = ['Open Source', 'Commercial', 'Freemium', 'SaaS']
const popularTags = [
  'CI/CD', '容器', '监控', '自动化', '云', 
  '安全', '测试', 'DevOps', '微服务', 'Kubernetes'
]

export function FilterSidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTypes([])
    setSelectedTags([])
    setShowPopularOnly(false)
  }
  
  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedTags.length > 0 ||
    showPopularOnly
  
  return (
    <div className="card p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          筛选器
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            清除全部
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Popular Filter */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showPopularOnly}
                onChange={(e) => setShowPopularOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                showPopularOnly
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 dark:border-gray-600'
              )}>
                {showPopularOnly && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              只显示热门工具
            </span>
          </label>
        </div>
        
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            分类
          </h4>
          <div className="space-y-2">
            {toolCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    selectedCategories.includes(category.id)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-300'
                  )}>
                    {selectedCategories.includes(category.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({category.toolCount})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Types */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            类型
          </h4>
          <div className="space-y-2">
            {toolTypes.map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    selectedTypes.includes(type)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-300'
                  )}>
                    {selectedTypes.includes(type) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            热门标签
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  'badge text-xs transition-colors',
                  selectedTags.includes(tag)
                    ? 'badge-primary'
                    : 'badge-secondary hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}