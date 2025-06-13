import { TypographyVariant } from '@mui/material'
import {
  TypographyStyleOptions,
  TypographyOptions,
  TypographyStyle,
} from '@mui/material/styles/createTypography'

import { PartialRecord } from 'shared/typescript'

/**
 * Rem and px values are based on 16px font size
 * @description Font size values
 */
type SizeRem =
  | '0.25rem' // 4px
  | '0.5rem' // 8px
  | '0.625rem' // 10px
  | '0.75rem' // 12px
  | '0.875rem' // 14px
  | '1.125rem' // 18px
  | '1rem' // 16px
  | '1.25rem' // 20px
  | '1.5rem' // 24px
  | '1.75rem' // 28px
  | '2rem' // 32px
  | '2.25rem' // 36px
  | '2.5rem' // 40px
  | '2.75rem' // 44px
  | '3rem' // 48px
  | '3.25rem' // 52px
  | '3.5rem' // 56px
  | '3.75rem' // 60px
  | '4rem' // 64px
  | '4.25rem' // 68px
  | '4.5rem' // 72px

type WeightNumber =
  | 100 // Lightest
  | 200 // Lighter
  | 300 // Light
  | 400 // Normal/Regular
  | 500 // Medium
  | 600 // SemiBold
  | 700 // Bold
  | 800 // Extra Bold
  | 900 // Black

type DisableWeightNumber = Extract<WeightNumber, 100 | 200>

type CustomVariantName = 'body3' | 'caption1' | 'caption2'
type DisableVariantName =
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'button'
  | 'overline'

export type CustomTypographyVariant = Record<CustomVariantName, true> &
  Record<DisableVariantName, false>
export type CustomTypographyVariantsOptions = PartialRecord<
  CustomVariantName,
  TypographyStyle
>

type TypographyFontVariant =
  | Exclude<TypographyVariant, DisableVariantName>
  | CustomVariantName

type TypographyWeightVariant = Exclude<WeightNumber, DisableWeightNumber>

export type CustomTypographyPropsVariantOverrides<
  TValue extends boolean | string,
> = {
  [S in TypographyFontVariant as `${S}.${TypographyWeightVariant}`]: TValue
}

type TypographyDataWithWeightVariant = Record<
  TypographyFontVariant,
  Record<TypographyWeightVariant, TypographyStyleOptions>
>

const wtVariantArray: TypographyWeightVariant[] = [
  300, 400, 500, 600, 700, 800, 900,
]

const fontSizeVariant: Record<TypographyFontVariant, SizeRem> = {
  h1: '4rem',
  h2: '3.5rem',
  h3: '3rem',
  h4: '2.5rem',
  h5: '2rem',
  h6: '1.5rem',
  body1: '1rem',
  body2: '0.875rem',
  body3: '1.125rem',
  caption1: '0.75rem',
  caption2: '0.625rem',
}

const lineHeightVariant: Record<TypographyFontVariant, SizeRem> = {
  h1: '4.5rem',
  h2: '4rem',
  h3: '3.5rem',
  h4: '3rem',
  h5: '2.5rem',
  h6: '2rem',
  body1: '1.5rem',
  body2: '1.5rem',
  body3: '1.25rem',
  caption1: '1rem',
  caption2: '0.75rem',
}

const typographyGenerator = (fontSize: SizeRem, lineHeight: SizeRem) => {
  return wtVariantArray.reduce(
    (acc, wt) => ({
      ...acc,
      [wt]: {
        fontSize,
        fontWeight: wt,
        lineHeight,
      },
    }),
    {} as Record<TypographyWeightVariant, TypographyStyleOptions>
  )
}

/**
 * [h1, h2, h3, h4, h5, h6 ..........]
 */
const typographyVariantsMap = Object.keys(
  fontSizeVariant
) as TypographyFontVariant[]

const typographyVariantsMapper = <TAcc extends object>(
  callback: (acc: TAcc, key: TypographyFontVariant) => TAcc
) => typographyVariantsMap.reduce(callback, {} as TAcc)

export const typographyDataWithWeightVariant: TypographyDataWithWeightVariant =
  typographyVariantsMapper((acc, key) => {
    return {
      ...acc,
      [key]: typographyGenerator(fontSizeVariant[key], lineHeightVariant[key]),
    }
  })

export const typographyStylesObj = Object.entries(
  typographyDataWithWeightVariant
).reduce(
  (acc, [typKey, typValue]) => ({
    ...acc,
    ...Object.entries(typValue).reduce(
      (acc2, [weightKey, weightValue]) => ({
        ...acc2,
        [`${typKey}.${weightKey}`]: weightValue,
      }),
      {}
    ),
  }),
  {}
)

export const typography: TypographyOptions = {
  fontFamily: 'general-sans,',

  ...typographyVariantsMapper((acc, key) => {
    return {
      ...acc,
      [key]: {
        ...typographyDataWithWeightVariant[key],
        ...typographyDataWithWeightVariant[key][400], // Default with normal weight
      },
    }
  }),
}
