# Learning Style Example

## Scenario
**Request**: "Add input validation to the POST /todos endpoint"

## Learning Style Response

### Code Changes

```javascript
// src/routes/todos.js
router.post('/', (req, res) => {
  // Step 1: Let's build input validation together
  // I'll set up the structure, and you can customize the validation rules

  // Basic required field validation
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  // TODO(human): Add your own validation rules here!
  // Consider: What's a reasonable max length for titles in your app?
  // Think about: Should we validate for special characters or HTML?
  
  // Length validation - you might want to adjust these limits
  if (req.body.title.length > 200) {
    return res.status(400).json({ error: 'Title must be less than 200 characters' });
  }

  // TODO(human): Add description validation
  // Questions to consider:
  // - Should description be required or optional?
  // - What's an appropriate max length?
  // - Do you need to validate description format?

  // Basic sanitization
  const sanitizedTitle = req.body.title.trim();
  
  // TODO(human): Add description sanitization here
  // Hint: Consider the same pattern as title sanitization

  try {
    const todo = new Todo(sanitizedTitle, req.body.description || '');
    todos.push(todo);
    res.status(201).json(todo);
  } catch (error) {
    // TODO(human): Improve error handling
    // Consider: What information should be logged vs returned to client?
    res.status(500).json({ error: 'Failed to create todo' });
  }
});
```

### 🎯 Learning Opportunities

**Your Tasks:**
1. **Validation Rules**: Customize the validation limits based on your application's needs
2. **Description Validation**: Implement validation for the optional description field
3. **Sanitization**: Add proper sanitization for the description field
4. **Error Handling**: Improve the error handling and logging strategy

**Think About:**
- What happens if someone sends `{ title: "   " }` (only spaces)?
- How would you prevent XSS attacks through user input?
- Should validation be consistent across all endpoints?
- Would middleware make this validation reusable?

### 📚 Concepts to Explore

**Input Validation Patterns:**
```javascript
// Try implementing these validation approaches:

// 1. Schema-based validation
const validateTodo = (data) => {
  // TODO(human): Define your validation schema
};

// 2. Middleware approach
const validateTodoInput = (req, res, next) => {
  // TODO(human): Extract validation to reusable middleware
};

// 3. Custom validation class
class TodoValidator {
  // TODO(human): Create a validator class with methods for different rules
}
```

**Security Considerations to Research:**
- Input sanitization techniques
- XSS prevention methods
- SQL injection (if you were using a database)
- Rate limiting for API endpoints

### 🔍 Testing Your Implementation

After implementing your validation:

```javascript
// Test these scenarios:
// 1. Valid input: { title: "Buy groceries", description: "Milk, eggs, bread" }
// 2. Empty title: { title: "", description: "test" }
// 3. Long title: { title: "a".repeat(300), description: "test" }
// 4. Missing title: { description: "test" }
// 5. HTML in title: { title: "<script>alert('xss')</script>", description: "test" }

// TODO(human): Write additional test cases for your validation rules
```

## Characteristics of Learning Style

- **Collaborative**: Uses TODO(human) markers to involve you in the implementation
- **Educational**: Poses questions to make you think about edge cases
- **Structured guidance**: Provides a framework while leaving room for customization
- **Skill development**: Encourages you to research and implement additional features
- **Interactive**: Creates opportunities for back-and-forth discussion

## When to Use Learning Style

- ✅ **Skill development** - Learning new patterns or technologies
- ✅ **Junior developers** - Guided learning experience
- ✅ **Code reviews with teaching focus** - Educational feedback
- ✅ **Pair programming sessions** - Collaborative development
- ✅ **Exploring new domains** - Learning business logic or requirements
- ✅ **Building team knowledge** - Spreading expertise across the team

## Your Next Steps

1. **Complete the TODOs**: Implement the missing validation logic
2. **Test your implementation**: Try the test scenarios provided
3. **Extend the pattern**: Apply similar validation to the PUT endpoint
4. **Research middleware**: Look into Express.js validation middleware options
5. **Discuss with team**: What validation standards should your team adopt?

## Comparison Notes

Learning style provides a collaborative framework rather than a complete solution. It's designed to help you learn by doing, with guided structure and clear next steps. The TODO markers create natural breakpoints for discussion and customization.
