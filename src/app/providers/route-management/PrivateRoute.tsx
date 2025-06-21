// PrivateRoute.tsx - This file looks good, no changes needed.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth-management/AuthContext'; // Adjust path
import { appPaths } from 'entities/config'; // Adjust path

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[]; // Optional prop to specify required roles
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    return <Navigate to={appPaths.userLogin} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    // If roles are specified and user's role doesn't match
    return <Navigate to={appPaths['/']} replace />; // Redirect to home or an unauthorized page
  }

  return <>{children}</>;
};

export default PrivateRoute;