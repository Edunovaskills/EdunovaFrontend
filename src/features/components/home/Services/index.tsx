import {  Button, CardContent, Divider, Stack, Typography } from '@mui/material'
import { BuzInfoSection, Carousel } from 'entities/component'
import { publicImages } from 'shared/config'
import { SwiperSlide } from 'swiper/react'
import { CardStyled, ImgWrapperStyled } from './styles.component'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Link } from 'react-router-dom'

const TopInfo = () => {
  return (
    <Stack alignItems={'center'} gap={'10px'}>
      <Typography variant={'h4.700'}>Our Courses</Typography>
      <Typography variant={'body1'} textAlign={'center'} maxWidth={'80%'}>
      Travel through your education with ease and comfort at Academix, where our courses provide top-notch lessons and skilled instructors for a safe, enriching academic journey—ideal for daily learning, skill enhancement, or intellectual growth.
      </Typography>
    </Stack>
  )
}

const desc = `This is a complete good to go course if you want to grow as UI/UX Designer.This is a complete good to go course if you want to grow as UI/UX Designer.`
const MAX_DESC_LENGTH = 25
const ServicesShowcase = () => {
  return (
    <Carousel>
      {Array.from({ length: 6 }).map((_, ind) => (
        <SwiperSlide key={ind}>
          <CardStyled>
            <ImgWrapperStyled>
              {
                <img
                  src={publicImages.uiImages}
                  style={{ width: '100%', height: '100%' }}
                />
              }
            </ImgWrapperStyled>
            <Divider sx={{ mt: 2 }} />
            <CardContent component={Stack} spacing={1.5}>
              <Typography variant="h6.600">UI/UX</Typography>
              <Typography variant="body2">
                {desc.split(' ').length > MAX_DESC_LENGTH ? `${desc.split(' ').slice(0, MAX_DESC_LENGTH).join(' ')}` : desc}
                <Typography variant='body2.600' color='secondary' sx={{ cursor: 'pointer',ml:0.5,textDecoration:'none' }} component={Link} to={'/services'}>
                  read more...
                </Typography>
              </Typography>
              <Button color='secondary' endIcon={<SchoolOutlinedIcon/>}>Enroll now</Button>
                
            </CardContent>
          </CardStyled>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export const Services = () => {
  return (
    <BuzInfoSection
      topInfo={<TopInfo />}
      showcaseSection={<ServicesShowcase />}
    />
  )
}
