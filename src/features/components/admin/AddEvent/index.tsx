import React, { useState, useEffect } from 'react'
import { addEventStyles } from './styles.component'
import { useForm, Controller } from 'react-hook-form'
import { eventSchema, type EventSchema } from 'features/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAllEventsQuery } from 'entities/query'
import {
  CardStyled,
  ImgWrapperStyled,
  DescriptionContainer,
  EnrollButtonStyled,
} from 'features/components/events/EventsShowcase/styles.component'
import {
  Typography,
  CardContent,
  Button,
  TextField,
  Box,
  Divider,
  Stack,
  useTheme,
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
} from '@mui/icons-material'
import { useCreateEventMutation } from 'entities/mutation'
import { useAppNavigate } from 'entities/state'
import { useSnackBar } from 'entities/state'
import type { Event } from 'entities/model'
import { addBlogStyles } from '../AddBlog/styles.component'

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

  // Mutations
  const { mutateAsync, isPending: isCreatingEvent } = useCreateEventMutation()

  // Snackbar for notifications
  const { show: showSnackbar } = useSnackBar()

  // TanStack Query for events with pagination and search
  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
    error: eventsError,
    refetch: refetchEvents,
  } = useAllEventsQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: debouncedSearchQuery,
  })

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

  // Create event function
  const createEvent = async (data: EventSchema) => {
    try {
      if (!selectedImageFile) {
        showSnackbar({
          title: 'Please select an image for the event.',
          color: 'Error',
        })
        return
      }
      await mutateAsync({ data, imageFile: selectedImageFile })
      setSelectedImageFile(null)
      reset()
      refetchEvents() // Re-fetch events to update the list
      showSnackbar({
        title: 'Event created successfully!',
        color: 'Success',
      })
    } catch (error: any) {
      showSnackbar({
        title: error?.response?.data?.message || 'Failed to create event.',
        color: 'Error',
      })
    }
  }

  // Image upload handlers
  const handleImageChange = (file: File, onChange: (value: string) => void) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImageFile(file) // <-- Save the file for upload
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

  // Form submit
  const onSubmit = (data: EventSchema) => {
    createEvent(data)
  }

  const theme = useTheme()
  const { appNavigate } = useAppNavigate()

  const handleEventClick = (eventId: string) => {
    appNavigate('eventDetail', { eventId })
  }

  const handleEnrollClick = (e: React.MouseEvent, paymentUrl: string) => {
    e.stopPropagation() // Prevent card click when clicking enroll button
    if (paymentUrl) {
      window.open(paymentUrl, '_blank')
    }
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

  return (
    <div
      style={{
        ...addEventStyles.container,
      }}
    >
      <h2
        style={{
          ...addEventStyles.title,
        }}
      >
        Add New Event
      </h2>

      <form
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
        style={addEventStyles.form}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Event Title"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
            required
            variant="outlined"
          />
        </Box>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Payment URL"
          type="text"
          {...register('paymentUrl')}
          error={!!errors.paymentUrl}
          helperText={errors.paymentUrl?.message}
          placeholder="e.g., https://example.com/event"
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Photo Upload Section */}
        <div style={addEventStyles.field}>
          <label style={addEventStyles.label}>Event Photo</label>
          <Controller
            name="image"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                {!value ? (
                  <div
                    style={{
                      ...addEventStyles.uploadArea,
                      ...(dragActive ? addEventStyles.uploadAreaActive : {}),
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, onChange)}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInputChange(e, onChange)}
                      style={addEventStyles.fileInput}
                      id="event-image-upload"
                    />
                    <label
                      htmlFor="event-image-upload"
                      style={addEventStyles.uploadLabel}
                    >
                      <div style={addEventStyles.uploadIcon}>📸</div>
                      <div style={addEventStyles.uploadText}>
                        <p style={addEventStyles.uploadMainText}>
                          Click to upload or drag and drop
                        </p>
                        <p style={addEventStyles.uploadSubText}>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div style={addEventStyles.imagePreviewContainer}>
                    <img
                      src={value}
                      alt="Event preview"
                      style={addEventStyles.imagePreview}
                    />
                    <div style={addEventStyles.imageOverlay}>
                      <button
                        type="button"
                        onClick={() => removeImage(onChange)}
                        style={addEventStyles.removeButton}
                      >
                        ✕ Remove
                      </button>
                      <label
                        htmlFor="event-image-replace"
                        style={addEventStyles.replaceButton}
                      >
                        🔄 Replace
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileInputChange(e, onChange)}
                        style={addEventStyles.fileInput}
                        id="event-image-replace"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid || isCreatingEvent}
          sx={{ mt: 2 }}
        >
          {isCreatingEvent ? 'Creating Event...' : 'Create Event'}
        </Button>
      </form>

      {/* Events List Section */}
      <div style={addEventStyles.eventListSection}>
        <h2
          style={{
            ...addEventStyles.title,
          }}
        >
          All Events
        </h2>

        {/* Search and View Toggle */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
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
            sx={{ flexGrow: 1, maxWidth: 400 }}
          />
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={toggleView}
            aria-label="event view"
            size="small"
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

        {/* Loading, Error, or No Events Found States */}
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
              // Table View
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
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover' as const,
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
                            style={{ color: '#3b82f6', textDecoration: 'none' }}
                          >
                            Link
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
                              size="small"
                              onClick={() => handleEventClick(event._id)}
                              aria-label="view event"
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              aria-label="edit event"
                              disabled={!event.isActive}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              aria-label="delete event"
                              disabled={!event.isActive}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* Table Pagination */}
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
              // Grid View
              <Stack>
                <div style={addEventStyles.gridContainer}>
                  {events.map((event) => (
                    <CardStyled
                      key={event._id}
                      onClick={() => handleEventClick(event._id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ImgWrapperStyled>
                        <img
                          src={event.image || PLACEHOLDER_EVENT_IMAGE_URL}
                          alt={event.title || 'Event Image'}
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement
                            target.src = PLACEHOLDER_EVENT_IMAGE_URL
                          }}
                        />
                      </ImgWrapperStyled>
                      <Divider
                        sx={{
                          mt: 2,
                          mb: 1.5,
                          borderColor: theme.palette.divider,
                        }}
                      />
                      <CardContent
                        component={Stack}
                        spacing={1}
                        sx={{ flexGrow: 1, p: 1.5, pt: 0, pb: 1 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.fontWeightBold,
                            maxHeight: '3.2em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.6em',
                            color: theme.palette.text.primary,
                          }}
                        >
                          {event.title}
                        </Typography>

                        <DescriptionContainer variant="body2">
                          {event.description}
                        </DescriptionContainer>

                        <Box sx={{ flexGrow: 1 }} />

                        <Typography
                          variant="body2.400"
                          color="primary.main"
                          sx={{
                            fontWeight: theme.typography.fontWeightBold,
                            mt: 1,
                          }}
                        >
                          Price:{' '}
                          {event.price === 0 ? 'Free' : `₹${event.price}`}
                        </Typography>
                      </CardContent>
                    </CardStyled>
                  ))}
                </div>
                {/* Grid View Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalEvents}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Stack>
            )}
          </>
        )}
      </div>
    </div>
  )
}
