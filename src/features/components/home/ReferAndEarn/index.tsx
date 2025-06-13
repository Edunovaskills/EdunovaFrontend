import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { referralSteps } from 'features/model'
import { RoundedIcon } from 'shared/components'
import { publicImages } from 'shared/config'
import { BottomWrapperStyled, ContainerStyled } from './styles.component'
import { useScreenSize } from 'shared/hooks'

const TopView = () => {
  return (
    <>
      <Typography variant="h5.700">
        REFER AND{' '}
        <Typography variant="h5.700" color="primary.main">
          EARN{' '}
        </Typography>
      </Typography>

      <Typography variant="body2" textAlign={'center'}>
        Invite your friends to join BuzzCabs and earn rewards for every
        successful referral!
      </Typography>
    </>
  )
}

const BottomSection = () => {
  const theme = useTheme()
  const { smallScreen } = useScreenSize()

  return (
    <BottomWrapperStyled issmall={smallScreen}>
      <Stack gap={'30px'} maxWidth={'530px'} paddingTop={'2rem'}>
        <Typography variant="h4.700">How it Works</Typography>

        <ContainerStyled>
          {referralSteps.map(({ description, id, title }, ind) => {
            return (
              <Stack key={id}>
                <Stack direction={'row'} gap={'10px'}>
                  <RoundedIcon
                    content={<Typography variant="body1.700"> {id}</Typography>}
                    size={35}
                    iconBackgroundColor={theme.palette.primary.main}
                  />

                  <Typography variant="body1">
                    <Typography variant="body1.600">{title}: </Typography>
                    {description}
                  </Typography>
                </Stack>
                {/* {ind < referralSteps.length - 1 && (
                  <div
                    style={{
                      alignSelf: 'start',
                      height: '20px',
                      width: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={publicImages.arrow}
                      style={{
                        transform: 'rotate(90deg)',
                        maxWidth: '20px',
                        maxHeight: '30px',
                        marginLeft: '0.25rem',
                      }}
                    />
                  </div>
                )} */}
              </Stack>
            )
          })}
        </ContainerStyled>
      </Stack>
      <img
        src={publicImages.referAndEarn}
        alt="refer and earn"
        style={{ paddingTop: '2rem' }}
      />
    </BottomWrapperStyled>
  )
}

export const ReferAndEarn = () => {
  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<BottomSection />} />
  )
}
