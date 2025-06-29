import { lazy } from 'react'

// TODO: Use this when you want to lazy load all the components
export const HomePage = lazy(async () => {
  const { HomePage } = await import('./home/Home')
  return { default: HomePage }
})

export const AboutUsPage = lazy(async () => {
  const { AboutUsPage } = await import('./about-us/AboutUs')
  return { default: AboutUsPage }
})

export const HelpSupportPage = lazy(async () => {
  const { HelpSupportPage } = await import('./help-support/HelpSupport')
  return { default: HelpSupportPage }
})

export const ServicesPage = lazy(async () => {
  const { ServicesPage } = await import('./services/Services')
  return { default: ServicesPage }
})

export const CabServicesPage = lazy(async () => {
  const { CabServicesPage } = await import('./cab-services/CabServices')
  return { default: CabServicesPage }
})

export const TicketBookingPage = lazy(async () => {
  const { TicketBookingServicesPage } = await import(
    './ticket-booking-services/TicketBookingServices'
  )
  return { default: TicketBookingServicesPage }
})

export const GroceryDeliveryPage = lazy(async () => {
  const { GroceriesDeliveryServicesPage } = await import(
    './grocery-delivery-services/GroceriesDeliveryServices'
  )
  return { default: GroceriesDeliveryServicesPage }
})

export const AdminPage = lazy(async () => {
  const { AdminPage } = await import('./admin/Admin')
  return { default: AdminPage }
})

export const EventDetails = lazy(async () => {
  const { EventDetailsPage } = await import('./event-details/EventDetailsPage')
  return { default: EventDetailsPage }
})

export const CoursesPage = lazy(async () => {
  const { Courses } = await import('./courses/CoursesPage')
  return { default: Courses }
})

export const ContactUsPage = lazy(async () => {
  const { ContactUsPage } = await import('./ContactUs/index')
  return { default: ContactUsPage }
})




export const EventDetailsPage = lazy(async () => {
  const { EventDetailsPage } = await import('./event-details/EventDetailsPage')
  return { default: EventDetailsPage }
})

export const ForgotPasswordPage = lazy(async () => {
  const { ForgotPasswordPage } = await import('./user/forgetpassword')
  return { default: ForgotPasswordPage }
})

export const ResetPasswordPage = lazy(async () => {
  const { ResetPasswordPage } = await import('./user/ResetPassword')
  return { default: ResetPasswordPage }
})
