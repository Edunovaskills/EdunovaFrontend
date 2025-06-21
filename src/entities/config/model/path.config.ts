export const appPaths = {
  '/': '/',
  services: '/services',
  cabServices: '/services/cab',
  ticketBookingServices: '/services/ticket-booking',
  groceriesDelivery: '/services/grocery-delivery',
  bikeServices: '/services/bike',
  helpAndSupport: '/helpAndSupport',
  about: '/about',
  'contact-us': '/contact-us',
  career: '/career',
  download: '/download',
  'privacy-policy': '/privacy-policy',
  'terms-of-services': '/terms-of-services',
  admin: '/admin',
  userLogin: '/user/login',
  userSignup: '/user/signup',
  userProfile: '/user/profile', // Added user profile path
} as const

export type AppPaths = typeof appPaths
export type AppPathsName = keyof AppPaths

// ------------------ External App Paths ----------------

type ExternalPath = Record<
  string,
  {
    baseUrl: string
    route: Record<string, string>
  }
>

export const marketingWebsiteBaseUrl = import.meta.env.VITE_MARKETING_WEBSITE_URL

export const extPaths = {
  marketingWebsite: {
    baseUrl: marketingWebsiteBaseUrl ?? '',
    route: {
      login: '/login',
      pricing: '/pricing',
      // userLogin: '/user/login',  // Removed duplicate
      // userSignup: '/user/signup', // Removed duplicate
    },
  },
} satisfies ExternalPath

export type ExtAppPaths = typeof extPaths
export type ExtAppNames = keyof ExtAppPaths
export type ExtAppRoutes<T extends ExtAppNames> = keyof ExtAppPaths[T]['route']