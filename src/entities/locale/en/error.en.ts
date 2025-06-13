type ErrorEn = Record<
  string,
  Partial<{
    label: string
    description: string
  }>
>

export const errorEn = {
  chatNotFound: {
    label: 'Chat not found',
    description: 'Chat is no longer available or not valid.',
  },
  accountInactive: {
    label: 'Account inactive',
    description:
      'Your account is currently inactive. Please contact support for assistance.',
  },
  default: {
    label: 'Something went wrong! Please contact support.',
  },
} satisfies ErrorEn
