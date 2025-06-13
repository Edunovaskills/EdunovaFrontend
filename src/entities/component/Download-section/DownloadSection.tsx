import React from 'react'
import { Stack, Typography } from '@mui/material'
import AppleIcon from '@mui/icons-material/Apple'
import ShopTwoIcon from '@mui/icons-material/ShopTwo'
import { publicImages } from 'shared/config'
import { ButtonStyled, WrapperStyled } from './styles.component'
import { useScreenSize } from 'shared/hooks'

export const DownloadSection = () => {
  const { smallScreen:smallscreen } = useScreenSize()

  return (
    <WrapperStyled issmall={smallscreen}>
      <Stack
        gap={'30px'}
        maxWidth={'527px'}
        minWidth={smallscreen ? '25%' : 'unset'}
      >
        <Stack gap={'5px'}>
          <Typography variant="h5.700" color="neutral.white">
            Download the{' '}
            <Typography variant="h5.700" color="primary.main">
              BuzzCabs{' '}
            </Typography>
            App
          </Typography>
        </Stack>

        <div
          style={{
            display: 'flex',
            gap: '30px',
            flexDirection: smallscreen ? 'column' : 'row',
          }}
        >
          <ButtonStyled
            variant="contained"
            color="secondary"
            startIcon={<AppleIcon fontSize="large" />}
          >
            <div>
              <Typography variant="body1.400" component={'p'}>
                Download at the{' '}
              </Typography>
              <Typography variant="h6.700">App Store</Typography>
            </div>
          </ButtonStyled>
          <ButtonStyled
            variant="contained"
            color="secondary"
            startIcon={<ShopTwoIcon />}
          >
            <div>
              <Typography variant="body1.400" component={'p'}>
                Download at the{' '}
              </Typography>
              <Typography variant="h6.700">Google Play</Typography>
            </div>
          </ButtonStyled>
        </div>
      </Stack>

      <img
        src={publicImages.buzzcabMobileImg}
        alt=""
        style={{
          minWidth: smallscreen ? '350px' : 'unset',
          minHeight: smallscreen ? '350px' : 'unset',
          maxWidth: smallscreen ? '350px' : 'unset',
          maxHeight: smallscreen ? '350px' : 'unset',
        }}
      />
    </WrapperStyled>
  )
}
