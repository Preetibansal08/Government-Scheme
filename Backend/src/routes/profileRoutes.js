const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrUpdateProfile, getProfile, deleteProfile } = require('../controllers/profileController');

router.route('/')
    .get(protect, getProfile)
    .post(protect, createOrUpdateProfile)
    .delete(protect, deleteProfile);

module.exports = router;