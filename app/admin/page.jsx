"use client";
import { useState, useEffect } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import AdminLogin from '../components/AdminLogin'

function AdminRoute() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    // Check if admin is already authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    setIsAdminAuthenticated(isAuthenticated)
  }, [])

  const handleAdminLogin = (authenticated) => {
    setIsAdminAuthenticated(authenticated)
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAdminAuthenticated(false)
  }

  return (
    <div className="app">
      {isAdminAuthenticated ? (
        <div>
          <div className="admin-header">
            <button 
              className="nav-btn logout-btn"
              onClick={handleAdminLogout}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000
              }}
            >
              Logout
            </button>
          </div>
          <AdminDashboard />
        </div>
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </div>
  )
}

export default AdminRoute