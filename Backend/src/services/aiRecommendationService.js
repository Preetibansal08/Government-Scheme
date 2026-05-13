const { Op } = require('sequelize');
const Scheme = require('../models/Scheme');

class AIRecommendationService {
  calculateEligibilityScore(userProfile, scheme) {
    let score = 50;
    const criteria = scheme.eligibility_criteria || {};

    // If no user profile or missing essential data, return 0
    if (!userProfile || !userProfile.age) {
      return 0;
    }

    const age = Number(userProfile.age);
    const income = Number(userProfile.income || 0);
    const occupation = (userProfile.occupation || "").toLowerCase();
    const family_size = Number(userProfile.family_size || 1);
    const education_level = (userProfile.education_level || "").toLowerCase();
    const category = (scheme.category || "").toLowerCase();

    // Education level mapping
    const eduMap = {
      "10th_pass": 1,
      "10th": 1,
      "highschool": 1,
      "12th_pass": 2,
      "12th": 2,
      "intermediate": 2,
      "graduate": 3,
      "graduation": 3,
      "bachelor": 3,
      "btech": 3,
      "postgraduate": 4,
      "postgraduation": 4,
      "masters": 4,
      "mtech": 4,
      "phd": 5,
      "doctorate": 5
    };

    const userEduLevel = eduMap[education_level] || 0;
    const schemeEduLevel = criteria.min_education ? (eduMap[criteria.min_education.toLowerCase()] || 0) : 0;

    // Age criteria scoring
    if (criteria.min_age !== undefined) {
      if (age >= criteria.min_age) {
        score += 15;
      } else {
        score -= 20;
      }
    }
    if (criteria.max_age !== undefined) {
      if (age <= criteria.max_age) {
        score += 15;
      } else {
        score -= 20;
      }
    }

    // Income criteria scoring
    if (criteria.max_income !== undefined) {
      if (income <= criteria.max_income) {
        score += 25;
      } else {
        score -= 20;
      }
    }
    if (criteria.min_income !== undefined) {
      if (income >= criteria.min_income) {
        score += 10;
      } else {
        score -= 10;
      }
    }

    // Occupation criteria scoring
    if (criteria.eligible_occupations && Array.isArray(criteria.eligible_occupations)) {
      const occupations = criteria.eligible_occupations.map(o => o.toLowerCase());
      if (occupations.includes(occupation)) {
        score += 20;
      } else {
        score -= 10;
      }
    }

    // Excluded occupations penalty
    if (criteria.excluded_occupations && Array.isArray(criteria.excluded_occupations)) {
      const excluded = criteria.excluded_occupations.map(o => o.toLowerCase());
      if (excluded.includes(occupation)) {
        score -= 30;
      }
    }

    // Family size criteria
    if (criteria.family_size) {
      if (criteria.family_size.min !== undefined && family_size >= criteria.family_size.min) {
        score += 10;
      }
      if (criteria.family_size.max !== undefined && family_size <= criteria.family_size.max) {
        score += 5;
      }
    }

    // Education criteria scoring
    if (criteria.min_education) {
      if (userEduLevel >= schemeEduLevel) {
        score += 15;
      } else {
        score -= 15;
      }
    }

    // Category-specific bonus points based on occupation matching
    if (
      (category === "agriculture" && (occupation === "farmer" || occupation === "agriculture worker")) ||
      (category === "education" && occupation === "student") ||
      (category === "employment" && (occupation === "entrepreneur" || occupation === "business owner" || occupation === "startup founder")) ||
      (category === "health" && occupation === "doctor") ||
      (category === "housing" && occupation === "business owner")
    ) {
      score += 10;
    }

    // Special case: Students for Education schemes get extra points
    if (category === "education" && occupation === "student") {
      score += 15;
    }

    // Special case: Senior citizens for pension schemes
    if ((category === "senior" || category === "pension") && age >= 60) {
      score += 20;
    }

    // Special case: Women for women & child schemes
    if (category === "women" && userProfile.gender === "female") {
      score += 15;
    }

    // Ensure score stays within 0-100 range
    return Math.min(100, Math.max(0, score));
  }

