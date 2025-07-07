
// client/src/pages/LandingPage.jsx
import React from 'react';
import './LandingPage.css';
import heroImg from '../assets/Logo.png';

export default function LandingPage() {
  return (
    <section 
      className="landing-hero" 
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="landing-overlay" />
      <div className="landing-content">
        <h1>Chemnitz Culture</h1>
        <p>Discover museums, artworks, restaurants & theatres</p>
        <a href="/map" className="btn btn-primary">Explore Now</a>
      </div>
    </section>
  );
}