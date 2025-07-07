const Site = require('../models/Site');

// GET /api/sites
exports.getAllSites = async (req, res) => {
  try {
    // Optional filters: category, search text
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.name = new RegExp(req.query.search, 'i');
    }
    const sites = await Site.find(filter).limit(100);
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/sites/:id
exports.getSiteById = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
