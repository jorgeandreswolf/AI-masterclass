/**
 * Architecture Capturer Agent - Specialized AI for capturing architectural decisions
 * 
 * This agent demonstrates how to:
 * 1. Automatically capture architectural decisions from code changes
 * 2. Build a knowledge base of patterns and decisions
 * 3. Suggest architectural improvements based on learned patterns
 * 4. Track architectural debt and evolution
 */

class ArchitectureCapturer {
  constructor() {
    this.decisions = [];
    this.patterns = new Map();
    this.architecturalDebt = [];
    this.metrics = {
      decisionsRecorded: 0,
      patternsIdentified: 0,
      debtItems: 0,
      lastAnalysis: null
    };
  }

  /**
   * Analyze code changes and capture architectural decisions
   * @param {Object} change - Code change information
   * @returns {Object} Captured architectural insights
   */
  analyzeChange(change) {
    const analysis = {
      id: `arch_${Date.now()}`,
      timestamp: new Date().toISOString(),
      change,
      decisions: [],
      patterns: [],
      debt: [],
      suggestions: []
    };

    // Detect different types of architectural changes
    this.detectStructuralChanges(change, analysis);
    this.detectPatternUsage(change, analysis);
    this.detectDebtIntroduction(change, analysis);
    this.generateSuggestions(analysis);

    // Learn from this analysis
    this.learnFromAnalysis(analysis);
    this.updateMetrics(analysis);

    return analysis;
  }

  detectStructuralChanges(change, analysis) {
    const { code, filePath, changeType } = change;

    // New module/service creation
    if (changeType === 'create' && this.isServiceFile(filePath)) {
      analysis.decisions.push({
        type: 'service_creation',
        decision: `New service created: ${this.extractServiceName(filePath)}`,
        rationale: 'Extracted functionality into dedicated service',
        impact: 'medium',
        alternatives: ['Could have extended existing service', 'Could have used utility functions']
      });
    }

    // Database schema changes
    if (code.includes('CREATE TABLE') || code.includes('ALTER TABLE')) {
      analysis.decisions.push({
        type: 'schema_change',
        decision: 'Database schema modification detected',
        rationale: 'Data model evolution',
        impact: 'high',
        considerations: ['Migration strategy', 'Backward compatibility', 'Performance impact']
      });
    }

    // API endpoint changes
    if (code.includes('app.get(') || code.includes('app.post(') || code.includes('router.')) {
      analysis.decisions.push({
        type: 'api_design',
        decision: 'API endpoint modification',
        rationale: 'Interface contract change',
        impact: 'medium',
        considerations: ['Breaking changes', 'Versioning strategy', 'Client impact']
      });
    }

    // Dependency injection patterns
    if (code.includes('constructor(') && code.includes('this.')) {
      analysis.decisions.push({
        type: 'dependency_pattern',
        decision: 'Dependency injection implementation',
        rationale: 'Improving testability and modularity',
        impact: 'low',
        benefits: ['Better testing', 'Loose coupling', 'Easier mocking']
      });
    }
  }

  detectPatternUsage(change, analysis) {
    const { code } = change;

    // Singleton pattern
    if (code.includes('getInstance()') && code.includes('static')) {
      analysis.patterns.push({
        name: 'Singleton',
        usage: 'Ensuring single instance of class',
        pros: ['Controlled instantiation', 'Global access'],
        cons: ['Hard to test', 'Tight coupling'],
        alternatives: ['Dependency injection', 'Factory pattern']
      });
    }

    // Observer pattern
    if (code.includes('addEventListener') || code.includes('on(') || code.includes('emit(')) {
      analysis.patterns.push({
        name: 'Observer',
        usage: 'Event-driven communication',
        pros: ['Loose coupling', 'Dynamic relationships'],
        cons: ['Hard to debug', 'Memory leaks possible'],
        alternatives: ['Direct method calls', 'Message queues']
      });
    }

    // Factory pattern
    if (code.includes('createInstance') || code.includes('factory')) {
      analysis.patterns.push({
        name: 'Factory',
        usage: 'Object creation abstraction',
        pros: ['Flexible creation', 'Type safety'],
        cons: ['Added complexity', 'Indirection'],
        alternatives: ['Direct instantiation', 'Dependency injection']
      });
    }

    // Strategy pattern
    if (code.includes('strategy') || (code.includes('interface') && code.includes('implement'))) {
      analysis.patterns.push({
        name: 'Strategy',
        usage: 'Algorithm encapsulation',
        pros: ['Runtime algorithm switching', 'Clean separation'],
        cons: ['Increased number of classes', 'Client awareness'],
        alternatives: ['Function parameters', 'Configuration-driven']
      });
    }
  }

