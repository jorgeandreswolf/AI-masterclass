/**
 * Code Reviewer Agent - Specialized AI for code quality analysis
 * 
 * This agent demonstrates how to create focused AI assistants that:
 * 1. Have specific expertise domains
 * 2. Learn from review patterns
 * 3. Compound knowledge over time
 * 4. Provide consistent, measurable feedback
 */

class CodeReviewer {
  constructor() {
    this.reviewHistory = [];
    this.patterns = {
      // Code smells and anti-patterns
      smells: [
        {
          name: 'Long Function',
          pattern: /function\s+\w+\([^)]*\)\s*\{[\s\S]{500,}\}/,
          severity: 'medium',
          suggestion: 'Consider breaking this function into smaller, focused functions'
        },
        {
          name: 'Magic Numbers',
          pattern: /\b(?!0|1)\d{2,}\b/,
          severity: 'low',
          suggestion: 'Replace magic numbers with named constants'
        },
        {
          name: 'Console Logs',
          pattern: /console\.(log|debug|info)/,
          severity: 'low',
          suggestion: 'Remove console logs before production or use proper logging'
        },
        {
          name: 'No Error Handling',
          pattern: /await\s+[^;]+;(?!\s*\}?\s*catch)/,
          severity: 'high',
          suggestion: 'Add try-catch block for async operations'
        }
      ],

