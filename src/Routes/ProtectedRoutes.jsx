/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { UseAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = UseAuth();
  console.log("from the provider",isAuthenticated)
  useEffect(() => {
 
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    if   ( !isAuthenticated ||  (roles && !roles.includes(user?.role))) {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, user, roles, navigate]);
 
  return children;
};

export default ProtectedRoutes;
