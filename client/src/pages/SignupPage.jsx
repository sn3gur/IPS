import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'
import apiClient from '../api/apiClient'
import { AuthContext } from '../context/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  // Form state
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(false)

  // Update form field on input change
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  // Submit registration
  const handleSubmit = async (event) => {
    event.preventDefault()

    // validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) return setMessage('Missing email')
    if (!emailRegex.test(form.email)) return setMessage('Invalid email format')
    if (!form.password) return setMessage('Missing password')
    setMessage('Creating account...')
    setIsLoading(true)

    try {
      // apiClient handles the base URL and cookies securely
      const res = await apiClient.post('/api/users/register', {
        email: form.email,
        password: form.password
      })
      if (res.status === 201 || res.status === 200) {
        setMessage('User registered successfully!')
        login(res.data.user || { email: form.email })
        navigate('/dashboard')
      }
    } catch (error) {
      // email already in use or other backend validation error
      const backendError = error.response?.data?.message || 'Registration failed. Please try again.'
      setMessage(backendError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <img src={logo} alt="IPS" className="signup-logo" />
      <p className="signup-subtitle">Create your account</p>

      <form onSubmit={handleSubmit} className="signup-form">
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Confirm'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <p className="signup-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default SignupPage