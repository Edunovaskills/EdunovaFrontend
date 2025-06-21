import React from 'react';
import { Stack, Typography } from '@mui/material';
import { StackStyled, WrapperStyled } from './styles.component'; // Assuming these styled components are appropriate for the new theme's layout

export const HeroSection = () => {
  return (
    <StackStyled>
      <WrapperStyled>
        <Stack spacing={2} alignItems="center">
          <Typography
            variant="body2.700" // Assuming body2.700 is a bold, smaller text style
            color="neutral.white"
            textAlign={'center'}
          >
            Edunova Community Events
          </Typography>

          <Typography
            variant="h3.700" // Assuming h3.700 is a large, bold heading style
            color="neutral.white"
            textAlign={'center'}
          >
            Join Our Learning Adventures!
          </Typography>
        </Stack>

        <Typography
          variant="body1" // Standard body text
          color="neutral.white"
          textAlign={'center'}
          maxWidth={'800px'} // Adjusted max width for better readability
          sx={{ mt: 3 }} // Added top margin to separate from the heading stack
        >
          Discover a world of engaging webinars, interactive workshops, and inspiring
          seminars designed to enrich your knowledge and connect you with experts
          and fellow learners. Don't miss out on upcoming opportunities to grow!
        </Typography>
      </WrapperStyled>
    </StackStyled>
  );
};