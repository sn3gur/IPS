import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'

/**
 * Navbar with two variants:
 *   variant="main"  → IPS Logo + Logout         (Dashboard)
 *   variant="back"  → Back button + Balance     (Search, Asset)
 */
function Navbar({ variant = 'main', balance = 0 }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: session logic 
    navigate('/login')
  }

  // Format balance: 100000 → "$100,000.00"
  const formattedBalance = `$${balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return (
    <nav className="navbar">
      {variant === 'main' && (
        <>
          <img src={logo} alt="IPS" className="navbar-logo" />
          <button onClick={handleLogout} className="navbar-logout">
            Logout
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