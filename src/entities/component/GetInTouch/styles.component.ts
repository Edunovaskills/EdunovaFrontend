import { Box, Button, Paper, Stack, StackProps, styled } from '@mui/material'

export const PaperStyled = styled(Paper)<{ issmall: boolean }>(
  ({ issmall }) => ({
    display: 'flex',
    width: '100%',
    padding: '2.3rem',
    gap: '40px',
    flexDirection: issmall ? 'column-reverse' : 'row',
  })
)

export const StackStyled = styled(Stack)<StackProps & { issmall: boolean }>(
  ({ theme: { palette }, issmall }) => ({
    minWidth: issmall ? '100%' : '690px',
    padding: '10px',
    gap: '14px',
    background: palette.neutral.black + '33',
    borderRadius: '10px',
    ['& .MuiFormControl-root']: {
      background: palette.neutral.white,
      borderRadius: '8px',
    },
  })
)

export const FieldsWrapperStyled = styled(Box)({
  display: 'flex',
  width: '100%',
  gap: '20px',
})

export const ButtonStyled = styled(Button)(({ theme: { palette } }) => ({
  color: palette.neutral.white,
  background: palette.neutral.black,
  ['&:hover']: {
    background: palette.neutral.black + '80',
  },
}))

export const BottomViewStyled = styled(Stack)({
  height: 'fit-content',
  alignSelf: 'center',
  gap: '50px',
})

export const RightViewWrapperStyled = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  gap: '20px',
})
