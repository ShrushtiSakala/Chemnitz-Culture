import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListPage.css';

export default function ListPage() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [sites,    setSites]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const categories = [
    { value: '',           label: 'All Categories' },
    { value: 'museum',     label: 'Museum' },
    { value: 'artwork',    label: 'Artwork' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'theatre',    label: 'Theatre' },
  ];

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:5000/api/sites', {
      params: { search: search || undefined, category: category || undefined }
    })
    .then(res => setSites(res.data))
    .catch(() => setError('Failed to load sites.'))
    .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div className="list-container">
      <h2>Cultural Sites</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="status">Loading…</p>}
      {error   && <p className="status error">{error}</p>}

      <div className="sites-grid">
        {sites.length === 0 && !loading && (
          <p className="status">No sites found.</p>
        )}
        {sites.map(site => (
          <div
            key={site._id}
            className="site-card"
            onClick={() => window.location.href = `/sites/${site._id}`}
          >
            <h3>
              {site.name || 'Unnamed'}
              <span className={`badge badge-${site.category}`}>
                {site.category}
              </span>
            </h3>
            <p className="address">{site.address || 'No address'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
