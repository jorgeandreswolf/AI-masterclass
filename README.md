## AI Development Team Masterclasses

A collection of demo-style masterclasses designed for small development teams to learn practical AI integration techniques. Each masterclass focuses on hands-on code examples rather than slides.

### Target Audience
- Small development teams (3-4 developers)
- Demo-style learning (watch & discuss rather than hands-on workshops)
- Focus on practical code examples and real-world applications

### Masterclass Format
- **Duration**: 45-60 minutes per session
- **Style**: Live coding demonstrations with discussion
- **Structure**: Each masterclass has its own project folder with complete examples
- **Tools**: Cursor IDE for live demonstrations

### Quick Start

```bash
# Clone the repo
git clone https://github.com/<your-org-or-user>/AI-masterclass.git
cd AI-masterclass

# Navigate to a specific masterclass
cd masterclass-01-claude-output-styles

# Set up Node.js dependencies (if applicable)
npm install
```

### Available Masterclasses

#### 1. Claude Code Output Styles
**Folder**: `masterclass-01-claude-output-styles/`  
**Duration**: 45-60 minutes  
**Focus**: Understanding and customizing Claude Code's behavior through output styles

- Built-in styles (Default, Explanatory, Learning)
- Creating custom output styles
- Practical use cases for different development scenarios
- Live demonstrations with a sample Node.js application

### Project Structure

```text
AI-masterclass/
├── README.md
├── masterclass-01-claude-output-styles/
│   ├── README.md                     # Session guide
│   ├── sample-app/                   # Demo application
│   ├── examples/                     # Output style examples
│   ├── custom-styles/               # Custom style templates
│   └── .claude/                     # Configuration examples
└── (future masterclasses...)
```

### For Instructors

Each masterclass folder contains:
- **README.md**: Complete session guide with timing and talking points
- **Sample applications**: Pre-built code with deliberate issues for demonstration
- **Example files**: Before/after comparisons for each technique
- **Reference materials**: Links to documentation and further reading

### Contributing

- Create a feature branch: `git checkout -b masterclass/new-topic`
- Follow the established folder structure for new masterclasses
- Include comprehensive README with session timing
- Test all code examples before committing

### License

TBD — add a `LICENSE` file for the chosen license (e.g., MIT, Apache-2.0).

### Notes

- Each masterclass is self-contained with all necessary materials
- Focus on practical, immediately applicable techniques
- Designed for teams already familiar with basic development practices
