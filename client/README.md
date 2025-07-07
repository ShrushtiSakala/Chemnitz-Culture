# Chemnitz Culture

A modern web application for discovering and bookmarking cultural sites in Chemnitz (museums, artworks, restaurants, theatres) on an interactive map.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Environment Variables](#environment-variables)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
  1. [Install Dependencies](#1-install-dependencies)  
  2. [Initialize the Database](#2-initialize-the-database)  
  3. [Run in Development](#3-run-in-development)  
  4. [Test Login & Favorites](#4-test-login--favorites)  
- [Available Scripts](#available-scripts)  
- [API Documentation](#api-documentation)  
- [Test Account](#test-account)  
- [License](#license)  

---

## Features

- **Interactive Map** of cultural sites using React-Leaflet  
- **Site List & Detail** views with search & category filters  
- **User Authentication** (signup, login) with JWT & bcrypt  
- **Favorites**: add/remove sites to your personal list  
- **Profile**: update display name and save your location  
- **Responsive UI**: mobile-friendly layout  

---

## Tech Stack

- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM)  
- **Frontend**: React.js, React Router, React Leaflet  
- **Database**: MongoDB Atlas or local MongoDB  
- **Auth**: JSON Web Tokens (JWT), bcryptjs  
- **Styling**: CSS modules + plain CSS  
- **Data Import**: Overpass API + custom scripts  

---

## Prerequisites

- **Node.js** v14 or later  
- **npm** (comes with Node.js)  
- **MongoDB** (local or Atlas cluster)  

---

## Environment Variables

Copy the example and fill in your own values:

```bash
# in /server
cp .env.example .env


Getting Started

1. Install Dependencies
# back-end
cd server
npm install

# front-end
cd ../client
npm install

2. Initialize the Database

# from the project root
cd server
npm run initdb

3. Run in Development
# back-end API
cd server
npm run dev       # starts Express on http://localhost:5000

# front-end UI
cd ../client
npm start         # launches React on http://localhost:3000

4. Test Login & Favorites
1.Open your browser at http://localhost:3000/login
2.Sign in with the test account (see below)
3.Visit Map, click “☆ Add to Favorites” on any marker
4.Go to Favorites to confirm the site appears

Available Scripts
Server
npm run dev – start the Express server with nodemon
npm run initdb – drop & seed the database

Client
npm start – start the React development server
npm run build – create a production build

Test Account
Email: test@example.com
Password: password123
Username: testuser

