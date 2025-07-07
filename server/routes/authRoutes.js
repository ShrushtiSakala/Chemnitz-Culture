const express    = require('express');
const { register } = require('../controllers/authController');
const { login }     = require('../controllers/authController');
const router     = express.Router();  
// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;
