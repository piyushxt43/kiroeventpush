# AgentOS Testing Guide

## ✅ Testing Checklist

### Authentication Flow
- [ ] Visit http://localhost:3000
- [ ] See login page with AgentOS branding
- [ ] Click "Sign in with Google"
- [ ] Google OAuth popup appears
- [ ] Select Google account
- [ ] Authorize the app
- [ ] Redirect to dashboard
- [ ] See user profile in sidebar (avatar, name, email)
- [ ] Refresh page - still logged in
- [ ] Click "Sign Out" - return to login

### Navigation
- [ ] Click each sidebar menu item
- [ ] All 10 pages load correctly
- [ ] Active page highlighted in blue
- [ ] No console errors
- [ ] Smooth transitions

### Dashboard Page
- [ ] 4 metric cards display
- [ ] Trend indicators show (up/down arrows)
- [ ] Engagement chart renders
- [ ] 3 platform lines visible (Instagram, Twitter, TikTok)
- [ ] Alert center shows 3 alerts
- [ ] Platform overview cards display
- [ ] Time range selector works (24h, 7d, 30d, 90d)
- [ ] Hover effects on cards

### Platform Analytics
- [ ] Platform tabs work (Instagram, Twitter, TikTok)
- [ ] Bar chart displays content performance
- [ ] Pie chart shows audience demographics
- [ ] Key insights list visible
- [ ] Charts are interactive (hover tooltips)

### Content Performance
- [ ] Content grid displays 3 posts
- [ ] Each card shows metrics (likes, comments, shares, views)
- [ ] Engagement bar animates
- [ ] Platform and type badges visible
- [ ] Filter button present
- [ ] Hover effects work

### Audience Insights
- [ ] 3 stat cards display
- [ ] Follower growth bar chart renders
- [ ] Demographics section shows 4 age groups
- [ ] Progress bars animate
- [ ] All metrics visible

### Competitor Analysis
- [ ] Benchmarking table displays
- [ ] Your account row highlighted
- [ ] 3 stat cards show
- [ ] Key insights list visible
- [ ] All data formatted correctly

### Project Management
- [ ] Task stats display
- [ ] 4 tasks in list
- [ ] Status icons show (completed, in-progress, urgent)
- [ ] Connected tools section visible
- [ ] "New Task" button present

### Reports & Export
- [ ] Report stats display
- [ ] Recent reports list shows 3 items
- [ ] Download buttons visible
- [ ] Template cards display (3 templates)
- [ ] "Create Report" button present

### Real-Time Monitoring
- [ ] Live indicator shows
- [ ] 3 stat cards display
- [ ] Activity feed shows 4 items
- [ ] Sentiment monitor displays
- [ ] Progress bars for sentiment

### AI Assistant Page
- [ ] Large input area visible
- [ ] 4 example prompt cards display
- [ ] Recent queries section shows
- [ ] "Generate" button present
- [ ] Examples are clickable

### Settings
- [ ] Account settings section
- [ ] Connected accounts show (Instagram, Twitter, TikTok)
- [ ] Notification toggles work
- [ ] Agent hooks section visible
- [ ] Privacy section displays

### AI Chat Assistant
- [ ] Blue pulsing bot button visible (bottom-right)
- [ ] Click opens chat window
- [ ] AgentOS branding in header
- [ ] 4 quick action buttons display
- [ ] Welcome message shows user's name
- [ ] Type a message and send
- [ ] AI responds (may take 2-3 seconds)
- [ ] Messages display correctly
- [ ] Close button works
- [ ] Reopen - chat history persists

### AI Chat Interactions
Test these prompts:

1. **Quick Actions**:
   - [ ] Click "Show top posts" - AI responds
   - [ ] Click "Engagement trends" - AI responds
   - [ ] Click "Audience insights" - AI responds
   - [ ] Click "Generate report" - AI responds

2. **Custom Queries**:
   - [ ] "What's my engagement rate?" - AI responds
   - [ ] "Show me my best posts" - AI responds
   - [ ] "Create a weekly report" - AI responds
   - [ ] "Analyze my audience" - AI responds

3. **Action Buttons**:
   - [ ] AI suggests "View Dashboard" - click navigates to /
   - [ ] AI suggests "Create Report" - click navigates to /reports

