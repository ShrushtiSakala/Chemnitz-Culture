// server/scripts/fetchOverpass.js
require('dotenv').config();
const mongoose = require('mongoose');
const axios    = require('axios');
const Site     = require('../models/Site');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
}

async function fetchOSMData() {
  // Overpass QL query: all museums, artworks, theatres, restaurants in Chemnitz bbox
  const bbox = '50.75,12.79,50.90,13.03';  
  const query = `
    [out:json][timeout:25];
    (
      node[amenity=museum](${bbox});
      way[amenity=museum](${bbox});
      node[tourism=artwork](${bbox});
      way[tourism=artwork](${bbox});
      node[amenity=restaurant](${bbox});
      way[amenity=restaurant](${bbox});
      node[amenity=theatre](${bbox});
      way[amenity=theatre](${bbox});
    );
    out center; // for ways, gives a center point
  `;
  const url = 'https://overpass-api.de/api/interpreter';

  console.log('🌐 Fetching OSM data…');
  const res = await axios.post(url, `data=${encodeURIComponent(query)}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return res.data.elements;
}

async function upsertSites(elements) {
  let count = 0;
  for (const el of elements) {
    const osmId = `${el.type}/${el.id}`;  
    const doc = {
      osmId,
      name:       el.tags?.name || 'Unnamed',
      category:   el.tags?.amenity || el.tags?.tourism || 'unknown',
      address:    el.tags?.addr_full || el.tags?.['addr:street'] || '',
      website:    el.tags?.website || el.tags?.url || '',
      wikidata:   el.tags?.wikidata || '',
      properties: el.tags || {},
      location: {
        type: 'Point',
        coordinates: el.type === 'node'
          ? [el.lon, el.lat]
          : [el.center.lon, el.center.lat]
      }
    };
    await Site.findOneAndUpdate(
      { osmId },
      doc,
      { upsert: true, new: false }
    );
    count++;
  }
  console.log(`🔄 Upserted ${count} sites`);
}

async function main() {
  try {
    await connectDB();
    const elements = await fetchOSMData();
    await upsertSites(elements);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

main();
