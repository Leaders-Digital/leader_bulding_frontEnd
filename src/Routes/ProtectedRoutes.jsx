/* eslint-disable no-unused-vars */
 
import React, { useEffect } from "react";
import { UseAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = UseAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (roles && !roles.includes(user?.data?.role)) {
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, user, roles, navigate, isLoading]);
 
  if (isLoading) return null;

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoutes;
