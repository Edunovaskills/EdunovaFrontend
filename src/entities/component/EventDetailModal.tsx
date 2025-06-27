import React from 'react'
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
  Chip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEventByIdAdminQuery } from 'entities/query'

const PLACEHOLDER_IMAGE_URL =
  'https://placehold.co/600x400/F0F0F0/333333?text=Event+Image'

interface EventDetailModalProps {
  open: boolean
  onClose: () => void
  eventId: string | null
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  open,
  onClose,
  eventId,
}) => {
  const { data, isLoading, isError } = useEventByIdAdminQuery(
    eventId || undefined
  )
  const event = data?.data?.event

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="event-detail-title"
      aria-describedby="event-detail-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        sx={{
          position: 'relative',
          width: { xs: '90%', sm: 500 },
          maxWidth: 600,
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          outline: 'none',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : isError || !event ? (
          <Typography color="error" sx={{ py: 4, textAlign: 'center' }}>
            Failed to load event details.
          </Typography>
        ) : (
          <>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <img
                src={event.image || PLACEHOLDER_IMAGE_URL}
                alt={event.title}
                style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 8 }}
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE_URL)}
              />
            </Box>
            <Typography
              id="event-detail-title"
              variant="h5"
              component="h2"
              gutterBottom
            >
              {event.title}
            </Typography>
            <Typography
              id="event-detail-description"
              sx={{
                mt: 2,
                mb: 2,
                maxHeight: '100px',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '8px',
                  backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#bdbdbd',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#888',
                },
              }}
            >
              <strong>Description:</strong> {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Price:</strong>{' '}
              {event.price === 0 ? 'Free' : `₹${event.price}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Status:</strong> {event.isActive ? 'Active' : 'Inactive'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Created At:</strong>{' '}
              {new Date(event.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Last Updated:</strong>{' '}
              {new Date(event.updatedAt).toLocaleString()}
            </Typography>
            {event.paymentUrl && (
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="Go to Payment Page"
                  color="primary"
                  component="a"
                  href={event.paymentUrl}
                  target="_blank"
                  clickable
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Modal>
  )
}
