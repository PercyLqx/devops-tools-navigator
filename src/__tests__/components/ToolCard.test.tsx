import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToolCard } from '../../components/ToolCard'
import { Tool } from '../../types'

const mockTool: Tool = {
  id: 'docker',
  name: 'Docker',
  description: '平台，用于开发、交付和运行应用程序',
  category: '容器化',
  type: 'Freemium',
  icon: '🐳',
  website: 'https://www.docker.com/',
  github: 'https://github.com/docker',
  tags: ['容器', '虚拟化', '微服务'],
  isPopular: true,
  stars: 68.5,
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ToolCard', () => {
  it('renders tool information correctly', () => {
    renderWithRouter(<ToolCard tool={mockTool} />)
    
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('容器化')).toBeInTheDocument()
    expect(screen.getByText('Freemium')).toBeInTheDocument()
    expect(screen.getByText('🐳')).toBeInTheDocument()
  })

  it('renders in grid view by default', () => {
    const { container } = renderWithRouter(<ToolCard tool={mockTool} />)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:-translate-y-1')
  })

  it('renders in list view when specified', () => {
    const { container } = renderWithRouter(<ToolCard tool={mockTool} viewMode="list" />)
    const card = container.firstChild as HTMLElement
    expect(card).not.toHaveClass('hover:-translate-y-1')
  })

  it('shows popular star when tool is popular', () => {
    renderWithRouter(<ToolCard tool={mockTool} />)
    const stars = screen.getAllByTestId('star-icon') // You might need to add test IDs
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renders external links when provided', () => {
    renderWithRouter(<ToolCard tool={mockTool} />)
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    const websiteLink = screen.getByRole('link', { name: /external/i })
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/docker')
    expect(websiteLink).toHaveAttribute('href', 'https://www.docker.com/')
  })
})