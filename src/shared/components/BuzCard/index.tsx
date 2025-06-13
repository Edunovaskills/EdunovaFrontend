import { Stack, Typography } from '@mui/material'
import { RoundedIcon } from '../Rounded-icon'
import { PaperStyled } from './styles.component'

export const BuzCard = ({
  iconUrl,
  cardTitle,
  cardDescription,
  iconBackgroundColor,
  cardBasis = '32%',
  minMaxWidth,
}: {
  iconUrl: string
  cardTitle: string
  cardDescription: string
  iconBackgroundColor?: string
  cardBasis?: string
  minMaxWidth?: number
}) => {
  return (
    <PaperStyled
      elevation={3}
      variant="elevation"
      sx={{
        flexBasis: cardBasis,
        minWidth: minMaxWidth ? `${minMaxWidth}%` : 'unset',
        maxWidth: minMaxWidth ? `${minMaxWidth}%` : 'unset',
      }}
    >
      <RoundedIcon
        iconBackgroundColor={iconBackgroundColor}
        content={<img src={iconUrl} alt="logo" />}
      />
      <Stack alignItems={'center'} gap={'4px'}>
        <Typography variant="body3.600" color="text.secondary">
          {cardTitle}
        </Typography>
        <Typography variant="body2" color="custom.main" textAlign={'center'}>
          {cardDescription}
        </Typography>
      </Stack>
    </PaperStyled>
  )
}