  detectDebtIntroduction(change, analysis) {
    const { code, filePath } = change;

    // TODO comments
    const todoMatches = code.match(/\/\/\s*TODO:?\s*(.+)/gi);
    if (todoMatches) {
      todoMatches.forEach(todo => {
        analysis.debt.push({
          type: 'todo',
          description: todo.trim(),
          file: filePath,
          severity: 'low',
          category: 'documentation'
        });
      });
    }

    // FIXME/HACK comments
    const fixmeMatches = code.match(/\/\/\s*(FIXME|HACK):?\s*(.+)/gi);
    if (fixmeMatches) {
      fixmeMatches.forEach(fixme => {
        analysis.debt.push({
          type: 'technical_debt',
          description: fixme.trim(),
          file: filePath,
          severity: 'medium',
          category: 'code_quality'
        });
      });
    }

    // Long functions (simplified detection)
    const functionMatches = code.match(/function\s+\w+\([^)]*\)\s*\{[\s\S]*?\}/g);
    if (functionMatches) {
      functionMatches.forEach(func => {
        const lineCount = func.split('\n').length;
        if (lineCount > 50) {
          analysis.debt.push({
            type: 'code_smell',
            description: 'Long function detected (>50 lines)',
            file: filePath,
            severity: 'medium',
            category: 'maintainability'
          });
        }
      });
    }

