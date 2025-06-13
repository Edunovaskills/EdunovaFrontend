import React, { PropsWithChildren } from 'react'
import { Divider, Stack, useTheme } from '@mui/material'
import { Box, Card, CardContent, Typography } from '@mui/material'

import { publicImages } from 'shared/config'
import ReactStars from 'react-stars'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { useScreenSize } from 'shared/hooks'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'





type CarouselProps = PropsWithChildren

export const Carousel = ({children}:CarouselProps) => {
  const { palette } = useTheme()
  const { smallScreen, screen } = useScreenSize()
  console.log(smallScreen, screen, 'this')

  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        ['& .swiper-button-next']: {
          color: palette.primary.main + '!important',
          fontSize: '1rem !important',
        },
        ['& .swiper-button-prev']: {
          color: palette.primary.main + '!important',
        },
        ['& .swiper-pagination-bullet-active']: {
          background: palette.primary.main + '!important',
        },
      }}
    >
      <Swiper
        spaceBetween={50}
        slidesPerView={screen === 'xs' ? 1 : 3}
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
      >
        {children}
      </Swiper>
    </Box>
  )
}
