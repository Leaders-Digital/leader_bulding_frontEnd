/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  //const [isLoading,setIsloading]=useState(true)
  const navigate = useNavigate();

  const { data, error } = useCurrentUser()
  console.log( "auth contxt",data,error)
  useEffect(() => {
    if (data) {
  
      setIsAuthenticated(true);
      setUser(data);
     // isLoading(false)
    }
    if (error) {
      
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
       // setIsloading(false)
        //navigate("/login");
      }
    }
  }, [error, navigate,data]);


  console.log("auth works after loading", isAuthenticated);
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
 
  /*if(isLoading){
  
    return null

  }*/

 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
