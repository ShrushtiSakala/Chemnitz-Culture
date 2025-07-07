const mongoose = require('mongoose');
const siteSchema = new mongoose.Schema({
  osmId:      { type: String, required: true, unique: true },
  name:       { type: String, required: true },
  category:   { type: String, required: true },      // e.g. "museum", "artwork"
  address:    { type: String },
  website:    { type: String },
  wikidata:   { type: String },
  properties: { type: mongoose.Mixed },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }   // [lng, lat]
  }
}, {
  timestamps: true
});

// Create a 2dsphere index for geo-queries
siteSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Site', siteSchema);
