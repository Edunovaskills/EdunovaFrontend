import React, { useState, useEffect } from 'react'
import { adminStyles } from './AdminStyles'

export const Admin: React.FC = () => {
  // Initialize activeTab from localStorage, default to 'dashboard' if not set
  const [activeTab] = useState<string>(() => {
    return localStorage.getItem('activeTab') || 'dashboard'
  })

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  return (
    <div style={adminStyles.container}>
      {/* <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} /> */}
      {/* <main style={adminStyles.content}>{renderContent()}</main>} */}
    </div>
  )
}
