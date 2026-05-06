import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'
import apiClient from '../api/apiClient'
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  // Form state
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  // Loading state for async operations
  const[isLoading, setIsLoading] = useState(false)

  // Update form field on input change
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // Submit login
  const handleLogin = async (event) => {
    event.preventDefault()

    //enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Basic validation
    if (!form.email) return setMessage('Missing email')
    if (!emailRegex.test(form.email)) return setMessage('Invalid email format')
    if (!form.password) return setMessage('Missing password')
    if (form.password.length < 6) return setMessage('Password must be at least 6 characters')
    setMessage('Logging in...')
    setIsLoading(true)

    // api call
    try {
      // TODO: replace with real API base URL via env variable
      const res = await apiClient.post('/api/users/login', {
        email: form.email,
        password: form.password
      })
      if (res.status === 200) {
        //tell the app this user is logged in
        login(res.data.user || { email: form.email })
        //send user to the dashboard
        navigate('/dashboard')
      }
    } catch (error) {
      //Axios puts backend error messages inside error.response.data
      const backendError = error.response?.data?.message || 'Login failed. Check credentials.'
      setMessage(backendError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <img src={logo} alt="IPS" className="login-logo" />
      <p className="login-subtitle">Login to your account</p>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <p className="login-footer">
        New here? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default LoginPage