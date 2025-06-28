import React, { useState, useEffect } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { Dashboard } from './Dashboard'
import { AddEvent } from './AddEvent'
import { AddCourse } from './AddCourse'
import { AddBlog } from './AddBlog'
import { Analytics } from './Analytics'
import { Users } from './Users'
import { adminStyles } from './AdminStyles'
import { AddCertificate } from './AddCertificate'
import { EnquiryManagement } from './EnquiryManagement'
import { Testimonials } from './Testimonials'

export const Admin: React.FC = () => {
  // Initialize activeTab from localStorage, default to 'dashboard' if not set
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('activeTab') || 'dashboard'
  })

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'events':
        return <AddEvent />
      case 'courses':
        return <AddCourse />
      case 'blogs':
        return <AddBlog />
      case 'certificates':
        return <AddCertificate />
      case 'enquiries':
        return <EnquiryManagement />
      case 'users':
        return <Users />
      case 'testimonials':
        return <Testimonials />
      case 'analytics':
        return <Analytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div style={adminStyles.container}>
      {/* <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} /> */}
      {/* <main style={adminStyles.content}>{renderContent()}</main> */}
    </div>
  )
}
