const express = require('express');
const router = express.Router();
const {
  createProfile,
  updateProfile,
  getProfile,
  getAllProfiles
} = require('../../controllers/profile/profile-controllers');


// Create new profile
router.post('/', createProfile);

// Update profile
router.put('/:id', updateProfile);

// Get profile by ID
router.get('/:id', getProfile);

// Get all profiles
router.get('/', getAllProfiles);

module.exports = router; 