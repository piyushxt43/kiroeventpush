# AI-Powered Data Input & Dynamic Dashboard Feature

## Overview
Transform AgentOS into an AI-first platform where users input their social media data through the chatbot, which then dynamically updates all dashboards and reports.

## Current State
- ✅ AI chatbot exists (bottom-right corner)
- ✅ Dashboard shows mock/demo data
- ✅ Reports are static
- ❌ No real data integration
- ❌ No user data input mechanism
- ❌ No dynamic dashboard updates

## Target State
- ✅ AI chatbot as primary data entry point
- ✅ Users can upload screenshots or paste text
- ✅ AI extracts metrics from user input
- ✅ Dashboard updates dynamically based on AI-processed data
- ✅ Reports auto-generate from user data
- ✅ Prominent chatbot integration throughout the app

## Feature Requirements

### 1. Enhanced AI Chatbot

#### 1.1 File Upload Capability
```javascript
// Add to AIChat.jsx
- Support image uploads (PNG, JPG, JPEG)
- Support text file uploads (TXT, CSV)
- Drag & drop interface
- File preview before sending
- Max file size: 5MB
```

#### 1.2 Data Input Prompts
```
Welcome messages should guide users:
"👋 Welcome! To get started, please share your social media data:
• Upload a screenshot of your analytics
• Paste your metrics (followers, engagement, etc.)
• Connect your accounts (coming soon)

What would you like to do?"
```

#### 1.3 Quick Data Entry Actions
```javascript
quickActions = [
  { icon: Upload, text: 'Upload Screenshot', action: 'upload_data' },
  { icon: Type, text: 'Enter Metrics Manually', action: 'manual_entry' },
  { icon: BarChart3, text: 'View My Dashboard', action: 'view_dashboard' },
  { icon: FileText, text: 'Generate Report', action: 'create_report' }
]
```

### 2. Data Processing Pipeline

#### 2.1 Image Analysis (Using Gemini Vision)
```javascript
// When user uploads screenshot
async function analyzeScreenshot(imageFile) {
  // Convert image to base64
  const base64Image = await fileToBase64(imageFile)
  
  // Send to Gemini with vision prompt
  const prompt = `Analyze this social media analytics screenshot and extract:
  - Platform (Instagram/Twitter/TikTok)
  - Followers count
  - Engagement rate
  - Reach/Impressions
  - Likes, comments, shares
  - Date range
  
  Return as JSON format.`
  
  // Call Gemini API with image
  const response = await callGeminiVision(prompt, base64Image)
  
  // Parse and validate data
  return parseMetrics(response)
}
```

#### 2.2 Text Parsing
```javascript
// When user pastes text
async function parseTextMetrics(text) {
  const prompt = `Extract social media metrics from this text:
  "${text}"
  
  Return JSON with: platform, followers, engagement_rate, reach, likes, comments, shares, date`
  
  const response = await callGemini(prompt)
  return JSON.parse(response)
}
```

#### 2.3 Data Storage
```javascript
// Store in localStorage or Context
const userDataStructure = {
  platforms: {
    instagram: {
      followers: 52300,
      engagement_rate: 5.2,
      reach: 850000,
      posts: [...],
      lastUpdated: '2024-12-04'
    },
    twitter: { ... },
    tiktok: { ... }
  },
  history: [
    { date: '2024-12-04', metrics: {...} },
    { date: '2024-12-03', metrics: {...} }
  ]
}
```

### 3. Dynamic Dashboard Updates

#### 3.1 Data Context Provider
```javascript
// src/context/DataContext.jsx
import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(loadFromStorage())
  
  const updateMetrics = (newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData,
      lastUpdated: new Date().toISOString()
    }))
    saveToStorage(newData)
  }
  
  return (
    <DataContext.Provider value={{ userData, updateMetrics }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
```

#### 3.2 Dashboard Integration
```javascript
// Update Dashboard.jsx to use real data
import { useData } from '../context/DataContext'

const Dashboard = () => {
  const { userData } = useData()
  
  // Use userData instead of mock data
  const metrics = [
    { 
      title: 'Total Followers', 
      value: formatNumber(userData.totalFollowers),
      change: calculateChange(userData.history),
      ...
    }
  ]
  
  // Generate charts from userData.history
  const engagementData = generateChartData(userData.history)
  
  return (...)
}
```

### 4. Prominent Chatbot Integration

#### 4.1 Onboarding Flow
```javascript
// Show modal on first visit
<OnboardingModal>
  <h2>Welcome to AgentOS!</h2>
  <p>Let's set up your dashboard. Click the AI assistant to get started.</p>
  <Button onClick={openChat}>Start Setup</Button>
</OnboardingModal>
```

