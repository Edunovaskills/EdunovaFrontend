import { inputBaseClasses, SxProps } from '@mui/material'

export const commonStyles = {
  defaultBorder: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.main',
  },
  activeInput: {
    [`& .${inputBaseClasses.root}`]: {
      bgcolor: 'state.active',
      '&:hover': {
        bgcolor: 'state.active',
      },
      '& fieldset': {
        borderColor: 'transparent !important',
      },
    },
  },
  flexCol(gap: number) {
    return { display: 'flex', flexDirection: 'column', gap }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, ((...args: any) => SxProps) | SxProps>
