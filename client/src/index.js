// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerUrl    from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider }    from './contexts/AuthContext';
import { FiltersProvider } from './contexts/FiltersContext';

// Configure Leaflet's default icon (fixes missing-marker issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl:       markerUrl,
  shadowUrl:     markerShadow,
});

// Render the React tree, with providers
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
