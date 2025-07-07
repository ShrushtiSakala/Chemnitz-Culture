const express = require('express');
const { getAllSites, getSiteById } = require('../controllers/siteController');
const router = express.Router();

// Public endpoints
router.get('/', getAllSites);
router.get('/:id', getSiteById);

module.exports = router;
