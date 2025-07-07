import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken]     = useState(localStorage.getItem('token'));
  const [userId, setUserId]   = useState(localStorage.getItem('userId'));
  const isLoggedIn = Boolean(token);

  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUserId(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
