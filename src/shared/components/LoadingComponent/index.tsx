import React from 'react'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'

interface LoadingComponentProps {
  /** Whether to show the loading state */
  loading: boolean
  /** Custom message to display while loading */
  message?: string
  /** Size of the loading spinner */
  size?: number
  /** Minimum height of the loading container */
  minHeight?: string | number
  /** Content to render when not loading */
  children?: React.ReactNode
}

/**
 * Reusable loading component that displays a spinner with customizable message
 *
 * @example
 * ```tsx
 * // Basic usage
 * <LoadingComponent loading={isLoading}>
 *   <YourContent />
 * </LoadingComponent>
 *
 * // With custom message and size
 * <LoadingComponent
 *   loading={isLoading}
 *   message="Loading data..."
 *   size={40}
 * >
 *   <YourContent />
 * </LoadingComponent>
 *
 * // Custom height for specific use cases
 * <LoadingComponent
 *   loading={isLoading}
 *   minHeight="200px"
 * >
 *   <YourContent />
 * </LoadingComponent>
 * ```
 */
const LoadingComponent: React.FC<LoadingComponentProps> = ({
  loading,
  message = 'Loading...',
  size = 60,
  minHeight = '60vh',
  children,
}) => {
  const theme = useTheme()

  if (!loading) {
    return <>{children}</>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight,
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress size={size} color="primary" />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingComponent
