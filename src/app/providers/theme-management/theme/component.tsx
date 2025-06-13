/* eslint-disable complexity */
import React, { CSSProperties } from 'react'

import {
  buttonBaseClasses,
  buttonClasses,
  CircularProgress,
  circularProgressClasses,
  formLabelClasses,
  inputBaseClasses,
  outlinedInputClasses,
  toggleButtonClasses,
} from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'

import { BaselineStyleClasses } from 'shared/styles'

import { CustomColorPartial, StyleOverrideProps } from './types'
import { typographyStylesObj } from './typography'

/**
 * Include any mui component override here to be applied globally
 * To create custom mui component @see https://mui.com/material-ui/customization/creating-themed-components/
 */
export const components: ThemeOptions['components'] = {
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        ...(ownerState.selected && {
          backgroundColor: `${(theme.palette.primary as CustomColorPartial)[25]} !important`,
        }),
        borderRadius: '0.5rem',
        padding: '1rem 1.5rem',
      }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: ({ theme }: StyleOverrideProps) => ({
        overflow: 'auto',

        '& *': {
          '&::-webkit-scrollbar ': {
            width: '4px',
            height: '4px',
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.custom.track,
            borderRadius: '14px',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.custom.thumb,
            borderRadius: '14px',
          },

          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.custom.main,
          },
        },
      }),

      [`.${BaselineStyleClasses.flexCentered}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      [`.${BaselineStyleClasses.showOnHoverParent}`]: {
        '&:hover': {
          [`& .${BaselineStyleClasses.showOnHoverChild}`]: {
            opacity: 1,
            visibility: 'visible',
          },
        },
      },
      [`.${BaselineStyleClasses.showOnHoverChild}`]: {
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      ...typographyStylesObj,
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: { padding: '1.5rem', paddingTop: '0px' },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderBottom: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.border.main,
      }),
    },
  },

  MuiCard: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        padding: '1.5rem 1rem',
        borderRadius: '0.5rem',
      },
    },
  },
  MuiAvatar: {
    defaultProps: {
      src: '/broken-image.jpg',
    },
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        function sumAscii(str: string) {
          return [...str].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5
        }
        const idx = sumAscii(ownerState.alt ?? '')
        const backgroundColors = [
          theme.palette.purple[600],
          theme.palette.yellow[600],
          theme.palette.green[600],
          theme.palette.orange[600],
          theme.palette.red[600],
        ]
        return {
          width: 32,
          height: 32,
          backgroundColor: backgroundColors[idx],
        }
      },
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: '8px',
        backgroundColor: theme.palette.inverted.bg,
        ...theme.typography.caption1,
        padding: '8px 12px',
      }),
      tooltipPlacementRight: {
        [`& .MuiTooltip-arrow`]: {
          marginLeft: '-0.6em !important',
        },
      },
      tooltipPlacementLeft: {
        [`& .MuiTooltip-arrow`]: {
          marginRight: '-0.6em !important',
        },
      },
      arrow: ({ theme }) => ({
        color: theme.palette.inverted.bg,
      }),
    },
  },

  MuiPaper: {
    defaultProps: { variant: 'outlined' },
    styleOverrides: {
      root: {
        borderRadius: '10px',
      },
      modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '24px',
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.border.main,
      }),
    },
  },

  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        padding: '8px 16px',
        borderRadius: '8px !important',
        textTransform: 'capitalize',
        ...(ownerState.buttonType === 'block' && {
          padding: '8px 12px',
          borderRadius: '8px !important',
          fontSize: '14px',
          border: '1px solid !important',
          borderColor: `${theme.palette.border.main}!important`,
        }),
        ...(ownerState.buttonType === 'pill' && {
          padding: '8px 16px',
          borderRadius: '32px !important',
          fontSize: '14px',
          border: '1px solid !important',
          borderColor: `${theme.palette.border.main}!important`,
        }),
        ...(theme.typography.caption1?.[500] as CSSProperties),

        '&:hover': {
          backgroundColor: theme.palette.state.active,
        },

        [`&.${toggleButtonClasses.selected}`]: {
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.inverted.text,
        },
      }),
    },
  },

  // MuiIconButton: {
  //   styleOverrides: {
  //     sizeMedium: {
  //       height: '32px',
  //       width: '32px',
  //       padding: '4px',
  //     },

  //     root: ({ theme }) => ({
  //       borderRadius: '8px',

  //       [`&.${CustomStylesClasses.outline}`]: {
  //         borderWidth: '1px',
  //         borderStyle: 'solid',
  //         borderColor: theme.palette.border.main,
  //       },

  //       '&:hover': {
  //         // borderColor: theme.palette.border.main,
  //         backgroundColor: 'transparent',
  //         color: theme.palette.text.primary,
  //         [`& .${svgIconClasses.root}`]: {
  //           color: 'inherit',
  //         },
  //       },
  //       '&:active': {
  //         backgroundColor: theme.palette.state.active,
  //       },
  //     }),
  //   },
  // },

  MuiLinearProgress: {
    styleOverrides: {
      colorPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
      }),
      barColorPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.state.active,
      }),
    },
  },

  MuiSvgIcon: {
    styleOverrides: {
      fontSizeExtraSmall: {
        fontSize: '1rem',
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      list: ({ theme }) => ({
        padding: '8px',
        borderRadius: '8px',

        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.palette.border.main,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '8px 12px',
        borderRadius: '8px',

        ...(theme.typography.body2['500'] as CSSProperties),
      }),
    },
  },

  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true,
      disableRipple: true,
      startIcon: <CircularProgress id="loader" size={20} />,
    },

    styleOverrides: {
      outlined: ({ theme }) => ({
        color: theme.palette.neutral.white,
        borderColor: theme.palette.secondary.main,
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
        '&:active': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.state.active,
        },
        '&:disabled': {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.state.hover,
        },
      }),
      disabled: ({ theme }) => ({
        [`& .${circularProgressClasses.root}`]: {
          color: theme.palette.text.secondary,
        },
      }),
      text: ({ theme }) => ({
        [`&:hover`]: {
          background: 'inherit',
          color: theme.palette.primary.main,
        },
      }),

      contained: ({ theme }) => ({
        [`& .${circularProgressClasses.root}`]: {
          color: theme.palette.inverted.text,
        },
      }),

      iconOnly: ({ theme }) => ({
        padding: '6px',
        minWidth: '38px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.palette.border.main,
        borderRadius: 8,
        '& .MuiButton-icon': { margin: 0 },
        '&:hover': {
          borderColor: theme.palette.border.main,
          backgroundColor: theme.palette.state.hover,
        },
        '&:active': {
          backgroundColor: theme.palette.state.active,
        },
      }),

      root: ({ ownerState, theme }) => {
        return {
          ...(ownerState.color === 'muted' && {
            color: theme.palette.textButton.light,
          }),

          [`& .${circularProgressClasses.root}`]: {
            display: ownerState.loading ? 'block' : 'none',
          },

          [`& .${buttonClasses.startIcon}`]: {
            display:
              ownerState.startIcon &&
              React.isValidElement(ownerState.startIcon) &&
              ownerState.startIcon.props.id === 'loader' &&
              !ownerState.loading
                ? 'none'
                : 'inherit',
          },
          [`&:hover`]: {
            backgroundColor:
              ownerState.color && ownerState.color !== 'inherit'
                ? (theme.palette[ownerState.color] as CustomColorPartial)[500]
                : undefined,
            color: theme.palette.neutral.white,
          },
          [`&:active`]: {
            backgroundColor:
              ownerState.color && ownerState.color !== 'inherit'
                ? (theme.palette[ownerState.color] as CustomColorPartial)[800]
                : undefined,
            color: theme.palette.neutral.white,
          },
          [`&.${buttonBaseClasses.disabled}`]: {
            backgroundColor:
              ownerState.color && ownerState.color !== 'inherit'
                ? theme.palette[ownerState.color].light
                : undefined,
            color: theme.palette.neutral.white,

            [`& .${circularProgressClasses.root}`]: {
              color: theme.palette.text.secondary,
            },
          },
          height: '48px',
          textTransform: 'capitalize',
          borderRadius: 8,
          minWidth: 'unset',
        }
      },
      sizeExtraSmall: {
        height: '32px',
        fontSize: '0.75rem',
      },
      sizeSmall: {
        height: '40px',
        fontSize: '0.9rem',
      },
      iconSizeExtraSmall: {},
      textSizeExtraSmall: {},
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        top: '-10px !important',
        left: '-15px !important',
        color: theme.palette.text.primary,
        [`&.${inputBaseClasses.focused}`]: {
          color: 'initial',
        },
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      fullWidth: true,
      InputLabelProps: {
        shrink: true,
      },
    },
    styleOverrides: {
      root: {
        [`& .${inputBaseClasses.root}`]: {
          borderRadius: '8px',
        },
        [`& .${inputBaseClasses.input}`]: {
          height: '1em',
        },
        [`& .${formLabelClasses.root}`]: {
          position: 'static',
          transform: 'scale(0.75)',
          transformOrigin: 'none',
        },
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      sizeSmall: ({ theme }) => ({
        height: '42px',
        ...(theme.typography.caption1?.['400'] as CSSProperties),
        variants: [],
      }),
      error: ({ theme }) => ({
        color: theme.palette.error.main,
        backgroundColor: `${(theme.palette.error as CustomColorPartial)[25]} !important`,

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: `${theme.palette.error.main} !important`,
        },
        '&:hover': {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: `${theme.palette.error.main} !important`,
          },
        },
      }),

      // FIXME: Only for FILLED mode
      // root: ({ theme, ownerState }) => ({
      // height: '48px',
      // color: theme.palette.neutral.white,

      // backgroundColor:
      //   ownerState.color !== 'primary'
      //     ? (
      //         theme.palette[
      //           ownerState.color || 'primary'
      //         ] as CustomColorPartial
      //       )[25]
      //     : (theme.palette.secondary as CustomColorPartial)[25],

      // borderColor: theme.palette[ownerState.color || 'secondary'].main,

      // [`&:hover`]: {
      //   backgroundColor: theme.palette.state.hover,
      // },

      // [`& .${inputBaseClasses.input}::placeholder`]: {
      //   color: theme.palette.text.secondary,
      // },

      // [`&.${inputBaseClasses.disabled} .${inputBaseClasses.input}`]: {
      //   cursor: 'not-allowed',
      // },

      //   [`&.${inputBaseClasses.focused} .${inputBaseClasses.input}`]: {
      //     color: theme.palette.neutral.white,
      //   },

      //   // outline

      //   [`& .${outlinedInputClasses.notchedOutline}`]: {
      //     borderColor:
      //       ownerState.color !== 'secondary'
      //         ? theme.palette[ownerState.color || 'secondary'].main
      //         : theme.palette.border.main,
      //     '& legend': {
      //       width: 0,
      //     },
      //   },

      //   [`&.${inputBaseClasses.root}:hover .${outlinedInputClasses.notchedOutline}`]:
      //     {
      //       borderColor:
      //         ownerState.color === 'primary'
      //           ? theme.palette.border.main
      //           : 'inherit',
      //     },

      //   [`&.${inputBaseClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      //     {
      //       borderColor: `${theme.palette[ownerState.color || 'primary'].main}`,
      //     },

      //   [`&.${inputBaseClasses.focused}:hover .${outlinedInputClasses.notchedOutline}`]:
      //     {
      //       borderColor: `${theme.palette[ownerState.color || 'secondary'].main}`,
      //     },

      //   // disabled
      //   [`&.${inputBaseClasses.disabled}`]: {
      //     color: theme.palette.text.disabled,
      //     background: `${(theme.palette.secondary as CustomColorPartial)[100]} !important`,
      //   },
      //   [`&.${inputBaseClasses.disabled} .${outlinedInputClasses.notchedOutline}`]:
      //     {
      //       borderColor: theme.palette.border.main,
      //     },
      //   [`&.${inputBaseClasses.disabled}:hover .${outlinedInputClasses.notchedOutline}`]:
      //     {
      //       borderColor: theme.palette.border.main,
      //     },
      // }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: '4px 0px',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme, ownerState: { labelSize } }) => ({
        ...(labelSize === 'medium' && {
          fontSize: theme.typography.caption1,
        }),
        ...(labelSize === 'small' && {
          fontSize: theme.typography.caption2,
        }),
        ...(labelSize === 'large' && {
          fontSize: theme.typography.h6,
        }),
        color: theme.palette.text.secondary,
        padding: '0rem 1.5rem',
        variants: [],
        textTransform: 'capitalize',
      }),
    },
  },
}
