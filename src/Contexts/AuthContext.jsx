/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { getCurrentUser } from "../API/Auth";

const AuthContext = createContext();
export const UseAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading,setIsloading]=useState(true)
  const navigate = useNavigate();

  const { data, error } = useSWR("/user/me", getCurrentUser, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  console.log("dataaa from the auth context", data);
  useEffect(() => {
    if (error) {
      console.log("Error while fetching user data: ", error);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
        setIsloading(false)
        navigate("/login");
      }
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data) {
      console.log("dataaa from the auth context", data);
      setIsAuthenticated(true);
      setUser(data);
      isLoading(false)
    }
  }, [data]);

  const login = async () => {
    setIsAuthenticated(true);
    await mutate("/user/me");
    navigate("/home");
  };
  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };
  if(isLoading){
    return null
  }
  console.log("hiiiiiiiiiii",isAuthenticated)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
