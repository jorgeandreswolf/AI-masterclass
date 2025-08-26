/**
 * Stage 2: Context-Enhanced AI Usage
 * 
 * This demonstrates AI usage with context preservation:
 * - CLAUDE.md file maintains preferences
 * - Consistent coding patterns
 * - Better alignment with project standards
 */

/**
 * Enhanced frustration detector with better patterns
 * 
 * Based on CLAUDE.md context, this implementation:
 * - Uses descriptive naming
 * - Includes JSDoc comments
 * - Handles edge cases
 * - Follows project error handling patterns
 */
class FrustrationDetector {
  constructor() {
    // Context from CLAUDE.md: Use Map for better performance
    this.patterns = new Map([
      ['caps_lock', /[A-Z]{4,}/],
      ['exclamations', /[!]{2,}/],
      ['negative_words', /\b(terrible|awful|horrible|stupid|hate)\b/i],
      ['frustration_expressions', /\b(argh|ugh|wtf|damn)\b/i]
    ]);
    
    // Context preserved: Track basic stats
    this.totalAnalyses = 0;
  }

  /**
   * Analyze text for frustration indicators
   * @param {string} text - Text to analyze
   * @returns {Object} Analysis result
   * @throws {Error} If text is not a string
   */
  analyzeText(text) {
    // Context from CLAUDE.md: Always validate inputs
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }

    this.totalAnalyses++;
    
    const result = {
      text: text.substring(0, 100) + '...', // Privacy consideration from context
      hasFrustration: false,
      confidence: 0,
      indicators: [],
      timestamp: new Date().toISOString()
    };

    // Apply patterns from context knowledge
    for (const [name, pattern] of this.patterns) {
      if (pattern.test(text)) {
        result.indicators.push(name);
        result.confidence += 0.25; // Each indicator adds confidence
      }
    }

    result.hasFrustration = result.confidence > 0.5;
    result.confidence = Math.min(1.0, result.confidence);

    return result;
  }

  getStats() {
    return {
      totalAnalyses: this.totalAnalyses,
      patternsCount: this.patterns.size
    };
  }
}

// Benefits of this approach:
// ✓ Consistent with project patterns
// ✓ Better error handling
// ✓ More maintainable code structure
// ✓ Context awareness improves quality

// Still missing:
// - No learning from results
// - No improvement over time
// - No test-driven development
// - No specialized agents

module.exports = FrustrationDetector;