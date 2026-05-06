import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminUser");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (form) => {
    const res = await axios.post(
      `${API_URL}/api/admin/login`,
      form
    );

    const { token, user } = res.data;

    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(user));

    setToken(token);
    setAdmin(user);

    return user;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    login,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
