// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken"; // Certifique-se de ter esta biblioteca instalada

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      const decodedToken = jwt.decode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now(); // O `exp` é um timestamp em segundos

      if (!isExpired) {
        setIsAuthenticated(true); // Token é válido
        setUser(decodedToken); // Armazena os dados do usuário
      } else {
        setIsAuthenticated(false); // Token expirado
        clearCookie('authToken'); // Limpa o cookie
      }
    }
  }, []);

  const login = (token) => {
    document.cookie = `authToken=${token}; path=/; Secure; SameSite=None`;
    const decodedToken = jwt.decode(token);
    setUser(decodedToken); // Armazena os dados do usuário
    setIsAuthenticated(true); // Atualiza o estado de autenticação
  };

  const logout = () => {
    clearCookie('authToken');
    setUser(null); // Limpa os dados do usuário
    setIsAuthenticated(false); // Atualiza o estado de autenticação
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Função para obter um cookie pelo nome
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Função para limpar um cookie pelo nome
const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
