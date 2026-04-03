const Scheme = require('../models/Scheme');

class AIRecommendationService {
    calculateEligibilityScore(userProfile, scheme) {
        let score = 50;
        const criteria = scheme.eligibility_criteria || {};
        
        if (criteria.min_age && userProfile.age >= criteria.min_age) score += 10;
        else if (criteria.min_age) score -= 10;
        
        if (criteria.max_age && userProfile.age <= criteria.max_age) score += 10;
        else if (criteria.max_age) score -= 10;
        
        if (criteria.max_income && userProfile.income <= criteria.max_income) score += 20;
        else if (criteria.max_income) score -= 15;
        
        if (criteria.eligible_occupations && criteria.eligible_occupations.includes(userProfile.occupation)) {
            score += 15;
        } else if (criteria.eligible_occupations) {
            score -= 10;
        }
        
        return Math.min(100, Math.max(0, score));
    }
    
    async getPersonalizedRecommendations(userProfile, limit = 10) {
        const schemes = await Scheme.findAll();
        const recommendations = [];
        
        for (const scheme of schemes) {
            const score = this.calculateEligibilityScore(userProfile, scheme);
            if (score >= 40) {
                recommendations.push({
                    ...scheme.toJSON(),
                    eligibility_score: score,
                    match_percentage: score
                });
            }
        }
        
        recommendations.sort((a, b) => b.eligibility_score - a.eligibility_score);
        return recommendations.slice(0, limit);
    }
}

module.exports = new AIRecommendationService();