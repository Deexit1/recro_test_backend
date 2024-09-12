const express = require('express');

const { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication } = require('../controllers/applicationController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getApplications);
router.post('/', auth, createApplication);
router.get('/:id', auth, getApplicationById);
router.put('/:id', auth, updateApplication);
router.delete('/:id', auth, deleteApplication);

module.exports = router;
