const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
}).single('image');

// Create new profile
exports.createProfile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ 
          success: false, 
          message: err.message 
        });
      }

      const profileData = {
        name: req.body.name,
        location: req.body.location,
        experience: req.body.experience,
        specialties: JSON.parse(req.body.specialties),
        crops: JSON.parse(req.body.crops),
        contact: JSON.parse(req.body.contact),
      };

      if (req.file) {
        profileData.image = `/uploads/profiles/${req.file.filename}`;
      }

      const profile = new Profile(profileData);
      await profile.save();

      res.status(201).json({
        success: true,
        data: profile,
        message: 'Profile created successfully'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ 
          success: false, 
          message: err.message 
        });
      }

      const profileId = req.params.id;
      const updateData = {
        name: req.body.name,
        location: req.body.location,
        experience: req.body.experience,
        specialties: JSON.parse(req.body.specialties),
        crops: JSON.parse(req.body.crops),
        contact: JSON.parse(req.body.contact),
      };

      if (req.file) {
        updateData.image = `/uploads/profiles/${req.file.filename}`;
      }

      const profile = await Profile.findByIdAndUpdate(
        profileId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
      }

      res.status(200).json({
        success: true,
        data: profile,
        message: 'Profile updated successfully'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get profile by ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    
    res.status(200).json({
      success: true,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 