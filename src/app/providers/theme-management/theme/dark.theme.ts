/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PaletteOptions } from '@mui/material/styles'

import { colors } from './color'

const { neutral, red, green, yellow, sky } = colors

// Configure all the required colors palettes here
export const darkThemePalette: PaletteOptions = {
  mode: 'dark',

  primary: {
    main: sky[700]!,
  },

  muted: {
    main: neutral[900]!,
  },

  secondary: {
    main: neutral[900]!,
  },

  highlight: {
    main: neutral[500]!,
  },

  text: {
    primary: neutral.white,
    secondary: neutral[500],
  },

  state: {
    hover: neutral[950],
    active: neutral[900],
  },

  inverted: {
    bg: neutral.white,
    text: neutral[950],
  },

  error: {
    main: red[600]!,
  },

  success: {
    main: green[600]!,
  },

  warning: {
    main: yellow[600]!,
  },

  info: {
    main: sky[600]!,
  },

  border: {
    // white with 0.1 opacity
    main: 'rgba(255, 255, 255, 0.1)',
  },

  background: {
    default: neutral[1000],
    paper: neutral[950],
  },

  common: {
    white: neutral.black,
    black: neutral.white,
  },

  custom: {
    main: '#f5f5f5',
    thumb: '#bbbec2',
    track: '#e8e9eb',
    slate: '#F2F2F2',
  },
  buttonDisabled: neutral[300]!,

  textButton: {
    light: neutral[900],
    dark: neutral.white!,
  },
  link: {
    disable: neutral[300]!,
  },
  ...colors,
}
