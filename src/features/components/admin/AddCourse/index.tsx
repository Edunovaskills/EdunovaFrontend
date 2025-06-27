// src/features/components/admin/AddCourse/index.tsx
import React, { useState, useEffect } from 'react'
import { addCourseStyles } from './styles.component'
import {
  useAllCoursesForAdminQuery,
  useCourseByIdAdminQuery, // For fetching single course details for edit
} from 'entities/query'
import { useForm, Controller } from 'react-hook-form'
import {
  courseSchema,
  type CourseSchema,
} from '../../../../features/schema/courses.schema' // Correct path
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
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
  Switch, // For isActive status
  TablePagination,
  InputAdornment,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
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
} from '@mui/icons-material' // Added TableRows, GridView
import type { Course } from 'entities/model/courses.model'
import { CourseDetailModal } from 'entities/component/CourseDetailModal' // Correct path
import { ConfirmDialog } from '../../../../entities/component/ConfirmDialog' // Assuming you have a ConfirmDialog component
import { addBlogStyles } from '../AddBlog/styles.component'

interface AddCourseProps {}

// Placeholder image URL
const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400?text=Course' // Corrected typo

export const AddCourse: React.FC<AddCourseProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
    // Load view preference from localStorage, default to 'table'
    return (localStorage.getItem('courseView') as 'table' | 'grid') || 'table'
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [editCourseId, setEditCourseId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [courseToDeleteId, setCourseToDeleteId] = useState<string | null>(null)

  // Pagination & Search States
  const [page, setPage] = useState(0) // Material-UI TablePagination is 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(10) // Changed default to 10 for consistency with blog
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // React Query Hooks
  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
    error: coursesError,
    refetch: refetchCourses,
  } = useAllCoursesForAdminQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: debouncedSearchQuery,
  })

  const {
    data: singleCourseData,
    isLoading: isLoadingSingleCourse,
    // isError: isErrorSingleCourse, // Not explicitly used but good to keep in mind
    // error: singleCourseError,
  } = useCourseByIdAdminQuery(editCourseId || undefined)

  const createCourseMutation = useCreateCourseMutation()
  const updateCourseMutation = useUpdateCourseMutation()
  const deleteCourseMutation = useDeleteCourseMutation()

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchema>({
    resolver: yupResolver(courseSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  // Effect for debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Effect to populate form when editing a course
  useEffect(() => {
    if (editCourseId && singleCourseData?.data?.course) {
      const course = singleCourseData.data.course
      setValue('title', course.title)
      setValue('description', course.description)
      setPreview(course.image || null) // Set current image as preview
    } else if (!editCourseId) {
      reset()
      setPreview(null)
      setImageFile(null)
    }
  }, [editCourseId, singleCourseData, setValue, reset])

  // Store view preference in localStorage
  useEffect(() => {
    localStorage.setItem('courseView', currentView)
  }, [currentView])

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
      setValue('image', file as any) // Cast for Yup, actual type is File
    } else {
      setImageFile(null)
      setPreview(null)
      setValue('image', undefined)
    }
  }

  // Handle form submission (Create or Update)
  const onSubmit = async (data: CourseSchema) => {
    try {
      if (editCourseId) {
        await updateCourseMutation.mutateAsync({
          courseId: editCourseId,
          coursePayload: {
            title: data.title,
            description: data.description,
          },
          imageFile: imageFile || undefined,
        })
      } else {
        if (!imageFile) {
          // Changed from alert to console error for better practice, as alerts are discouraged in iframes
          console.error('Please select an image for the course.')
          // Potentially show a user-friendly message in the UI instead of alert
          return // Prevent submission if no image for creation
        }
        await createCourseMutation.mutateAsync({
          course: {
            title: data.title,
            description: data.description,
          },
          imageFile,
        })
      }
      reset()
      setImageFile(null)
      setPreview(null)
      setEditCourseId(null)
      refetchCourses() // Manual refetch after mutation success
    } catch (error) {
      // Error handling is managed by react-query mutations onError callback
      console.error('Submission error:', error)
    }
  }

  // Handle edit action
  const handleEditCourse = (course: Course) => {
    setEditCourseId(course._id)
    setSelectedCourse(course) // Set selected course to populate modal if needed
    // The useEffect will handle populating the form
  }

  // Handle delete action confirmation
  const handleDeleteCourseClick = (courseId: string) => {
    setCourseToDeleteId(courseId)
    setDeleteConfirmOpen(true)
  }

  // Handle actual delete action
  const handleDeleteConfirm = async () => {
    if (courseToDeleteId) {
      await deleteCourseMutation.mutateAsync(courseToDeleteId)
      setDeleteConfirmOpen(false)
      setCourseToDeleteId(null)
      refetchCourses() // Refetch courses after deletion
    }
  }

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false)
    setCourseToDeleteId(null)
  }

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setModalOpen(true)
  }

  // Handle pagination change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset page to 0 when rows per page changes
  }

  const courses = coursesData?.data?.courses || []
  const totalCourses = coursesData?.total || 0
  const toggleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'table' | 'grid' | null
  ) => {
    if (newView !== null) {
      setCurrentView(newView)
    }
  }

  return (
    <>
      <Box sx={addCourseStyles.container}>
        <Typography variant="h4" component="h1" sx={addCourseStyles.header}>
          {editCourseId ? 'Edit Course' : 'Add New Course'}
        </Typography>

        {(createCourseMutation.isError ||
          updateCourseMutation.isError ||
          deleteCourseMutation.isError) && (
          <Alert severity="error" sx={addCourseStyles.alert}>
            {createCourseMutation.error?.response?.data?.message ||
              updateCourseMutation.error?.response?.data?.message ||
              deleteCourseMutation.error?.response?.data?.message ||
              'An unexpected error occurred.'}
          </Alert>
        )}
        {(createCourseMutation.isSuccess ||
          updateCourseMutation.isSuccess ||
          deleteCourseMutation.isSuccess) && (
          <Alert severity="success" sx={addCourseStyles.alert}>
            {createCourseMutation.data?.message ||
              updateCourseMutation.data?.message ||
              deleteCourseMutation.data?.message ||
              'Operation successful!'}
          </Alert>
        )}

        {/* Course Form */}
        <Paper elevation={3} sx={addCourseStyles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Title"
                  variant="outlined"
                  fullWidth
                  sx={addCourseStyles.inputField}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  sx={addCourseStyles.inputField}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Image Upload */}
            <Box sx={addCourseStyles.imageUploadContainer}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="course-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="course-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={addCourseStyles.uploadButton}
                >
                  Upload Image
                </Button>
              </label>
              {preview && (
                <Box sx={addCourseStyles.imagePreviewBox}>
                  <img
                    src={preview}
                    alt="Course Preview"
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
                    sx={addCourseStyles.removeImageButton}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={addCourseStyles.submitButton}
              disabled={
                isSubmitting ||
                createCourseMutation.isPending ||
                updateCourseMutation.isPending
              }
            >
              {isSubmitting ||
              createCourseMutation.isPending ||
              updateCourseMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : editCourseId ? (
                'Update Course'
              ) : (
                'Create Course'
              )}
            </Button>
            {editCourseId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditCourseId(null)
                  reset()
                  setPreview(null)
                  setImageFile(null)
                }}
                sx={addCourseStyles.cancelEditButton}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </Paper>

        {/* Course Listing */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={addCourseStyles.subHeader}
          >
            Existing Courses
          </Typography>

          <Box sx={addCourseStyles.searchAndSwitchContainer}>
            <TextField
              label="Search Courses"
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
              sx={addCourseStyles.searchField}
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

          {isLoadingCourses ? (
            <Box sx={addCourseStyles.loadingBox}>
              <CircularProgress />
            </Box>
          ) : isErrorCourses ? (
            <Alert severity="error" sx={addCourseStyles.alert}>
              Error loading courses: {coursesError?.message}
            </Alert>
          ) : courses.length === 0 ? (
            <Alert severity="info" sx={addCourseStyles.alert}>
              No courses found.
            </Alert>
          ) : (
            <>
              {currentView === 'table' ? (
                <TableContainer
                  component={Paper}
                  sx={addCourseStyles.tableContainer}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={addCourseStyles.tableHeader}>
                          Image
                        </TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>
                          Title
                        </TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>
                          Description
                        </TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>
                          Created By
                        </TableCell>
                        <TableCell sx={addCourseStyles.tableHeader}>
                          Status
                        </TableCell>
                        <TableCell
                          sx={addCourseStyles.tableHeader}
                          align="right"
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow
                          key={course._id}
                          sx={addCourseStyles.tableRow}
                        >
                          <TableCell>
                            <img
                              src={course.image || PLACEHOLDER_IMAGE_URL}
                              alt={course.title}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover' as const,
                                borderRadius: '4px',
                                flexShrink: 0,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {course.title}
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {course.description.length > 50
                              ? `${course.description.substring(0, 50)}...`
                              : course.description}
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {typeof course.createdBy === 'object' &&
                            course.createdBy !== null
                              ? course.createdBy.name
                              : 'Admin'}
                          </TableCell>
                          <TableCell sx={addCourseStyles.tableCell}>
                            {/* <Switch
                              checked={course.isActive}
                              inputProps={{
                                'aria-label': 'course active status',
                              }}
                            /> */}
                            <Chip
                              label={course.isActive ? 'Active' : 'Inactive'}
                              color={course.isActive ? 'success' : 'error'}
                              variant="filled"
                              size="small"
                            />
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={addCourseStyles.tableCell}
                          >
                            <Box sx={addCourseStyles.tableActions}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditCourse(course)}
                                aria-label="edit course"
                                disabled={!course.isActive}
                                sx={{
                                  cursor: !course.isActive
                                    ? 'not-allowed !important'
                                    : 'pointer',
                                }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleViewCourse(course)}
                                aria-label="view course"
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDeleteCourseClick(course._id)
                                }
                                aria-label="delete course"
                                disabled={
                                  !course.isActive ||
                                  deleteCourseMutation.isPending
                                }
                                sx={{
                                  cursor: !course.isActive
                                    ? 'not-allowed !important'
                                    : 'pointer',
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Changed for consistency with blog
                    component="div"
                    count={totalCourses}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                <Stack>
                  <Box sx={addCourseStyles.courseGrid}>
                    {courses.map((course) => (
                      <Paper
                        key={course._id}
                        elevation={2}
                        sx={addCourseStyles.courseCard}
                      >
                        <img
                          src={course.image || PLACEHOLDER_IMAGE_URL}
                          alt={course.title}
                          style={{
                            width: '100%',
                            height: '180px',
                            objectFit: 'cover' as const,
                          }}
                        />
                        <Box sx={addCourseStyles.courseCardContent}>
                          <Typography
                            variant="h6"
                            sx={addCourseStyles.courseCardTitle}
                          >
                            {course.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={addCourseStyles.courseCardDescription}
                          >
                            {course.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Status: {course.isActive ? 'Active' : 'Inactive'}
                          </Typography>
                          <Box sx={addCourseStyles.courseCardActions}>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditCourse(course)}
                              disabled={!course.isActive}
                              sx={{
                                cursor: !course.isActive
                                  ? 'not-allowed !important'
                                  : 'pointer',
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() =>
                                handleDeleteCourseClick(course._id)
                              }
                              disabled={
                                !course.isActive ||
                                deleteCourseMutation.isPending
                              }
                              sx={{
                                cursor: !course.isActive
                                  ? 'not-allowed !important'
                                  : 'pointer',
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => handleViewCourse(course)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Changed for consistency with blog
                    component="div"
                    count={totalCourses}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={addCourseStyles.paginationContainer}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Course Detail Modal */}
      <CourseDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
        loading={isLoadingSingleCourse}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description="Are you sure you want to delete this course? This action cannot be undone."
        loading={deleteCourseMutation.isPending}
      />
    </>
  )
}
