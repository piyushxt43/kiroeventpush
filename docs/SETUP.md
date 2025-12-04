# Setup Guide

## Quick Start

Your Social Media Analytics Dashboard is now running at **http://localhost:3000**

## What's Included

### ✅ 10 Complete Pages
1. **Dashboard** (`/`) - Overview with metrics, charts, and alerts
2. **Platform Analytics** (`/platform`) - Instagram, Twitter, TikTok deep-dive
3. **Content Performance** (`/content`) - Post-level analytics
4. **Audience Insights** (`/audience`) - Demographics and growth
5. **Competitor Analysis** (`/competitors`) - Benchmarking
6. **Project Management** (`/projects`) - Task integration
7. **Reports & Export** (`/reports`) - Report generation
8. **Real-Time Monitoring** (`/live`) - Live activity feed
9. **AI Assistant** (`/ai`) - Vibe coding interface
10. **Settings** (`/settings`) - Configuration

### 🤖 AI Chat Assistant
- Click the purple chat button (bottom-right) on any page
- Powered by Google Gemini API
- Ask questions in natural language
- Generate custom visualizations

### 🎨 Features Implemented

**Dashboard**
- Real-time metric cards with trend indicators
- Multi-platform engagement chart
- Alert center with notifications
- Platform overview cards

**AI Integration**
- Persistent chat interface
- Natural language queries
- Gemini API integration
- Context-aware responses

**Visualizations**
- Interactive charts (Recharts)
- Area charts, bar charts, pie charts
- Responsive design
- Dark theme optimized

## Next Steps

### 1. Connect Real Social Media APIs

Replace mock data with actual API calls:

**Instagram Graph API**
\`\`\`javascript
// In src/services/instagram.js
const getInsights = async (accessToken) => {
  const response = await axios.get(
    'https://graph.instagram.com/me/insights',
    { params: { access_token: accessToken } }
  )
  return response.data
}
\`\`\`

**Twitter API v2**
\`\`\`javascript
// In src/services/twitter.js
const getTweets = async (userId, bearerToken) => {
  const response = await axios.get(
    \`https://api.twitter.com/2/users/\${userId}/tweets\`,
    { headers: { Authorization: \`Bearer \${bearerToken}\` } }
  )
  return response.data
}
\`\`\`

### 2. Set Up Agent Hooks

Create automation rules in Settings:

\`\`\`javascript
// Example hook configuration
const hook = {
  trigger: 'metric_threshold',
  condition: { metric: 'engagement_rate', operator: '<', value: 2.0 },
  action: 'create_task',
  params: { tool: 'asana', project: 'Social Media' }
}
\`\`\`

### 3. Configure MCP Integrations

Add project management tools:

\`\`\`javascript
// In src/config/mcp.js
export const mcpServers = {
  asana: {
    apiKey: process.env.ASANA_API_KEY,
    workspace: 'your-workspace-id'
  },
  trello: {
    apiKey: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_TOKEN
  }
}
\`\`\`

### 4. Implement Vibe Coding

Enhance AI assistant to generate code:

\`\`\`javascript
// Example: Generate chart from natural language
const prompt = "Create a bar chart of engagement by platform"
const code = await generateVisualization(prompt)
// Dynamically render the generated component
\`\`\`

### 5. Add Real-Time Updates

Use WebSockets for live data:

\`\`\`javascript
// In src/services/websocket.js
const ws = new WebSocket('wss://your-api.com/stream')
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  updateDashboard(data)
}
\`\`\`

## Environment Variables

Create a `.env` file:

\`\`\`env
# Social Media APIs
VITE_INSTAGRAM_CLIENT_ID=your_client_id
VITE_TWITTER_BEARER_TOKEN=your_bearer_token
VITE_TIKTOK_CLIENT_KEY=your_client_key

# AI
VITE_GEMINI_API_KEY=AIzaSyAHmMKu-ZCwfZ8K6PNCBUKVHJ75K9pmzNk

# Project Management
VITE_ASANA_API_KEY=your_asana_key
VITE_TRELLO_API_KEY=your_trello_key
VITE_JIRA_API_TOKEN=your_jira_token
\`\`\`

## Customization

### Change Theme Colors

Edit `src/index.css`:

\`\`\`css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --success: #00ba7c;
  --danger: #f91880;
}
\`\`\`

### Add New Metrics

Edit `src/pages/Dashboard.jsx`:

\`\`\`javascript
const metrics = [
  { title: 'Your Metric', value: '123', change: 5.2, icon: YourIcon, color: '#color' }
]
\`\`\`

### Create Custom Pages

1. Create new file in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Sidebar.jsx`

## Troubleshooting

**Port already in use?**
\`\`\`bash
# Change port in vite.config.js
server: { port: 3001 }
\`\`\`

**Dependencies not installing?**
\`\`\`bash
npm cache clean --force
npm install
\`\`\`

**Charts not rendering?**
- Check browser console for errors
- Ensure data format matches Recharts requirements

## Support

For issues or questions:
1. Check the README.md
2. Review component documentation
3. Inspect browser console for errors

## Production Deployment

\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

Deploy the `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Your hosting provider

---

**Happy analyzing! 📊**
