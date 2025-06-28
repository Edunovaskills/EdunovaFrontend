import { MainLayout } from 'app/layout/MainLayout/MainLayout'
import { appPaths } from 'entities/config'
import { AboutUsPage } from 'pages/components/about-us/AboutUs'
import { CabServicesPage } from 'pages/components/cab-services/CabServices'
import { HelpSupportPage } from 'pages/components/help-support/HelpSupport'
import { HomePage } from 'pages/components/home/Home'
import { ServicesPage } from 'pages/components/services/Services'
import { TicketBookingServicesPage } from 'pages/components/ticket-booking-services/TicketBookingServices'
import { AdminPage } from 'pages/components/admin/Admin'
import { LoginPage } from 'pages/components/user/Login' // Keep this import
import { SignupPage } from 'pages/components/user/Signup' // Keep this import
import { EventDetailsPage } from 'pages/components'
import AdminEventsPage from 'pages/components/admin/AdminEventsPage'
import AdminCoursesPage from 'pages/components/admin/AdminCoursesPage'
import AdminBlogsPage from 'pages/components/admin/AdminBlogsPage'
import AdminUsersPage from 'pages/components/admin/AdminUsersPage'
import AdminSettingsPage from 'pages/components/admin/AdminSettingsPage'

// Import UserProfile and PrivateRoute

import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { VerifyEmailPage } from 'pages/components/verfiy-form/verify'
import { RouteGuard } from '../RouteGuard'
import { AdminRouteGuard } from '../AdminRouteGuard'
import AdminDashboardPage from 'pages/components/admin/AdminDashboardPage'
import { AdminCertificatePage } from 'pages/components/admin/AdminCertificatePage'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route element={<MainLayout />}>
        {' '}
        {/* Wrap all routes that need the MainLayout */}
        <Route element={<Outlet />}>
          {/* Routes that use MainLayout */}
          <Route path={appPaths['/']} element={<HomePage />} />
          <Route path={appPaths.about} element={<AboutUsPage />} />
          <Route path={appPaths.events} element={<HelpSupportPage />} />
          <Route path={appPaths.eventDetail} element={<EventDetailsPage />} />
          <Route path={appPaths.services} element={<ServicesPage />} />
          <Route path={appPaths.cabServices} element={<CabServicesPage />} />
          <Route
            path={appPaths.ticketBookingServices}
            element={<TicketBookingServicesPage />}
          />

          {/* Admin route - now protected by PrivateRoute with role check */}
          <Route
            path={appPaths.admin}
            element={
              <AdminRouteGuard>
                <AdminPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminDashboard}
            element={
              <AdminRouteGuard>
                <AdminDashboardPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminEvents}
            element={
              <AdminRouteGuard>
                <AdminEventsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminCourses}
            element={
              <AdminRouteGuard>
                <AdminCoursesPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminBlogs}
            element={
              <AdminRouteGuard>
                <AdminBlogsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminUsers}
            element={
              <AdminRouteGuard>
                <AdminUsersPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminSettings}
            element={
              <AdminRouteGuard>
                <AdminSettingsPage />
              </AdminRouteGuard>
            }
          />
          <Route
            path={appPaths.adminCertificates}
            element={
              <AdminRouteGuard>
                <AdminCertificatePage />
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
        <Route path={appPaths.userLogin} element={<LoginPage />} />
        <Route path={appPaths.userSignup} element={<SignupPage />} />
        <Route path={appPaths.verifyEmail} element={<VerifyEmailPage />} />
      </Route>
    </Route>
  )
)

export default Router
