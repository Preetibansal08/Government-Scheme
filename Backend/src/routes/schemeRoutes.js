const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllSchemes,
    getSchemeById,
    getRecommendations,
    getSchemesByCategory,
    searchSchemes,
    createScheme
} = require('../controllers/schemeController');

router.get('/recommendations', protect, getRecommendations);
router.get('/search', protect, searchSchemes);
router.get('/category/:category', protect, getSchemesByCategory);
router.get('/', protect, getAllSchemes);
router.get('/:id', protect, getSchemeById);
router.post('/', protect, createScheme);

module.exports = router;