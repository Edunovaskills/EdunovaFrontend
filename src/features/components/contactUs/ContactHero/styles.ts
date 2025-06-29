import { styled, Box, Typography } from '@mui/material';

export const SectionContainerStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '85vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #533483 80%, #667eea 100%)',
  overflow: 'hidden',
  padding: theme.spacing(15, 3),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 70%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(255, 216, 155, 0.3) 0%, transparent 50%)
    `,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)',
    animation: 'shimmer 3s ease-in-out infinite',
    zIndex: 2,
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.1)', opacity: 0.8 },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 2),
    minHeight: '75vh',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 1.5),
    minHeight: '65vh',
  },
}));

export const HeroContentStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  width: '100%',
  maxWidth: '1200px',
}));

export const AnimatedTextStyled = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: theme.spacing(4),
  textShadow: '0 4px 30px rgba(0,0,0,0.3)',
  color: 'white',
  animation: 'fadeInUp 1s ease-out',
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export const IconWrapperStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100px',
  height: '100px',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(255,255,255,0.2)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: 'float 6s ease-in-out infinite',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
    transform: 'scale(1.05) rotate(5deg)',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '80px',
    height: '80px',
    '& svg': {
      width: '32px',
      height: '32px',
    },
  },
}));

export const FloatingElementStyled = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 50%, rgba(240, 147, 251, 0.2) 100%)',
  filter: 'blur(1px)',
  animation: 'floatComplex 12s ease-in-out infinite',
  '&.floating-1': {
    width: '400px',
    height: '400px',
    top: '5%',
    left: '5%',
    animationDelay: '0s',
  },
  '&.floating-2': {
    width: '300px',
    height: '300px',
    top: '40%',
    right: '8%',
    animationDelay: '4s',
  },
  '&.floating-3': {
    width: '250px',
    height: '250px',
    bottom: '10%',
    left: '10%',
    animationDelay: '8s',
  },
  '&.floating-4': {
    width: '200px',
    height: '200px',
    top: '20%',
    right: '30%',
    animationDelay: '2s',
  },
  '@keyframes floatComplex': {
    '0%, 100%': {
      transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)',
    },
    '25%': {
      transform: 'translateY(-30px) translateX(20px) rotate(90deg) scale(1.1)',
    },
    '50%': {
      transform: 'translateY(-20px) translateX(-15px) rotate(180deg) scale(0.9)',
    },
    '75%': {
      transform: 'translateY(10px) translateX(25px) rotate(270deg) scale(1.05)',
    },
  },
});