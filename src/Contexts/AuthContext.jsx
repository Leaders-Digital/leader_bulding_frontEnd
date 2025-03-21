/* eslint-disable no-unused-vars */
 
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { getCurrentUser } from "../API/Auth";
import useCurrentUser from "../Hooks/useUser";

const AuthContext = createContext();
export const UseAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { data, error } = useCurrentUser()
  
  useEffect(() => {
    if (data) {
  
      setIsAuthenticated(true);
      setUser(data);
      setIsLoading(false);
    }
    if (error) {
      
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        navigate("/login");
      }
    }
  }, [error, navigate, data]);



  const login = async () => {
    await mutate("/user/me");
    setIsAuthenticated(true);
    setUser(data);
    navigate("/");
  };
  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
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
