import { Box, Dialog, modalClasses, styled } from '@mui/material'

import { STYLES_SIZE_CONSTANTS } from 'shared/styles'

export const DialogBlurredBackdrop = styled(Dialog)({
  [`& .${modalClasses.backdrop}`]: {
    backdropFilter: 'blur(5px)',
    backgroundColor: '#ffffff60',

    top: STYLES_SIZE_CONSTANTS.headerHeight + 25,
    left: '0px !important',
    transitionDuration: '0.5s !important',
  },
  top: STYLES_SIZE_CONSTANTS.headerHeight,
  left: '0px !important',
})

export const PageWrapperStyled = styled(Box)({
  padding: `${STYLES_SIZE_CONSTANTS.mainPadding}px`,
  display: 'flex',
  gap: '1.5rem',
  flexDirection: 'column',
  // height: '100%',
  minHeight: '100%',
})
