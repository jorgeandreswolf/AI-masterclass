# Compounding Engineering Demo - AI Context File

## Project Overview
This is a demonstration project for the "Compounding Engineering" masterclass. The goal is to show how AI systems can learn, improve, and compound their effectiveness over time.

## Core Philosophy
- **Not just coding assistance**: Build systems that design better systems
- **Compounding over time**: Each interaction should improve the next
- **Test-driven AI development**: Use tests to validate and improve AI logic
- **Context preservation**: Maintain learnings across sessions

## Coding Standards & Preferences

### JavaScript/Node.js Patterns
- Use ES6+ features (const/let, arrow functions, destructuring)
- Prefer async/await over callbacks
- Use JSDoc comments for complex functions
- Error handling: Always use try/catch for async operations
- Naming: Use descriptive, intention-revealing names

### Testing Philosophy
- Write tests first when building new features
- Test both happy path and edge cases
- Use descriptive test names that explain the behavior
- Keep tests simple and focused on single behaviors

### AI Integration Patterns
- Document AI decision-making logic
- Make AI behavior observable and debuggable  
- Capture metrics about AI performance
- Build feedback loops to improve AI accuracy

## Project-Specific Guidelines

### FrustrationDetector Class
- Pattern-based detection with self-learning capabilities
- Track statistics for improvement opportunities
- Provide clear reasoning for detection decisions
- Support feedback mechanism for human-in-the-loop learning

### Agent Architecture
- Each AI agent should have a specific, narrow focus
- Agents should maintain their own context and learning data
- Inter-agent communication should be explicit and logged
- Performance metrics should be tracked for each agent

## Known Issues & Improvement Areas
- Pattern matching is currently regex-based (could use NLP)
- Learning algorithm is simplified (could use ML models)
- No persistence layer (add database for production)
- Limited feedback integration (expand learning mechanisms)

## Success Metrics
- Detection accuracy improves over time
- Pattern count increases with usage
- False positive rate decreases
- User feedback integration improves results

---

*This file evolves with the project. Update it as you learn new patterns, fix issues, or improve the AI systems.*