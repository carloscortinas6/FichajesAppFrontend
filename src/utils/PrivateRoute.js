import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;