  async getPersonalizedRecommendations(userProfile, limit = 10) {
    try {
      const schemes = await Scheme.findAll();
      const recommendations = [];

      console.log(`Calculating recommendations for user:`, {
        age: userProfile.age,
        occupation: userProfile.occupation,
        income: userProfile.income,
        education: userProfile.education_level
      });
      console.log(`Total schemes found: ${schemes.length}`);
      console.log('---');

      for (const scheme of schemes) {
        const score = this.calculateEligibilityScore(userProfile, scheme);
        
        console.log(`Scheme: ${scheme.name}`);
        console.log(`Category: ${scheme.category}`);
        console.log(`Score: ${score}`);
        console.log(`Criteria: ${JSON.stringify(scheme.eligibility_criteria)}`);
        console.log('---');
        
        if (score >= 40) {
          recommendations.push({ 
            ...scheme.toJSON(), 
            eligibility_score: score 
          });
        }
      }

      // Sort by eligibility score (highest first)
      recommendations.sort((a, b) => b.eligibility_score - a.eligibility_score);

      console.log(`Found ${recommendations.length} recommendations`);
      return recommendations.slice(0, limit);
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return [];
    }
  }

  async getRecommendationsByCategory(userProfile, category, limit = 10) {
    try {
      const { Op } = require('sequelize');
      
      const schemes = await Scheme.findAll({
        where: {
          category: {
            [Op.iLike]: category
          }
        }
      });
      
      console.log(`Found ${schemes.length} schemes in category: ${category}`);
      
      const recommendations = [];

      for (const scheme of schemes) {
        const score = this.calculateEligibilityScore(userProfile, scheme);
        
        console.log(`Category Scheme: ${scheme.name} - Score: ${score}`);
        
        if (score >= 40) {
          recommendations.push({ 
            ...scheme.toJSON(), 
            eligibility_score: score 
          });
        }
      }

      // Sort by eligibility score (highest first)
      recommendations.sort((a, b) => b.eligibility_score - a.eligibility_score);
      
      console.log(`Returning ${recommendations.length} recommendations for category ${category}`);
      return recommendations.slice(0, limit);
    } catch (error) {
      console.error('Error getting recommendations by category:', error);
      return [];
    }
  }

  async getAllSchemesWithScores(userProfile) {
    try {
      const schemes = await Scheme.findAll();
      
      const schemesWithScores = schemes.map(scheme => ({
        ...scheme.toJSON(),
        eligibility_score: this.calculateEligibilityScore(userProfile, scheme)
      }));
      
      // Sort by eligibility score
      schemesWithScores.sort((a, b) => b.eligibility_score - a.eligibility_score);
      
      return schemesWithScores;
    } catch (error) {
      console.error('Error getting schemes with scores:', error);
      return [];
    }
  }

  async getTopSchemesByCategory(userProfile, limit = 5) {
    try {
      const schemes = await Scheme.findAll();
      const categories = {};
      
      // Group schemes by category
      for (const scheme of schemes) {
        const category = scheme.category || 'Other';
        if (!categories[category]) {
          categories[category] = [];
        }
        
        const score = this.calculateEligibilityScore(userProfile, scheme);
        categories[category].push({
          ...scheme.toJSON(),
          eligibility_score: score
        });
      }
      
      // Sort each category by score and take top
      const topSchemesByCategory = {};
      for (const [category, categorySchemes] of Object.entries(categories)) {
        categorySchemes.sort((a, b) => b.eligibility_score - a.eligibility_score);
        topSchemesByCategory[category] = categorySchemes.slice(0, limit);
      }
      
      return topSchemesByCategory;
    } catch (error) {
      console.error('Error getting top schemes by category:', error);
      return {};
    }
  }
}

module.exports = new AIRecommendationService();