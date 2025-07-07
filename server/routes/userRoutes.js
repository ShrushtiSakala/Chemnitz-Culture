const express = require('express');
const {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// 1) Get your own profile
router.get('/:uid/profile', auth, getProfile);

// 2) Update your name/location
router.patch('/:uid', auth, updateProfile);

// 3) Favorites...
router.get('/:uid/favorites', auth, getFavorites);
router.post('/:uid/favorites', auth, addFavorite);
router.delete('/:uid/favorites/:siteId', auth, removeFavorite);

module.exports = router;
