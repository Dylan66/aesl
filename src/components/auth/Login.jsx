import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fakeAuthAPI } from "../../utils/auth"


export default function Login({ setAuth, setRole }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fakeAuthAPI.login(credentials)
      if(response.token) {
        setAuth(true)
        setRole(response.role)
        // Navigate after state updates
        setTimeout(() => {
          navigate(response.role === 'admin' ? '/admin' : '/staff')
        }, 0)
      }
    } catch (err) {
      setError('Invalid credentials. Use email: admin@aesl.com or staff@aesl.com')
    }
  }

  return (
    <div className="auth-container">
      <h2>AESL Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            placeholder="staff@aesl.com or admin@aesl.com"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            required
            minLength="6"
            placeholder="Any password (min 6 chars)"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )
}