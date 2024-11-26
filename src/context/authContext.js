import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      const decodedToken = jwt.decode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now(); 

      if (!isExpired) {
        setIsAuthenticated(true); 
        setUser(decodedToken); 
      } else {
        setIsAuthenticated(false); 
        clearCookie('authToken'); 
      }
    }
  }, []);

  const login = (token) => {
    document.cookie = `authToken=${token}; path=/; Secure; SameSite=None`;
    const decodedToken = jwt.decode(token);
    setUser(decodedToken); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearCookie('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
