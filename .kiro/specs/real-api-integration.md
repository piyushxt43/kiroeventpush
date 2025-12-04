# Spec: Real Social Media API Integration

## Overview
Replace mock data with real social media API integrations for Instagram, Twitter, and TikTok.

## Status
- **Phase**: Planning
- **Priority**: Critical
- **Estimated Effort**: 4 weeks

## Goals
1. Integrate Instagram Graph API
2. Integrate Twitter API v2
3. Integrate TikTok Business API
4. Implement data synchronization
5. Add real-time updates via webhooks

## Requirements

### 1. Instagram Graph API Integration

**Endpoints Needed**:
- User insights (followers, reach, impressions)
- Media insights (likes, comments, shares, saves)
- Stories insights (views, exits, replies)
- Audience demographics

**Implementation**:
```javascript
// src/services/instagram.js
export const getInstagramInsights = async (accessToken) => {
  const response = await axios.get(
    'https://graph.instagram.com/me/insights',
    {
      params: {
        metric: 'follower_count,reach,impressions',
        period: 'day',
        access_token: accessToken
      }
    }
  )
  return response.data
}
```

**Authentication Flow**:
1. User clicks "Connect Instagram"
2. OAuth redirect to Instagram
3. Receive access token
4. Store token securely in Firestore
5. Refresh token before expiry

### 2. Twitter API v2 Integration

**Endpoints Needed**:
- User metrics (followers, following, tweet count)
- Tweet metrics (impressions, engagements, retweets)
- User timeline
- Analytics data

**Implementation**:
```javascript
// src/services/twitter.js
export const getTwitterMetrics = async (userId, bearerToken) => {
  const response = await axios.get(
    `https://api.twitter.com/2/users/${userId}/tweets`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      },
      params: {
        'tweet.fields': 'public_metrics,created_at',
        max_results: 100
      }
    }
  )
  return response.data
}
```

**Authentication**:
- OAuth 2.0 with PKCE
- Store bearer token securely
- Implement token refresh

### 3. TikTok Business API Integration

**Endpoints Needed**:
- User info and stats
- Video analytics
- Audience insights
- Trending sounds

**Implementation**:
```javascript
// src/services/tiktok.js
export const getTikTokAnalytics = async (accessToken) => {
  const response = await axios.get(
    'https://open-api.tiktok.com/user/info/',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  return response.data
}
```

## Data Synchronization

### Sync Strategy
1. **Initial Sync**: Full data pull on first connection
2. **Incremental Sync**: Only new/updated data
3. **Scheduled Sync**: Every 6 hours
4. **Manual Sync**: User-triggered refresh

### Implementation
```javascript
// src/services/sync.js
export const syncAllPlatforms = async (userId) => {
  const platforms = ['instagram', 'twitter', 'tiktok']
  
  for (const platform of platforms) {
    try {
      const data = await syncPlatform(platform, userId)
      await saveToFirestore(userId, platform, data)
    } catch (error) {
      console.error(`Sync failed for ${platform}:`, error)
    }
  }
}
```

### Data Storage
```javascript
// Firestore structure
users/
  {userId}/
    platforms/
      instagram/
        profile: {...}
        posts: [...]
        insights: {...}
        lastSync: timestamp
      twitter/
        profile: {...}
        tweets: [...]
        metrics: {...}
        lastSync: timestamp
      tiktok/
        profile: {...}
        videos: [...]
        analytics: {...}
        lastSync: timestamp
```

## Webhook Integration

### Instagram Webhooks
```javascript
// Receive real-time updates
app.post('/webhooks/instagram', (req, res) => {
  const { object, entry } = req.body
  
  if (object === 'instagram') {
    entry.forEach(item => {
      // Process update
      processInstagramUpdate(item)
    })
  }
  
  res.sendStatus(200)
})
```

### Twitter Webhooks
```javascript
// Account Activity API
app.post('/webhooks/twitter', (req, res) => {
  const event = req.body
  
  // Process tweet events, mentions, etc.
  processTwitterEvent(event)
  
  res.sendStatus(200)
})
```

## Rate Limiting

### Instagram
- 200 calls per hour per user
- Implement exponential backoff

### Twitter
- 300 requests per 15 minutes
- Use cursor-based pagination

### TikTok
- Varies by endpoint
- Monitor rate limit headers

### Implementation
```javascript
// src/utils/rateLimiter.js
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = []
  }
  
  async throttle() {
    const now = Date.now()
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    )
    
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.timeWindow - (now - this.requests[0])
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    
    this.requests.push(now)
  }
}
```

## Error Handling

### Common Errors
1. **Token Expired**: Refresh token automatically
2. **Rate Limit**: Queue requests, retry later
3. **API Down**: Show cached data, retry
4. **Invalid Token**: Prompt re-authentication

### Implementation
```javascript
const handleAPIError = (error, platform) => {
  if (error.response?.status === 401) {
    // Token expired
    return refreshToken(platform)
  } else if (error.response?.status === 429) {
    // Rate limited
    return queueRequest(error.config)
  } else {
    // Other errors
    logError(error)
    showUserError(platform)
  }
}
```

## Testing

### Unit Tests
- Test API client functions
- Test data transformation
- Test error handling
- Test rate limiting

### Integration Tests
- Test OAuth flows
- Test data sync
- Test webhook processing
- Test error recovery

### Manual Tests
- Connect each platform
- Verify data accuracy
- Test sync functionality
- Test real-time updates

## Security

### Token Storage
- Encrypt tokens in Firestore
- Use Firebase Security Rules
- Implement token rotation

### API Keys
- Store in environment variables
- Use server-side proxy for sensitive calls
- Implement request signing

## Migration Plan

### Phase 1: Infrastructure (Week 1)
- [ ] Set up API clients
- [ ] Implement OAuth flows
- [ ] Create data models
- [ ] Set up Firestore collections

### Phase 2: Instagram (Week 2)
- [ ] Implement Instagram API integration
- [ ] Add data sync
- [ ] Update UI to use real data
- [ ] Test thoroughly

### Phase 3: Twitter (Week 3)
- [ ] Implement Twitter API integration
- [ ] Add data sync
- [ ] Update UI to use real data
- [ ] Test thoroughly

### Phase 4: TikTok (Week 4)
- [ ] Implement TikTok API integration
- [ ] Add data sync
- [ ] Update UI to use real data
- [ ] Test thoroughly

### Phase 5: Webhooks & Polish
- [ ] Set up webhook endpoints
- [ ] Implement real-time updates
- [ ] Add error recovery
- [ ] Performance optimization

## Success Metrics
- 100% data accuracy vs platform native analytics
- <5s data refresh time
- 99.9% uptime for sync service
- <1% error rate for API calls

---

**Status**: Ready for Implementation
**Dependencies**: Firebase setup, API credentials
**Last Updated**: December 2024
