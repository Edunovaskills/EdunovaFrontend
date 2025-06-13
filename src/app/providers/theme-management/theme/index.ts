/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme, PaletteOptions } from '@mui/material/styles'

import { ThemeMode } from 'shared/state'

import { components } from './component'
import { darkThemePalette } from './dark.theme'
import { lightThemePalette } from './light.theme'
import { CustomPalette, CustomPaletteOptions } from './types'
import {
  CustomTypographyVariantsOptions,
  CustomTypographyPropsVariantOverrides,
  CustomTypographyVariant,
  typography,
} from './typography'

// TypographyPropsVariantOverrides
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides
    extends CustomTypographyPropsVariantOverrides<true> {}

  interface TypographyClasses
    extends CustomTypographyPropsVariantOverrides<string> {}

  interface TypographyPropsVariantOverrides extends CustomTypographyVariant {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    muted: true
  }

  interface ButtonPropsSizeOverrides {
    extraSmall: true
  }
  interface ButtonPropsVariantOverrides {
    iconOnly: true
  }
  interface ButtonClasses {
    colorMutedError: string
    iconOnly: string
    sizeExtraSmall: string
    iconSizeExtraSmall: string
    textSizeExtraSmall: string
  }
  interface ButtonOwnProps {
    loading?: boolean
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides {
    extraSmall: true
  }

  interface SvgIconClasses {
    fontSizeExtraSmall: string
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    modal: true
  }
  export interface PaperClasses {
    modal: string
  }
}

declare module '@mui/material/ToggleButton' {
  interface ToggleButtonOwnProps {
    buttonType: 'pill' | 'block'
  }
}

declare module '@mui/material/Tab' {
  interface TabOwnProps {
    labelSize?: 'small' | 'medium' | 'large'
  }
}

declare module '@mui/material/Chip' {
  interface ChipOwnProps {
    iconOnly?: boolean
  }
}
// type overrides for the theme
declare module '@mui/material/styles' {
  interface TypographyVariants extends CustomTypographyVariantsOptions {}
  interface TypographyVariantsOptions extends CustomTypographyVariantsOptions {}
  interface Palette extends CustomPalette {
    // [key: string]: color
  }

  interface PaletteOptions extends CustomPaletteOptions {}

  /* Uncomment the following code to add custom breakpoints */
  // interface BreakpointOverrides {
  //   xs: false; // removes the `xs` breakpoint
  //   sm: false;
  //   md: false;
  //   lg: false;
  //   xl: false;
  //   mobile: true; // adds the `mobile` breakpoint
  //   tablet: true;
  //   laptop: true;
  //   desktop: true;
  // }
}

const themeOptions: Record<ThemeMode, PaletteOptions> = {
  light: lightThemePalette,
  dark: darkThemePalette,
}

/**
 * @description Right now, the theme is using the light theme options and the inter font.
 * Create new theme option or add new font as per the requirement.
 */
// eslint-disable-next-line import/no-mutable-exports
const getTheme = (mode: ThemeMode) =>
  createTheme({
    // Uncomment the following code to add custom breakpoints
    // breakpoints: {
    //   values: {
    //     mobile: 0,
    //     tablet: 601,
    //     laptop: 1024,
    //     desktop: 1200,
    //   },
    // },

    // All the colors- palette should be defined in the theme options file
    palette: themeOptions[mode],

    typography,
    components,
  })

export default getTheme