### Dark Mode
- [ ] All pages have black background (#000000)
- [ ] Cards are dark gray (#0a0a0a)
- [ ] Text is readable (light gray)
- [ ] Borders are subtle
- [ ] No white flashes
- [ ] Consistent across all pages

### Color Scheme
- [ ] Primary blue (#2563eb) used consistently
- [ ] Hover states work (darker blue #1d4ed8)
- [ ] Success green for positive metrics
- [ ] Danger pink for negative metrics
- [ ] All charts use blue color scheme

### Responsive Design
- [ ] Resize browser window
- [ ] Sidebar adapts on mobile
- [ ] Cards stack on smaller screens
- [ ] Charts remain readable
- [ ] Chat window adjusts size
- [ ] No horizontal scroll

### Performance
- [ ] Pages load quickly
- [ ] No lag when navigating
- [ ] Charts render smoothly
- [ ] AI responses within 3 seconds
- [ ] No memory leaks (check DevTools)

### Browser Compatibility
Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Console Checks
- [ ] No errors in console
- [ ] No warnings (except Vite CJS deprecation)
- [ ] Firebase connects successfully
- [ ] Gemini API calls work

## 🐛 Known Issues

### Expected Warnings
- Vite CJS Node API deprecation (can be ignored)
- Firebase analytics in development mode

### Limitations
- Mock data (not real social media data)
- Export functionality placeholder
- Some features show "Coming soon"
- No real-time WebSocket updates yet

## 🧪 Advanced Testing

### Firebase Testing
1. Open Firebase Console
2. Go to Authentication
3. See your user listed
4. Go to Firestore
5. Check "users" collection
6. See your user document with:
   - uid
   - email
   - displayName
   - photoURL
   - lastLogin

### Network Testing
1. Open DevTools Network tab
2. Send AI message
3. See POST to generativelanguage.googleapis.com
4. Response should be 200 OK
5. Check response contains AI text

### State Management
1. Login
2. Navigate to different pages
3. Refresh browser
4. Should stay logged in
5. User profile should persist

### Error Handling
1. Disconnect internet
2. Try to send AI message
3. Should show error message
4. Reconnect internet
5. Try again - should work

## 📊 Performance Benchmarks

### Target Metrics
- Initial load: < 2 seconds
- Page navigation: < 500ms
- AI response: < 3 seconds
- Chart render: < 1 second
- Firebase auth: < 2 seconds

### Lighthouse Scores (Target)
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 80

## 🔍 Debugging Tips

### If Login Doesn't Work
1. Check Firebase console
2. Verify Google Auth is enabled
3. Check browser console for errors
4. Try incognito mode
5. Clear browser cache

### If AI Chat Doesn't Respond
1. Check network tab for API call
2. Verify API key is correct
3. Check Gemini API quota
4. Look for CORS errors
5. Try different prompt

### If Charts Don't Render
1. Check console for Recharts errors
2. Verify data format
3. Check window size
4. Try refreshing page
5. Check browser compatibility

### If Styles Look Wrong
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache
3. Check CSS files loaded
4. Verify no conflicting styles
5. Check browser DevTools

## ✨ Success Criteria

### Must Have
- ✅ Google Sign-In works
- ✅ All 10 pages load
- ✅ AI chat responds
- ✅ Dark mode consistent
- ✅ Navigation works
- ✅ Charts display
- ✅ User profile shows

### Nice to Have
- ✅ Smooth animations
- ✅ Quick actions work
- ✅ Hover effects
- ✅ Responsive design
- ✅ No console errors

### Future Enhancements
- Real API integration
- Webhook automation
- Team features
- Advanced AI
- Mobile app

---

## 📝 Test Report Template

```
Date: ___________
Tester: ___________
Browser: ___________
OS: ___________

Authentication: ☐ Pass ☐ Fail
Navigation: ☐ Pass ☐ Fail
Dashboard: ☐ Pass ☐ Fail
AI Chat: ☐ Pass ☐ Fail
Dark Mode: ☐ Pass ☐ Fail
Responsive: ☐ Pass ☐ Fail

Issues Found:
1. ___________
2. ___________
3. ___________

Notes:
___________
___________
```

---

**Happy Testing!** 🚀
