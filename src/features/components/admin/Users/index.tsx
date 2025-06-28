import React, { useState, useMemo } from 'react'
import { adminStyles } from '../AdminStyles'
import { userStyles } from './styles.component'
import { useAllUsersQuery } from 'entities/query'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'

export const Users: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')

  // Fetch all users for global search (no pagination)
  const { data: allUsersData, isLoading: isLoadingAll } = useAllUsersQuery()

  // Fetch paginated users for normal view
  const { data: paginatedUserData, isLoading: isLoadingPaginated } =
    useAllUsersQuery({
      page: page + 1,
      limit: rowsPerPage,
    })

  const allUsers = allUsersData?.data?.users || []
  const paginatedUsers = paginatedUserData?.data?.users || []
  const totalUsers = allUsersData?.data?.pagination?.totalUsers || 0

  // Global search across all users
  const filteredUsers = useMemo(() => {
    if (!search.trim()) {
      return paginatedUsers
    }

    const query = search.toLowerCase()
    return allUsers.filter((user) => {
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user._id?.toLowerCase().includes(query)
      )
    })
  }, [allUsers, paginatedUsers, search])

  // Determine if we're in search mode
  const isSearchMode = search.trim().length > 0

  // Calculate pagination for filtered results
  const totalFilteredUsers = filteredUsers.length
  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedFilteredUsers = filteredUsers.slice(startIndex, endIndex)

  // Use appropriate data for display
  const displayUsers = isSearchMode ? paginatedFilteredUsers : paginatedUsers
  const displayCount = isSearchMode ? totalFilteredUsers : totalUsers
  const isLoading = isSearchMode ? isLoadingAll : isLoadingPaginated

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={adminStyles.container}>
      <Typography variant="h5.600" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Manage users for your website. Users to showcase your clients' feedback.
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            background: '#fff',
            width: 320,
          }}
        >
          <span style={{ color: '#888', marginRight: 8, fontSize: 22 }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2" />
              <path
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                d="M20 20l-3-3"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0) // Reset to first page when searching
            }}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 16,
              width: '100%',
              background: 'transparent',
            }}
          />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          minHeight: 500,
          maxHeight: 500,
          overflow: 'auto',
          boxShadow: 1,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Join Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box sx={{ py: 6 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : displayUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    {isSearchMode
                      ? 'No users found matching your search.'
                      : 'No users found.'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              displayUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.createdAt.split('T')[0]}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={displayCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}
