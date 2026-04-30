import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
    <div className="page debug">
      <Navbar variant="brand" />

      <main className="page-content debug-blue">
        <h1>IPS</h1>

        <form onSubmit={handleLogin} className="login-form debug-green">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          {message && <p className="form-message">{message}</p>}
        </form>

        <p>
          New? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    </div>
  )
}

export default LoginPage