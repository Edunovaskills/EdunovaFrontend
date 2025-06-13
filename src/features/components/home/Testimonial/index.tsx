import {  CardContent, Stack, Typography, useTheme } from '@mui/material'
import { Carousel } from 'entities/component'
import { testimonials } from 'entities/model'
import ReactStars from 'react-stars'
import { publicImages } from 'shared/config'
import { SwiperSlide } from 'swiper/react'
import { CardContentWrapper, CardStyled, TypographyStyled } from './styles.component'

export const TestimonialSection = () => {
  const { palette } = useTheme()
  return (
    <Carousel>
      {testimonials.map(({ joined, name, rating, text }, ind) => (
        <SwiperSlide key={`${ind}-${name}`}>
          {({ isNext }) => {
            return (
              <CardStyled isNext={isNext}>
                <CardContent>
                  <CardContentWrapper
                    
                  >
                    <img src={publicImages.avatar} alt="Avatar" />

                    <Stack>
                      <Typography variant="h6" fontWeight="bold">
                        {name}
                      </Typography>
                      <ReactStars
                        count={5}
                        size={15}
                        value={rating}
                        color2={palette.primary.main}
                        edit={false}
                      />
                    </Stack>
                  </CardContentWrapper>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {text}
                  </Typography>
                  <TypographyStyled
                    variant="body2"
                  >
                    ~ Joined Since {joined}
                  </TypographyStyled>
                </CardContent>
              </CardStyled>
            )
          }}
        </SwiperSlide>
      ))}
    </Carousel>
  )
}
