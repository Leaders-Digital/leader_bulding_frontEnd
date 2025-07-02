/* eslint-disable no-unused-vars */

import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {mutate} from "swr";
import {getCurrentUser, userlogout} from "../API/Auth";
import useCurrentUser from "../Hooks/useUser";

const AuthContext = createContext();
export const UseAuth = () => useContext(AuthContext);
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const {data, error} = useCurrentUser(isLoggingOut);

    useEffect(() => {
        if (isLoggingOut) {
            return;
        }

        if (window.location.pathname === '/login' && !isAuthenticated) {
            return;
        }

        if (data) {
            setIsAuthenticated(true);
            setUser(data);
            setIsLoading(false);
            if (window.location.pathname === '/login' && !isLoggingOut) {
                navigate('/Dashboard', {replace: true});
            }
        }
        if (error) {
            if (error.response && error.response.status === 401) {
                setIsAuthenticated(false);
                setUser(null);
                setIsLoading(false);
                if (window.location.pathname !== '/login') {
                    navigate("/login", {replace: true});
                }
            }
        }
    }, [error, navigate, data, isLoggingOut, isAuthenticated]);

    const login = async () => {
        try {

            await mutate("user/getCurrentUser");
            const userData = await getCurrentUser();
            setIsAuthenticated(true);
            setUser(userData);
            navigate('/Dashboard', {replace: true});

        } catch (error) {
            console.error("Login failed:", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = async () => {
        setIsLoggingOut(true);
        setIsAuthenticated(false);
        setUser(null);

        await mutate("user/getCurrentUser", null, false);
        await mutate("user/getCurrentUser", undefined, false);

        const cookies = document.cookie.split(";");
        cookies.forEach(function (c) {
            const cookieName = c.split("=")[0].trim();
            if (cookieName) {
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
                document.cookie = `${cookieName}=; max-age=0; path=/;`;
                document.cookie = `${cookieName}=; max-age=0; path=/; domain=${window.location.hostname};`;
            }
        });

        try {
            await userlogout();
        } catch (error) {
            console.error("Logout API call failed:", error);
        }

        window.history.replaceState(null, null, '/login');

        for (let i = 0; i < 10; i++) {
            window.history.pushState(null, null, '/login');
        }

        const preventBack = function (e) {
            window.history.pushState(null, null, '/login');
        };
        window.addEventListener('popstate', preventBack);

        window.location.href = '/login';
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
