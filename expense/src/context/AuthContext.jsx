// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasUsers, setHasUsers] = useState(null); // null means unknown yet

  useEffect(() => {
    // On first load, check if any user exists in the DB:
    axios
      .get("/api/auth/exists")
      .then((res) => {
        setHasUsers(res.data.hasUsers); // true/false
      })
      .catch((err) => {
        console.error("Error checking user existence:", err);
      });

    // Also, check if token is stored and valid (minimal example):
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        hasUsers,
        setHasUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
