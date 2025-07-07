import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { token, userId, logout } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [error, setError]         = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setFavorites(res.data))
    .catch(err => setError('Could not load favorites.'));
  }, [token, userId]);

  const removeFavorite = async (siteId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${userId}/favorites/${siteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(favs => favs.filter(f => f._id !== siteId));
    } catch (err) {
      console.error(err);
      setError('Failed to remove favorite.');
    }
  };

  if (error) {
    return <p className="fav-error">{error}</p>;
  }

  if (!favorites.length) {
    return <p className="fav-empty">You have no favorites yet.</p>;
  }

  return (
    <div className="fav-container">
      <h2>My Favorites</h2>
      <div className="fav-grid">
        {favorites.map(site => (
          <div key={site._id} className="fav-card">
            
            <div className="fav-thumb">
          
            </div>
            <div className="fav-info">
              <h3>{site.name}</h3>
              <p className="category">{site.category}</p>
              <p className="address">{site.address}</p>
            </div>
            <div className="fav-actions">
              <Link to={`/sites/${site._id}`} className="btn btn-detail">
                Details
              </Link>
              <button
                onClick={() => removeFavorite(site._id)}
                className="btn btn-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
