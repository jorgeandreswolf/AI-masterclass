# Claude Code Output Styles Masterclass

**Duration**: 45-60 minutes  
**Format**: Live coding demonstration with discussion  
**Target**: Development teams of 3-4 people

## Overview

This masterclass demonstrates how Claude Code's output styles can transform your AI coding assistant into specialized agents for different development scenarios. Through live coding examples, we'll explore built-in styles and create custom ones tailored to your team's needs.

## Learning Objectives

By the end of this session, your team will understand:
- How output styles modify Claude Code's behavior through system prompts
- When to use Default, Explanatory, and Learning styles
- How to create custom output styles for specialized roles
- Practical workflows for integrating different styles into development processes

## Prerequisites

- Cursor IDE installed with Claude Code
- Basic familiarity with Node.js and JavaScript
- Understanding of basic development workflows

## Session Structure

### 1. Introduction & Context (5 minutes)
**Key Points:**
- Output styles = customized system prompts
- Transform Claude from coding assistant to specialized agent
- Show the conceptual framework

**Demo Setup:**
- Open Cursor with this project
- Show the sample-app directory
- Briefly explain the todo API we'll be working with

### 2. Built-in Output Styles Demo (20 minutes)

#### A. Default Style (5 minutes)
**Scenario:** Add input validation to the todo API endpoint

**Talking Points:**
- Concise, efficient responses
- Focus on immediate code generation
- Minimal explanation, maximum productivity

**Live Demo:**
```
Ask Claude: "Add input validation to the POST /todos endpoint"
```

**Expected Behavior:**
- Quick, direct code changes
- Minimal commentary
- Focus on getting things done

#### B. Explanatory Style (8 minutes)
**Command:** `/output-style explanatory`
**Same Scenario:** Add input validation

**Talking Points:**
- Educational value through "Insights"
- Explains reasoning behind choices
- Great for learning codebases and patterns

**Live Demo:**
```
Ask Claude: "Add input validation to the POST /todos endpoint"
```

**Expected Behavior:**
- Detailed explanations of design decisions
- Security considerations explained
- Pattern explanations and best practices

#### C. Learning Style (7 minutes)
**Command:** `/output-style learning`
**Same Scenario:** Add input validation

**Talking Points:**
- Collaborative approach
- TODO(human) markers for team involvement
- Skill development focus

**Live Demo:**
```
Ask Claude: "Add input validation to the POST /todos endpoint"
```

**Expected Behavior:**
- Implementation structure provided
- Human collaboration requested
- Learning opportunities highlighted

### 3. Command Usage & Configuration (10 minutes)

#### Commands Demo:
- `/output-style` - Show menu
- `/output-style explanatory` - Direct switching
- Show settings persistence in `.claude/settings.local.json`

#### Configuration Exploration:
- Open and examine the JSON structure
- Discuss project vs user-level settings
- Show how preferences are saved

### 4. Custom Output Style Creation (15 minutes)

#### Live Creation Process:
**Command:** `/output-style:new`

**Custom Styles to Create:**

1. **Performance Reviewer**
   ```
   Prompt: "I want an output style that acts like a senior developer focused on performance optimization, benchmarking, and efficient algorithms."
   ```

2. **Security Auditor**
   ```
   Prompt: "I want an output style that emphasizes security best practices, threat analysis, and secure coding patterns."
   ```

3. **Documentation Generator**
   ```
   Prompt: "I want an output style that focuses on creating comprehensive documentation, code comments, and API specifications."
   ```

#### Demonstration:
- Show the generated markdown files
- Test each custom style with the same validation task
- Compare outputs and discuss use cases

### 5. Advanced Usage & Comparisons (8 minutes)

#### Quick Comparisons:
- **Output Styles vs CLAUDE.md**: Persistent vs temporary customization
- **Output Styles vs --append-system-prompt**: UI convenience vs CLI flexibility
- **Output Styles vs Sub-agents**: General behavior vs specific task agents

#### File Locations:
- User-level: `~/.claude/output-styles/`
- Project-level: `.claude/output-styles/`

### 6. Practical Use Cases & Q&A (7 minutes)

#### Team Workflow Discussion:
- **Code Reviews**: Use Performance Reviewer style
- **Onboarding**: Use Learning style for new team members
- **Security Audits**: Use Security Auditor style
- **Documentation Sprints**: Use Documentation Generator style
- **Rapid Prototyping**: Use Default style

#### Best Practices:
- Project-specific custom styles for domain expertise
- Team agreements on when to use each style
- Version control considerations for .claude/ directory

## Files in This Project

```
masterclass-01-claude-output-styles/
├── README.md                          # This session guide
├── sample-app/                        # Demo Node.js todo API
│   ├── package.json
│   ├── src/
│   │   ├── app.js                    # Main app with deliberate issues
│   │   ├── routes/
│   │   │   └── todos.js              # Todo routes for validation demo
│   │   └── models/
│   │       └── todo.js               # Simple todo model
│   └── tests/
│       └── todos.test.js             # Basic tests
├── examples/                          # Before/after examples
│   ├── default-style-example.md
│   ├── explanatory-style-example.md
│   └── learning-style-example.md
├── custom-styles/                     # Custom style templates
│   ├── performance-reviewer.md
│   ├── security-auditor.md
│   └── documentation-generator.md
└── .claude/
    └── settings.local.json           # Example configuration
```

## Key Takeaways

1. **Output styles transform Claude Code's personality** - from terse efficiency to educational collaboration
2. **Built-in styles cover common scenarios** - Default (productivity), Explanatory (learning), Learning (skill development)
3. **Custom styles create specialized AI assistants** - performance reviewers, security auditors, documentation generators
4. **Proper style selection improves development workflow** - match the style to the task and team member's needs
5. **Configuration is persistent and shareable** - team standards can be established and version controlled

## Follow-up Resources

- [Anthropic Documentation: Output Styles](https://docs.anthropic.com/en/docs/claude-code/output-styles)
- [Claude Code System Prompts](https://docs.anthropic.com/en/docs/claude-code/system-prompts)
- Project `.claude/` directory for team configurations

## Next Masterclass Preview

Coming next: **"Claude Code Sub-agents"** - Creating specialized AI agents for specific development tasks like testing, documentation, and code reviews.
