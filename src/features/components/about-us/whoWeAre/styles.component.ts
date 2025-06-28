import { styled } from '@mui/material'

export const TestimonialsWrapperStyled = styled('div')<{ issmall: boolean; ismedium?: boolean }>(
  ({ issmall, ismedium }) => ({
    display: 'flex',
    width: '100%',
    gap: issmall ? '12px' : '16px',
    flexWrap: 'wrap',
    justifyContent: issmall ? 'center' : ismedium ? 'center' : 'space-between',
    padding: issmall ? '10px 0' : '20px 0',
    '& .MuiCard-root': {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: issmall ? '100%' : ismedium ? '45%' : '30%',
      maxWidth: '400px',
      minWidth: issmall ? 'auto' : '250px',
      padding: issmall ? '12px' : '16px',
    },
    '& .MuiAvatar-root': {
      width: issmall ? '50px' : '60px',
      height: issmall ? '50px' : '60px',
      margin: '0 auto 10px',
    },
    '& .MuiTypography-h6': {
      fontSize: issmall ? '1rem' : '1.25rem',
    },
    '& .MuiTypography-body2': {
      fontSize: issmall ? '0.85rem' : '0.95rem',
    },
  })
);