    // Hardcoded values
    const hardcodedMatches = code.match(/(["'])[^"']*\1/g);
    if (hardcodedMatches && hardcodedMatches.length > 5) {
      analysis.debt.push({
        type: 'configuration',
        description: 'Multiple hardcoded values detected',
        file: filePath,
        severity: 'low',
        category: 'configuration'
      });
    }
  }

  generateSuggestions(analysis) {
    // Suggest improvements based on detected patterns and debt
    
    if (analysis.debt.length > 0) {
      const highSeverityDebt = analysis.debt.filter(d => d.severity === 'high');
      if (highSeverityDebt.length > 0) {
        analysis.suggestions.push({
          type: 'debt_reduction',
          priority: 'high',
          suggestion: 'Address critical technical debt items',
          actions: highSeverityDebt.map(d => `Fix: ${d.description}`)
        });
      }
    }

    // Pattern-based suggestions
    const singletonUsage = analysis.patterns.find(p => p.name === 'Singleton');
    if (singletonUsage) {
      analysis.suggestions.push({
        type: 'pattern_improvement',
        priority: 'medium',
        suggestion: 'Consider dependency injection instead of Singleton',
        rationale: 'Improves testability and reduces coupling',
        implementation: 'Pass dependencies through constructor or method parameters'
      });
    }

    // Architecture evolution suggestions based on history
    const relatedDecisions = this.findRelatedDecisions(analysis);
    if (relatedDecisions.length > 2) {
      analysis.suggestions.push({
        type: 'architecture_evolution',
        priority: 'low',
        suggestion: 'Consider architectural refactoring',
        rationale: `Found ${relatedDecisions.length} related decisions in this area`,
        next_steps: ['Review current architecture', 'Plan consolidation', 'Create migration strategy']
      });
    }
  }

  learnFromAnalysis(analysis) {
    this.decisions.push(analysis);

    // Update pattern frequency
    analysis.patterns.forEach(pattern => {
      const current = this.patterns.get(pattern.name) || { count: 0, contexts: [] };
      current.count++;
      current.contexts.push({
        file: analysis.change.filePath,
        timestamp: analysis.timestamp,
        usage: pattern.usage
      });
      this.patterns.set(pattern.name, current);
    });

    // Track architectural debt
    analysis.debt.forEach(debt => {
      this.architecturalDebt.push({
        ...debt,
        discoveredAt: analysis.timestamp,
        analysisId: analysis.id
      });
    });

    // Keep recent history (prevent memory issues)
    if (this.decisions.length > 200) {
      this.decisions = this.decisions.slice(-100);
    }

    // Learn architectural trends
    this.identifyTrends();
  }

  identifyTrends() {
    if (this.decisions.length < 10) return;

    const recentDecisions = this.decisions.slice(-20);
    
    // Pattern usage trends
    const patternTrends = {};
    recentDecisions.forEach(decision => {
      decision.patterns.forEach(pattern => {
        patternTrends[pattern.name] = (patternTrends[pattern.name] || 0) + 1;
      });
    });

    // Debt accumulation trends
    const debtTrends = {};
    recentDecisions.forEach(decision => {
      decision.debt.forEach(debt => {
        debtTrends[debt.category] = (debtTrends[debt.category] || 0) + 1;
      });
    });

    // Store trends for future suggestions
    this.trends = {
      patterns: patternTrends,
      debt: debtTrends,
      lastUpdated: new Date().toISOString()
    };
  }

  findRelatedDecisions(currentAnalysis) {
    const { filePath } = currentAnalysis.change;
    const fileDir = filePath.split('/').slice(0, -1).join('/');
    
    return this.decisions.filter(decision => 
      decision.change.filePath.startsWith(fileDir) ||
      decision.decisions.some(d => 
        currentAnalysis.decisions.some(cd => cd.type === d.type)
      )
    );
  }

  isServiceFile(filePath) {
    return filePath.includes('service') || 
           filePath.includes('controller') || 
           filePath.includes('repository') ||
           filePath.includes('handler');
  }

  extractServiceName(filePath) {
    const fileName = filePath.split('/').pop();
    return fileName.replace(/\.(js|ts|py)$/, '');
  }

  updateMetrics(analysis) {
    this.metrics.decisionsRecorded += analysis.decisions.length;
    this.metrics.patternsIdentified += analysis.patterns.length;
    this.metrics.debtItems += analysis.debt.length;
    this.metrics.lastAnalysis = analysis.timestamp;
  }

  /**
   * Get architectural insights and recommendations
   */
  getInsights() {
    const recentDecisions = this.decisions.slice(-10);
    
    return {
      summary: {
        totalDecisions: this.decisions.length,
        recentDecisions: recentDecisions.length,
        patterns: Array.from(this.patterns.keys()),
        debtItems: this.architecturalDebt.length
      },
      
      trends: this.trends || { patterns: {}, debt: {} },
      
      recommendations: this.generateArchitecturalRecommendations(),
      
      metrics: this.metrics,
      
      evolution: {
        mostUsedPatterns: this.getMostUsedPatterns(),
        debtByCategory: this.getDebtByCategory(),
        decisionTypes: this.getDecisionTypes()
      }
    };
  }

  generateArchitecturalRecommendations() {
    const recommendations = [];

    // High debt recommendation
    const highPriorityDebt = this.architecturalDebt.filter(d => d.severity === 'high');
    if (highPriorityDebt.length > 0) {
      recommendations.push({
        type: 'debt_management',
        priority: 'high',
        title: 'Address Critical Technical Debt',
        description: `${highPriorityDebt.length} high-priority debt items need attention`,
        action: 'Schedule debt reduction sprint'
      });
    }

    // Pattern consistency recommendation
    const patternCount = this.patterns.size;
    if (patternCount > 8) {
      recommendations.push({
        type: 'pattern_standardization',
        priority: 'medium',
        title: 'Standardize Design Patterns',
        description: `${patternCount} different patterns in use. Consider standardizing`,
        action: 'Create architectural guidelines'
      });
    }

    // Architecture evolution
    const decisionDensity = this.decisions.length / Math.max(1, this.getUniqueFiles());
    if (decisionDensity > 3) {
      recommendations.push({
        type: 'architecture_review',
        priority: 'medium',
        title: 'Architecture Review Recommended',
        description: 'High decision density indicates complex evolution',
        action: 'Schedule architecture review session'
      });
    }

    return recommendations;
  }

  getMostUsedPatterns() {
    return Array.from(this.patterns.entries())
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, 5)
      .map(([name, data]) => ({ name, count: data.count }));
  }

  getDebtByCategory() {
    const categories = {};
    this.architecturalDebt.forEach(debt => {
      categories[debt.category] = (categories[debt.category] || 0) + 1;
    });
    return categories;
  }

  getDecisionTypes() {
    const types = {};
    this.decisions.forEach(decision => {
      decision.decisions.forEach(d => {
        types[d.type] = (types[d.type] || 0) + 1;
      });
    });
    return types;
  }

  getUniqueFiles() {
    const files = new Set();
    this.decisions.forEach(decision => {
      files.add(decision.change.filePath);
    });
    return files.size;
  }

  /**
   * Export architectural knowledge base
   */
  exportKnowledgeBase() {
    return {
      decisions: this.decisions,
      patterns: Object.fromEntries(this.patterns),
      debt: this.architecturalDebt,
      trends: this.trends,
      metrics: this.metrics,
      exportedAt: new Date().toISOString()
    };
  }
}

module.exports = ArchitectureCapturer;