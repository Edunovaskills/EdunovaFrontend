import React, { useState } from 'react'
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
} from '@mui/material'
import { useCreateEventMutation } from 'entities/mutation'
import { useAppNavigate } from 'entities/state'

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
  const [isGridView, setIsGridView] = useState(true)
  const { mutateAsync, isPending: isCreatingEvent } = useCreateEventMutation()

  // TanStack Query for events
  const { data: eventsData, isLoading: isLoadingEvents } = useAllEventsQuery()
  const events = eventsData?.data?.events || []

  // TODO: Replace with actual mutation hook
  const createEvent = async (data: EventSchema) => {
    // Implement mutation logic here
    // On success: reset(); refetch events query
    await mutateAsync({
      title: data.title,
      description: data.description,
      price: data.price,
      paymentUrl: data.paymentUrl,
      image: data.image,
    })
    reset()
  }

  // Image upload handlers
  const handleImageChange = (file: File, onChange: (value: string) => void) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const url = URL.createObjectURL(file)
        onChange(url)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file (PNG, JPG, GIF)')
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
          loading={isCreatingEvent}
          sx={{ mt: 2 }}
        >
          {'Create Event'}
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

        {/* View Toggle Buttons */}
        <div style={addEventStyles.viewToggleContainer}>
          <button
            onClick={() => setIsGridView(true)}
            style={{
              ...addEventStyles.viewToggleButton,
              ...(isGridView ? addEventStyles.viewToggleButtonActive : {}),
            }}
          >
            <span>&#9638; Grid View</span>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            style={{
              ...addEventStyles.viewToggleButton,
              ...(!isGridView ? addEventStyles.viewToggleButtonActive : {}),
            }}
          >
            <span>&#9776; Table View</span>
          </button>
        </div>

        {isLoadingEvents ? (
          <div>Loading events...</div>
        ) : events.length === 0 ? (
          <p style={{ textAlign: 'center', color: addEventStyles.label.color }}>
            No events found. Add some!
          </p>
        ) : isGridView ? (
          // Grid View: Use the same card as home page
          <div style={addEventStyles.gridContainer}>
            {events.map((event) => (
              <CardStyled
                onClick={() => handleEventClick(event._id)}
                sx={{ cursor: 'pointer' }}
              >
                <ImgWrapperStyled>
                  <img
                    src={event.image || PLACEHOLDER_EVENT_IMAGE_URL}
                    alt={event.title || 'Event Image'}
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = PLACEHOLDER_EVENT_IMAGE_URL
                    }}
                  />
                </ImgWrapperStyled>
                <Divider
                  sx={{ mt: 2, mb: 1.5, borderColor: theme.palette.divider }}
                />{' '}
                <CardContent
                  component={Stack}
                  spacing={1}
                  sx={{ flexGrow: 1, p: 1.5, pt: 0, pb: 1 }} // Adjust padding within content area
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
                    Price: {event.price === 0 ? 'Free' : `₹${event.price}`}
                  </Typography>

                  <EnrollButtonStyled
                    variant="contained"
                    onClick={(e) => handleEnrollClick(e, event.paymentUrl)}
                    disabled={!event.paymentUrl}
                  >
                    Enroll Now
                  </EnrollButtonStyled>
                </CardContent>
              </CardStyled>
            ))}
          </div>
        ) : (
          // Table View
          <table style={addEventStyles.table}>
            <thead>
              <tr>
                <th style={addEventStyles.th}>Title</th>
                <th style={addEventStyles.th}>Description</th>
                <th style={addEventStyles.th}>Price</th>
                <th style={addEventStyles.th}>Payment URL</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td style={addEventStyles.td}>{event.title}</td>
                  <td style={addEventStyles.td}>{event.description}</td>
                  <td style={addEventStyles.td}>{event.price}</td>
                  <td style={addEventStyles.td}>
                    <a
                      href={event.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'none' }}
                    >
                      Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
