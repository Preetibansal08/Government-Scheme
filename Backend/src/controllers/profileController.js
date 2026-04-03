const UserProfile = require('../models/UserProfile');

exports.createOrUpdateProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const profileData = req.body;
        
        const [profile, created] = await UserProfile.upsert({
            user_id,
            ...profileData
        });
        
        res.json({
            success: true,
            message: created ? 'Profile created successfully' : 'Profile updated successfully',
            profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error saving profile',
            error: error.message
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({
            where: { user_id: req.user.id }
        });
        
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Please complete your profile.'
            });
        }
        
        res.json({
            success: true,
            profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await UserProfile.destroy({
            where: { user_id: req.user.id }
        });
        
        if (deleted) {
            res.json({
                success: true,
                message: 'Profile deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting profile',
            error: error.message
        });
    }
};