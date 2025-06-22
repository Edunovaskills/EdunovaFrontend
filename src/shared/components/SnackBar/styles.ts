import { Box, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ColorsValues, StylesClasses, createStyles } from 'shared/styles'

export type SnackBarColorClassName = Extract<
  ButtonProps['color'],
  'secondary' | 'info' | 'error' | 'warning' | 'success' | 'primary'
>

export const textColor: Record<
  SnackBarColorClassName,
  NonNullable<ColorsValues>
> = {
  secondary: 'neutral.950',
  primary: 'neutral.950',
  error: 'red.600',
  info: 'blue.600',
  success: 'green.600',
  warning: 'yellow.600',
}

const styles = createStyles({
  icon: {
    height: '24px',
    width: '24px',
  },
  infoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1',
  },
  title: {
    pb: '4px',
  },
  description: {
    opacity: '90%',
  },
  btnWrapper: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  },

  primary: {
    backgroundColor: 'neutral.white',
    color: textColor.secondary,
  },
  secondary: {
    backgroundColor: 'neutral.100',
    color: textColor.secondary,
  },
  info: {
    backgroundColor: 'blue.50',
    color: textColor.info,
  },
  error: {
    backgroundColor: 'red.50',
    color: textColor.error,
  },
  warning: {
    backgroundColor: 'yellow.50',
    color: textColor.warning,
  },
  success: {
    backgroundColor: 'green.50',
    color: textColor.success,
  },
  outlineBtn: {
    borderColor: 'neutral.200',
    color: 'neutral.950',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'neutral.200',
    },
  },
})

export type StylesClassNames = StylesClasses<typeof styles>

export default styles

interface WrapperProps {
  isToast: boolean
}

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isToast',
})<WrapperProps>(({ isToast, theme }) => ({
  display: 'flex',
  borderRadius: '8px',
  backgroundColor: theme.palette.neutral.white,
  minWidth: '300px',
  height: 'fit-content',
  gap: '3%',
  alignItems: isToast ? 'center' : 'start',
  padding: isToast ? '10px' : '20px',
  maxWidth: isToast ? '360px' : '530px',
}))
