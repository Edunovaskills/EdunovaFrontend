// src/components/EventsShowcase/styles.component.ts

import { Card, styled, Typography, Button } from '@mui/material';

export const CardStyled = styled(Card)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(1),
  width: '100%', // Take full width within its SwiperSlide
  // --- KEY CHANGE FOR FIXED HEIGHT ---
  // Define an explicit height for the card on larger screens
  // This value should be carefully chosen based on your design
  // and the maximum content you expect (title, image, 3 lines of desc, button).
  height: '500px', // Fixed height for consistency
  maxHeight: '600px', // Ensure it doesn't exceed this even if content tries to push
  aspectRatio: 'unset', // Remove aspectRatio if you're using fixed height
  // --- END KEY CHANGE ---

  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  boxSizing: 'border-box',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)',
  },

  [theme.breakpoints.down('md')]: {
    height: '380px', // Adjust height for medium screens if needed
    maxHeight: '380px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%', // Occupy 90% of the parent width
    margin: '0 auto', // Center the card
    height: '360px', // Adjust height for small screens
    maxHeight: '360px',
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    width: '95%',
    height: '350px', // Adjust height for extra small screens
    maxHeight: '350px',
  },
}));

export const ImgWrapperStyled = styled('div')(({ theme }) => ({
  width: '100%',
  // Define a fixed height for the image wrapper to reserve space
  height: '180px', // Adjust this value to fit your design
  position: 'relative',
  marginInline: 'auto',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  flexShrink: 0,
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    height: '160px', // Adjust for medium
  },
  [theme.breakpoints.down('sm')]: {
    height: '140px', // Adjust for small
  },
}));

export const DescriptionContainer = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3, // Limit to 3 lines
  WebkitBoxOrient: 'vertical',
  // --- KEY CHANGE: Ensure explicit height for description ---
  // Calculate height based on line height for 3 lines
  height: `calc(${theme.typography.body2.lineHeight} * 3)`,
  // Ensure that 'theme.typography.body2.lineHeight' is a valid CSS length string (e.g., '1.5em')
  // If it's just a number, you might need to append 'em' or 'px'.
  // Example: theme.typography.body2.lineHeight || '1.5em'
  // Or explicitly set a height like '4.5em' or '60px'
  // ----------------------------------------------------
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    WebkitLineClamp: 2, // Reduce to 2 lines on small screens if space is tight
    height: `calc(${theme.typography.body2.lineHeight} * 2)`, // Adjust height for 2 lines
    fontSize: '0.8rem',
  },
}));

export const EnrollButtonStyled = styled(Button)(({ theme }) => ({
  // Removed marginTop: 'auto' because CardContent will handle vertical spacing
  width: '100%',
  padding: theme.spacing(1.2, 2),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'none',
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  boxShadow: theme.shadows[3],
  transition: 'background 0.3s ease, transform 0.2s ease',

  '&:hover': {
    background: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: theme.spacing(1, 1.5),
  },
}));

export const PriceStyled = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
  // Ensure explicit fixed height for the price line
  // Use a height that fits one line of subtitle1 text
  height: getLineHeightPx(theme, 'subtitle1', 1), // Fixed height for price
  marginTop: 'auto', // Pushes price and button to bottom, ensuring even spacing for desc
  // marginBottom: theme.spacing(1), // Can add space above button if desired
}));