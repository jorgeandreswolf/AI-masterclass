/**
 * Stage 1: Basic AI Usage
 * 
 * This demonstrates traditional AI-assisted coding:
 * - One-off interactions
 * - No context preservation
 * - No learning or improvement
 */

// Traditional approach: Ask AI to write a function
function detectFrustration(text) {
  // Simple keyword matching
  const frustrationWords = ['angry', 'frustrated', 'annoyed', 'terrible', 'awful'];
  const lowerText = text.toLowerCase();
  
  let score = 0;
  frustrationWords.forEach(word => {
    if (lowerText.includes(word)) {
      score += 1;
    }
  });
  
  return score > 0;
}

// Problems with this approach:
// 1. No learning - same mistakes repeated
// 2. No context - each request is isolated  
// 3. No improvement - static patterns
// 4. No measurement - can't track effectiveness

module.exports = { detectFrustration };