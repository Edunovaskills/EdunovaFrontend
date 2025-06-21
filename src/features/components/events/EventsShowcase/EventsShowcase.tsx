// src/components/EventsShowcase/EventsShowcase.tsx
import React, { useEffect, useState } from 'react';
import { CardContent, Divider, Stack, Typography, Box, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { Carousel } from 'entities/component'; // Assuming this is your Swiper wrapper
import { SwiperSlide } from 'swiper/react';
import { getEvents, IEvent } from '../../../../app/api/event.api'; // Import the API function and interface

// Import the styled components
import { CardStyled, ImgWrapperStyled, DescriptionContainer, EnrollButtonStyled } from './styles.component';

// Placeholder image URL for events
const PLACEHOLDER_EVENT_IMAGE_URL = 'https://placehold.co/400x300/F0F0F0/333333?text=Edunova+Event';

interface EventsShowcaseProps {
  // You might add props here if you want to pass filters (e.g., category, search) from a parent
  // category?: string;
  // searchQuery?: string;
}

const EventsShowcase: React.FC<EventsShowcaseProps> = (/* { category, searchQuery } */) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true); // Set loading to true at the start of fetch
        setError(null); // Clear any previous errors

        // Call the API function, passing any relevant filters
        // No 'upcoming' filter needed as per requirement for 'all events'
        const data = await getEvents(/* 1, 10, searchQuery */); // You can pass page, limit, search here
        setEvents(data.data.events);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred while loading events.');
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchEventsData();
  }, [/* category, searchQuery */]); // Re-run effect if filters change

  // Determine slides per view based on screen size
  const getSlidesPerView = () => {
    if (isSmallScreen) {
      return 1.1; // Show 1.1 cards to suggest more content, with a slight overlap
    }
    if (isMediumScreen) {
      return 2.2; // Show 2.2 cards on medium screens
    }
    if (isLargeScreen) {
      return 3.5; // Default for larger screens
    }
    return 3; // Fallback for other sizes
  };

  return (
    <Box sx={{ width: '100%', py: 4, px: 2 }}> {/* Add vertical and horizontal padding to the section */}
      {/* Heading and Description Section */}
      <Stack
        alignItems="center"
        spacing={2}
        sx={{ mb: 4, textAlign: 'center' }} // Margin bottom for spacing with carousel
      >
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'} // Adjust heading size for responsiveness
          component="h2" // Semantic HTML for main heading of the section
          color="text.primary"
          sx={{ fontWeight: 'bold' }}
        >
          Edunova Events
        </Typography>
        <Typography
                variant={'body1'}
                textAlign={'center'}
                maxWidth={isSmallScreen ? '100%' : '80%'} // Allow full width on small screens
                sx={{ fontSize: isSmallScreen ? '0.9rem' : '1rem' }} // Slightly smaller font on small screens
              >
                Travel through your education with ease and comfort at Edunova, where our courses provide top-notch lessons and skilled instructors for a safe, enriching academic journey—ideal for daily learning, skill enhancement, or intellectual growth.
              </Typography>
      </Stack>

      {/* Loading, Error, or No Events State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%' }}>
          <CircularProgress color="primary" size={60} />
          <Typography variant="h6" sx={{ ml: 2, color: theme.palette.text.secondary }}>Loading exciting events...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%' }}>
          <Typography variant="h6" color="error" textAlign="center">
            Oops! {error} Please try again later.
          </Typography>
        </Box>
      ) : events.length > 0 ? (
        /* Events Carousel */
        <Carousel
          slidesPerView={getSlidesPerView()}
          spaceBetween={isSmallScreen ? 15 : isMediumScreen ? 25 : 40} // Adjust space between slides dynamically
          centeredSlides={isSmallScreen} // Center slides on small screens
          loop={events.length > getSlidesPerView()} // Only loop if enough events
          autoplay={{
            delay: 4000, // Auto-scroll every 4 seconds
            disableOnInteraction: false, // Keep auto-play even after user interaction
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true, // Dynamic dots for a cleaner look
          }}
          navigation={!isSmallScreen} // Hide navigation arrows on small screens
          freeMode={true} // Allow free movement (swipe)
          grabCursor={true} // Indicate that the carousel is draggable
        >
          {events.map((event) => (
            <SwiperSlide key={event._id}>
              <CardStyled>
                <ImgWrapperStyled>
                  <img
                    src={event.image || PLACEHOLDER_EVENT_IMAGE_URL}
                    alt={event.title || 'Event Image'}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = PLACEHOLDER_EVENT_IMAGE_URL;
                    }}
                  />
                </ImgWrapperStyled>
                <Divider sx={{ mt: 2, mb: 1.5, borderColor: theme.palette.divider }} /> {/* Subtle divider */}
                <CardContent
                  component={Stack}
                  spacing={1} // Reduced spacing in card content
                  sx={{ flexGrow: 1, p: 1.5, pt: 0, pb: 1 }} // Adjust padding within content area
                >
                  <Typography
                    variant="h6" // Use a standard h6 for event titles
                    sx={{
                      fontWeight: theme.typography.fontWeightBold, // Make title bold
                      maxHeight: '3.2em', // Limit title to about 2 lines (adjust line-height as needed)
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.6em', // Explicit line height for title
                      color: theme.palette.text.primary,
                    }}
                  >
                    {event.title}
                  </Typography>

                  <DescriptionContainer variant="body2">
                    {event.description}
                  </DescriptionContainer>

                  <Typography
  variant="subtitle1" // Use subtitle1 for price for emphasis
  color="primary.main" // Highlight price with primary color
  sx={{ fontWeight: theme.typography.fontWeightBold, mt: 1 }} // Bold and some top margin
>
  Price: {event.price === 0 ? 'Free' : `₹${event.price}`}
</Typography>

                  <EnrollButtonStyled
                    variant="contained"
                    onClick={() => window.open(event.paymentUrl, '_blank')} // Open payment URL in new tab
                    disabled={!event.paymentUrl} // Disable button if no payment URL
                  >
                    Enroll Now
                  </EnrollButtonStyled>
                </CardContent>
              </CardStyled>
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        /* No Events Found State */
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', width: '100%' }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No events are available at the moment. Please check back later!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EventsShowcase; // Export as default for easier import