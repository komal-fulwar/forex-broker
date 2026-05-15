import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

/**
 * PublicRoute — wraps public-only pages like Login/Signup.
 * If the user is already authenticated, they are redirected to the dashboard.
 * This prevents authenticated users from accessing /auth by typing the URL.
 */
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
