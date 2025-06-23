import React, { useEffect, useState } from 'react'
import { fetchUsers } from './users.api'
import { adminStyles } from '../AdminStyles'
import { userStyles } from './styles.component'

interface User {
  id: number
  name: string
  email: string
  joinDate: string
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(() => {
    // Initialize from localStorage, fallback to 1
    const savedPage = localStorage.getItem('usersCurrentPage')
    return savedPage ? parseInt(savedPage, 10) : 1
  })
  const usersPerPage = 15

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchUsers()
        setUsers(data)
        // Ensure currentPage doesn't exceed totalPages after data is loaded
        const totalPages = Math.ceil(data.length / usersPerPage)
        if (currentPage > totalPages) {
          setCurrentPage(1)
          localStorage.setItem('usersCurrentPage', '1')
        }
      } catch (err) {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Update localStorage when currentPage changes
  useEffect(() => {
    localStorage.setItem('usersCurrentPage', currentPage.toString())
  }, [currentPage])

  // Calculate pagination details
  const totalPages = Math.ceil(users.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = users.slice(startIndex, endIndex)

  // Handle page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (loading) {
    return <div style={adminStyles.placeholder}>Loading users...</div>
  }

  if (error) {
    return <div style={adminStyles.placeholder}>{error}</div>
  }

  return (
    <div style={adminStyles.container}>
      <h2 style={{ color: 'black' }}>User Management</h2>
      <div style={userStyles.tableContainer}>
        <table style={userStyles.table}>
          <thead>
            <tr>
              <th style={userStyles.th}>ID</th>
              <th style={userStyles.th}>Name</th>
              <th style={userStyles.th}>Email</th>
              <th style={userStyles.th}>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} style={userStyles.tr}>
                <td style={userStyles.td}>{user.id}</td>
                <td style={userStyles.td}>{user.name}</td>
                <td style={userStyles.td}>{user.email}</td>
                <td style={userStyles.td}>{user.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={userStyles.pagination}>
        <button
          style={userStyles.paginationButton}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={userStyles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={userStyles.paginationButton}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
