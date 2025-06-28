export const appPathParams = {
  eventId: 'event-id',
} as const
export type AppRouteStateValue = {
  anyState: boolean // REMARKS: Update this for state key
  email: string
  password: string
  firstName: string
  lastName: string
  confirmPassword: string
  referralToken: string
  openDrawer: boolean
  name: string
}

export const appPaths = {
  '/': '/',
  services: '/services',
  cabServices: '/services/cab',
  ticketBookingServices: '/services/ticket-booking',
  groceriesDelivery: '/services/grocery-delivery',
  bikeServices: '/services/bike',
  events: '/events',
  eventDetail: `/events/:${appPathParams.eventId}`,
  about: '/about',
  'contact-us': '/contact-us',
  career: '/career',
  download: '/download',
  'privacy-policy': '/privacy-policy',
  'terms-of-services': '/terms-of-services',
  admin: '/admin',
  adminDashboard: '/admin/dashboard',
  adminEvents: '/admin/events',
  adminCourses: '/admin/courses',
  adminBlogs: '/admin/blogs',
  adminUsers: '/admin/users',
  adminSettings: '/admin/settings',
  adminCertificates: '/admin/certificates',
  userLogin: '/user/login',
  userSignup: '/user/signup',
  userProfile: '/user/profile', // Added user profile path
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
} as const

export const appSearchParams = {
  example: 'example-params',
  code: 'code',
  id: 'id',
} as const
export type AppPaths = typeof appPaths
export type AppPathsName = keyof AppPaths

export type AppSearchParams = typeof appSearchParams
export type AppSearchParamsName = keyof AppSearchParams

// ------------------ External App Paths ----------------

type ExternalPath = Record<
  string,
  {
    baseUrl: string
    route: Record<string, string>
  }
>

export const marketingWebsiteBaseUrl = import.meta.env
  .VITE_MARKETING_WEBSITE_URL

export const extPaths = {
  marketingWebsite: {
    baseUrl: marketingWebsiteBaseUrl ?? '',
    route: {
      login: '/login',
      pricing: '/pricing',
    },
  },
} satisfies ExternalPath

export type AppPathParams = typeof appPathParams
export type ExtAppPaths = typeof extPaths
export type ExtAppNames = keyof ExtAppPaths
export type ExtAppRoutes<T extends ExtAppNames> = keyof ExtAppPaths[T]['route']

export type AppPathParamsName = keyof AppPathParams
