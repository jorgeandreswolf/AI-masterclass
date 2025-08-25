# Explanatory Style Example

## Scenario
**Request**: "Add input validation to the POST /todos endpoint"

## Explanatory Style Response

### Code Changes

```javascript
// src/routes/todos.js
router.post('/', (req, res) => {
  // Input validation - validating early prevents invalid data from entering our system
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  // Length validation prevents potential database issues and ensures good UX
  if (req.body.title.length > 200) {
    return res.status(400).json({ error: 'Title must be less than 200 characters' });
  }

  // Optional field validation - only validate if provided
  if (req.body.description && req.body.description.length > 1000) {
    return res.status(400).json({ error: 'Description must be less than 1000 characters' });
  }

  // Sanitize inputs to prevent XSS and normalize data
  const sanitizedTitle = req.body.title.trim();
  const sanitizedDescription = req.body.description?.trim() || '';

  try {
    const todo = new Todo(sanitizedTitle, sanitizedDescription);
    todos.push(todo);
    res.status(201).json(todo);
  } catch (error) {
    // Log error for debugging while not exposing internal details
    console.error('Failed to create todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});
```

### 💡 Insights

**Security Considerations:**
- Input sanitization prevents XSS attacks by trimming whitespace
- Length limits prevent potential DoS attacks through oversized payloads
- Error handling doesn't expose internal system details to clients

**Design Patterns:**
- **Early return pattern** used for validation - reduces nesting and improves readability
- **Fail-fast principle** - validate inputs before processing to catch errors early
- **Consistent error format** - all validation errors follow the same `{ error: string }` structure

**API Design Best Practices:**
- HTTP 400 for client errors (bad input)
- HTTP 500 for server errors (unexpected failures)
- Clear, actionable error messages that help the client fix their request

**Performance Implications:**
- Validation happens before object creation, preventing unnecessary work
- Trim operations are lightweight but prevent common user input issues
- Early validation reduces memory allocation for invalid requests

**Maintainability:**
- Comments explain the "why" behind validation rules
- Consistent validation pattern can be extracted to middleware later
- Error logging aids in debugging production issues

## Characteristics of Explanatory Style

- **Educational**: Explains the reasoning behind implementation choices
- **Context-aware**: Provides insights into security, performance, and maintainability
- **Pattern-focused**: Highlights design patterns and best practices
- **Comprehensive**: Covers multiple aspects beyond just the functional requirement
- **Mentoring tone**: Acts like a senior developer explaining to a junior

## When to Use Explanatory Style

- ✅ **Code reviews** - Understanding the reasoning behind changes
- ✅ **Learning new codebases** - Understanding patterns and conventions
- ✅ **Onboarding new team members** - Educational value
- ✅ **Complex business logic** - Need to understand the "why"
- ✅ **Architecture decisions** - Understanding trade-offs and implications
- ✅ **Security-critical code** - Understanding security implications

## Comparison Notes

Compared to Default style, Explanatory provides the same working code but adds significant educational value. The insights section helps teams understand not just what changed, but why those changes were made and what principles guided the implementation.
