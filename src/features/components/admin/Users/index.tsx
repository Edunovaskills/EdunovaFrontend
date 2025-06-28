import React, { useState } from 'react'
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
  const { data: usersData, isLoading } = useAllUsersQuery({
    page: page + 1,
    limit: rowsPerPage,
  })
  const users = usersData?.data?.users || []
  const totalUsers = usersData?.data?.pagination?.totalUsers || 0

  // Filter users by search query (name, email, or id)
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase()
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user._id?.toLowerCase().includes(query)
    )
  })

  return (
    <Box sx={adminStyles.container}>
      <Typography variant="h5" sx={{ color: 'black', mb: 2 }}>
        Users List
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
        <Typography sx={{ mr: 2 }}>Search Users</Typography>
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
            onChange={(e) => setSearch(e.target.value)}
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
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No users found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalUsers}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}
