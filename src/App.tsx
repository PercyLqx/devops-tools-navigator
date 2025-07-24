import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { ToolsPage } from '@/pages/ToolsPage'
import { ToolDetailPage } from '@/pages/ToolDetailPage'
import { AboutPage } from '@/pages/AboutPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ThemeProvider } from '@/context/ThemeContext'
import { SearchProvider } from '@/context/SearchContext'

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:id" element={<ToolDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App