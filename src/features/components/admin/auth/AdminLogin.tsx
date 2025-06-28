import React from 'react'
import { LoginForm } from '../../auth/LoginForm'
import { adminStyles } from '../AdminStyles'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  return (
    <div style={adminStyles.loginContainer as React.CSSProperties}>
      <h2 style={adminStyles.loginTitle}>Admin Login</h2>
      <LoginForm />
    </div>
  )
}
