/* eslint-disable no-unused-vars */
 
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { getCurrentUser } from "../API/Auth";
import useCurrentUser from "../Hooks/useUser";
import {toast} from "react-toastify";

const AuthContext = createContext();
export const UseAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { data, error } = useCurrentUser();
  
  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
      setUser(data);
      setIsLoading(false);
      // If we're on the login page and we're authenticated, redirect to dashboard
      if (window.location.pathname === '/login') {
        navigate('/Dashboard', { replace: true });
      }
    }
    if (error) {
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        navigate("/login", { replace: true });
      }
    }
  }, [error, navigate, data]);

  const login = async () => {
    try {
      // Manually trigger a revalidation of the user data
      await mutate("user/getCurrentUser");
      const userData = await getCurrentUser();
      toast.success("User logged in successfully!")
      setIsAuthenticated(true);
      setUser(userData);
      navigate('/Dashboard', { replace: true });

    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };
        
  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login", { replace: true });
  };  

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
