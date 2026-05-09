import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import PortfolioPage from './pages/Portfolio'
import SearchPage from './pages/SearchPage'
import AssetPage from './pages/AssetPage'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/main.scss';

function App() {
  return (
    <Routes>
      {/* Standard-route = login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/search" 
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/asset/:symbol" 
        element={
          <ProtectedRoute>
            <AssetPage />
          </ProtectedRoute>
        } 
      />

      <Route
        path="/Portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage/>
          </ProtectedRoute>
        }
        />
    </Routes>
  )
}

export default App