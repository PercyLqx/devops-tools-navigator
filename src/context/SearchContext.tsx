import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Tool } from '@/types'
import { allTools } from '@/data/tools'

interface SearchContextType {
  allTools: Tool[]
  searchResults: Tool[]
  popularTools: Tool[]
  isLoading: boolean
  searchTools: (query: string) => void
  getToolById: (id: string) => Tool | null
  getRelatedTools: (toolId: string, category: string) => Tool[]
  getToolsByCategory: (category: string) => Tool[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

interface SearchProviderProps {
  children: ReactNode
}

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Initialize Fuse instance
  const fuse = useMemo(() => new Fuse(allTools, fuseOptions), [])
  
  // Get popular tools (sorted by stars)
  const popularTools = useMemo(() => {
    return [...allTools]
      .filter(tool => tool.isPopular || (tool.stars && tool.stars > 10))
      .sort((a, b) => (b.stars || 0) - (a.stars || 0))
      .slice(0, 12)
  }, [])
  
  const searchTools = useCallback((query: string) => {
    setIsLoading(true)
    
    // Simulate network delay for better UX
    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([])
      } else {
        const results = fuse.search(query).map(result => result.item)
        setSearchResults(results)
      }
      setIsLoading(false)
    }, 150)
  }, [fuse])
  
  const getToolById = useCallback((id: string): Tool | null => {
    return allTools.find(tool => tool.id === id) || null
  }, [])
  
  const getRelatedTools = useCallback((toolId: string, category: string): Tool[] => {
    return allTools
      .filter(tool => tool.id !== toolId && tool.category === category)
      .slice(0, 6)
  }, [])
  
  const getToolsByCategory = useCallback((category: string): Tool[] => {
    return allTools.filter(tool => tool.category === category)
  }, [])
  
  const value = {
    allTools,
    searchResults,
    popularTools,
    isLoading,
    searchTools,
    getToolById,
    getRelatedTools,
    getToolsByCategory,
  }
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}