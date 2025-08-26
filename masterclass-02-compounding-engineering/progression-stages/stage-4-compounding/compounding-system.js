/**
 * Stage 4: Compounding Engineering System
 * 
 * This demonstrates the full compounding approach:
 * - Multiple specialized agents
 * - Cross-agent learning
 * - Long-term improvement
 * - Self-evolving patterns
 * - Measurable compound growth
 */

const FrustrationDetector = require('../../demo-app/src/detectors/frustration-detector');
const CodeReviewer = require('../../demo-app/src/agents/code-reviewer');
const ArchitectureCapturer = require('../../demo-app/src/agents/architecture-capturer');

/**
 * Compounding Engineering Orchestrator
 * Coordinates multiple AI agents that learn from each other
 */
class CompoundingSystem {
  constructor() {
    // Specialized agents
    this.frustrationDetector = new FrustrationDetector();
    this.codeReviewer = new CodeReviewer();
    this.architectureCapturer = new ArchitectureCapturer();
    
    // Cross-agent learning system
    this.knowledgeBase = {
      patterns: new Map(),
      decisions: [],
      learningEvents: [],
      compoundingMetrics: {
        totalInteractions: 0,
        crossAgentLearnings: 0,
        accuracyImprovements: [],
        emergentPatterns: []
      }
    };
    
    // Compound growth tracking
    this.evolutionHistory = [];
  }

  /**
   * Process a development task with full compounding system
   */
  async processTask(task) {
    const session = {
      id: `session_${Date.now()}`,
      task,
      timestamp: new Date().toISOString(),
      agents: {},
      crossLearnings: [],
      improvements: []
    };

    // Agent 1: Code Review (if code is involved)
    if (task.code) {
      const codeReview = this.codeReviewer.reviewCode(task.code, task.context);
      session.agents.codeReview = codeReview;
      
      // Cross-learning: Code quality affects frustration patterns
      this.learnFromCodeQuality(codeReview);
    }

    // Agent 2: Architecture Analysis (if structural changes)
    if (task.type === 'architecture' || task.code) {
      const archAnalysis = this.architectureCapturer.analyzeChange({
        code: task.code || '',
        filePath: task.filePath || 'unknown',
        changeType: task.changeType || 'modify'
      });
      session.agents.architecture = archAnalysis;
      
      // Cross-learning: Architecture decisions inform code review patterns
      this.learnFromArchitecture(archAnalysis);
    }

    // Agent 3: Communication Analysis (always)
    if (task.communication) {
      const frustrationAnalysis = this.frustrationDetector.analyze(task.communication);
      session.agents.frustration = frustrationAnalysis;
      
      // Cross-learning: Frustration patterns inform code and architecture feedback
      this.learnFromCommunication(frustrationAnalysis, session);
    }

    // Compound the learnings
    const compoundedInsights = this.synthesizeLearnings(session);
    session.compoundedInsights = compoundedInsights;

    // Track evolution
    this.recordEvolution(session);
    
    return session;
  }

  /**
   * Learn from code quality patterns to improve other agents
   */
  learnFromCodeQuality(codeReview) {
    // If code review finds many issues, expect higher frustration in communications
    if (codeReview.issues.length > 3) {
      const newFrustrationPattern = new RegExp(`\\b(${codeReview.issues[0].type.toLowerCase()})\\b`, 'i');
      this.frustrationDetector.patterns.medium.push(newFrustrationPattern);
      
      this.recordCrossLearning('codeReview', 'frustrationDetector', 
        'High issue count suggests new frustration patterns');
    }

    // Architecture decisions informed by code smells
    if (codeReview.issues.some(i => i.type === 'Long Function')) {
      this.knowledgeBase.patterns.set('refactoring_opportunity', {
        trigger: 'Long Function detected',
        suggestion: 'Consider service extraction pattern',
        confidence: 0.8
      });
    }
  }

