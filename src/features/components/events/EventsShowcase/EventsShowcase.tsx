import React from 'react'
import {
  CardContent,
  Divider,
  Stack,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Carousel } from 'entities/component'
import { SwiperSlide } from 'swiper/react'
import { LoadingComponent } from 'shared/components'

import {
  CardStyled,
  ImgWrapperStyled,
  DescriptionContainer,
  EnrollButtonStyled,
} from './styles.component'
import { useAllEventsQuery } from 'entities/query'
import { useAppNavigate } from 'entities/state'

// Placeholder image URL for events
const PLACEHOLDER_EVENT_IMAGE_URL =
  'https://placehold.co/400x300/F0F0F0/333333?text=Edunova+Event'

const EventsShowcase = () => {
  const { data, isLoading, isError } = useAllEventsQuery()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const getSlidesPerView = () => {
    if (isSmallScreen) {
      return 1.1
    }
    if (isMediumScreen) {
      return 2.2
    }
    if (isLargeScreen) {
      return 3.5
    }
    return 3
  }

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
    <Box sx={{ width: '100%', py: 4, px: 2 }}>
      <Stack
        alignItems="center"
        spacing={2}
        sx={{ mb: 4, textAlign: 'center' }}
      >
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          component="h2" // Semantic HTML for main heading of the section
          color="text.primary"
          sx={{ fontWeight: 'bold' }}
        >
          Edunova Events
        </Typography>
        <Typography
          variant={'body1'}
          textAlign={'center'}
          maxWidth={isSmallScreen ? '100%' : '80%'}
          sx={{ fontSize: isSmallScreen ? '0.9rem' : '1rem' }}
        >
          Travel through your education with ease and comfort at Edunova, where
          our courses provide top-notch lessons and skilled instructors for a
          safe, enriching academic journey—ideal for daily learning, skill
          enhancement, or intellectual growth.
        </Typography>
      </Stack>

      <LoadingComponent
        loading={isLoading}
        message="Loading exciting events..."
        minHeight="300px"
      >
        {isError ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              width: '100%',
            }}
          >
            <Typography variant="h6" color="error" textAlign="center">
              Oops! Please try again later.
            </Typography>
          </Box>
        ) : (data?.data?.events.length ?? 0) > 0 ? (
          <Carousel
            slidesPerView={getSlidesPerView()}
            spaceBetween={isSmallScreen ? 15 : isMediumScreen ? 25 : 40}
            centeredSlides={isSmallScreen}
            loop={(data?.data?.events.length ?? 0) > getSlidesPerView()}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={!isSmallScreen}
            freeMode={true}
            grabCursor={true}
          >
            {data?.data?.events.map((event) => (
              <SwiperSlide key={event._id}>
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
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              width: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No events are available at the moment. Please check back later!
            </Typography>
          </Box>
        )}
      </LoadingComponent>
    </Box>
  )
}

export default EventsShowcase // Export as default for easier import
