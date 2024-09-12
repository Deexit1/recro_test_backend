const express = require('express');
const { register, login, getUserData } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');


const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected route to get user data
router.get('/me', auth, getUserData);

module.exports = router;
