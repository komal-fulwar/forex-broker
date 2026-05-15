import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

/**
 * ProtectedRoute — wraps private pages.
 * If the user is NOT authenticated, they are redirected to /auth.
 * Saves the attempted location so we can redirect back after login.
 */
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
