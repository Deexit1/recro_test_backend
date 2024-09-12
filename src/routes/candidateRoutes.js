const express = require('express');
const {
    listCandidates,
    createCandidate,
    getCandidate,
    updateCandidate,
    deleteCandidate,
    getMonthlyHires
} = require('../controllers/candidateController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, listCandidates);
router.post('/', auth, createCandidate);
router.get('/:id', auth, getCandidate);
router.put('/:id', auth, updateCandidate);
router.delete('/:id', auth, deleteCandidate);
router.get('/monthly-hires', auth, getMonthlyHires)

module.exports = router;
