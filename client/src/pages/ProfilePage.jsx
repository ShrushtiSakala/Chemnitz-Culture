import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

export default function ProfilePage() {
  const { token, userId, logout } = useContext(AuthContext);
  const [name, setName]       = useState('');
  const [loc, setLoc]         = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    if (!token) return;
    axios.get(`http://localhost:5000/api/users/${userId}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setName(res.data.name || '');
      if (res.data.location?.coordinates) {
        setLoc(res.data.location.coordinates);
      }
    })
    .catch(() => setError('Could not load profile'));
  }, [token, userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = { name };
      if (loc) body.location = { type: 'Point', coordinates: loc };
      await axios.patch(`http://localhost:5000/api/users/${userId}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile saved');
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const pickLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLoc([coords.longitude, coords.latitude]),
      () => alert('Unable to retrieve location')
    );
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSave} className="profile-form">
        <div>
          <label>Name</label><br/>
          <input
            type="text"
            className="text-input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="location-section">
          <label>Location</label>
          {loc
            ? <div className="coords">Lng: {loc[0].toFixed(4)}, Lat: {loc[1].toFixed(4)}</div>
            : <div className="coords">No location set.</div>
          }
          <button
            type="button"
            className="btn primary"
            onClick={pickLocation}
          >
            Use My Location
          </button>
        </div>

        <div className="buttons">
          <button
            type="submit"
            className="btn primary"
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Save Profile'}
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
