/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PaletteOptions } from '@mui/material/styles'

import { colors } from './color'

const { neutral, red, green, yellow, sky, accent, blue } = colors

// Configure all the required colors palettes here
export const lightThemePalette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: sky[700]!,
    ...sky,
  },

  muted: {
    main: neutral[100]!,
  },

  secondary: {
    main: blue['700']!,
    ...blue,
  },

  highlight: {
    main: accent[900]!,
  },

  text: {
    primary: neutral.black!,
    secondary: blue[500],
    disabled: neutral[400],
  },

  state: {
    hover: neutral[100],
    active: neutral[100],
  },

  inverted: {
    bg: neutral[1000],
    text: neutral.white,
  },

  error: {
    main: red[200]!,
    ...red,
  },

  success: {
    main: green[200]!,
    ...green,
  },

  warning: {
    main: yellow[600]!,
    ...yellow,
  },

  info: {
    main: blue[600]!,
  },

  border: {
    // black with 0.1 opacity
    main: `${neutral.black}33`,
    light: neutral[100],
  },

  background: {
    default: neutral.white,
    paper: neutral.white,
  },

  common: {
    white: neutral.white,
    black: neutral.black,
  },

  custom: {
    main: '#808080',
    thumb: '#bbbec2',
    track: '#e8e9eb',
    slate: '#F2F2F2',
  },
  buttonDisabled: blue[100]!,

  textButton: {
    light: neutral[900],
    dark: neutral.white!,
  },
  link: {
    disable: neutral[600]!,
  },
  sectionBackground: blue[1000]!,

  ...colors,
}
