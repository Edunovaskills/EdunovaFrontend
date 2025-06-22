import { Theme } from '@mui/material/styles'
import { Variant } from '@mui/material/styles/createTypography'

export const getLineHeightInPx = (
  theme: Theme,
  variant: Variant,
  lines = 1
): string => {
  const typography = theme.typography[variant]
  if (!typography) {
    return '0px'
  }

  // Ensure fontSize is a string before parsing
  const fontSizeStr = String(typography.fontSize || '1rem')
  const fontSizeRem = parseFloat(fontSizeStr)
  const rootFontSize = theme.typography.htmlFontSize || 16

  const fontSizePx = fontSizeRem * rootFontSize

  // Ensure lineHeight is a number
  const lineHeight = Number(typography.lineHeight || 1.5)

  return `${fontSizePx * lineHeight * lines}px`
}
