import { styled, Box } from '@mui/material';

export const CompanyStoryStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '32px',
  boxShadow: '0 16px 64px rgba(0,0,0,0.08)',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    borderRadius: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(3),
    borderRadius: '20px',
  },
}));