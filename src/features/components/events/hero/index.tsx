import React from 'react';
import { Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { StackStyled, WrapperStyled } from './styles.component';

export const HeroSection = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StackStyled>
      <WrapperStyled>
        <Stack spacing={2} alignItems="center">
          <Typography
            variant={isSm ? "subtitle2" : "body2.700"}
            color="neutral.white"
            textAlign="center"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Edunova Community Events
          </Typography>

          <Typography
            variant={isSm ? "h5" : "h3.700"}
            color="neutral.white"
            textAlign="center"
            sx={{ fontWeight: 700 }}
          >
            Join Our Learning Adventures!
          </Typography>
        </Stack>

        <Typography
          variant={isSm ? "body2" : "body1"}
          color="neutral.white"
          textAlign="center"
          maxWidth="800px"
          sx={{ mt: 3, fontSize: isSm ? '1rem' : undefined }}
        >
          Discover a world of engaging webinars, interactive workshops, and inspiring
          seminars designed to enrich your knowledge and connect you with experts
          and fellow learners. Don't miss out on upcoming opportunities to grow!
        </Typography>
      </WrapperStyled>
    </StackStyled>
  );
};