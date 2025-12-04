# 🚀 Deployment Guide - AgentOS

## Prerequisites

Before deploying, ensure you have:
- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ GitHub account
- ✅ Firebase project created
- ✅ Gemini API key

## 📦 Production Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 4. Test Production Build Locally
```bash
npm run preview
```

Visit http://localhost:4173 to test the production build.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts:
   - Link to existing project or create new
   - Set environment variables in Vercel dashboard
   - Deploy!

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all VITE_* variables from your .env file

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

3. Or use Netlify UI:
   - Drag and drop the `dist/` folder
   - Configure environment variables in Site Settings

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 4: Docker

1. Build Docker image:
```bash
docker build -t agentos .
```

2. Run container:
```bash
docker run -p 80:80 agentos
```

3. Or use Docker Compose:
```yaml
version: '3.8'
services:
  agentos:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
      - VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}
```

### Option 5: AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔧 Post-Deployment Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing
3. Enable Authentication → Google Sign-In
4. Create Firestore database
5. Add your deployment domain to authorized domains:
   - Authentication → Settings → Authorized domains
   - Add: `your-domain.com`

### Gemini API Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Enable Gemini API in Google Cloud Console
3. Set usage quotas if needed
4. Add API key to environment variables

## 🔒 Security Checklist

Before going live:

- [ ] Remove all console.log statements
- [ ] Set up proper CORS policies
- [ ] Enable Firebase security rules
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set up rate limiting for API calls
- [ ] Configure CSP headers
- [ ] Enable Firebase App Check (optional)

## 📊 Monitoring

### Set Up Analytics

1. **Firebase Analytics** (Already configured)
   - Automatic user tracking
   - Event tracking
   - Crash reporting

2. **Google Analytics 4** (Optional)
   - Add GA4 tracking ID to Firebase

3. **Sentry** (Optional for error tracking)
```bash
npm install @sentry/react
```

### Performance Monitoring

1. Enable Firebase Performance Monitoring
2. Use Lighthouse for performance audits
3. Monitor Core Web Vitals

## 🚨 Troubleshooting

### Build Fails

**Issue**: `npm run build` fails
**Solution**: 
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node version: `node -v` (should be 18+)

### Environment Variables Not Working

**Issue**: Variables are undefined in production
**Solution**:
- Ensure all variables start with `VITE_`
- Rebuild after changing .env
- Check deployment platform's environment variable settings

### Firebase Authentication Fails

**Issue**: Google Sign-In doesn't work
**Solution**:
- Add deployment domain to Firebase authorized domains
- Check Firebase API key is correct
- Verify OAuth consent screen is configured

### AI Chat Not Responding

**Issue**: Gemini API calls fail
**Solution**:
- Verify API key is correct
- Check API quota in Google Cloud Console
- Ensure CORS is properly configured
- Check browser console for errors

## 📈 Performance Optimization

### Already Implemented

- ✅ Code splitting with React Router
- ✅ Lazy loading of components
- ✅ Optimized images
- ✅ Minified CSS and JS
- ✅ Gzip compression (nginx.conf)

### Additional Optimizations

1. **Enable CDN**
   - Vercel/Netlify provide automatic CDN
   - For custom hosting, use CloudFlare

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Use responsive images

3. **Caching Strategy**
   - Static assets: 1 year cache
   - HTML: No cache
   - API responses: Short cache

## 🔄 CI/CD Pipeline

GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`

### Manual Deployment

```bash
# 1. Commit changes
git add .
git commit -m "Your message"

# 2. Push to GitHub
git push origin main

# 3. GitHub Actions will automatically:
#    - Install dependencies
#    - Run build
#    - Deploy to production
```

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Firebase project set up
- [ ] Gemini API key obtained
- [ ] Build succeeds without errors
- [ ] Production build tested locally
- [ ] Security checklist completed
- [ ] Analytics configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backup strategy in place

## 🎉 You're Live!

After deployment:

1. Test all features on production URL
2. Monitor error logs for first 24 hours
3. Check analytics dashboard
4. Share with users!

## 📞 Support

Need help with deployment?

- 📧 Email: support@agentos.dev
- 💬 Discord: [Join our community](https://discord.gg/agentos)
- 📖 Docs: [docs.agentos.dev](https://docs.agentos.dev)

---

**Happy Deploying!** 🚀
