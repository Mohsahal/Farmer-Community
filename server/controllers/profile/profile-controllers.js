const Profile = require('../../models/Profile');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'farmer-profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
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
        // The image URL will be available in req.file.path after Cloudinary upload
        profileData.image = req.file.path;
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
        // Get the existing profile to delete old image if exists
        const existingProfile = await Profile.findById(profileId);
        if (existingProfile && existingProfile.image) {
          // Extract public_id from the old image URL
          const publicId = existingProfile.image.split('/').slice(-1)[0].split('.')[0];
          try {
            await cloudinary.uploader.destroy(`farmer-profiles/${publicId}`);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }
        
        // Add new image URL
        updateData.image = req.file.path;
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