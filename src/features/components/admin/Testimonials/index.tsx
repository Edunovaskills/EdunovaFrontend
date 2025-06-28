import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  IconButton,
  TextField,
  Chip,
  Avatar,
  Tooltip,
  styled,
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import { adminStyles } from '../AdminStyles'
import { useTestimonialsForAdminQuery } from 'entities/query'
import {
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} from 'entities/mutation'
import type { Testimonial } from 'entities/model/testimonail.model'

// Styled components
const MessageCell = styled(Box)(({ theme }) => ({
  maxWidth: 300,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '&:hover': {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    maxHeight: '100px',
    overflow: 'auto',
    transition: 'all 0.3s ease',
  },
}))

const ActionButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
}))

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.paper,
  width: 320,
  '& input': {
    border: 'none',
    outline: 'none',
    fontSize: 16,
    width: '100%',
    background: 'transparent',
  },
}))

export const Testimonials: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editMessage, setEditMessage] = useState('')

  const { data: testimonialsData, isLoading } = useTestimonialsForAdminQuery({
    page: page + 1,
    limit: rowsPerPage,
  })

  const updateMutation = useUpdateTestimonialMutation()
  const deleteMutation = useDeleteTestimonialMutation()

  const testimonials = testimonialsData?.data?.testimonials || []
  const totalTestimonials = testimonialsData?.data?.total || 0

  // Filter testimonials by search query (name, designation)
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const query = search.toLowerCase()
      return (
        testimonial.name?.toLowerCase().includes(query) ||
        testimonial.designation?.toLowerCase().includes(query)
      )
    })
  }, [testimonials, search])

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial._id)
    setEditMessage(testimonial.message)
  }

  const handleSave = async () => {
    if (editingId && editMessage.trim()) {
      await updateMutation.mutateAsync({
        id: editingId,
        body: {
          message: editMessage,
          name: testimonials.find((t) => t._id === editingId)?.name,
          designation: testimonials.find((t) => t._id === editingId)
            ?.designation,
        },
      })
      setEditingId(null)
      setEditMessage('')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditMessage('')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const isUpdateDisabled =
    !editMessage.trim() ||
    editMessage === testimonials.find((t) => t._id === editingId)?.message

  return (
    <Box sx={adminStyles.container}>
      <Typography variant="h5.600" sx={{ mb: 2 }}>
        Testimonials
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Manage testimonials for your website. Add, edit, and delete testimonials
        to showcase your clients' feedback.
      </Typography>

      <SearchContainer>
        <SearchBox>
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
            placeholder="Search by name or designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
      </SearchContainer>

      <TableContainer
        component={Paper}
        sx={{
          minHeight: 500,
          maxHeight: 600,
          overflow: 'auto',
          boxShadow: 1,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box sx={{ py: 6 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : filteredTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">
                    No testimonials found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {testimonial.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {testimonial.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.designation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {editingId === testimonial._id ? (
                      <TextField
                        multiline
                        rows={3}
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{ height: 'unset', minHeight: 'unset' }}
                        InputProps={{
                          sx: { height: 'unset' },
                        }}
                      />
                    ) : (
                      <MessageCell>
                        <Typography variant="body2">
                          {testimonial.message}
                        </Typography>
                      </MessageCell>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={testimonial.isActive ? 'Active' : 'Inactive'}
                      color={testimonial.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {editingId === testimonial._id ? (
                      <Box>
                        <Tooltip title="Save">
                          <ActionButton
                            onClick={handleSave}
                            disabled={
                              isUpdateDisabled || updateMutation.isPending
                            }
                            color="primary"
                            size="small"
                          >
                            <SaveIcon />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <ActionButton
                            onClick={handleCancel}
                            color="default"
                            size="small"
                          >
                            <CancelIcon />
                          </ActionButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box>
                        <Tooltip title="Edit">
                          <ActionButton
                            onClick={() => handleEdit(testimonial)}
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <ActionButton
                            onClick={() => handleDelete(testimonial._id)}
                            color="error"
                            size="small"
                            disabled={deleteMutation.isPending}
                          >
                            <DeleteIcon />
                          </ActionButton>
                        </Tooltip>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalTestimonials}
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
