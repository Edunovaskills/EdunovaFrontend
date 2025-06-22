import React from 'react'
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import { CalendarToday, AccessTime, MonetizationOn } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEventByIdQuery } from 'entities/query'
import { appPaths } from 'entities/config'
import { LoadingComponent } from 'shared/components'
import {
  EventDetailsWrapper,
  EventImage,
  EventContent,
  EnrollButton,
} from './styles.component'

type EventDetailsProps = {
  eventId: string
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { data, isLoading, isError } = useEventByIdQuery(eventId)

  const handleEnroll = () => {
    if (data?.data?.event?.paymentUrl) {
      window.open(data.data.event.paymentUrl, '_blank')
    }
  }

  const handleBackToEvents = () => {
    navigate(appPaths.events)
  }

  return (
    <LoadingComponent loading={isLoading} message="Loading event details...">
      <EventDetailsWrapper>
        {isError || !data?.data?.event ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              flexDirection: 'column',
              gap: 2,
              px: 2,
            }}
          >
            <Alert severity="error" sx={{ maxWidth: 600, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Event Not Found
              </Typography>
              <Typography variant="body1" gutterBottom>
                The event you're looking for doesn't exist or has been removed.
              </Typography>
              <Button
                variant="contained"
                onClick={handleBackToEvents}
                sx={{ mt: 2 }}
              >
                Back to Events
              </Button>
            </Alert>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
            {/* Back Button */}
            <Button
              variant="outlined"
              onClick={handleBackToEvents}
              sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              ← Back to Events
            </Button>

            <Grid container spacing={4}>
              {/* Event Image */}
              <Grid item xs={12} md={6}>
                <EventImage>
                  <img
                    src={
                      data.data.event.image ||
                      'https://placehold.co/600x400/F0F0F0/333333?text=Event+Image'
                    }
                    alt={data.data.event.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src =
                        'https://placehold.co/600x400/F0F0F0/333333?text=Event+Image'
                    }}
                  />
                </EventImage>
              </Grid>

              {/* Event Content */}
              <Grid item xs={12} md={6}>
                <EventContent>
                  <Stack spacing={3}>
                    {/* Title and Price */}
                    <Box>
                      <Typography
                        variant={isSmallScreen ? 'h4' : 'h3'}
                        component="h1"
                        gutterBottom
                        sx={{
                          fontWeight: 'bold',
                          color: theme.palette.text.primary,
                          lineHeight: 1.2,
                        }}
                      >
                        {data.data.event.title}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Chip
                          icon={<MonetizationOn />}
                          label={
                            data.data.event.price === 0
                              ? 'Free Event'
                              : `₹${data.data.event.price}`
                          }
                          color={
                            data.data.event.price === 0 ? 'success' : 'primary'
                          }
                          variant="filled"
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip label="Active" variant="outlined" size="medium" />
                      </Box>
                    </Box>

                    {/* Event Details */}
                    <Card elevation={2}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <CalendarToday color="primary" />
                            <Typography variant="body1">
                              Created:{' '}
                              {new Date(
                                data.data.event.createdAt
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <AccessTime color="primary" />
                            <Typography variant="body1">
                              Last Updated:{' '}
                              {new Date(
                                data.data.event.updatedAt
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Description */}
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        About This Event
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          color: theme.palette.text.secondary,
                          textAlign: 'justify',
                        }}
                      >
                        {data.data.event.description}
                      </Typography>
                    </Box>

                    {/* Enroll Button */}
                    <Box sx={{ pt: 2 }}>
                      <EnrollButton
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleEnroll}
                        disabled={!data.data.event.paymentUrl}
                        sx={{
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          textTransform: 'none',
                        }}
                      >
                        {data.data.event.paymentUrl
                          ? 'Enroll Now'
                          : 'Enrollment Unavailable'}
                      </EnrollButton>

                      {!data.data.event.paymentUrl && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                          sx={{ mt: 1 }}
                        >
                          Payment link is not available for this event
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </EventContent>
              </Grid>
            </Grid>
          </Box>
        )}
      </EventDetailsWrapper>
    </LoadingComponent>
  )
}

export default EventDetails
