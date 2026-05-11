const UserProfile = require('../models/UserProfile');

exports.createOrUpdateProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const profileData = { ...req.body };

        if (req.file) {
            profileData.profile_image = req.file.filename; // Save filename
        }

        let profile = await UserProfile.findOne({ where: { user_id } });

        if (profile) {
            await profile.update(profileData);
            res.json({ success: true, message: 'Profile updated successfully', profile });
        } else {
            profile = await UserProfile.create({ user_id, ...profileData });
            res.json({ success: true, message: 'Profile created successfully', profile });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving profile', error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ where: { user_id: req.user.id } });
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await UserProfile.destroy({ where: { user_id: req.user.id } });
        if (deleted) return res.json({ success: true, message: 'Profile deleted successfully' });
        res.status(404).json({ success: false, message: 'Profile not found' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
    }
};