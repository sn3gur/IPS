import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * COMPONENT: ProtectedRoute
 * Wraps routes that require authentication.
 * If the user is not logged in, redirects to the /login page.
 */
function ProtectedRoute({ children }) {
    const { user, isLoading } = useContext(AuthContext);

    // If still checking the session, show a simple loading state
    if (isLoading) {
        return <div className="loading-screen">Verifying session...</div>;
    }

    // If no user is found, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, render the children (the protected page)
    return children;
}

export default ProtectedRoute;