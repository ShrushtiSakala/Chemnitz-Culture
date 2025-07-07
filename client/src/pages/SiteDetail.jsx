import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function SiteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, userId } = useContext(AuthContext);

  const [site, setSite] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // fetch site info
    axios.get(`http://localhost:5000/api/sites/${id}`)
      .then(res => setSite(res.data))
      .catch(() => {/* handle error */});

    if (token) {
      // fetch user's favorites
      axios.get(`http://localhost:5000/api/users/${userId}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // mark favorite if present
        setIsFav(res.data.some(s => s._id === id));
      })
      .catch(() => {/* ignore or show a message */});
    }
  }, [id, token, userId]);

  // 2) Handler to add or remove
  const toggleFavorite = async () => {
    if (!token) {
      // not logged in → redirect or show message
      return navigate('/login');
    }

    try {
      if (!isFav) {
        // Add favorite
        await axios.post(
          `http://localhost:5000/api/users/${userId}/favorites`,
          { siteId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFav(true);
      } else {
        // Remove favorite
        await axios.delete(
          `http://localhost:5000/api/users/${userId}/favorites/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFav(false);
      }
    } catch (err) {
      console.error('Fav error', err);
    }
  };

  if (!site) return <p>Loading…</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
      <h2>{site.name}</h2>
      <p><em>Category:</em> {site.category}</p>
      <p>{site.address}</p>
      <p>{site.description}</p>

      <button
        onClick={toggleFavorite}
        style={{
          padding: '0.5rem 1rem',
          background: isFav ? '#c0392b' : '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}
