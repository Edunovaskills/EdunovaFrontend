import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type PropsWithChildren,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  CarouselContainer,
  NavigationButton,
  CarouselWrapper,
  CarouselTrack,
  CarouselSlide,
  PaginationContainer,
  PaginationDot,
} from './Carousel.styles'

interface CarouselProps {
  slidesToShow?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  showPagination?: boolean
  className?: string
}

export const Carousel: React.FC<PropsWithChildren<CarouselProps>> = ({
  children,
  slidesToShow = 3,
  autoPlay = true,
  autoPlayInterval = 4000,
  showNavigation = true,
  showPagination = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShowResponsive, setSlidesToShowResponsive] =
    useState(slidesToShow)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShowResponsive(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShowResponsive(Math.min(2, slidesToShow))
      } else {
        setSlidesToShowResponsive(slidesToShow)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [slidesToShow])

  const totalSlides = Array.isArray(children) ? children.length : 0

  // Calculate the width of each slide as a percentage of the CarouselTrack's total width.
  // The CarouselTrack's total width will be `totalSlides * slideWidth`
  // So, each slide's width relative to the track is `100 / totalSlides`
  const slideWidthOnTrack = useMemo(() => 100 / totalSlides, [totalSlides])

  // Calculate the total width of the CarouselTrack based on how many "viewports" it needs to cover.
  // If showing X slides, and total slides is Y, then the track needs to be (Y / X) * 100% wide.
  const carouselTrackTotalWidth = useMemo(
    () => (totalSlides / slidesToShowResponsive) * 100,
    [totalSlides, slidesToShowResponsive]
  )

  // Calculate the translateX value. This is the core fix.
  // Each 'step' or 'page' in the carousel represents moving by `100% / carouselTrackTotalWidth`
  // of the total visible area. Or, more directly:
  // Each currentIndex represents shifting by the width of `slidesToShowResponsive` items.
  // So, the percentage shift for the track should be `currentIndex * (100 / slidesToShowResponsive)`
  const translateXPercentage = useMemo(() => {
    // The current index tells us which slide is at the beginning of the viewport.
    // We want to shift the track by 'currentIndex' times the effective width of one slide in the viewport.
    // The effective width of one slide in the viewport is 100% / slidesToShowResponsive.
    return (currentIndex * 100) / slidesToShowResponsive
  }, [currentIndex, slidesToShowResponsive])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        // If the next logical slide to show would cause us to go beyond the last possible starting point
        // (i.e., we can no longer fill a full 'slidesToShowResponsive' viewport), then loop to 0.
        // Otherwise, move to the next slide.
        prev + slidesToShowResponsive >= totalSlides ? 0 : prev + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, totalSlides, slidesToShowResponsive])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      // If at the beginning (index 0), jump to the last possible starting index
      // which is `totalSlides - slidesToShowResponsive`. Use Math.max(0, ...) to prevent negative index.
      prev === 0 ? Math.max(0, totalSlides - slidesToShowResponsive) : prev - 1
    )
  }, [totalSlides, slidesToShowResponsive])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      // If advancing by one slide means the current 'page' would go beyond the total slides,
      // loop back to the beginning (index 0).
      prev + slidesToShowResponsive >= totalSlides ? 0 : prev + 1
    )
  }, [totalSlides, slidesToShowResponsive])

  const goToSlide = useCallback(
    (pageIndex: number) => {
      // Each page starts at an index that is a multiple of slidesToShowResponsive
      setCurrentIndex(pageIndex * slidesToShowResponsive)
    },
    [slidesToShowResponsive]
  )

  const totalPages = useMemo(
    () => Math.ceil(totalSlides / slidesToShowResponsive),
    [totalSlides, slidesToShowResponsive]
  )

  return (
    <CarouselContainer className={className}>
      {showNavigation && totalSlides > slidesToShowResponsive && (
        <>
          <NavigationButton $position="left" onClick={goToPrevious}>
            <ChevronLeft />
          </NavigationButton>
          <NavigationButton $position="right" onClick={goToNext}>
            <ChevronRight />
          </NavigationButton>
        </>
      )}

      <CarouselWrapper>
        {/* Pass the calculated translateXPercentage directly.
            The track's width needs to be wide enough to contain all children where
            each child has a width relative to slidesToShowResponsive. */}
        <CarouselTrack
          $translateX={translateXPercentage}
          $itemWidth={carouselTrackTotalWidth}
        >
          {Array.isArray(children) &&
            children.map((child, index) => (
              <CarouselSlide key={index} $width={slideWidthOnTrack}>
                {child}
              </CarouselSlide>
            ))}
        </CarouselTrack>
      </CarouselWrapper>

      {showPagination && totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <PaginationDot
              key={pageIndex}
              // The active dot is determined by which 'page' the currentIndex falls into.
              $active={
                Math.floor(currentIndex / slidesToShowResponsive) === pageIndex
              }
              onClick={() => goToSlide(pageIndex)}
            />
          ))}
        </PaginationContainer>
      )}
    </CarouselContainer>
  )
}
