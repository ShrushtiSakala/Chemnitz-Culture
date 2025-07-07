import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function MapPage() {
  const [sites,   setSites  ] = useState([]);
  const [favIds,  setFavIds ] = useState([]);
  const { isLoggedIn, token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1) Create an Axios instance that always sends JWT
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    });
    return instance;
  }, [token]);

  // 2) Fetch all sites once
  useEffect(() => {
    api.get('/sites')
      .then(res => setSites(res.data))
      .catch(err => {
        console.error(err);
        alert('Failed to load sites.');
      });
  }, [api]);

  // 3) If logged in, fetch current favorites
  useEffect(() => {
    if (!isLoggedIn) return;
    api.get(`/users/${userId}/favorites`)
      .then(res => setFavIds(res.data.map(site => site._id)))
      .catch(err => {
        console.error(err);
        alert('Failed to load your favorites.');
      });
  }, [isLoggedIn, userId, api]);

  // 4) Toggle favorite on click
  const toggleFavorite = async (siteId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      let res;
      if (favIds.includes(siteId)) {
        // remove
        res = await api.delete(`/users/${userId}/favorites/${siteId}`);
      } else {
        // add
        res = await api.post(`/users/${userId}/favorites`, { siteId });
      }
      // server returns the up-to-date array of favorite Site documents
      setFavIds(res.data.map(site => site._id));
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || 'Could not update favorites.';
      alert(msg);
    }
  };

  return (
    <MapContainer
      center={[50.83, 12.92]}
      zoom={13}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {sites.map(site => {
        const isFav = favIds.includes(site._id);
        const [lng, lat] = site.location.coordinates;

        return (
          <Marker key={site._id} position={[lat, lng]}>
            <Popup>
              <div style={{ minWidth: 200 }}>
                <h3 style={{ margin: '0 0 .5rem' }}>{site.name}</h3>
                <p style={{ margin: 0, fontStyle: 'italic' }}>{site.category}</p>

                <div style={{ marginTop: '.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  <Link to={`/sites/${site._id}`}>View Details →</Link>
                  <button
                    onClick={() => toggleFavorite(site._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: isFav ? 'goldenrod' : 'gray',
                      fontWeight: isFav ? 'bold' : 'normal'
                    }}
                  >
                    {isFav ? '★ Remove Favorite' : '☆ Add to Favorites'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
