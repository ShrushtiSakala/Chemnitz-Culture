# 🗺️ Chemnitz Cultural Sites Web Application

An interactive full-stack web application to explore cultural landmarks, galleries, museums, restaurants, and bus/camper parking sites across Chemnitz, Germany — using OpenStreetMap and public open data.

---

## 📌 Features

- Display cultural sites on a live map (Leaflet + OpenStreetMap)
- View site details and links (e.g. museum websites)
- Load GeoJSON and CSV data directly into PostgreSQL with PostGIS
- REST API with Express.js backend
- Frontend built with React and Leaflet
- User account features and filtering (coming soon!)

---

## 🏗️ Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Frontend  | React, Axios, Leaflet (react-leaflet)|
| Backend   | Node.js, Express.js, PostgreSQL (pg) |
| GIS       | PostGIS (with GeoJSON geometry)      |
| Database  | PostgreSQL 14+                       |
| Import    | Custom scripts for GeoJSON and CSV   |
| Mapping   | OpenStreetMap, Leaflet.js            |

---

## 📁 Project Structure

```
chemnitz-cultural-app/
├── client/             # React frontend
├── server/             # Node.js backend
│   ├── importGeojson.js
│   ├── importParkingCsv.js
│   ├── db.js
│   ├── server.js
│   ├── index.js
│   └── .env.example    # Environment variable example (not secrets)
├── data/               # GeoJSON + CSV files
│   ├── Chemnitz.geojson
│   ├── Sachsen.geojson
│   ├── Stadtteile.geojson
│   ├── Parkplätze_Reisebus.csv
│   └── Parkplätze_Wohnmobil.csv
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/chemnitz-cultural-app.git
cd chemnitz-cultural-app
```

### 2. Backend Setup

#### Install Dependencies

```bash
npm install
```

#### Create `.env` file in `/server`

Create a `.env` file based on the example below:

```env
# server/.env
DATABASE_URL=postgresql://postgres:<your-password>@localhost:5432/chemnitzdb
PORT=3000
```

#### Enable PostGIS in PostgreSQL

```sql
CREATE DATABASE chemnitzdb;
\c chemnitzdb
CREATE EXTENSION postgis;
```

#### Import Data

Make sure your GeoJSON and CSV files are in the `data/` folder, then run:

```bash
npm run import
```

### 3. Start the Server

```bash
npm start
```

Test endpoints:
- http://localhost:3000/api/cultural_sites
- http://localhost:3000/api/bus_parking

---

### 4. Frontend Setup

```bash
cd client
npx create-react-app .
npm install axios leaflet react-leaflet
```

Add your `App.js`, `MapView.jsx`, and `SiteList.jsx` components (see `/docs` or backend repo for reference).

```bash
npm start
```

---

## 📦 Data Sources

- OpenStreetMap Overpass API
- Stadt Chemnitz Open Data Portal (CSV parking data)

---


## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author

- **Shrushti Sakala**  
  📧 shrushtisd19@gmail.com  
