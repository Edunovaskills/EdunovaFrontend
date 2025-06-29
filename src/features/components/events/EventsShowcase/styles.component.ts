// src/components/EventsShowcase/styles.component.ts

import { Card, styled, Typography, Button } from '@mui/material'
import { getLineHeightInPx } from 'shared/utils/model/styles.utils'

export const CardStyled = styled(Card)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(1),
  width: '100%',
  height: '500px',
  maxHeight: '600px',
  aspectRatio: 'unset',

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
    height: '380px',
    maxHeight: '380px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0 auto',
    height: '360px',
    maxHeight: '360px',
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    width: '95%',
    height: '350px',
    maxHeight: '350px',
  },
}))

export const ImgWrapperStyled = styled('div')(({ theme }) => ({
  width: '100%',
  height: '180px',
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
    height: '160px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '140px',
  },
}))

export const DescriptionContainer = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  height: `calc(${theme.typography.body2.lineHeight} * 3)`,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    WebkitLineClamp: 2,
    height: `calc(${theme.typography.body2.lineHeight} * 2)`,
    fontSize: '0.8rem',
  },
}))

export const EnrollButtonStyled = styled(Button)(({ theme }) => ({
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
}))

export const PriceStyled = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
  height: getLineHeightInPx(theme, 'subtitle1', 1),
  marginTop: 'auto',
}))
