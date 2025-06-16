import { Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { publicImages } from 'shared/config'
import {
  InfoSectionWrapperStyled,
  StackStyled,
  WrapperStackStyled,
} from './styles.component'
import { RoundedIcon } from 'shared/components'
import { useScreenSize } from 'shared/hooks'
import { buzWorkingData } from 'features/model'

export const BuzWorking = () => {
  const TopView = () => {
    return (
      <>
        <Typography variant="h5.700">
          How{' '}
          <Typography variant="h5.700" color="primary.main">
            Edunova{' '}
          </Typography>
          Works?
        </Typography>

        <Typography variant="body2">
        Flexible, engaging, and career-focused learning—whenever and wherever you need it.
        </Typography>
      </>
    )
  }

  const InfoSection = () => {
    const { smallScreen: smallscreen } = useScreenSize()

    return (
      <InfoSectionWrapperStyled smallscreen={smallscreen}>
        {buzWorkingData.map(({desc,label},i) => (
          <StackStyled key={i} smallscreen={smallscreen}>
            <WrapperStackStyled>
              <RoundedIcon
                content={
                  <Typography variant="h6.700" color="neutral.white">
                    {i + 1}
                  </Typography>
                }
              />
              <Typography variant="body1.600">{label}</Typography>
              <Typography variant="body1" textAlign={'center'}>
                {desc}
              </Typography>
            </WrapperStackStyled>
            {i < 3 && (
              <img
                src={publicImages.arrow}
                alt="arrow"
                style={{
                  transform: smallscreen ? 'rotate(90deg)' : 'unset',
                }}
              />
            )}
          </StackStyled>
        ))}
      </InfoSectionWrapperStyled>
    )
  }

  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<InfoSection />} />
  )
}
