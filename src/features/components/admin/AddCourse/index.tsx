import React, { useState, useEffect } from 'react'
import { addCourseStyles } from './styles.component'
import { useAllCoursesForAdminQuery } from 'entities/query'
import { useForm, Controller } from 'react-hook-form'
import { courseSchema, type CourseSchema } from 'features/schema'
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
  Modal,
} from '@mui/material'
import { CloudUpload, Delete, Close } from '@mui/icons-material'
import type { Course } from 'entities/model/courses.model'
import { CourseDetailModal } from 'entities/component/CourseDetailModal'

interface AddCourseProps {}

export const AddCourse: React.FC<AddCourseProps> = () => {
  const [imageFile, setImageFile] = useState<File | null>(null) // Actual File object for upload
  const [preview, setPreview] = useState<string | null>(() => {
    // Load image preview from localStorage for persistence
    return localStorage.getItem('courseImagePreview') || null
  })

  // State for view preference (table or grid)
  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
    return (localStorage.getItem('courseView') as 'table' | 'grid') || 'table'
  })

  // NEW: State to manage the course being edited
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  // NEW: State for the selected course in the modal
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Save image preview to localStorage
  useEffect(() => {
    if (preview) {
      localStorage.setItem('courseImagePreview', preview)
    } else {
      localStorage.removeItem('courseImagePreview')
    }
  }, [preview])

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem('courseView', currentView)
  }, [currentView])

  // Effect to populate form when editingCourse changes
  useEffect(() => {
    if (editingCourse) {
      reset({
        title: editingCourse.title,
        description: editingCourse.description,
        image: editingCourse.image,
      })
      // Set preview if editing course has an image
      if (editingCourse.image) {
        setPreview(editingCourse.image)
      }
    } else {
      reset({
        title: '',
        description: '',
      })
      setPreview(null)
      setImageFile(null)
    }
  }, [editingCourse])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file) // Set the actual File object
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string) // Set preview URL
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setPreview(null)
    }
  }

  // NEW: Function to handle edit button click
  const handleEditClick = (courseToEdit: Course) => {
    setEditingCourse(courseToEdit)
    // Scroll to form or highlight it for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // NEW: Function to handle cancel edit
  const handleCancelEdit = () => {
    setEditingCourse(null)
    setPreview(null)
    setImageFile(null)
  }

  const handleDeleteClick = (courseId: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      deleteCourse(courseId)
    }
  }

  const theme = document.body.getAttribute('data-theme') || 'light'

  const getThemedStyle = (baseStyle: any): React.CSSProperties => {
    if (!baseStyle) {
      return {}
    }
    const styleToApply: React.CSSProperties = { ...baseStyle }

    if (theme === 'dark' && baseStyle['&[data-theme="dark"]']) {
      Object.assign(styleToApply, baseStyle['&[data-theme="dark"]'])
    }

    const filteredStyle: React.CSSProperties = {}
    for (const key in styleToApply) {
      if (
        Object.prototype.hasOwnProperty.call(styleToApply, key) &&
        !key.startsWith('@media') &&
        !key.startsWith('&') &&
        !(
          typeof styleToApply[key as keyof React.CSSProperties] === 'object' &&
          !Array.isArray(styleToApply[key as keyof React.CSSProperties])
        )
      ) {
        filteredStyle[key as keyof React.CSSProperties] =
          styleToApply[key as keyof React.CSSProperties]
      }
    }
    return filteredStyle
  }

  const { data: coursesData, isLoading: isLoadingCourses } =
    useAllCoursesForAdminQuery()

  const { mutateAsync: createCourse, isPending: isCreatingCourse } =
    useCreateCourseMutation()

  const { mutate: updateCourse, isPending: isUpdatingCourse } =
    useUpdateCourseMutation()

  const { mutate: deleteCourse, isPending: isDeletingCourse } =
    useDeleteCourseMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async (data: CourseSchema) => {
    // Handle create or update
    if (imageFile || data.image) {
      if (editingCourse) {
        // Handle update
        updateCourse({
          courseId: editingCourse._id,
          eventPayload: data,
          imageFile: data.image as File,
        })
        handleCancelEdit()
      } else {
        // Handle create
        if (imageFile) {
          await createCourse({ course: data, imageFile })
          reset()
          handleCancelEdit(null)
        }
      }
    } else {
      console.log('upload error')
    }
  }

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setModalOpen(true)
  }

  return (
    <>
      <style>{`
        /* Tailwind CSS CDN */
        @import url('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');
        /* Inter font from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        .course-container * {
          box-sizing: border-box;
        }
        
        .course-input:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .course-textarea:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .course-select:focus {
          outline: none;
          border-color: ${theme === 'dark' ? '#818cf8' : '#4f46e5'};
          box-shadow: 0 0 0 3px ${theme === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(79, 70, 229, 0.2)'};
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: ${theme === 'dark' ? '#4f46e5' : '#4338ca'};
        }
        
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .image-preview-container:hover {
          border-color: ${theme === 'dark' ? '#6366f1' : '#4f46e5'};
        }
        
        .remove-button:hover {
          background-color: #b91c1c;
        }
        
        .view-toggle-button:hover {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
        
        .course-tr:nth-of-type(even) {
          background-color: ${theme === 'dark' ? '#334155' : '#f1f5f9'};
        }
        
        .course-tr:hover {
          background-color: ${theme === 'dark' ? '#475569' : '#e2e8f0'};
        }
        
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: ${theme === 'dark' ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 8px 25px rgba(0, 0, 0, 0.12)'};
        }
        
        .card-link:hover {
          color: ${theme === 'dark' ? '#818cf8' : '#4338ca'};
        }
        
        .card-link:hover svg {
          stroke: ${theme === 'dark' ? '#818cf8' : '#4338ca'};
        }
        
        .pagination-button:hover:not(:disabled) {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
        
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: ${theme === 'dark' ? '#3b5470' : '#f1f5f9'};
        }
        
        .page-number:hover {
          background-color: ${theme === 'dark' ? '#64748b' : '#e2e8f0'};
          border-color: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }

        /* NEW: Styles for Action Buttons */
        .action-button {
          padding: 0.4rem 0.8rem;
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.75rem; /* text-xs */
          font-weight: 500;
          transition: all 0.15s ease-in-out;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-right: 0.5rem; /* Space between buttons */
        }

        .action-button.edit-button {
          background-color: #3b82f6; /* blue-500 */
          color: white;
        }
        .action-button.edit-button:hover {
          background-color: #2563eb; /* blue-600 */
        }

        .action-button.delete-button {
          background-color: #ef4444; /* red-500 */
          color: white;
        }
        .action-button.delete-button:hover {
          background-color: #dc2626; /* red-600 */
        }

        .action-button.view-button {
          background-color: #6366f1; /* indigo-500 */
          color: white;
        }
        .action-button.view-button:hover {
          background-color: #4f46e5; /* indigo-600 */
        }
        /* Dark mode specific styles for action buttons */
        body[data-theme="dark"] .action-button.edit-button {
          background-color: #60a5fa; /* blue-400 */
          color: #1f2937; /* gray-900 */
        }
        body[data-theme="dark"] .action-button.edit-button:hover {
          background-color: #3b82f6; /* blue-500 */
        }
        body[data-theme="dark"] .action-button.delete-button {
          background-color: #f87171; /* red-400 */
          color: #1f2937;
        }
        body[data-theme="dark"] .action-button.delete-button:hover {
          background-color: #ef4444; /* red-500 */
        }
        body[data-theme="dark"] .action-button.view-button {
          background-color: #818cf8; /* indigo-400 */
          color: #1f2937;
        }
        body[data-theme="dark"] .action-button.view-button:hover {
          background-color: #6366f1; /* indigo-500 */
        }


      `}</style>

      <div
        className="course-container"
        style={getThemedStyle(addCourseStyles.container)}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          {editingCourse ? 'Edit Course' : 'Add New Course'}
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Title Field */}
              <TextField
                {...register('title')}
                label="Course Title"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                required
              />

              {/* Description Field */}
              <TextField
                {...register('description')}
                label="Course Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
                required
              />

              {/* Image Upload Field */}
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Typography variant="body1.600" gutterBottom>
                      Course Thumbnail
                    </Typography>

                    {!preview ? (
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                        sx={{
                          height: 120,
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          '&:hover': {
                            borderStyle: 'dashed',
                            borderWidth: 2,
                          },
                        }}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            handleImageChange(e)
                            field.onChange(e.target.files?.[0])
                          }}
                        />
                      </Button>
                    ) : (
                      <Box
                        sx={{ position: 'relative', display: 'inline-block' }}
                      >
                        <img
                          src={preview}
                          alt="Course Thumbnail Preview"
                          style={{
                            width: '200px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                        <IconButton
                          onClick={() => {
                            setImageFile(null)
                            setPreview(null)
                            field.onChange(null)
                          }}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: 'error.main',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'error.dark',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    )}

                    {editingCourse && (
                      <Alert severity="info" sx={{ mt: 1 }}>
                        Leave blank to keep existing image.
                      </Alert>
                    )}
                  </Box>
                )}
              />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {editingCourse && (
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    disabled={isCreatingCourse}
                  >
                    Cancel Edit
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isCreatingCourse || isUpdatingCourse || !isValid}
                  sx={{ minWidth: 120 }}
                >
                  {isCreatingCourse || isUpdatingCourse
                    ? editingCourse
                      ? 'Updating...'
                      : 'Creating...'
                    : editingCourse
                      ? 'Update Course'
                      : 'Create Course'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>

        {/* Course List Section */}
        <div style={getThemedStyle(addCourseStyles.courseListSection)}>
          <h2 style={getThemedStyle(addCourseStyles.title)}>All Courses</h2>

          {/* View Toggle Buttons */}
          <div style={addCourseStyles.viewToggleContainer}>
            <button
              onClick={() => setCurrentView('table')}
              className="view-toggle-button"
              style={getThemedStyle(
                currentView === 'table'
                  ? addCourseStyles.viewToggleButtonActive
                  : addCourseStyles.viewToggleButton
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
              Table View
            </button>
            <button
              onClick={() => setCurrentView('grid')}
              className="view-toggle-button"
              style={getThemedStyle(
                currentView === 'grid'
                  ? addCourseStyles.viewToggleButtonActive
                  : addCourseStyles.viewToggleButton
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Grid View
            </button>
          </div>

          {isLoadingCourses ? (
            <div style={getThemedStyle(addCourseStyles.loading)}>
              Loading courses...
            </div>
          ) : coursesData?.data?.courses?.length === 0 ? (
            <div style={getThemedStyle(addCourseStyles.empty)}>
              No courses found. Add some to get started!
            </div>
          ) : (
            <>
              {currentView === 'table' ? (
                <table style={addCourseStyles.table}>
                  <thead>
                    <tr>
                      <th style={getThemedStyle(addCourseStyles.th)}>Title</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>
                        Description
                      </th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Price</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>Image</th>
                      <th style={getThemedStyle(addCourseStyles.th)}>
                        Actions
                      </th>{' '}
                      {/* NEW ACTIONS COLUMN */}
                    </tr>
                  </thead>
                  <tbody>
                    {coursesData?.data?.courses?.map((courseItem) => (
                      <tr
                        key={courseItem._id}
                        className="course-tr"
                        style={getThemedStyle(addCourseStyles.tr)}
                      >
                        <td
                          style={getThemedStyle(addCourseStyles.td)}
                          data-label="Title"
                        >
                          {courseItem.title}
                        </td>
                        <td
                          style={getThemedStyle(addCourseStyles.td)}
                          data-label="Description"
                        >
                          {courseItem.description}
                        </td>
                        <td
                          style={getThemedStyle(addCourseStyles.td)}
                          data-label="Price"
                        >
                          ₹{courseItem.price}
                        </td>
                        <td
                          style={getThemedStyle(addCourseStyles.td)}
                          data-label="Image"
                        >
                          {courseItem.image ? (
                            <img
                              src={courseItem.image}
                              alt={courseItem.title}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                              }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td
                          style={getThemedStyle(addCourseStyles.td)}
                          data-label="Actions"
                        >
                          {' '}
                          {/* NEW ACTIONS CELL */}
                          <button
                            onClick={() => handleEditClick(courseItem)}
                            className="action-button edit-button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(
                                courseItem._id,
                                courseItem.title
                              )
                            }
                            className="action-button delete-button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Delete
                          </button>
                          <button
                            onClick={() => handleViewCourse(courseItem)}
                            className="action-button view-button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={addCourseStyles.gridContainer}>
                  {coursesData?.data?.courses?.map((courseItem) => (
                    <div
                      key={courseItem._id}
                      className="course-card"
                      style={getThemedStyle(addCourseStyles.courseCard)}
                    >
                      <div style={addCourseStyles.cardImageWrapper}>
                        <img
                          src={
                            courseItem.image ||
                            'https://placehold.co/400x250/E2E8F0/64748B?text=No+Image'
                          }
                          alt={courseItem.title}
                          style={addCourseStyles.cardImage}
                        />
                      </div>
                      <div style={getThemedStyle(addCourseStyles.cardContent)}>
                        <h3 style={getThemedStyle(addCourseStyles.cardTitle)}>
                          {courseItem.title}
                        </h3>
                        <p
                          style={getThemedStyle(
                            addCourseStyles.cardDescription
                          )}
                        >
                          {courseItem.description}
                        </p>
                        <div style={getThemedStyle(addCourseStyles.cardFooter)}>
                          <div
                            style={{
                              display: 'flex',
                              gap: '0.5rem',
                              marginTop: '0.75rem',
                              flexWrap: 'wrap',
                            }}
                          >
                            <button
                              onClick={() => handleEditClick(courseItem)}
                              className="action-button edit-button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(
                                  courseItem._id,
                                  courseItem.title
                                )
                              }
                              className="action-button delete-button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                              Delete
                            </button>
                            <button
                              onClick={() => handleViewCourse(courseItem)}
                              className="action-button view-button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse as Course}
      />
    </>
  )
}
