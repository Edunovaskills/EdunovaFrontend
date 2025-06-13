import { useEffect, useMemo, useState } from 'react'

import { Breakpoint } from '@mui/material'

type Screen = Breakpoint

export const useScreenSize = () => {
  const breakPoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  }

  const getScreen = (width: number): Screen => {
    if (width <= breakPoints.sm) return 'xs'
    if (width <= breakPoints.md) return 'sm'
    if (width <= breakPoints.lg) return 'md'
    if (width <= breakPoints.xl) return 'lg'
    return 'xl'
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { screen, smallScreen } = useMemo(
    () => ({
      screen: getScreen(windowSize.width),
      smallScreen: windowSize.width <= breakPoints.md,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowSize.width, windowSize]
  )

  return { screen, smallScreen }
}
