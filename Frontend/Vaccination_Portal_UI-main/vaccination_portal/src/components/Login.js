import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    if (userName === "" || password === "") {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    setError(''); // Clear any previous errors

    // Simulate an API call for authentication
    setTimeout(() => {
      if (userName === "Muskan" && password === "Muskan1402") {
        navigate("/dashboard")
      } else {
        setError("Invalid credentials, please try again.");
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <h3 className="text-center mb-4">Login</h3>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                placeholder="Enter Username"
                onChange={handleUserName}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Enter Password"
                onChange={handlePassword}
              />
            </div>

            <button
              className="btn btn-success w-100"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
