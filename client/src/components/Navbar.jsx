import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import logo from '../assets/logo-ips.png'
import apiClient from '../api/apiClient'
import { AuthContext } from '../context/AuthContext'

function Navbar({ variant = 'main' }) {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  //read user's data from global memory
  const { user, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
        await apiClient.post('/api/users/logout')
        logout()
        navigate('/login')
    } catch (error) {
        logout()
        navigate('/login')
    } finally {
        setIsLoggingOut(false)
    }
  }

  //format the real balance, fallback to 0 if loading
  const currentBalance = user?.availableCash || 0
  const formattedBalance = `$${currentBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return (
    <nav className="navbar">
      {variant === 'main' && (
        <>
          <img src={logo} alt="IPS" className="navbar-logo" />
          <button onClick={handleLogout} className="navbar-logout" disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </>
      )}

      {variant === 'back' && (
        <>
          <button onClick={() => navigate(-1)} className="navbar-back">
            <span className="navbar-back-arrow">←</span> Back
          </button>
          <div className="navbar-balance">
            <span className="navbar-balance-label">Balance</span>
            <span className="navbar-balance-value">{formattedBalance}</span>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar