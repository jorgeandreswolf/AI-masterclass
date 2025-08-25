# Default Style Example

## Scenario
**Request**: "Add input validation to the POST /todos endpoint"

## Default Style Response

### Code Changes

```javascript
// src/routes/todos.js
router.post('/', (req, res) => {
  // Input validation
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (req.body.title.length > 200) {
    return res.status(400).json({ error: 'Title must be less than 200 characters' });
  }

  if (req.body.description && req.body.description.length > 1000) {
    return res.status(400).json({ error: 'Description must be less than 1000 characters' });
  }

  try {
    const todo = new Todo(req.body.title.trim(), req.body.description?.trim() || '');
    todos.push(todo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});
```

## Characteristics of Default Style

- **Concise**: Direct implementation without extensive explanation
- **Efficient**: Focuses on getting the task done quickly
- **Minimal commentary**: Code speaks for itself
- **Production-ready**: Includes error handling and appropriate status codes
- **Practical**: Addresses the core requirement with reasonable constraints

## When to Use Default Style

- ✅ **Rapid prototyping** - Need quick implementations
- ✅ **Experienced developers** - Team knows the patterns
- ✅ **Time-sensitive tasks** - Deadlines are tight
- ✅ **Simple modifications** - Straightforward changes
- ✅ **Production fixes** - Need immediate solutions

## Comparison Notes

This is the baseline behavior. It provides working code without teaching moments or collaborative elements.
