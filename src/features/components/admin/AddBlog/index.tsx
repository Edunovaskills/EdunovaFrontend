// src/features/components/admin/AddBlog/index.tsx
import React, { useState, useEffect } from 'react'
import { addBlogStyles } from './styles.component'
import { useAllBlogsForAdminQuery, useBlogByIdAdminQuery } from 'entities/query'
import { useForm, Controller } from 'react-hook-form'
import { blogSchema, type BlogSchema } from 'features/schema/blogSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from 'entities/mutation'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack,
} from '@mui/material'
import {
  CloudUpload,
  Delete,
  Close,
  Edit,
  Visibility,
  Search,
  TableRows,
  GridView,
} from '@mui/icons-material'
import type { Blog } from 'entities/model/blog.model'
import { BlogDetailModal } from 'entities/component/BlogDetailModal'
import { ConfirmDialog } from 'entities/component/ConfirmDialog'
import { useSnackBar } from 'entities/state'

interface AddBlogProps {}

const PLACEHOLDER_IMAGE_URL =
  'https://placehold.co/600x400/CCCCCC/000000?text=No+Image'

export const AddBlog: React.FC<AddBlogProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
    // Initialize currentView from localStorage, default to 'table'
    return (localStorage.getItem('blogView') as 'table' | 'grid') || 'table'
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [blogToDeleteId, setBlogToDeleteId] = useState<string | null>(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Fetch all blogs for admin view with pagination and search
  const {
    data: blogsData,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    error: blogsError,
    refetch: refetchBlogs,
  } = useAllBlogsForAdminQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: debouncedSearchQuery,
  })

  const { data: singleBlogData } = useBlogByIdAdminQuery(editingBlogId || '')

  // Mutations for blog operations
  const createBlogMutation = useCreateBlogMutation()
  const updateBlogMutation = useUpdateBlogMutation()
  const deleteBlogMutation = useDeleteBlogMutation()

  // Snackbar for notifications
  const { show: showSnackbar } = useSnackBar()

  // React Hook Form for form management
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogSchema>({
    resolver: yupResolver(blogSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  // Debounce search query to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Populate form fields when editing a blog
  useEffect(() => {
    if (editingBlogId && singleBlogData?.data?.blog) {
      const blog = singleBlogData.data.blog
      setValue('title', blog.title)
      setValue('description', blog.description)
      setPreview(blog.image || null)
      // Do NOT set imageFile here, as it's for new uploads. Keep it null for existing images.
    } else if (!editingBlogId) {
      // Reset form and preview when not editing
      reset()
      setPreview(null)
      setImageFile(null)
    }
  }, [editingBlogId, singleBlogData, setValue, reset])

  // Persist current view preference to localStorage
  useEffect(() => {
    localStorage.setItem('blogView', currentView)
  }, [currentView])

  // Handle image file selection and preview generation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
      setValue('image', file)
    } else {
      setImageFile(null)
      setPreview(null)
      setValue('image', undefined)
    }
  }

  // Handle form submission (create or update blog)
  const onSubmit = async (data: any) => {
    try {
      if (editingBlogId) {
        // Update existing blog
        await updateBlogMutation.mutateAsync({
          blogId: editingBlogId,
          blogPayload: {
            title: data.title,
            description: data.description,
          },
          imageFile: imageFile || undefined, // Only send if a new image is selected
        })
      } else {
        // Create new blog
        if (!imageFile) {
          showSnackbar({
            title: 'Please select an image for the blog.',
            color: 'Error',
          })
          return
        }
        await createBlogMutation.mutateAsync({
          blog: {
            title: data.title,
            description: data.description,
          },
          imageFile,
        })
      }
    } catch (error: any) {
      showSnackbar({
        title: error?.response?.data?.message || 'Operation failed.',
        color: 'Error',
      })
    } finally {
      // Reset form and states after submission
      reset()
      setImageFile(null)
      setPreview(null)
      setEditingBlogId(null)
      refetchBlogs() // Re-fetch blogs to update the list
    }
  }

  // Set blog for editing
  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog._id)
    setSelectedBlog(blog)
    // Preview existing image, don't set imageFile for existing images
  }

  // Toggle blog's active status
  const handleToggleActive = async (blogId: string, isActive: boolean) => {
    try {
      await updateBlogMutation.mutateAsync({
        blogId: blogId,
        blogPayload: { isActive },
        imageFile: undefined, // No image update needed for status toggle
      })
      refetchBlogs() // Re-fetch to show updated status
      showSnackbar({
        title: 'Blog status updated successfully!',
        color: 'Success',
      })
    } catch (error: any) {
      showSnackbar({
        title:
          error?.response?.data?.message || 'Failed to toggle blog status.',
        color: 'Error',
      })
    }
  }

  // Open delete confirmation dialog
  const handleDeleteBlogClick = (blogId: string) => {
    setBlogToDeleteId(blogId)
    setDeleteConfirmOpen(true)
  }

  // Confirm and perform blog deletion
  const handleDeleteConfirm = async () => {
    if (blogToDeleteId) {
      await deleteBlogMutation.mutateAsync(blogToDeleteId)
      setDeleteConfirmOpen(false)
      setBlogToDeleteId(null)
      refetchBlogs() // Re-fetch blogs after deletion
    }
  }

  // Cancel delete operation
  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false)
    setBlogToDeleteId(null)
  }

  // Open blog detail modal
  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog)
    setModalOpen(true)
  }

  // Handle page change for TablePagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change for TablePagination
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page when rows per page changes
  }

  // Toggle between table and grid view
  const toggleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'table' | 'grid' | null
  ) => {
    if (newView !== null) {
      setCurrentView(newView)
    }
  }

  // Extract blogs data and total count
  const blogs = blogsData?.data?.blogs || []
  const totalBlogs = blogsData?.total || 0

  return (
    <Box sx={addBlogStyles.container}>
      {/* Page Header: Add New Blog or Edit Blog */}
      <Typography variant="h4" component="h1" sx={addBlogStyles.header}>
        {editingBlogId ? 'Edit Blog' : 'Add New Blog'}
      </Typography>

      {/* Blog Form Section */}
      <Paper elevation={3} sx={addBlogStyles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Blog Title Input */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Blog Title"
                variant="outlined"
                fullWidth
                sx={addBlogStyles.inputField}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          {/* Blog Description Input */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Blog Description"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                sx={addBlogStyles.inputField}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* Image Upload Section */}
          <Box sx={addBlogStyles.imageUploadContainer}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="blog-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="blog-image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
                sx={addBlogStyles.uploadButton}
              >
                Upload Image
              </Button>
            </label>
            {preview && (
              <Box sx={addBlogStyles.imagePreviewBox}>
                <img
                  src={preview}
                  alt="Blog Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain' as const,
                  }}
                />
                <IconButton
                  onClick={() => {
                    setPreview(null)
                    setImageFile(null)
                    setValue('image', undefined)
                  }}
                  sx={addBlogStyles.removeImageButton}
                >
                  <Close />
                </IconButton>
              </Box>
            )}
            {errors.image && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.image.message as string}
              </Typography>
            )}
          </Box>

          {/* Form Action Buttons */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={addBlogStyles.submitButton}
            disabled={
              isSubmitting ||
              createBlogMutation.isPending ||
              updateBlogMutation.isPending
            }
          >
            {editingBlogId ? 'Update Blog' : 'Create Blog'}
          </Button>
          {editingBlogId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setEditingBlogId(null)
                reset()
                setPreview(null)
                setImageFile(null)
              }}
              sx={addBlogStyles.cancelEditButton}
            >
              Cancel Edit
            </Button>
          )}
        </form>
      </Paper>

      {/* Existing Blogs Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" sx={addBlogStyles.subHeader}>
          Existing Blogs
        </Typography>

        {/* Search and View Toggle */}
        <Box sx={addBlogStyles.searchAndSwitchContainer}>
          <TextField
            label="Search Blogs"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={addBlogStyles.searchField}
          />
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={toggleView}
            aria-label="blog view"
            sx={addBlogStyles.viewToggle}
          >
            <ToggleButton
              value="table"
              aria-label="table view"
              buttonType="block"
              sx={{
                marginRight: 0.5,
              }}
            >
              <TableRows />
            </ToggleButton>
            <ToggleButton
              value="grid"
              aria-label="grid view"
              buttonType="block"
            >
              <GridView />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Loading, Error, or No Blogs Found States */}
        {isLoadingBlogs ? (
          <Box sx={addBlogStyles.loadingBox}>
            <CircularProgress />
          </Box>
        ) : isErrorBlogs ? (
          <Alert severity="error" sx={addBlogStyles.alert}>
            Error loading blogs: {blogsError?.message}
          </Alert>
        ) : blogs.length === 0 ? (
          <Alert severity="info" sx={addBlogStyles.alert}>
            No blogs found.
          </Alert>
        ) : (
          <>
            {currentView === 'table' ? (
              // Table View
              <TableContainer
                component={Paper}
                sx={addBlogStyles.tableContainer}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={addBlogStyles.tableHeader}>
                        Image
                      </TableCell>
                      <TableCell sx={addBlogStyles.tableHeader}>
                        Title
                      </TableCell>
                      <TableCell sx={addBlogStyles.tableHeader}>
                        Description
                      </TableCell>
                      <TableCell sx={addBlogStyles.tableHeader}>
                        Created By
                      </TableCell>
                      <TableCell sx={addBlogStyles.tableHeader}>
                        Status
                      </TableCell>
                      <TableCell sx={addBlogStyles.tableHeader} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoadingBlogs ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={addBlogStyles.tableCell}>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogs.map((blog: Blog) => (
                        <TableRow key={blog._id} sx={addBlogStyles.tableRow}>
                          <TableCell>
                            <img
                              src={blog.image || PLACEHOLDER_IMAGE_URL}
                              alt={blog.title}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover' as const,
                                borderRadius: '4px',
                                flexShrink: 0,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={addBlogStyles.tableCell}>
                            {blog.title}
                          </TableCell>
                          <TableCell sx={addBlogStyles.tableCell}>
                            {blog.description.length > 50
                              ? `${blog.description.substring(0, 50)}...`
                              : blog.description}
                          </TableCell>
                          <TableCell sx={addBlogStyles.tableCell}>
                            {blog.createdBy &&
                            typeof blog.createdBy === 'object'
                              ? (blog.createdBy as any).name
                              : 'N/A'}
                          </TableCell>
                          <TableCell sx={addBlogStyles.tableCell}>
                            <Chip
                              label={blog.isActive ? 'Active' : 'Inactive'}
                              color={blog.isActive ? 'success' : 'error'}
                              variant="filled"
                              size="small"
                              sx={{
                                fontSize: '0.8rem',
                              }}
                            />
                          </TableCell>
                          <TableCell align="right" sx={addBlogStyles.tableCell}>
                            <Box sx={addBlogStyles.tableActions}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditBlog(blog)}
                                aria-label="edit blog"
                                disabled={!blog.isActive}
                                sx={{
                                  cursor: !blog.isActive
                                    ? 'not-allowed !important'
                                    : 'pointer',
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleViewBlog(blog)}
                                aria-label="view blog"
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteBlogClick(blog._id)}
                                aria-label="delete blog"
                                disabled={
                                  !blog.isActive || deleteBlogMutation.isPending
                                }
                                sx={{
                                  cursor: !blog.isActive
                                    ? 'not-allowed !important'
                                    : 'pointer',
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {/* Table Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalBlogs}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={addBlogStyles.paginationWrapper}
                />
              </TableContainer>
            ) : (
              // Grid View
              <Stack>
                <Box sx={addBlogStyles.blogGrid}>
                  {blogs.map((blog: Blog) => (
                    <Paper
                      key={blog._id}
                      elevation={2}
                      sx={addBlogStyles.blogCard}
                    >
                      <img
                        src={blog.image || PLACEHOLDER_IMAGE_URL}
                        alt={blog.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover' as const,
                        }}
                      />
                      <Box sx={addBlogStyles.blogCardContent}>
                        <Typography
                          variant="h6"
                          sx={addBlogStyles.blogCardTitle}
                        >
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={addBlogStyles.blogCardDescription}
                        >
                          {blog.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created By:{' '}
                          {blog.createdBy && typeof blog.createdBy === 'object'
                            ? (blog.createdBy as any).name
                            : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {blog.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                        <Box sx={addBlogStyles.blogCardActions}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEditBlog(blog)}
                            disabled={!blog.isActive}
                            title={
                              !blog.isActive
                                ? 'Cannot edit inactive blog'
                                : 'Edit blog'
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteBlogClick(blog._id)}
                            disabled={
                              !blog.isActive || deleteBlogMutation.isPending
                            }
                            sx={{
                              cursor: !blog.isActive
                                ? 'not-allowed !important'
                                : 'pointer',
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleViewBlog(blog)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
                {/* Grid View Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalBlogs}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={addBlogStyles.paginationWrapper}
                />
              </Stack>
            )}
          </>
        )}
      </Box>

      {/* Blog Detail Modal */}
      <BlogDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        blog={selectedBlog}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        loading={deleteBlogMutation.isPending}
      />
    </Box>
  )
}
