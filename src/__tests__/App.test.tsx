import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock the context providers
jest.mock('../context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../context/SearchContext', () => ({
  SearchProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock the pages
jest.mock('../pages/HomePage', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}))

jest.mock('../pages/ToolsPage', () => ({
  ToolsPage: () => <div data-testid="tools-page">Tools Page</div>,
}))

jest.mock('../pages/ToolDetailPage', () => ({
  ToolDetailPage: () => <div data-testid="tool-detail-page">Tool Detail Page</div>,
}))

jest.mock('../pages/AboutPage', () => ({
  AboutPage: () => <div data-testid="about-page">About Page</div>,
}))

jest.mock('../pages/NotFoundPage', () => ({
  NotFoundPage: () => <div data-testid="not-found-page">Not Found Page</div>,
}))

jest.mock('../components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}))

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('App', () => {
  it('renders without crashing', () => {
    renderWithRouter()
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })

  it('renders HomePage for root route', () => {
    renderWithRouter(['/'])
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })
})