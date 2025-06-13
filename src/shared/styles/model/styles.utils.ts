import { PaletteOptions, SxProps } from '@mui/material'

import { Leaves } from 'shared/typescript'

export type { SxProps }

export type Styles<T extends string = string> = Record<T, SxProps>
export type CustomStyles<T extends string = string> = Partial<Styles<T>>
export type StylesClasses<TStyles extends Styles> = keyof TStyles

export const createStyles = <T extends string>(data: Styles<T>) => data

export const getStyles = <T extends string = string>(
  mainStyles: Styles<T>,
  customStyles?: CustomStyles<T>
) => {
  return (names: T | T[], sx?: SxProps): { sx: SxProps } => {
    let ms: SxProps = {}
    let cs: SxProps = {}
    const es = sx ?? {}

    if (Array.isArray(names)) {
      ms = {}
      cs = {}

      names.forEach((name) => {
        ms = {
          ...ms,
          ...mainStyles[name],
        } as SxProps

        const newCs = customStyles?.[name]
        if (newCs)
          cs = {
            ...cs,
            ...newCs,
          } as SxProps
      })
    } else {
      ms = mainStyles[names]
      cs = customStyles?.[names] ?? {}
    }

    const resultantStyles = { ...ms, ...es, ...cs } as SxProps

    return { sx: resultantStyles }
  }
}

export type ColorsValues = Leaves<
  Omit<PaletteOptions, 'getContrastText' | 'contrastThreshold' | 'mode'>
>
