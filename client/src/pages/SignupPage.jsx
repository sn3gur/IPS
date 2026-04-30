import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-ips.png'

function SignupPage() {
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

  // Submit registration
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Basic validation
    if (!form.email) return setMessage('Missing email')
    if (!form.password) return setMessage('Missing password')
    setMessage('')

    try {
      // TODO: replace with real API base URL via env variable
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('User registered successfully!')
        setForm({ email: '', password: '' })
        // TODO: auto-login or redirect once auth flow is finalized
        // navigate('/dashboard')
      } else {
        setMessage(data.message || 'Registration failed')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
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

        <button type="submit">Confirm</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <p className="signup-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default SignupPage