import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Auth disabled - allow all access
  return children;
};

export default ProtectedRoute;