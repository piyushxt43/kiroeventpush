# AgentOS API Documentation

## Overview

AgentOS provides a comprehensive API for integrating social media analytics into your applications. This documentation covers the current implementation and planned features.

## Current Implementation

### Firebase Authentication

```javascript
import { signInWithGoogle, signOutUser } from './config/firebase'

// Sign in with Google
const user = await signInWithGoogle()

// Sign out
await signOutUser()
```

### Gemini AI Integration

```javascript
// Send message to AI
const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
  {
    contents: [{
      parts: [{ text: 'Your question here' }]
    }]
  }
)
```

## Planned Features

### Social Media APIs

#### Instagram Graph API
```javascript
// Get user insights
GET /instagram/insights
Response: {
  followers: 124500,
  engagement_rate: 4.8,
  reach: 2100000
}
```

#### Twitter API v2
```javascript
// Get tweet metrics
GET /twitter/tweets/:id/metrics
Response: {
  impressions: 45230,
  engagements: 2341,
  retweets: 156
}
```

#### TikTok Business API
```javascript
// Get video analytics
GET /tiktok/videos/:id/analytics
Response: {
  views: 67800,
  likes: 12340,
  shares: 890
}
```

### Webhook Integration

```javascript
// Register webhook
POST /webhooks/register
Body: {
  url: "https://your-app.com/webhook",
  events: ["post_published", "engagement_spike"]
}
```

## Rate Limits

- Gemini AI: 60 requests per minute
- Firebase: Based on your plan
- Social Media APIs: Varies by platform

## Error Handling

All API responses follow this format:

```javascript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable message"
  }
}
```

## Coming Soon

- REST API for external integrations
- GraphQL endpoint
- WebSocket for real-time updates
- SDK for popular languages (Python, Node.js, PHP)
