import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

export const EventDetailsWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 0),
  },
}))

export const EventImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[8],
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover img': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(3),
  },
}))

export const EventContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  height: 'fit-content',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}))

export const EnrollButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[600],
    transform: 'none',
    boxShadow: 'none',
  },
}))
