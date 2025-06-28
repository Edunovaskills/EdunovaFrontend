import { Box, Stack, Typography, Avatar, styled } from '@mui/material';

export const SectionWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

export const TestimonialsStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(4),
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const TestimonialCard = styled(Box)(({ theme }) => ({
  maxWidth: 300,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90vw',
    padding: theme.spacing(1.5),
  },
}));

export const AvatarNameStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  fontSize: '1.5rem',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
    fontSize: '1.1rem',
  },
}));
