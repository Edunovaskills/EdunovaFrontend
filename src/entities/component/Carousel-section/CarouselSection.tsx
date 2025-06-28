import React, { PropsWithChildren } from 'react'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'

import { Swiper, SwiperProps } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { useScreenSize } from 'shared/hooks'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

type CarouselProps = PropsWithChildren<SwiperProps>

export const Carousel = ({ children, ...rest }: CarouselProps) => {
  const { palette } = useTheme()
  const { screen } = useScreenSize()

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
        {...rest}
      >
        {children}
      </Swiper>
    </Box>
  )
}
