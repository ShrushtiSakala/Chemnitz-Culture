require('dotenv').config();
const mongoose = require('mongoose');
const Site     = require('../models/Site');
const User     = require('../models/User');
const overpass = require('./fetchOverpass'); // your existing importer

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // drop & recreate
  await mongoose.connection.db.dropCollection('sites').catch(() => {});
  await mongoose.connection.db.dropCollection('users').catch(() => {});
  console.log('🗑 Dropped old collections');

  // ensure 2dsphere on Site.location
  await Site.createIndexes();
  // ensure 2dsphere on User.location (sparse)
  await User.createIndexes();

  console.log('🔨 Indexes created');

  // seed Overpass data
  console.log('⏳ Fetching data from Overpass…');
  await overpass();    // fetchOverpass.js should insert into Site
  console.log('🎉 Done importing site data');

  // optional: create an “admin” test user
  const test = await User.create({
    username: 'testuser',
    email:    'test@example.com',
    password: '$2b$10$…hashed…', // or call bcrypt.hash()
    name:     'Test User'
  });
  console.log('👤 Created test user:', test._id.toString());

  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
