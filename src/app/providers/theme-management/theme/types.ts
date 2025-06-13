import { SimplePaletteColorOptions, PaletteOptions } from '@mui/material'
import { ColorPartial } from '@mui/material/styles/createPalette'

export type AdditionalColor = {
  black: string
  white: string
  25: string
  950: string
  1000: string
}
// SimplePaletteColorOptions | ColorPartial;
export type CustomPaletteColorOptions = SimplePaletteColorOptions
export type CustomColorPartial = ColorPartial & Partial<AdditionalColor>

export type DefaultPaletteColor =
  | 'neutral'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'green'
  | 'orange'
  | 'accent'
  | 'sky'
  | 'blue'

export type ColorPaletteOptions = Record<
  DefaultPaletteColor,
  CustomColorPartial
>

export type CustomPaletteOptions = ColorPaletteOptions & {
  muted: CustomPaletteColorOptions
  custom: Partial<{
    main: string
    thumb: string
    track: string
    slate: string
  }>
  highlight: CustomPaletteColorOptions
  border: CustomPaletteColorOptions
  state: Partial<{
    hover: string
    active: string
  }>
  inverted: Partial<{
    bg: string
    text: string
  }>
  buttonDisabled: string
  textButton: Partial<SimplePaletteColorOptions>
  link: {
    disable: string
  }
  sectionBackground: string

  // Add More custom colors as per requirement
  // surface: paletteColorOptions
}

/**
 * @description This is the custom palette type which is used to override the default palette options.
 * Can also be created like this:
 * ```export type CustomPalette = Record<
 *  keyof CustomPaletteOptions,
 * { [key: string]: string }
 * // 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000 or any other value
 * >```
 */
export type CustomPalette = CustomPaletteOptions

export type StyleOverrideProps<TOwnerState = unknown> = {
  theme: {
    palette: PaletteOptions
    // Add any other theme properties as per requirement
  }
  ownerState?: TOwnerState
}
