/**
 * Stage 3: Test-Driven AI Development
 * 
 * This demonstrates TDD with AI:
 * - Tests written first (with AI help)
 * - AI iterates based on test feedback
 * - Validation drives improvement
 * - Measurable accuracy
 */

const test = require('node:test');
const assert = require('node:assert');

/**
 * Test-driven frustration detector
 * Developed iteratively with AI using test feedback
 */
class TestDrivenFrustrationDetector {
  constructor() {
    this.patterns = {
      high: [
        /[A-Z]{4,}/, // ALL CAPS
        /[!]{3,}/, // Multiple exclamations
        /\b(HATE|STUPID|TERRIBLE|AWFUL)\b/i,
        /WHY.*(?:NOT|DON'T|WON'T|CAN'T)/i
      ],
      medium: [
        /\b(frustrated|annoying|confusing|difficult)\b/i,
        /[!]{2}/, // Double exclamations
        /\b(ugh|argh|sigh)\b/i
      ],
      positive: [
        /\b(love|great|awesome|excellent|perfect)\b/i,
        /\b(works|working|fixed|solved)\b/i
      ]
    };

    // Test-driven metrics
    this.testResults = [];
    this.accuracy = 0;
  }

  /**
   * Analyze text with test-validated logic
   */
  analyze(text) {
    const result = {
      text: text.substring(0, 50) + '...',
      score: 0,
      level: 'low',
      confidence: 0,
      testValidated: true
    };

    // Apply high frustration patterns
    let highMatches = 0;
    this.patterns.high.forEach(pattern => {
      if (pattern.test(text)) {
        highMatches++;
        result.score += 3;
      }
    });

    // Apply medium frustration patterns  
    let mediumMatches = 0;
    this.patterns.medium.forEach(pattern => {
      if (pattern.test(text)) {
        mediumMatches++;
        result.score += 1;
      }
    });

    // Apply positive patterns (reduce score)
    let positiveMatches = 0;
    this.patterns.positive.forEach(pattern => {
      if (pattern.test(text)) {
        positiveMatches++;
        result.score -= 2;
      }
    });

    // Ensure score is within bounds (test requirement)
    result.score = Math.max(0, Math.min(10, result.score));
    
    // Determine level based on test cases
    if (result.score >= 6) {
      result.level = 'high';
      result.confidence = 0.9;
    } else if (result.score >= 3) {
      result.level = 'medium';
      result.confidence = 0.7;
    } else {
      result.level = 'low';  
      result.confidence = 0.8;
    }

    return result;
  }

  /**
   * Validate against test cases and improve
   */
  runValidation(testCases) {
    const results = testCases.map(testCase => {
      const result = this.analyze(testCase.text);
      const correct = result.level === testCase.expected;
      
      return {
        text: testCase.text,
        expected: testCase.expected,
        actual: result.level,
        correct,
        score: result.score
      };
    });

    const correctCount = results.filter(r => r.correct).length;
    this.accuracy = (correctCount / results.length) * 100;
    this.testResults = results;

    return {
      accuracy: this.accuracy,
      correct: correctCount,
      total: results.length,
      results: results.filter(r => !r.correct) // Show only incorrect ones
    };
  }

  /**
   * Get improvement suggestions based on test failures
   */
  getImprovementSuggestions() {
    const failures = this.testResults.filter(r => !r.correct);
    const suggestions = [];

    // Analyze failure patterns
    const falsePositives = failures.filter(f => 
      f.expected === 'low' && (f.actual === 'medium' || f.actual === 'high')
    );
    
    const falseNegatives = failures.filter(f => 
      (f.expected === 'medium' || f.expected === 'high') && f.actual === 'low'
    );

    if (falsePositives.length > 0) {
      suggestions.push({
        issue: 'False Positives',
        count: falsePositives.length,
        suggestion: 'Patterns too sensitive - consider stricter matching or positive indicators',
        examples: falsePositives.slice(0, 2)
      });
    }

    if (falseNegatives.length > 0) {
      suggestions.push({
        issue: 'False Negatives',
        count: falseNegatives.length,
        suggestion: 'Missing frustration patterns - analyze failed cases for new indicators',
        examples: falseNegatives.slice(0, 2)
      });
    }

    return suggestions;
  }
}

// Test-driven development examples
const runTDDDemo = () => {
  const detector = new TestDrivenFrustrationDetector();
  
  // Test cases drive the implementation
  const testCases = [
    { text: 'I love this new framework!', expected: 'low' },
    { text: 'This is somewhat confusing.', expected: 'medium' },
    { text: 'WHY DOES THIS KEEP BREAKING?!', expected: 'high' },
    { text: 'Great job on the implementation.', expected: 'low' },
    { text: 'This is getting really frustrating.', expected: 'medium' },
    { text: 'TERRIBLE CODE! NOTHING WORKS!!!', expected: 'high' }
  ];

  console.log('Running TDD validation...');
  const validation = detector.runValidation(testCases);
  console.log(`Accuracy: ${validation.accuracy}%`);
  
  if (validation.accuracy < 100) {
    console.log('Improvement suggestions:', detector.getImprovementSuggestions());
  }
};

// Benefits of this approach:
// ✓ Measurable accuracy
// ✓ Test-driven improvement
// ✓ Validation feedback loop
// ✓ Iterative refinement

// Still missing:
// - Long-term learning
// - Pattern evolution
// - Multi-agent collaboration
// - Compounding effects

module.exports = { TestDrivenFrustrationDetector, runTDDDemo };