#### 4.2 Empty State Prompts
```javascript
// When no data exists
<EmptyDashboard>
  <Bot size={64} />
  <h2>No Data Yet</h2>
  <p>Chat with our AI assistant to add your social media data</p>
  <Button onClick={openChat}>
    <Bot /> Open AI Assistant
  </Button>
</EmptyDashboard>
```

#### 4.3 Visual Enhancements
```css
/* Make chatbot more prominent */
.chat-toggle {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Add notification badge */
.chat-toggle::after {
  content: '!';
  position: absolute;
  top: -4px;
  right: -4px;
  background: #f91880;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
```

### 5. Report Generation

#### 5.1 AI-Generated Reports
```javascript
async function generateReport(userData, timeRange) {
  const prompt = `Generate a comprehensive social media report based on this data:
  ${JSON.stringify(userData)}
  
  Time range: ${timeRange}
  
  Include:
  - Executive summary
  - Key metrics and trends
  - Top performing content
  - Recommendations
  - Growth opportunities
  
  Format as markdown.`
  
  const report = await callGemini(prompt)
  return report
}
```

#### 5.2 Auto-Update Reports
```javascript
// When userData changes, regenerate reports
useEffect(() => {
  if (userData.lastUpdated) {
    regenerateReports(userData)
  }
}, [userData])
```

## Implementation Plan

### Phase 1: Core Infrastructure (Week 1)
- [ ] Create DataContext for global state
- [ ] Add localStorage persistence
- [ ] Update Dashboard to use dynamic data
- [ ] Add empty state components

### Phase 2: AI Chat Enhancement (Week 2)
- [ ] Add file upload UI to AIChat
- [ ] Implement image to base64 conversion
- [ ] Integrate Gemini Vision API
- [ ] Add text parsing functionality
- [ ] Create data extraction prompts

### Phase 3: Data Processing (Week 3)
- [ ] Build metric extraction logic
- [ ] Validate and sanitize user input
- [ ] Handle multiple platforms
- [ ] Store historical data
- [ ] Calculate trends and changes

### Phase 4: UI/UX Polish (Week 4)
- [ ] Onboarding flow
- [ ] Empty states
- [ ] Loading states
- [ ] Error handling
- [ ] Success notifications
- [ ] Chatbot visual enhancements

### Phase 5: Report Generation (Week 5)
- [ ] AI report generation
- [ ] Report templates
- [ ] Export functionality
- [ ] Scheduled reports
- [ ] Email delivery

## Technical Considerations

### Gemini Vision API
```javascript
// Requires Gemini Pro Vision model
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent'

// Request format
{
  contents: [{
    parts: [
      { text: "Extract metrics from this image" },
      { 
        inline_data: {
          mime_type: "image/jpeg",
          data: base64ImageData
        }
      }
    ]
  }]
}
```

### Data Validation
```javascript
const validateMetrics = (data) => {
  const schema = {
    followers: { type: 'number', min: 0, max: 1000000000 },
    engagement_rate: { type: 'number', min: 0, max: 100 },
    reach: { type: 'number', min: 0 },
    // ...
  }
  
  return validate(data, schema)
}
```

### Error Handling
```javascript
try {
  const metrics = await analyzeScreenshot(file)
  updateMetrics(metrics)
  showSuccess('Data imported successfully!')
} catch (error) {
  if (error.code === 'INVALID_IMAGE') {
    showError('Could not read the image. Please try a clearer screenshot.')
  } else if (error.code === 'NO_METRICS_FOUND') {
    showError('No metrics found. Please upload an analytics screenshot.')
  } else {
    showError('Something went wrong. Please try again.')
  }
}
```

## Security & Privacy

- ✅ All data stored locally (localStorage)
- ✅ No data sent to external servers (except Gemini for processing)
- ✅ Images processed and discarded immediately
- ✅ User can clear all data anytime
- ✅ No tracking or analytics on user data

## Future Enhancements

- [ ] Direct API integration (Instagram, Twitter, TikTok)
- [ ] Real-time data sync
- [ ] Team collaboration features
- [ ] Advanced AI insights
- [ ] Predictive analytics
- [ ] Automated posting suggestions
- [ ] Competitor analysis
- [ ] Sentiment analysis

## Success Metrics

- User completes data input within 2 minutes
- 90%+ accuracy in metric extraction
- Dashboard updates in < 1 second
- Reports generate in < 5 seconds
- User satisfaction score > 4.5/5

---

**Status**: Specification Complete - Ready for Implementation
**Priority**: High
**Estimated Effort**: 5 weeks (1 developer)
**Dependencies**: Gemini Vision API, React Context API
