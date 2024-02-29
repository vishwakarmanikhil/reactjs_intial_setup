import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loader, setLoader] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedToken = localStorage.getItem("token");
  
      if (storedToken) {
        const { expirationTime } = JSON.parse(storedToken);
  
        // Check if the token is not expired
        if (expirationTime > new Date().getTime()) {
          setLoader(false);
          setIsAuthenticated(true);
          // Set a timer to automatically log out if the token is expired
          setTimeout(() => {
            userLogout();
          }, expirationTime - new Date().getTime());
        } else {
          // Token is expired, perform logout
          userLogout();
        }
      }
    };
  
    checkAuthStatus();
  }, []);
  

  const setToken = (token) => {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem("token", JSON.stringify({ token, expirationTime }));
  }

  const userLogin = (token, user) => {
    setUserDetails(user);
    setIsAuthenticated(true);
    setToken(token);
  };

  const userLogout = () => {
    setUserDetails({});

    // Remove the token from local storage
    localStorage.removeItem("token");
    setLoader(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userLogin, userLogout, userDetails }}
    >
      {loader ? <p>loading....</p> : children }
    </AuthContext.Provider>
  );
};
