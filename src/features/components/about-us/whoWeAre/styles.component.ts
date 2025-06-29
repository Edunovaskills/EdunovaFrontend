import { styled, Box, Card } from '@mui/material';

export const SectionContainerStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 3),
  maxWidth: '1400px',
  margin: '0 auto',
  background: 'linear-gradient(180deg, #fafbff 0%, #f8f9fa 100%)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 1.5),
  },
}));

export const MainContentStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '32px',
  boxShadow: '0 16px 64px rgba(0,0,0,0.08)',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    borderRadius: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '20px',
  },
}));

export const HighlightBoxStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  borderLeft: '4px solid #667eea',
  borderRadius: '12px',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const ValueCardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(102, 126, 234, 0.15)',
    borderColor: 'rgba(102, 126, 234, 0.2)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    '&:hover': {
      transform: 'translateY(-6px)',
    },
  },
}));

export const IconWrapperStyled = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    '& svg': {
      width: '20px',
      height: '20px',
    },
  },
}));