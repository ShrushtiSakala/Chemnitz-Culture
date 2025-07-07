import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './NavBar.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/map">Chemnitz Culture</Link>
      </div>

      <div
        className={`navbar-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>

      <nav className={`navbar-menu${open ? ' active' : ''}`}>
        <Link to="/map" onClick={() => setOpen(false)}>Map</Link>
        <Link to="/list" onClick={() => setOpen(false)}>List</Link>

        {isLoggedIn ? (
          <>
            <Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link>
            <Link to="/profile"   onClick={() => setOpen(false)}>Profile</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