      // Positive patterns (good practices)
      positives: [
        {
          name: 'JSDoc Comments',
          pattern: /\/\*\*[\s\S]*?\*\//,
          points: 2
        },
        {
          name: 'Error Handling',
          pattern: /try\s*\{[\s\S]*?\}\s*catch/,
          points: 3
        },
        {
          name: 'Descriptive Names',
          pattern: /(?:function|const|let|var)\s+([a-z][a-zA-Z]{8,})/,
          points: 1
        }
      ]
    };

    this.metrics = {
      totalReviews: 0,
      issuesFound: 0,
      issuesResolved: 0,
      averageSeverity: 0,
      codeQualityTrend: []
    };
  }

  /**
   * Review code and provide structured feedback
   * @param {string} code - The code to review
   * @param {Object} context - Additional context about the code
   * @returns {Object} Review results with issues and suggestions
   */
  reviewCode(code, context = {}) {
    const review = {
      id: `review_${Date.now()}`,
      timestamp: new Date().toISOString(),
      code: code.substring(0, 200) + '...', // Store snippet for learning
      context,
      issues: [],
      positives: [],
      score: 0,
      recommendations: []
    };

    // Check for code smells
    this.patterns.smells.forEach(smell => {
      const matches = code.match(new RegExp(smell.pattern.source, 'g'));
      if (matches) {
        review.issues.push({
          type: smell.name,
          severity: smell.severity,
          count: matches.length,
          suggestion: smell.suggestion,
          examples: matches.slice(0, 3) // Show first 3 examples
        });
      }
    });

    // Check for positive patterns
    this.patterns.positives.forEach(positive => {
      const matches = code.match(new RegExp(positive.pattern.source, 'g'));
      if (matches) {
        review.positives.push({
          type: positive.name,
          count: matches.length,
          points: positive.points * matches.length
        });
        review.score += positive.points * matches.length;
      }
    });

    // Calculate overall score (0-100)
    const severityPenalties = {
      high: -10,
      medium: -5,
      low: -2
    };

    review.issues.forEach(issue => {
      review.score += severityPenalties[issue.severity] * issue.count;
    });

    review.score = Math.max(0, Math.min(100, review.score + 50)); // Base score of 50

    // Generate recommendations
    review.recommendations = this.generateRecommendations(review);

    // Learn from this review
    this.learnFromReview(review);

    // Update metrics
    this.updateMetrics(review);

    return review;
  }

  generateRecommendations(review) {
    const recommendations = [];

    // High severity issues get priority
    const highSeverityIssues = review.issues.filter(i => i.severity === 'high');
    if (highSeverityIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: 'Fix critical issues first',
        details: highSeverityIssues.map(i => i.suggestion)
      });
    }

    // Suggest patterns based on code characteristics
    if (review.score < 40) {
      recommendations.push({
        priority: 'medium',
        action: 'Focus on code quality fundamentals',
        details: [
          'Add error handling for async operations',
          'Use descriptive variable and function names',
          'Add JSDoc comments for functions'
        ]
      });
    }

    // Learning-based recommendations from history
    const similarReviews = this.findSimilarReviews(review);
    if (similarReviews.length > 2) {
      const commonIssues = this.findCommonIssues(similarReviews);
      if (commonIssues.length > 0) {
        recommendations.push({
          priority: 'low',
          action: 'Address recurring patterns',
          details: [`You often have ${commonIssues[0]} - consider creating a checklist`]
        });
      }
    }

    return recommendations;
  }

  learnFromReview(review) {
    this.reviewHistory.push(review);
    
    // Keep only recent reviews for learning (prevent memory issues)
    if (this.reviewHistory.length > 100) {
      this.reviewHistory = this.reviewHistory.slice(-50);
    }

    // Learn new patterns from recurring issues
    if (this.reviewHistory.length >= 10) {
      this.improvePatterns();
    }
  }

  improvePatterns() {
    // Example: If we see the same type of issue repeatedly, 
    // we might adjust severity or add new patterns
    
    const recentReviews = this.reviewHistory.slice(-20);
    const issueFrequency = {};

    recentReviews.forEach(review => {
      review.issues.forEach(issue => {
        issueFrequency[issue.type] = (issueFrequency[issue.type] || 0) + 1;
      });
    });

    // If an issue appears in >50% of recent reviews, increase its priority
    Object.entries(issueFrequency).forEach(([issueType, frequency]) => {
      if (frequency > recentReviews.length * 0.5) {
        const pattern = this.patterns.smells.find(p => p.name === issueType);
        if (pattern && pattern.severity === 'low') {
          pattern.severity = 'medium';
          console.log(`Upgraded ${issueType} from low to medium severity due to frequency`);
        }
      }
    });
  }

  findSimilarReviews(currentReview) {
    return this.reviewHistory.filter(review => {
      const commonIssues = review.issues.filter(issue => 
        currentReview.issues.some(current => current.type === issue.type)
      );
      return commonIssues.length > 0;
    });
  }

  findCommonIssues(reviews) {
    const issueCount = {};
    reviews.forEach(review => {
      review.issues.forEach(issue => {
        issueCount[issue.type] = (issueCount[issue.type] || 0) + 1;
      });
    });

    return Object.entries(issueCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);
  }

  updateMetrics(review) {
    this.metrics.totalReviews++;
    this.metrics.issuesFound += review.issues.length;
    
    const avgSeverity = review.issues.reduce((sum, issue) => {
      const severityValues = { high: 3, medium: 2, low: 1 };
      return sum + severityValues[issue.severity];
    }, 0) / Math.max(review.issues.length, 1);
    
    this.metrics.averageSeverity = 
      (this.metrics.averageSeverity * (this.metrics.totalReviews - 1) + avgSeverity) / 
      this.metrics.totalReviews;

    this.metrics.codeQualityTrend.push({
      timestamp: review.timestamp,
      score: review.score,
      issueCount: review.issues.length
    });
  }

  /**
   * Mark issues as resolved to track improvement
   */
  markIssuesResolved(reviewId, resolvedIssueTypes) {
    const review = this.reviewHistory.find(r => r.id === reviewId);
    if (review) {
      resolvedIssueTypes.forEach(type => {
        const issue = review.issues.find(i => i.type === type);
        if (issue && !issue.resolved) {
          issue.resolved = true;
          issue.resolvedAt = new Date().toISOString();
          this.metrics.issuesResolved++;
        }
      });
    }
  }

  /**
   * Get review statistics and insights
   */
  getInsights() {
    const recentReviews = this.reviewHistory.slice(-10);
    const avgScore = recentReviews.length > 0 
      ? recentReviews.reduce((sum, r) => sum + r.score, 0) / recentReviews.length 
      : 0;

    return {
      totalReviews: this.metrics.totalReviews,
      issuesFound: this.metrics.issuesFound,
      issuesResolved: this.metrics.issuesResolved,
      resolutionRate: this.metrics.issuesFound > 0 
        ? (this.metrics.issuesResolved / this.metrics.issuesFound * 100).toFixed(1) 
        : 0,
      averageScore: avgScore.toFixed(1),
      trend: this.calculateTrend(),
      topIssues: this.getTopIssues(),
      improvement: this.calculateImprovement()
    };
  }

  calculateTrend() {
    if (this.metrics.codeQualityTrend.length < 5) return 'insufficient_data';
    
    const recent = this.metrics.codeQualityTrend.slice(-5);
    const older = this.metrics.codeQualityTrend.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, r) => sum + r.score, 0) / recent.length;
    const olderAvg = older.reduce((sum, r) => sum + r.score, 0) / older.length;
    
    if (recentAvg > olderAvg + 5) return 'improving';
    if (recentAvg < olderAvg - 5) return 'declining';
    return 'stable';
  }

  getTopIssues() {
    const issueCount = {};
    this.reviewHistory.forEach(review => {
      review.issues.forEach(issue => {
        issueCount[issue.type] = (issueCount[issue.type] || 0) + issue.count;
      });
    });

    return Object.entries(issueCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }

  calculateImprovement() {
    if (this.reviewHistory.length < 5) return null;
    
    const firstReviews = this.reviewHistory.slice(0, 5);
    const lastReviews = this.reviewHistory.slice(-5);
    
    const firstAvg = firstReviews.reduce((sum, r) => sum + r.score, 0) / 5;
    const lastAvg = lastReviews.reduce((sum, r) => sum + r.score, 0) / 5;
    
    return {
      scoreImprovement: (lastAvg - firstAvg).toFixed(1),
      percentImprovement: ((lastAvg - firstAvg) / firstAvg * 100).toFixed(1)
    };
  }
}

module.exports = CodeReviewer;