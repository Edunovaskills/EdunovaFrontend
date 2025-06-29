import { MainLayout } from 'app/layout/MainLayout/MainLayout'
import { appPaths } from 'entities/config'
import { lazy, Suspense } from 'react'
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { RouteGuard } from '../RouteGuard'
import { AdminRouteGuard } from '../AdminRouteGuard'
import { LoadingComponent } from 'shared/components'
import { CoursesPage, EventDetails } from 'pages/components'
import {BlogPage} from 'pages/components'

// Lazy load all page components for better code splitting
const AboutUsPage = lazy(() =>
  import('pages/components/about-us/AboutUs').then((module) => ({
    default: module.AboutUsPage,
  }))
)

const CabServicesPage = lazy(() =>
  import('pages/components/cab-services/CabServices').then((module) => ({
    default: module.CabServicesPage,
  }))
)
const HelpSupportPage = lazy(() =>
  import('pages/components/help-support/HelpSupport').then((module) => ({
    default: module.HelpSupportPage,
  }))
)
const HomePage = lazy(() =>
  import('pages/components/home/Home').then((module) => ({
    default: module.HomePage,
  }))
)
const ServicesPage = lazy(() =>
  import('pages/components/services/Services').then((module) => ({
    default: module.ServicesPage,
  }))
)
const TicketBookingServicesPage = lazy(() =>
  import('pages/components/ticket-booking-services/TicketBookingServices').then(
    (module) => ({ default: module.TicketBookingServicesPage })
  )
)
const AdminPage = lazy(() =>
  import('pages/components/admin/Admin').then((module) => ({
    default: module.AdminPage,
  }))
)
const LoginPage = lazy(() =>
  import('pages/components/user/Login').then((module) => ({
    default: module.LoginPage,
  }))
)
const SignupPage = lazy(() =>
  import('pages/components/user/Signup').then((module) => ({
    default: module.SignupPage,
  }))
)

const AdminEventsPage = lazy(
  () => import('pages/components/admin/AdminEventsPage')
)
const AdminCoursesPage = lazy(
  () => import('pages/components/admin/AdminCoursesPage')
)
const AdminBlogsPage = lazy(
  () => import('pages/components/admin/AdminBlogsPage')
)
const AdminUsersPage = lazy(
  () => import('pages/components/admin/AdminUsersPage')
)
const AdminEnquiryPage = lazy(
  () => import('pages/components/admin/AdminEnquiryPage')
)
const AdminTestimonialsPage = lazy(
  () => import('pages/components/admin/AdminTestimonialsPage')
)
const VerifyEmailPage = lazy(() =>
  import('pages/components/verfiy-form/verify').then((module) => ({
    default: module.VerifyEmailPage,
  }))
)
const AdminDashboardPage = lazy(
  () => import('pages/components/admin/AdminDashboardPage')
)
const AdminCertificatePage = lazy(() =>
  import('pages/components/admin/AdminCertificatePage').then((module) => ({
    default: module.AdminCertificatePage,
  }))
)
const PrivacyPolicyPage = lazy(() =>
  import('pages/components/privacy-policy').then((module) => ({
    default: module.default,
  }))
)
const TermsAndConditionsPage = lazy(() =>
  import('pages/components/terms-and-conditions').then((module) => ({
    default: module.default,
  }))
)

// Loading fallback component
const PageLoader = () => (
  <LoadingComponent loading={true} message="Loading page..." />
)

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route element={<MainLayout />}>
        <Route element={<Outlet />}>
          {/* Routes that use MainLayout */}
          <Route
            path={appPaths['/']}
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.about}
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutUsPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.events}
            element={
              <Suspense fallback={<PageLoader />}>
                <HelpSupportPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.eventDetail}
            element={
              <Suspense fallback={<PageLoader />}>
                <EventDetails />
              </Suspense>
            }
          />
          <Route
            path={appPaths.course}
            element={
              <Suspense fallback={<PageLoader />}>
                <CoursesPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.blog}
            element={
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.services}
            element={
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.cabServices}
            element={
              <Suspense fallback={<PageLoader />}>
                <CabServicesPage />
              </Suspense>
            }
          />
          <Route
            path={appPaths.ticketBookingServices}
            element={
              <Suspense fallback={<PageLoader />}>
                <TicketBookingServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<PageLoader />}>
                <PrivacyPolicyPage />
              </Suspense>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <Suspense fallback={<PageLoader />}>
                <TermsAndConditionsPage />
              </Suspense>
            }
          />

          {/* Admin routes - now protected by PrivateRoute with role check */}
          <Route
            path={appPaths.admin}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminDashboard}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboardPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminEvents}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminEventsPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminCourses}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminCoursesPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminBlogs}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminBlogsPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminUsers}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminUsersPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminEnquiries}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminEnquiryPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminCertificates}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminCertificatePage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminTestimonials}
            element={
              <AdminRouteGuard>
                <Suspense fallback={<PageLoader />}>
                  <AdminTestimonialsPage />
                </Suspense>
              </AdminRouteGuard>
            }
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Route>
      <Route
        element={
          <RouteGuard authRoute>
            <MainLayout />
          </RouteGuard>
        }
      >
        <Route
          path={appPaths.userLogin}
          element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path={appPaths.userSignup}
          element={
            <Suspense fallback={<PageLoader />}>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path={appPaths.verifyEmail}
          element={
            <Suspense fallback={<PageLoader />}>
              <VerifyEmailPage />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
)

export default Router
