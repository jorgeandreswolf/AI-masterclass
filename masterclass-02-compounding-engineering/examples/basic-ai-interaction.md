# Basic AI Interaction Example

## Traditional Approach (Stage 1)

**Human**: "Write a function to detect if text contains frustration"

**AI Response**:
```javascript
function detectFrustration(text) {
  const keywords = ['angry', 'frustrated', 'annoyed'];
  return keywords.some(word => text.toLowerCase().includes(word));
}
```

**Human**: "Thanks!"

## Problems with this approach:

1. **No context preservation** - Next session starts from scratch
2. **No learning** - Same mistakes repeated each time  
3. **No measurement** - Can't improve accuracy
4. **One-dimensional** - Only looks at keywords
5. **No standards** - Code style inconsistent across sessions

## Typical cycle:
1. Ask AI for code
2. Get basic solution
3. Use it as-is or make minor tweaks
4. Move on to next task
5. **Repeat** - No compounding value

## Result:
- AI remains a simple code generator
- No improvement over time
- Team doesn't level up
- Same basic patterns forever