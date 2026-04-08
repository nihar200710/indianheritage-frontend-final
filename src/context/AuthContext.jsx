import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:8080/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const navigate = useNavigate();

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', user.token); // Save token separately for easy access
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [user]);

  // 1. REGISTER FUNCTION
  const register = async (name, email, password, role) => {
    try {
      // Backend returns Map.of("success", true)
      const response = await axios.post(`${API_BASE}/register`, { name, email, password, role });
      
      if (response.data.success) {
        return { success: true };
      }
      return { success: false, message: "Registration failed." };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed due to server error.";
      return { success: false, message: msg };
    }
  };

  // 2. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, { email, password });
      
      // Backend returns: { token, role, name, email }
      if (response.data.token) {
        const foundUser = response.data;
        setUser(foundUser);
        
        // Save role specifically for quick RBAC checks
        localStorage.setItem('role', foundUser.role);
        
        // Explicitly set token in localStorage as requested
        localStorage.setItem('token', foundUser.token);

        // Redirect based on role
        switch(foundUser.role.toLowerCase()) {
          case 'admin': navigate('/admin-dashboard'); break;
          case 'enthusiast': navigate('/enthusiast-dashboard'); break;
          case 'creator': navigate('/creator-dashboard'); break;
          case 'guide': navigate('/guide-dashboard'); break;
          default: navigate('/');
        }
        return { success: true };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed due to server error.";
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);