// src/components/ServicesShowcase/styles.component.ts
import { Card, styled, Typography } from '@mui/material';

export const CardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  maxWidth: '400px',
  width: '100%',
  height: '100%',
  aspectRatio: '3 / 4',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',

  '&:hover': {
    boxShadow: theme.shadows[6],
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: '280px',
    aspectRatio: '3 / 4.2',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'unset',
    width: '90%',
    margin: '0 auto',
    aspectRatio: '4 / 5',
  },
  [theme.breakpoints.down('xs')]: {
    width: '95%',
    aspectRatio: '3 / 4',
  },
}));

export const ImgWrapperStyled = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '60%',
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
    display: 'block',
  },
}));

export const DescriptionContainer = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  minHeight: theme.typography.body2.lineHeight
    ? `calc(${theme.typography.body2.lineHeight} * 3)`
    : '4.5em',
}));
