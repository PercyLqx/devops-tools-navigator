export interface Tool {
  id: string
  name: string
  description: string
  longDescription?: string
  category: string
  type: 'Open Source' | 'Commercial' | 'Freemium' | 'SaaS'
  icon: string
  website?: string
  github?: string
  documentation?: string
  license?: string
  language?: string
  tags: string[]
  features?: string[]
  isPopular?: boolean
  stars?: number
  forks?: number
  downloads?: number
  contributors?: number
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  toolCount: number
}

export interface FilterOptions {
  categories: string[]
  types: string[]
  tags: string[]
  isPopular?: boolean
}