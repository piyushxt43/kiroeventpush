---
inclusion: fileMatch
fileMatchPattern: '**/AIChat.jsx'
---

# AI Integration Guidelines

## Gemini API Best Practices

### API Configuration
```javascript
const API_KEY = process.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`
```

### Request Format
```javascript
{
  contents: [{
    parts: [{ text: 'Your prompt here' }]
  }]
}
```

### Response Handling
```javascript
const aiResponse = response.data.candidates[0].content.parts[0].text
```

## Prompt Engineering

### System Prompts
Always provide context:
```javascript
const systemPrompt = `You are AgentOS AI Assistant, a helpful AI for social media analytics.

Current user: ${user?.displayName || 'User'}
Context: You have access to their social media analytics dashboard.

When users ask questions:
- Provide specific, actionable insights
- Reference actual metrics when possible
- Suggest concrete actions
- Be conversational and friendly

User question: ${textToSend}`
```

### User Prompts
- Keep prompts clear and specific
- Provide relevant context
- Include examples when helpful

## Error Handling

### API Errors
```javascript
try {
  const response = await axios.post(API_URL, payload)
  // Handle success
} catch (error) {
  console.error('AI Error:', error)
  console.error('Error details:', error.response?.data || error.message)
  
  // Show user-friendly message
  setMessages(prev => [...prev, { 
    role: 'assistant', 
    content: `Error: ${error.response?.data?.error?.message || error.message}`,
    actions: []
  }])
}
```

### Common Errors
- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: API issue, retry

## Rate Limiting

### Gemini API Limits
- Free tier: 60 requests per minute
- Implement exponential backoff for retries
- Show loading states during requests

### Implementation
```javascript
const [loading, setLoading] = useState(false)

const sendMessage = async () => {
  if (loading) return // Prevent duplicate requests
  setLoading(true)
  try {
    // API call
  } finally {
    setLoading(false)
  }
}
```

## Response Processing

### Parse AI Responses
```javascript
const processAIResponse = (text) => {
  const actions = []
  
  // Detect actionable items
  if (text.toLowerCase().includes('create')) {
    actions.push({ label: 'Create Report', action: 'create_report' })
  }
  
  return { content: text, actions }
}
```

### Action Buttons
```javascript
const handleAction = (action) => {
  switch(action) {
    case 'create_report':
      window.location.href = '/reports'
      break
    case 'view_dashboard':
      window.location.href = '/'
      break
    default:
      break
  }
}
```

## UI/UX Considerations

### Chat Interface
- Show typing indicator while loading
- Display user and AI messages clearly
- Preserve chat history
- Auto-scroll to latest message

### Quick Actions
Provide preset prompts for common tasks:
```javascript
const quickActions = [
  { icon: BarChart3, text: 'Show top posts', prompt: '...' },
  { icon: TrendingUp, text: 'Engagement trends', prompt: '...' },
  { icon: Users, text: 'Audience insights', prompt: '...' }
]
```

## Testing AI Integration

### Manual Tests
1. Send simple query → Verify response
2. Send complex query → Check quality
3. Test error scenarios → Verify error handling
4. Test rate limiting → Check behavior
5. Test with/without API key → Verify errors

### Debug Mode
Enable detailed logging:
```javascript
console.log('API Request:', payload)
console.log('API Response:', response.data)
```

## Performance Optimization

### Caching
- Cache common responses (future enhancement)
- Store conversation history locally
- Implement request debouncing

### Streaming (Future)
Consider streaming responses for better UX:
```javascript
// Future implementation
const stream = await fetch(API_URL, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: { 'Content-Type': 'application/json' }
})
```

## Security

### API Key Protection
- Never expose API key in client code
- Use environment variables
- Implement server-side proxy (future)

### Input Sanitization
- Validate user inputs
- Prevent prompt injection
- Limit message length

## Future Enhancements

### Planned Features
- [ ] Conversation memory across sessions
- [ ] Multi-turn conversations with context
- [ ] Voice input/output
- [ ] Image analysis
- [ ] Custom AI models
- [ ] Fine-tuned responses for analytics

---

**Remember**: AI is a tool to enhance user experience, not replace good UX design! 🤖
