const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // new

const { createOrUpdateProfile, getProfile, deleteProfile } = require('../controllers/profileController');

router.route('/')
  .get(protect, getProfile)
  .post(protect, upload.single('profile_image'), createOrUpdateProfile) // add upload
  .delete(protect, deleteProfile);

module.exports = router;