  /**
   * Learn from architecture decisions to improve other agents
   */
  learnFromArchitecture(archAnalysis) {
    // Technical debt creates frustration patterns
    if (archAnalysis.debt.length > 0) {
      archAnalysis.debt.forEach(debt => {
        if (debt.type === 'todo' && debt.description.includes('urgent')) {
          // Urgent TODOs likely create frustration
          this.frustrationDetector.patterns.high.push(/urgent.*todo/i);
        }
      });
      
      this.recordCrossLearning('architectureCapturer', 'frustrationDetector',
        'Technical debt patterns correlate with frustration');
    }

    // Pattern usage informs code review priorities
    archAnalysis.patterns.forEach(pattern => {
      if (pattern.name === 'Singleton') {
        // Prioritize singleton-related code smells
        this.codeReviewer.patterns.smells.push({
          name: 'Singleton Usage',
          pattern: /getInstance\(\)/,
          severity: 'medium',
          suggestion: 'Consider dependency injection instead'
        });
      }
    });
  }

  /**
   * Learn from communication patterns to improve technical agents
   */
  learnFromCommunication(frustrationAnalysis, session) {
    // High frustration suggests we should look for more code/architecture issues
    if (frustrationAnalysis.frustrationLevel === 'high') {
      // Make code reviewer more sensitive
      this.codeReviewer.patterns.smells.forEach(pattern => {
        if (pattern.severity === 'low') {
          pattern.severity = 'medium'; // Upgrade sensitivity
        }
      });
      
      this.recordCrossLearning('frustrationDetector', 'codeReviewer',
        'High frustration suggests stricter code quality standards needed');
    }

    // Specific frustration indicators suggest architectural problems
    if (frustrationAnalysis.indicators.includes('strong frustration')) {
      session.architecturalSuspicion = 'high';
      this.knowledgeBase.patterns.set('frustration_architecture_correlation', {
        observation: 'Strong frustration often indicates architectural issues',
        actionable: 'Prioritize architecture review when frustration is high',
        confidence: 0.75
      });
    }
  }

  /**
   * Synthesize learnings across all agents
   */
  synthesizeLearnings(session) {
    const insights = {
      summary: 'Cross-agent analysis complete',
      emergentPatterns: [],
      recommendations: [],
      confidenceBoosts: []
    };

    // Pattern: Code issues + High frustration = Architecture review needed
    if (session.agents.codeReview?.issues.length > 2 && 
        session.agents.frustration?.frustrationLevel === 'high') {
      
      insights.emergentPatterns.push({
        pattern: 'Frustration-Quality Correlation',
        description: 'High frustration correlates with code quality issues',
        confidence: 0.85,
        actionable: 'Schedule refactoring session'
      });
      
      insights.recommendations.push({
        priority: 'high',
        action: 'Address code quality to reduce team frustration',
        evidence: 'Multi-agent correlation detected'
      });
    }

    // Pattern: Architecture debt + Communication issues = Technical debt spiral
    if (session.agents.architecture?.debt.length > 0 &&
        session.agents.frustration?.score > 5) {
      
      insights.emergentPatterns.push({
        pattern: 'Technical Debt Spiral',
        description: 'Architecture debt is causing team frustration',
        confidence: 0.9,
        actionable: 'Prioritize debt reduction over new features'
      });
    }

    // Confidence boost: Multiple agents agreeing
    const agentCount = Object.keys(session.agents).length;
    if (agentCount >= 2) {
      insights.confidenceBoosts.push({
        reason: 'Multi-agent validation',
        boost: 0.2,
        agents: agentCount
      });
    }

    return insights;
  }

  recordCrossLearning(fromAgent, toAgent, insight) {
    this.knowledgeBase.learningEvents.push({
      timestamp: new Date().toISOString(),
      from: fromAgent,
      to: toAgent,
      insight,
      type: 'cross_agent_learning'
    });
    
    this.knowledgeBase.compoundingMetrics.crossAgentLearnings++;
  }

