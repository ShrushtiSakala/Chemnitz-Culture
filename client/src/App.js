import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';

import NavBar        from './components/NavBar';  
import MapPage       from './pages/MapPage';
import ListPage      from './pages/ListPage';
import SiteDetail    from './pages/SiteDetail';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage   from './pages/ProfilePage';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <NavBar />   {/* ← render NavBar here */}
      <Routes>
        {/* Public routes */}
        <Route path="/"         element={<LandingPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/list"     element={<ListPage />} />
        <Route path="/sites/:id" element={<SiteDetail />} />

        {/* Protected routes */}
        <Route
          path="/map"
          element={
            isLoggedIn
              ? <MapPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/favorites"
          element={
            isLoggedIn
              ? <FavoritesPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn
              ? <ProfilePage />
              : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all: send to /map */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
