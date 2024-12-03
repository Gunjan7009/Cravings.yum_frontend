import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {


    const location = useLocation();
    const userData = localStorage.getItem('userData');
    console.log('PrivateRoute: User data:', userData);
    if (userData) {
        console.log('PrivateRoute: User is authenticated, rendering children');
        return children;
    } else {
        console.log('PrivateRoute: User is not authenticated, redirecting to login');
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;