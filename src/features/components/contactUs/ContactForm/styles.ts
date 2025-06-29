import { styled, Box, Card, Button, Typography } from '@mui/material';

export const SectionContainerStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 3),
  maxWidth: '1400px',
  margin: '0 auto',
  background: 'linear-gradient(180deg, #ffffff 0%, #fafbff 30%, #f8f9fa 70%, #ffffff 100%)',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 1.5),
  },
}));

export const FloatingShapeStyled = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 50%, rgba(240, 147, 251, 0.08) 100%)',
  filter: 'blur(2px)',
  animation: 'floatShape 20s ease-in-out infinite',
  zIndex: 1,
  '&.shape-1': {
    width: '200px',
    height: '200px',
    top: '10%',
    left: '5%',
    animationDelay: '0s',
  },
  '&.shape-2': {
    width: '150px',
    height: '150px',
    top: '60%',
    right: '10%',
    animationDelay: '7s',
  },
  '&.shape-3': {
    width: '100px',
    height: '100px',
    bottom: '20%',
    left: '15%',
    animationDelay: '14s',
  },
  '@keyframes floatShape': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) rotate(0deg)',
    },
    '33%': {
      transform: 'translateY(-20px) translateX(15px) rotate(120deg)',
    },
    '66%': {
      transform: 'translateY(15px) translateX(-10px) rotate(240deg)',
    },
  },
});

export const AnimatedIconStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '80px',
  height: '80px',
  margin: '0 auto 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.25)',
  animation: 'iconFloat 4s ease-in-out infinite',
  '& .sparkle': {
    position: 'absolute',
    color: 'white',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  '& .sparkle-1': {
    top: '-6px',
    right: '-6px',
    animationDelay: '0s',
  },
  '& .sparkle-2': {
    bottom: '-4px',
    left: '-4px',
    animationDelay: '1s',
  },
  '@keyframes iconFloat': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-6px)' },
  },
  '@keyframes sparkle': {
    '0%, 100%': { opacity: 0, transform: 'scale(0.8)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '70px',
    height: '70px',
    '& svg': {
      width: '32px',
      height: '32px',
    },
  },
}));

export const GradientTextStyled = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  fontWeight: 800,
  lineHeight: 1.2,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
  '& .highlight': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
}));

export const FormContainerStyled = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
}));

export const FormCardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
  border: '1px solid rgba(102, 126, 234, 0.12)',
  borderRadius: '24px',
  boxShadow: '0 16px 64px rgba(0,0,0,0.06)',
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '24px 24px 0 0',
  },
  '& .MuiTextField-root': {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.7)',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255,255,255,0.9)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(102, 126, 234, 0.4)',
        },
      },
      '&.Mui-focused': {
        background: 'rgba(255,255,255,1)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#667eea',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '1rem',
      fontWeight: 500,
      '&.Mui-focused': {
        color: '#667eea',
        fontWeight: 600,
      },
    },
    '& .MuiOutlinedInput-input': {
      fontWeight: 500,
      '&::placeholder': {
        color: 'rgba(0,0,0,0.4)',
        opacity: 1,
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5),
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    borderRadius: '16px',
  },
}));

export const ContactInfoWrapperStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '24px',
  height: '100%',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5),
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    borderRadius: '16px',
  },
}));

export const InfoCardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2.5),
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.18)',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    gap: theme.spacing(2),
  },
}));

export const IconWrapperStyled = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.25)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.25)',
    transform: 'scale(1.1)',
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

export const FeatureBadgeStyled = styled(Box)(({ theme }) => ({
  padding: '4px 12px',
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: 'white',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

export const SubmitButtonStyled = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  height: '56px',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.8, 3),
    fontSize: '1rem',
    height: '52px',
  },
}));