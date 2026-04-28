import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO: api-call to POST /api/users/login
    navigate('/dashboard')
  }

  return (
    <div className="page debug" class="page">
      <Navbar variant="brand" />

      <main className="page-content debug-blue">
        <h1>IPS</h1>

        <form onSubmit={handleLogin} className="debug-green">
          {/* TODO: input fields */}
          <button type="submit">Login</button>
        </form>

        <p>
          New? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    </div>
  )
}

export default LoginPage