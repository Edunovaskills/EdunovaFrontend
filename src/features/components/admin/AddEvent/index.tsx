import React, { useState, useEffect, useRef } from 'react'
import { addEventStyles } from './styles.component'
import { useForm, Controller } from 'react-hook-form'
import { eventSchema, type EventSchema } from 'features/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useAllEventsForAdminQuery,
  useEventByIdAdminQuery,
} from 'entities/query'

import {
  Typography,
  Button,
  TextField,
  Box,
  Stack,
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
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material'
import {
  Search,
  TableRows,
  GridView,
  Edit,
  Delete,
  Visibility,
  Close,
  CloudUpload,
} from '@mui/icons-material'
import {
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from 'entities/mutation'
import { useSnackBar } from 'entities/state'
import type { Event } from 'entities/model'
import { addBlogStyles } from '../AddBlog/styles.component'
import { ConfirmDialog } from 'entities/component/ConfirmDialog'
import { EventDetailModal } from 'entities/component/EventDetailModal'

const PLACEHOLDER_EVENT_IMAGE_URL =
  'https://placehold.co/400x300/F0F0F0/333333?text=Edunova+Event'

export const AddEvent: React.FC = () => {
  // Form setup
  const form = useForm<EventSchema>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      paymentUrl: '',
      image: '',
    },
    mode: 'onTouched',
  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid },
  } = form
  const [dragActive, setDragActive] = useState(false)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)

  // View state management
  const [currentView, setCurrentView] = useState<'table' | 'grid'>(() => {
    // Initialize currentView from localStorage, default to 'grid'
    return (localStorage.getItem('eventView') as 'table' | 'grid') || 'grid'
  })

  // Pagination and search state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Edit and delete state
  const [editEventId, setEditEventId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [eventToDeleteId, setEventToDeleteId] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  // Mutations
  const { mutateAsync: createEventAsync, isPending: isCreatingEvent } =
    useCreateEventMutation()
  const { mutateAsync: updateEventAsync, isPending: isUpdatingEvent } =
    useUpdateEventMutation()
  const { mutateAsync: deleteEventAsync, isPending: isDeletingEvent } =
    useDeleteEventMutation()

  // Snackbar for notifications
  const { show: showSnackbar } = useSnackBar()

  // TanStack Query for events with pagination and search
  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    error: eventsError,
    refetch: refetchEvents,
  } = useAllEventsForAdminQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: debouncedSearchQuery,
  })

  // Query for single event when editing
  const { data: singleEventData } = useEventByIdAdminQuery(
    editEventId || undefined
  )

  // Debounce search query to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Persist current view preference to localStorage
  useEffect(() => {
    localStorage.setItem('eventView', currentView)
  }, [currentView])

  // Ref for the form container
  const formRef = useRef<HTMLDivElement>(null)

  // Populate form when editing
  useEffect(() => {
    if (singleEventData?.data?.event && editEventId) {
      const event = singleEventData.data.event
      setValue('title', event.title)
      setValue('description', event.description)
      setValue('price', event.price)
      setValue('paymentUrl', event.paymentUrl)
      setValue('image', event.image)
      setIsEditMode(true)
    }
  }, [singleEventData, editEventId, setValue])

  // Scroll to form when entering edit mode and data is loaded
  useEffect(() => {
    if (isEditMode && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isEditMode, singleEventData])

  // Create/Update event function
  const handleSubmitEvent = async (data: EventSchema) => {
    try {
      if (!selectedImageFile && !isEditMode) {
        showSnackbar({
          title: 'Please select an image for the event.',
          color: 'Error',
        })
        return
      }

      if (isEditMode && editEventId) {
        await updateEventAsync({
          eventId: editEventId,
          data,
          imageFile: selectedImageFile || undefined,
        })
        handleCancelEdit()
      } else {
        await createEventAsync({ data, imageFile: selectedImageFile! })
        setSelectedImageFile(null)
        reset()
      }

      refetchEvents() // Re-fetch events to update the list
    } catch (error: any) {
      showSnackbar({
        title: error?.response?.data?.message || 'Failed to save event.',
        color: 'Error',
      })
    }
  }

  // Handle edit event
  const handleEditEvent = (eventId: string) => {
    setEditEventId(eventId)
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditEventId(null)
    setIsEditMode(false)
    setSelectedImageFile(null)
    reset()
  }

  // Handle delete event
  const handleDeleteEventClick = (eventId: string) => {
    setEventToDeleteId(eventId)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (eventToDeleteId) {
      await deleteEventAsync(eventToDeleteId)
      setDeleteConfirmOpen(false)
      setEventToDeleteId(null)
    }
  }

  // Image upload handlers
  const handleImageChange = (file: File, onChange: (value: string) => void) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImageFile(file)
      const url = URL.createObjectURL(file)
      onChange(url)
    } else {
      showSnackbar({
        title: 'Please select a valid image file (PNG, JPG, GIF)',
        color: 'Error',
      })
      setSelectedImageFile(null)
      onChange('')
    }
  }

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) handleImageChange(file, onChange)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (
    e: React.DragEvent,
    onChange: (value: string) => void
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageChange(file, onChange)
  }

  const removeImage = (onChange: (value: string) => void) => {
    onChange('')
    setSelectedImageFile(null)
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

  // Extract events data and total count
  const events = eventsData?.data?.events || []
  const totalEvents = eventsData?.total || 0

  // State for event detail modal
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewEventId, setViewEventId] = useState<string | null>(null)

  return (
    <div ref={formRef} style={addEventStyles.container}>
      <Box sx={addEventStyles.header}>
        <Typography variant="h4" component="h1" sx={addEventStyles.title}>
          {isEditMode ? 'Edit Event' : 'Add New Event'}
        </Typography>
        {isEditMode && (
          <Button
            variant="outlined"
            onClick={handleCancelEdit}
            startIcon={<Close />}
          >
            Cancel Edit
          </Button>
        )}
      </Box>

      <Paper elevation={2} sx={addEventStyles.formContainer}>
        <form onSubmit={handleSubmit(handleSubmitEvent)}>
          <Stack spacing={3}>
            <TextField
              {...register('title')}
              label="Event Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              {...register('description')}
              label="Event Description"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              {...register('price')}
              label="Event Price"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              {...register('paymentUrl')}
              label="Payment URL"
              fullWidth
              error={!!errors.paymentUrl}
              helperText={errors.paymentUrl?.message}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Event Image
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed',
                      borderColor: dragActive ? 'primary.main' : 'grey.300',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: dragActive
                        ? 'action.hover'
                        : 'background.paper',
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, field.onChange)}
                    onClick={() =>
                      document.getElementById('image-upload')?.click()
                    }
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileInputChange(e, field.onChange)}
                    />
                    <CloudUpload
                      sx={{ fontSize: 48, color: 'grey.500', mb: 2 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {field.value
                        ? 'Image selected'
                        : 'Drag and drop an image or click to select'}
                    </Typography>
                    {field.value && (
                      <Box
                        sx={{
                          mt: 2,
                          position: 'relative',
                          display: 'inline-block',
                        }}
                      >
                        <img
                          src={field.value}
                          alt="Preview"
                          style={{
                            maxWidth: '200px',
                            maxHeight: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => removeImage(field.onChange)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            background: 'rgba(255,255,255,0.8)',
                            zIndex: 2,
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isValid || isCreatingEvent || isUpdatingEvent}
              sx={addEventStyles.submitButton}
            >
              {isCreatingEvent || isUpdatingEvent ? (
                <CircularProgress size={24} />
              ) : isEditMode ? (
                'Update Event'
              ) : (
                'Create Event'
              )}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" sx={addEventStyles.subHeader}>
          Existing Events
        </Typography>

        <Box sx={addEventStyles.searchAndSwitchContainer}>
          <TextField
            label="Search Events"
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
            sx={addEventStyles.searchField}
          />
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={toggleView}
            aria-label="event view"
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

        {isLoadingEvents ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : isErrorEvents ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading events: {eventsError?.message}
          </Alert>
        ) : events.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No events found.
          </Alert>
        ) : (
          <>
            {currentView === 'table' ? (
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Description
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Payment URL
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event: Event) => (
                      <TableRow key={event._id}>
                        <TableCell>
                          <img
                            src={event.image || PLACEHOLDER_EVENT_IMAGE_URL}
                            alt={event.title}
                            style={{
                              width: '60px',
                              height: '40px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                        </TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>
                          {event.description.length > 50
                            ? `${event.description.substring(0, 50)}...`
                            : event.description}
                        </TableCell>
                        <TableCell>
                          {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </TableCell>
                        <TableCell>
                          <a
                            href={event.paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit' }}
                          >
                            {event.paymentUrl.length > 30
                              ? `${event.paymentUrl.substring(0, 30)}...`
                              : event.paymentUrl}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={event.isActive ? 'Active' : 'Inactive'}
                            color={event.isActive ? 'success' : 'error'}
                            variant="filled"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              justifyContent: 'flex-end',
                            }}
                          >
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditEvent(event._id)}
                              disabled={!event.isActive || isEditMode}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteEventClick(event._id)}
                              disabled={
                                !event.isActive || isDeletingEvent || isEditMode
                              }
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => {
                                setViewEventId(event._id)
                                setViewModalOpen(true)
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalEvents}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            ) : (
              <Stack>
                <Box sx={addEventStyles.eventGrid}>
                  {events.map((event: Event) => (
                    <Paper
                      key={event._id}
                      elevation={2}
                      sx={{
                        ...addEventStyles.eventCard,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <img
                        src={event.image || PLACEHOLDER_EVENT_IMAGE_URL}
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          p: 2,
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {event.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {event.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: 'bold', mb: 2 }}
                        >
                          Price:{' '}
                          {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 'auto',
                          }}
                        >
                          <Chip
                            label={event.isActive ? 'Active' : 'Inactive'}
                            color={event.isActive ? 'success' : 'error'}
                            variant="filled"
                            size="small"
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditEvent(event._id)}
                              disabled={!event.isActive || isEditMode}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteEventClick(event._id)}
                              disabled={
                                !event.isActive || isDeletingEvent || isEditMode
                              }
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => {
                                setViewEventId(event._id)
                                setViewModalOpen(true)
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalEvents}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={addEventStyles.paginationContainer}
                />
              </Stack>
            )}
          </>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        loading={isDeletingEvent}
        onClose={() => {
          setDeleteConfirmOpen(false)
          setEventToDeleteId(null)
        }}
      />

      <EventDetailModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        eventId={viewEventId}
      />
    </div>
  )
}
