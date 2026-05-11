const Scheme = require('../models/Scheme');
const UserProfile = require('../models/UserProfile');
const AIRecommendationService = require('../services/aiRecommendationService');

// Make sure ALL these are exported
exports.getAllSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.findAll({
            order: [['created_at', 'DESC']]
        });
        
        res.json({
            success: true,
            count: schemes.length,
            schemes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching schemes',
            error: error.message
        });
    }
};

exports.getSchemeById = async (req, res) => {
    try {
        const scheme = await Scheme.findByPk(req.params.id);
        
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        
        res.json({
            success: true,
            scheme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching scheme',
            error: error.message
        });
    }
};

exports.getRecommendations = async (req, res) => {
    console.log("User in request:", req.user); // <-- add this
    try {
        const userProfile = await UserProfile.findOne({
            where: { user_id: req.user.id }
        });
        console.log("UserProfile:", userProfile?.toJSON()); // check profile

        if (!userProfile) {
            return res.status(400).json({
                success: false,
                message: 'Please complete your profile first'
            });
        }

        const recommendations = await AIRecommendationService.getPersonalizedRecommendations(userProfile);
        console.log("Recommendations:", recommendations); // check recommended schemes

        res.json({ success: true, count: recommendations.length, recommendations });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recommendations',
            error: error.message
        });
    }
};

exports.getSchemesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const schemes = await Scheme.findAll({
            where: { category: category }
        });
        
        res.json({
            success: true,
            count: schemes.length,
            schemes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching schemes by category',
            error: error.message
        });
    }
};

exports.searchSchemes = async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required'
            });
        }
        
        const schemes = await Scheme.findAll();
        const filtered = schemes.filter(scheme => 
            scheme.name.toLowerCase().includes(keyword.toLowerCase()) ||
            (scheme.description && scheme.description.toLowerCase().includes(keyword.toLowerCase()))
        );
        
        res.json({
            success: true,
            count: filtered.length,
            schemes: filtered
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching schemes',
            error: error.message
        });
    }
};

exports.createScheme = async (req, res) => {
    try {
        const scheme = await Scheme.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Scheme created successfully',
            scheme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating scheme',
            error: error.message
        });
    }
};

exports.updateScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByPk(req.params.id);
        
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        
        await scheme.update(req.body);
        
        res.json({
            success: true,
            message: 'Scheme updated successfully',
            scheme
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating scheme',
            error: error.message
        });
    }
};

exports.deleteScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByPk(req.params.id);
        
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        
        await scheme.destroy();
        
        res.json({
            success: true,
            message: 'Scheme deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting scheme',
            error: error.message
        });
    }
};