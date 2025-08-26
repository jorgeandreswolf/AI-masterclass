/**
 * Frustration Detector - A compounding AI system that learns and improves
 * 
 * This demonstrates the core concept of Compounding Engineering:
 * 1. Start with basic pattern matching
 * 2. Learn from each interaction
 * 3. Compound knowledge over time
 * 4. Self-improve detection accuracy
 */

class FrustrationDetector {
  constructor() {
    this.patterns = {
      // High frustration indicators
      high: [
        /why.*(?:doesn't|don't|won't|can't).*work/i,
        /(?:argh|ugh|grr|damn|wtf|omg)/i,
        /(?:hate|stupid|ridiculous|ridiculous|terrible)/i,
        /(?:again|still|keep).*(?:failing|breaking|not working)/i,
        /[!]{2,}/,
        /[A-Z]{4,}/
      ],
      
      // Medium frustration indicators  
      medium: [
        /(?:confusing|unclear|difficult|frustrating)/i,
        /(?:should|supposed to).*(?:work|working)/i,
        /(?:tried|trying).*(?:everything|multiple|several)/i,
        /(?:documentation|docs).*(?:bad|poor|lacking)/i,
        /taking.*(?:too long|forever|ages)/i
      ],
      
      // Low/positive indicators
      positive: [
        /(?:love|like|enjoy|great|awesome|excellent)/i,
        /(?:excited|happy|pleased|satisfied)/i,
        /(?:working|solved|fixed|success)/i,
        /(?:easy|simple|clear|straightforward)/i
      ]
    };
    
    this.stats = {
      totalAnalyses: 0,
      scores: [],
      indicators: {},
      feedback: [],
      lastUpdated: new Date().toISOString()
    };
    
    this.learningData = [];
  }

  analyze(text) {
    this.stats.totalAnalyses++;
    this.stats.lastUpdated = new Date().toISOString();
    
    const result = {
      text,
      score: 0,
      indicators: [],
      reasoning: '',
      frustrationLevel: 'low',
      timestamp: new Date().toISOString()
    };

    // Check positive indicators first (they reduce frustration)
    let positiveScore = 0;
    this.patterns.positive.forEach(pattern => {
      if (pattern.test(text)) {
        positiveScore += 2;
        result.indicators.push('positive language');
      }
    });

    // Check medium frustration patterns
    let mediumScore = 0;
    this.patterns.medium.forEach(pattern => {
      if (pattern.test(text)) {
        mediumScore += 1;
        result.indicators.push('mild frustration');
        this.trackIndicator('medium frustration');
      }
    });

    // Check high frustration patterns
    let highScore = 0;
    this.patterns.high.forEach(pattern => {
      if (pattern.test(text)) {
        highScore += 2;
        result.indicators.push('strong frustration');
        this.trackIndicator('strong frustration');
      }
    });

    // Calculate final score (0-10 scale)
    result.score = Math.max(0, Math.min(10, highScore + mediumScore - positiveScore));
    this.stats.scores.push(result.score);

    // Determine frustration level
    if (result.score >= 6) {
      result.frustrationLevel = 'high';
      result.reasoning = 'Multiple strong frustration indicators detected';
    } else if (result.score >= 3) {
      result.frustrationLevel = 'medium';  
      result.reasoning = 'Some frustration indicators present';
    } else {
      result.frustrationLevel = 'low';
      result.reasoning = positiveScore > 0 ? 'Positive sentiment detected' : 'No significant frustration indicators';
    }

    // Learn from this analysis
    this.learningData.push({
      text,
      score: result.score,
      level: result.frustrationLevel,
      indicators: result.indicators,
      timestamp: result.timestamp
    });

    // Auto-improve patterns based on learning data
    this.improvePatterns();

    return result;
  }

  trackIndicator(indicator) {
    if (!this.stats.indicators[indicator]) {
      this.stats.indicators[indicator] = 0;
    }
    this.stats.indicators[indicator]++;
  }

  improvePatterns() {
    // This is where the "compounding" happens
    // In a real implementation, this could use ML or more sophisticated pattern learning
    
    if (this.learningData.length < 5) return; // Need some data first
    
    // Example: Learn new patterns from high-scoring texts
    const highFrustrationTexts = this.learningData
      .filter(data => data.score >= 6)
      .slice(-10); // Last 10 high frustration texts
    
    // Extract common words that might indicate frustration
    const commonWords = this.extractCommonWords(highFrustrationTexts);
    
    // Add new patterns (simplified example)
    commonWords.forEach(word => {
      if (word.length > 3 && !this.hasPattern(word)) {
        const newPattern = new RegExp(`\\b${word}\\b`, 'i');
        this.patterns.medium.push(newPattern);
      }
    });
  }

  extractCommonWords(texts) {
    const wordCounts = {};
    texts.forEach(data => {
      const words = data.text.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach(word => {
        if (word.length > 3) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });
    
    return Object.entries(wordCounts)
      .filter(([word, count]) => count >= 2)
      .map(([word]) => word);
  }

  hasPattern(word) {
    const allPatterns = [
      ...this.patterns.high,
      ...this.patterns.medium,
      ...this.patterns.positive
    ];
    
    return allPatterns.some(pattern => {
      try {
        return pattern.test(word);
      } catch {
        return false;
      }
    });
  }

  addFeedback(text, expectedScore, actualScore) {
    this.stats.feedback.push({
      text,
      expectedScore,
      actualScore,
      difference: Math.abs(expectedScore - actualScore),
      timestamp: new Date().toISOString()
    });
    
    // Use feedback to improve (simplified)
    if (Math.abs(expectedScore - actualScore) > 2) {
      // Significant difference - learn from this
      console.log(`Learning opportunity: Expected ${expectedScore}, got ${actualScore} for: "${text}"`);
    }
  }

  getStats() {
    const averageScore = this.stats.scores.length > 0 
      ? this.stats.scores.reduce((a, b) => a + b, 0) / this.stats.scores.length 
      : 0;
    
    const commonIndicators = Object.entries(this.stats.indicators)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([indicator]) => indicator);

    return {
      totalAnalyses: this.stats.totalAnalyses,
      averageScore,
      commonIndicators,
      lastUpdated: this.stats.lastUpdated,
      patternsCount: {
        high: this.patterns.high.length,
        medium: this.patterns.medium.length,
        positive: this.patterns.positive.length
      },
      learningDataPoints: this.learningData.length,
      feedbackCount: this.stats.feedback.length
    };
  }

  // Method to demonstrate compounding - show how the system evolved
  getEvolutionReport() {
    return {
      initialPatternCount: 15, // Hardcoded for demo
      currentPatternCount: this.patterns.high.length + this.patterns.medium.length + this.patterns.positive.length,
      learningIterations: this.learningData.length,
      improvementCycles: Math.floor(this.learningData.length / 5),
      accuracy: this.calculateAccuracy()
    };
  }

  calculateAccuracy() {
    if (this.stats.feedback.length === 0) return null;
    
    const accurateResults = this.stats.feedback.filter(f => f.difference <= 1).length;
    return (accurateResults / this.stats.feedback.length) * 100;
  }
}

module.exports = FrustrationDetector;