const express = require('express');
const { dashboardCards } = require('../controllers/dashboardController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/dashboard-cards', auth, dashboardCards);


module.exports = router;
