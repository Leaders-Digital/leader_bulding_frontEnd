/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { UseAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = UseAuth();
  if (!isAuthenticated) {
    return navigate("/login");
  }
  if (!roles && !roles.includes(user.role)) {
    return navigate("/unothorized");
  }
  return children;
};

export default ProtectedRoutes;
