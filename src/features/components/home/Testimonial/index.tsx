import {
  CardContent,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Carousel } from 'entities/component'
import ReactStars from 'react-stars'
import { publicImages } from 'shared/config'
import { SwiperSlide } from 'swiper/react'
import {
  CardContentWrapper,
  CardStyled,
  TypographyStyled,
} from './styles.component'
import { useTestimonialsQuery } from 'entities/query'

export const TestimonialSection = () => {
  const { palette } = useTheme()
  const { data, isLoading } = useTestimonialsQuery()
  const testimonailDaata = data?.data?.testimonials || []
  return (
    <Carousel>
      {testimonailDaata.map(
        ({ createdAt, designation, message, name }, ind) => (
          <SwiperSlide key={`${ind}-${name}`}>
            {({ isNext }) => {
              return (
                <CardStyled isNext={isNext}>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <>
                        <CardContentWrapper>
                          <img src={publicImages.avatar} alt="Avatar" />
                          <Stack>
                            <Typography variant="h6" fontWeight="bold">
                              {name}
                            </Typography>
                            <TypographyStyled
                              variant="caption2.500"
                              color="text.secondary"
                            >
                              {designation}
                            </TypographyStyled>
                            <ReactStars
                              count={5}
                              size={15}
                              value={5}
                              color2={palette.primary.main}
                              edit={false}
                            />
                          </Stack>
                        </CardContentWrapper>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {message}
                        </Typography>
                        <TypographyStyled variant="body2">
                          ~ Joined Since {createdAt.split('T')[0]}
                        </TypographyStyled>
                      </>
                    )}
                  </CardContent>
                </CardStyled>
              )
            }}
          </SwiperSlide>
        )
      )}
    </Carousel>
  )
}
