import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SearchPage from './pages/SearchPage'
import AssetPage from './pages/AssetPage'

function App() {
  return (
    <Routes>
      {/* Standard-route = login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* todo make protected */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/asset/:symbol" element={<AssetPage />} />
    </Routes>
  )
}

export default App