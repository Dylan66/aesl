import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'staff'
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add registration API call here
    console.log('Registration data:', userData)
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <h2>AESL Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            required
            value={userData.fullName}
            onChange={(e) => setUserData({...userData, fullName: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            required
            minLength="6"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select
            value={userData.role}
            onChange={(e) => setUserData({...userData, role: e.target.value})}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  )
}