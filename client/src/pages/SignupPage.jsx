import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Register from './Register'

function SignupPage() {
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    // TODO: api-call to POST /api/users/register
    navigate('/dashboard')
  }

  return (
    <div className="page debug">
      <Navbar variant="brand" />

      <main className="page-content debug-blue">
        <h1>IPS</h1>
        

        <form onSubmit={handleSignup} className="debug-green">
          {/* TODO input fields */}
          <Register />
          <button type="submit">Confirm</button>
        </form>
      </main>
    </div>
  )
}

export default SignupPage