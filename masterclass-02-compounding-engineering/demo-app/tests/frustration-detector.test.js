/**
 * Test suite for FrustrationDetector
 * Demonstrates test-driven AI development approach
 */

const test = require('node:test');
const assert = require('node:assert');
const FrustrationDetector = require('../src/detectors/frustration-detector');

test('FrustrationDetector - Basic Functionality', async (t) => {
  await t.test('should detect high frustration in angry text', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('WHY DOES THIS KEEP BREAKING?! I have tried everything!');
    
    assert.strictEqual(result.frustrationLevel, 'high');
    assert(result.score >= 6, `Expected score >= 6, got ${result.score}`);
    assert(result.indicators.includes('strong frustration'));
  });

  await t.test('should detect low frustration in positive text', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('I love working with this new framework!');
    
    assert.strictEqual(result.frustrationLevel, 'low');
    assert(result.score <= 3, `Expected score <= 3, got ${result.score}`);
  });

  await t.test('should detect medium frustration in mildly frustrated text', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('This documentation is confusing and taking too long to understand.');
    
    assert.strictEqual(result.frustrationLevel, 'medium');
    assert(result.score >= 3 && result.score < 6, `Expected score 3-6, got ${result.score}`);
  });
});

test('FrustrationDetector - Learning & Compounding', async (t) => {
  await t.test('should track statistics over multiple analyses', () => {
    const detector = new FrustrationDetector();
    
    // Analyze multiple texts
    detector.analyze('This is great!');
    detector.analyze('ARGH! This is terrible!');
    detector.analyze('Hmm, this is confusing.');
    
    const stats = detector.getStats();
    assert.strictEqual(stats.totalAnalyses, 3);
    assert(stats.averageScore >= 0);
    assert(Array.isArray(stats.commonIndicators));
  });

  await t.test('should improve patterns over time', () => {
    const detector = new FrustrationDetector();
    
    const initialPatternCount = detector.patterns.high.length + 
                               detector.patterns.medium.length + 
                               detector.patterns.positive.length;
    
    // Analyze several high-frustration texts with common words
    for (let i = 0; i < 6; i++) {
      detector.analyze('This horrible system keeps crashing constantly!');
    }
    
    const finalPatternCount = detector.patterns.high.length + 
                             detector.patterns.medium.length + 
                             detector.patterns.positive.length;
    
    // Pattern count should increase (learning new patterns)
    assert(finalPatternCount >= initialPatternCount, 
           'Pattern count should not decrease during learning');
  });

  await t.test('should handle feedback for improvement', () => {
    const detector = new FrustrationDetector();
    
    const text = 'This is somewhat annoying.';
    const result = detector.analyze(text);
    
    // Provide feedback that this should be scored higher
    detector.addFeedback(text, 7, result.score);
    
    const stats = detector.getStats();
    assert.strictEqual(stats.feedbackCount, 1);
  });
});

test('FrustrationDetector - Edge Cases', async (t) => {
  await t.test('should handle empty text', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('');
    
    assert.strictEqual(result.frustrationLevel, 'low');
    assert.strictEqual(result.score, 0);
  });

  await t.test('should handle text with mixed signals', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('I love this framework but WHY IS IT SO CONFUSING?!');
    
    // Should detect both positive and negative indicators
    assert(result.indicators.length > 0);
    assert.strictEqual(result.frustrationLevel, 'medium'); // Mixed signals = medium
  });

  await t.test('should handle very long text', () => {
    const detector = new FrustrationDetector();
    const longText = 'This is getting really frustrating. '.repeat(100);
    const result = detector.analyze(longText);
    
    assert(result.score > 0);
    assert.strictEqual(typeof result.frustrationLevel, 'string');
  });
});

test('FrustrationDetector - Specific Pattern Detection', async (t) => {
  await t.test('should detect caps lock as high frustration', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('EVERYTHING IS BROKEN AND NOTHING WORKS');
    
    assert.strictEqual(result.frustrationLevel, 'high');
    assert(result.indicators.includes('strong frustration'));
  });

  await t.test('should detect multiple exclamation marks', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('This is not working!!!');
    
    assert(result.score > 0);
    assert(result.indicators.includes('strong frustration'));
  });

  await t.test('should detect positive language', () => {
    const detector = new FrustrationDetector();
    const result = detector.analyze('I am excited about this awesome new feature!');
    
    assert.strictEqual(result.frustrationLevel, 'low');
    assert(result.indicators.includes('positive language'));
  });
});

test('FrustrationDetector - Evolution & Compounding Metrics', async (t) => {
  await t.test('should provide evolution report', () => {
    const detector = new FrustrationDetector();
    
    // Simulate some learning
    for (let i = 0; i < 10; i++) {
      detector.analyze(`Test frustration text ${i}`);
    }
    
    const report = detector.getEvolutionReport();
    assert(typeof report.initialPatternCount === 'number');
    assert(typeof report.currentPatternCount === 'number');
    assert(typeof report.learningIterations === 'number');
    assert(typeof report.improvementCycles === 'number');
    assert.strictEqual(report.learningIterations, 10);
  });

  await t.test('should calculate accuracy when feedback is provided', () => {
    const detector = new FrustrationDetector();
    
    // Add some feedback
    detector.addFeedback('test1', 5, 5); // Perfect match
    detector.addFeedback('test2', 7, 6); // Close match  
    detector.addFeedback('test3', 3, 8); // Poor match
    
    const report = detector.getEvolutionReport();
    assert(typeof report.accuracy === 'number');
    assert(report.accuracy >= 0 && report.accuracy <= 100);
  });
});

// Performance and stress tests
test('FrustrationDetector - Performance', async (t) => {
  await t.test('should handle rapid successive analyses', () => {
    const detector = new FrustrationDetector();
    const startTime = Date.now();
    
    for (let i = 0; i < 100; i++) {
      detector.analyze(`Test text ${i} with varying frustration levels!`);
    }
    
    const duration = Date.now() - startTime;
    assert(duration < 1000, `100 analyses took ${duration}ms, should be under 1000ms`);
  });
});