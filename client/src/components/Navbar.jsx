import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'

/*
 * Navbar with 3 variants:
 *   variant="main" = IPS Logo + Logout         (Dashboard)
 *   variant="back" = Back-Button + Balance     (Search, Asset)
 *   variant="brand" = just IPS Logo            (Login, Signup)
 */
function Navbar({ variant = 'main', balance = 0 }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Session-Logic 
    navigate('/login')
  }

  return (
    <nav className="navbar debug">
      {variant === 'brand' && (
        <img src={logo} alt="IPS" height="40" />
      )}

      {variant === 'main' && (
        <>
          <img src={logo} alt="IPS" height="40" />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {variant === 'back' && (
        <>
          <button onClick={() => navigate(-1)}>← Back</button>
          <span>Balance: ${balance.toLocaleString()}</span>
        </>
      )}
    </nav>
  )
}

export default Navbar