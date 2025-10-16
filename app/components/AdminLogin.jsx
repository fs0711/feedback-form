import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple authentication - in production, this should be server-side
    const validCredentials = {
      username: 'admin',
      password: 'admin123'
    };

    // Simulate API call delay
    setTimeout(() => {
      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        localStorage.setItem('adminAuthenticated', 'true');
        onLogin(true);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="admin-login-card">
        <div className="login-header">
          <div className="header-icon">
            <span className="icon-shield">🛡️</span>
          </div>
          <h2>Admin Access</h2>
          <p>Secure Dashboard Login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                placeholder="Enter username"
                disabled={isLoading}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                placeholder="Enter password"
                disabled={isLoading}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon"></span>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Authenticating...
              </>
            ) : (
              <>
                <span className="btn-icon"></span>
                Access Dashboard
              </>
            )}
          </button>
        </form>
        
        {/* <div className="login-info">
          <div className="info-header">
            <span className="info-icon"></span>
            <strong>Demo Credentials</strong>
          </div>
          <div className="credentials">
            <div className="credential-item">
              <span className="label">Username:</span>
              <span className="value">admin</span>
            </div>
            <div className="credential-item">
              <span className="label">Password:</span>
              <span className="value">admin123</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminLogin;