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

// Import UserProfile and PrivateRoute
import { UserProfilepage } from '../../../../pages/components/user/UserProfile' // Corrected path to UserProfile
import PrivateRoute from '../PrivateRoute' // Corrected path to PrivateRoute (assuming it's in the same directory)

import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      {' '}
      {/* Wrap all routes that need the MainLayout */}
      <Route element={<Outlet />}>
        {/* Routes that use MainLayout */}
        <Route path={appPaths['/']} element={<HomePage />} />
        <Route path={appPaths.about} element={<AboutUsPage />} />
        <Route path={appPaths.helpAndSupport} element={<HelpSupportPage />} />
        <Route path={appPaths.services} element={<ServicesPage />} />
        <Route path={appPaths.cabServices} element={<CabServicesPage />} />
        <Route
          path={appPaths.ticketBookingServices}
          element={<TicketBookingServicesPage />}
        />
        {/* Keep using LoginPage and SignupPage as you specified */}
        <Route path={appPaths.userLogin} element={<LoginPage />} />
        <Route path={appPaths.userSignup} element={<SignupPage />} />

        {/* New: Protected User Profile Route */}
        <Route
          path={appPaths.userProfile}
          element={
            <PrivateRoute>
              <UserProfilepage />
            </PrivateRoute>
          }
        />

        {/* Admin route - now protected by PrivateRoute with role check */}
        <Route
          path={appPaths.admin}
          element={
            <PrivateRoute roles={['admin']}> {/* Assumes 'admin' is the role for administrators */}
              <AdminPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Route>
  )
)

export default Router