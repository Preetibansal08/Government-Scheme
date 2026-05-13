const Scheme = require('../models/Scheme');
const UserProfile = require('../models/UserProfile');
const AIRecommendationService = require('../services/AIRecommendationService');

// @desc    Get all schemes
// @route   GET /api/schemes
// @access  Private
const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.findAll({
      order: [['created_at', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      schemes: schemes,
      count: schemes.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get scheme by ID
// @route   GET /api/schemes/:id
// @access  Private
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findByPk(req.params.id);
    
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    
    res.status(200).json({
      success: true,
      scheme: scheme
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get personalized recommendations
// @route   GET /api/schemes/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user profile
    const userProfile = await UserProfile.findOne({ 
      where: { user_id: userId } 
    });
    
    if (!userProfile) {
      return res.status(200).json({
        success: true,
        recommendations: [],
        message: "Complete your profile to get personalized recommendations"
      });
    }
    
    // Check if profile has minimum required fields
    const profile = userProfile.toJSON();
    if (!profile.age || !profile.occupation) {
      return res.status(200).json({
        success: true,
        recommendations: [],
        message: "Please complete your profile with age and occupation to get recommendations"
      });
    }
    
    const recommendations = await AIRecommendationService.getPersonalizedRecommendations(profile);
    
    res.status(200).json({
      success: true,
      recommendations: recommendations,
      count: recommendations.length,
      user_profile: {
        age: profile.age,
        occupation: profile.occupation,
        income: profile.income,
        education: profile.education_level,
        family_size: profile.family_size
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get schemes by category
// @route   GET /api/schemes/category/:category
// @access  Private
const getSchemesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.id;
    
    // Get user profile for personalized filtering
    const userProfile = await UserProfile.findOne({ 
      where: { user_id: userId } 
    });
    
    // Find schemes by category
    const schemes = await Scheme.findAll({
      where: {
        category: {
          [Op.iLike]: category // Case-insensitive search
        }
      },
      order: [['created_at', 'DESC']]
    });
    
    // If user has profile, calculate eligibility scores
    let schemesWithScores = schemes;
    if (userProfile) {
      schemesWithScores = schemes.map(scheme => {
        const score = AIRecommendationService.calculateEligibilityScore(
          userProfile.toJSON(), 
          scheme
        );
        return {
          ...scheme.toJSON(),
          eligibility_score: score
        };
      });
      
      // Sort by eligibility score (highest first)
      schemesWithScores.sort((a, b) => b.eligibility_score - a.eligibility_score);
    }
    
    res.status(200).json({
      success: true,
      schemes: schemesWithScores,
      count: schemesWithScores.length,
      category: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Search schemes by keyword
// @route   GET /api/schemes/search?keyword=xxx
// @access  Private
const searchSchemes = async (req, res) => {
  try {
    const { keyword } = req.query;
    const { Op } = require('sequelize');
    
    if (!keyword) {
      return getAllSchemes(req, res);
    }
    
    const schemes = await Scheme.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
          { benefits: { [Op.iLike]: `%${keyword}%` } },
          { category: { [Op.iLike]: `%${keyword}%` } }
        ]
      },
      order: [['created_at', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      schemes: schemes,
      count: schemes.length,
      keyword: keyword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new scheme (Admin only)
// @route   POST /api/schemes
// @access  Private/Admin
const createScheme = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      benefits,
      benefit_amount,
      application_link,
      eligibility_criteria
    } = req.body;
    
    const scheme = await Scheme.create({
      name,
      category,
      description,
      benefits,
      benefit_amount,
      application_link,
      eligibility_criteria: eligibility_criteria || {}
    });
    
    res.status(201).json({
      success: true,
      scheme: scheme,
      message: "Scheme created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get recommendations by specific category
// @route   GET /api/schemes/recommendations/category/:category
// @access  Private
const getRecommendationsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.id;
    
    // Get user profile
    const userProfile = await UserProfile.findOne({ 
      where: { user_id: userId } 
    });
    
    if (!userProfile) {
      return res.status(200).json({
        success: true,
        recommendations: [],
        message: "Complete your profile to get recommendations"
      });
    }
    
    const recommendations = await AIRecommendationService.getRecommendationsByCategory(
      userProfile.toJSON(),
      category
    );
    
    res.status(200).json({
      success: true,
      recommendations: recommendations,
      count: recommendations.length,
      category: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllSchemes,
  getSchemeById,
  getRecommendations,
  getSchemesByCategory,
  getRecommendationsByCategory,
  searchSchemes,
  createScheme
};