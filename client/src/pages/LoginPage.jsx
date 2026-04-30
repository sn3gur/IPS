import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'

function LoginPage() {
  const navigate = useNavigate()

  // Form state
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')

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

    // Basic validation
    if (!form.email) return setMessage('Missing email')
    if (!form.password) return setMessage('Missing password')
    setMessage('')

    try {
      // TODO: replace with real API base URL via env variable
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        // TODO: handle session/token storage once auth is wired up
        navigate('/dashboard')
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
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
          />
        </div>

        <button type="submit">Login</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <p className="login-footer">
        New here? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default LoginPage