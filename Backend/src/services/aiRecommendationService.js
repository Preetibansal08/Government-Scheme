const Scheme = require('../models/Scheme');

class AIRecommendationService {
  calculateEligibilityScore(userProfile, scheme) {
    let score = 50;
    const criteria = scheme.eligibility_criteria || {};

    const age = Number(userProfile.age);
    const income = Number(userProfile.income);
    const occupation = (userProfile.occupation || "").toLowerCase();
    const family_size = Number(userProfile.family_size);
    const education_level = (userProfile.education_level || "").toLowerCase();

    // Age criteria
    if (criteria.min_age !== undefined) score += age >= criteria.min_age ? 10 : -10;
    if (criteria.max_age !== undefined) score += age <= criteria.max_age ? 10 : -10;

    // Income criteria
    if (criteria.max_income !== undefined) score += income <= criteria.max_income ? 20 : -15;

    // Occupation criteria
    if (criteria.eligible_occupations && Array.isArray(criteria.eligible_occupations)) {
      const occupations = criteria.eligible_occupations.map(o => o.toLowerCase());
      score += occupations.includes(occupation) ? 15 : -10;
    }

    // Family size criteria
    if (criteria.family_size && criteria.family_size.min !== undefined) {
      score += family_size >= criteria.family_size.min ? 10 : -10;
    }

    // Education criteria
    if (criteria.min_education) {
      const eduMap = {
        "highschool": 1,
        "intermediate": 2,
        "12th_pass": 2,
        "btech": 3,
        "graduate": 3,
        "postgraduate": 4
      };
      const userEduLevel = eduMap[education_level] || 0;
      const schemeEduLevel = eduMap[criteria.min_education.toLowerCase()] || 0;
      score += userEduLevel >= schemeEduLevel ? 10 : -10;
    }

    return Math.min(100, Math.max(0, score));
  }

  async getPersonalizedRecommendations(userProfile, limit = 10) {
    const schemes = await Scheme.findAll();
    const recommendations = [];

 for (const scheme of schemes) {
  const score = this.calculateEligibilityScore(userProfile, scheme);
  console.log(`Scheme: ${scheme.name}, Score: ${score}, Criteria: ${JSON.stringify(scheme.eligibility_criteria)}`);
  if (score >= 40) {
    recommendations.push({ ...scheme.toJSON(), eligibility_score: score });
  }
}

    recommendations.sort((a, b) => b.eligibility_score - a.eligibility_score);

    return recommendations.slice(0, limit);
  }
}

module.exports = new AIRecommendationService();