  recordEvolution(session) {
    this.evolutionHistory.push({
      timestamp: session.timestamp,
      sessionId: session.id,
      agentsUsed: Object.keys(session.agents),
      crossLearnings: session.crossLearnings?.length || 0,
      emergentPatterns: session.compoundedInsights?.emergentPatterns?.length || 0,
      compoundingScore: this.calculateCompoundingScore()
    });
    
    this.knowledgeBase.compoundingMetrics.totalInteractions++;
  }

  calculateCompoundingScore() {
    // Measure how much the system has grown beyond its initial capabilities
    const baseCapabilities = 15; // Initial pattern count across all agents
    
    const currentCapabilities = 
      this.frustrationDetector.patterns.high.length +
      this.frustrationDetector.patterns.medium.length +
      this.frustrationDetector.patterns.positive.length +
      this.codeReviewer.patterns.smells.length +
      this.architectureCapturer.patterns.size;
    
    const learningMultiplier = Math.log(this.knowledgeBase.learningEvents.length + 1);
    const crossAgentBonus = this.knowledgeBase.compoundingMetrics.crossAgentLearnings * 0.1;
    
    return Math.round(
      ((currentCapabilities - baseCapabilities) / baseCapabilities) * 100 + 
      learningMultiplier * 10 + 
      crossAgentBonus
    );
  }

  /**
   * Get comprehensive system insights showing compounding effects
   */
  getCompoundingInsights() {
    const recentSessions = this.evolutionHistory.slice(-10);
    
    return {
      systemGrowth: {
        totalSessions: this.evolutionHistory.length,
        compoundingScore: this.calculateCompoundingScore(),
        crossAgentLearnings: this.knowledgeBase.compoundingMetrics.crossAgentLearnings,
        emergentPatterns: this.knowledgeBase.patterns.size
      },
      
      agentEvolution: {
        frustrationDetector: this.frustrationDetector.getEvolutionReport(),
        codeReviewer: this.codeReviewer.getInsights(),
        architectureCapturer: this.architectureCapturer.getInsights()
      },
      
      emergentCapabilities: Array.from(this.knowledgeBase.patterns.entries())
        .map(([name, data]) => ({ name, ...data })),
      
      learningVelocity: this.calculateLearningVelocity(),
      
      predictions: this.generatePredictions()
    };
  }

  calculateLearningVelocity() {
    if (this.evolutionHistory.length < 5) return 'insufficient_data';
    
    const recent = this.evolutionHistory.slice(-5);
    const older = this.evolutionHistory.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, s) => sum + s.compoundingScore, 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + s.compoundingScore, 0) / older.length;
    
    const velocity = recentAvg - olderAvg;
    
    if (velocity > 5) return 'accelerating';
    if (velocity > 0) return 'growing';
    if (velocity > -5) return 'stable';
    return 'declining';
  }

  generatePredictions() {
    const trends = this.knowledgeBase.learningEvents.slice(-20);
    const predictions = [];
    
    // Predict next likely learning area
    const learningTypes = {};
    trends.forEach(event => {
      const key = `${event.from}->${event.to}`;
      learningTypes[key] = (learningTypes[key] || 0) + 1;
    });
    
    const topLearningPath = Object.entries(learningTypes)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (topLearningPath) {
      predictions.push({
        type: 'learning_path',
        prediction: `Next learning likely: ${topLearningPath[0]}`,
        confidence: Math.min(0.9, topLearningPath[1] / trends.length)
      });
    }
    
    // Predict compounding acceleration
    const velocity = this.calculateLearningVelocity();
    if (velocity === 'accelerating') {
      predictions.push({
        type: 'system_growth',
        prediction: 'System will develop new emergent capabilities soon',
        confidence: 0.7
      });
    }
    
    return predictions;
  }
}

// Benefits of this approach:
// ✓ True compounding - each interaction improves multiple agents
// ✓ Emergent capabilities - system develops abilities not explicitly programmed
// ✓ Cross-domain learning - insights from one area improve others
// ✓ Measurable compound growth - can track system evolution
// ✓ Predictive capabilities - can forecast next learning opportunities
// ✓ Self-improving architecture - system designs better systems

module.exports = CompoundingSystem;