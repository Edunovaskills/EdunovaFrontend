import React, { useState, useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import { Logo } from './Logo/Logo'
import { sitePromisesData } from 'entities/model'
import { appPaths } from '../../../entities/config'
import { useNavigate } from 'react-router-dom'
import {
  ButtonWrapperStyled,
  HeroSectionStyled,
  PromiseDataStyled,
  PromiseDataWrapperStyled,
  TopViewStyled,
} from './styles.component'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useScreenSize } from 'shared/hooks'
import { publicImages } from 'shared/config'

const backgroundImages = [
  publicImages.heroSectionImage,
  publicImages.heroSectionImage1,
  // Add more image URLs as needed
]

export const HeroSection = () => {
  const { smallScreen: smallscreen } = useScreenSize()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleStartLearning = () => {
    navigate(appPaths.userLogin)
  }

  return (
    <HeroSectionStyled
      issmall={smallscreen}
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        transition: 'background-image 2s ease-in-out',
      }}
    >
      <TopViewStyled issmall={smallscreen}>
        <div>
          <Typography variant="h1.700" color="primary.main">
            Edunova
          </Typography>
          <Typography variant="h1.700" color="neutral.white">
            - Unlock Your Academic Potential!
          </Typography>
          <Typography variant="body2" color="neutral.white" component={'p'}>
            Master your future with Edunova's expert-led courses, resources, and personalized support.
          </Typography>
        </div>

        <ButtonWrapperStyled>
          <Button
            color="secondary"
            sx={{ fontFamily: 'inherit' }}
            endIcon={<KeyboardArrowRightIcon />}
            onClick={handleStartLearning}
          >
            Start Learning
          </Button>
          {/* FIXME: Might be use later */}
          {/* <Button variant="outlined"></Button> */}
        </ButtonWrapperStyled>

        <PromiseDataWrapperStyled>
          {sitePromisesData.map(({ label, url, Icon }) => (
            <PromiseDataStyled issmall={smallscreen} key={label}>
              <Logo url={url}>{Icon}</Logo>
              <Typography variant="body2" color="neutral.white" component={'p'}>
                {label}
              </Typography>
            </PromiseDataStyled>
          ))}
        </PromiseDataWrapperStyled>
      </TopViewStyled>
    </HeroSectionStyled>
  )
}
