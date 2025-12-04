# 🚀 Vercel Deployment Guide for AgentOS

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/piyushxt43/kiroeventpush)

### Option 2: Manual Deploy

## Step-by-Step Instructions

### 1. Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### 2. Connect Your Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `piyushxt43/kiroeventpush`
4. Vercel will auto-detect it's a Vite project

### 3. Configure Environment Variables

**IMPORTANT**: Add these environment variables in Vercel Dashboard

Go to: **Project Settings → Environment Variables**

Copy and paste these **one by one**:

```env
VITE_FIREBASE_API_KEY=AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8
```

```env
VITE_FIREBASE_AUTH_DOMAIN=ria-new.firebaseapp.com
```

```env
VITE_FIREBASE_PROJECT_ID=ria-new
```

```env
VITE_FIREBASE_STORAGE_BUCKET=ria-new.firebasestorage.app
```

```env
VITE_FIREBASE_MESSAGING_SENDER_ID=64303120014
```

```env
VITE_FIREBASE_APP_ID=1:64303120014:web:7a724156580dbe5c1f13df
```

```env
VITE_FIREBASE_MEASUREMENT_ID=G-1SHJ6T2VST
```

```env
VITE_GEMINI_API_KEY=AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw
```

### 4. Deploy Settings

Vercel will auto-detect these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Deploy!

Click **"Deploy"** and wait ~2 minutes.

## 📋 Environment Variables Checklist

Make sure you've added all 8 variables:

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_FIREBASE_MEASUREMENT_ID`
- [ ] `VITE_GEMINI_API_KEY`

## 🔧 Post-Deployment Configuration

### Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **ria-new**
3. Go to **Authentication → Settings → Authorized domains**
4. Add your Vercel domain: `your-project.vercel.app`

Example: `agentos-analytics.vercel.app`

### Test Your Deployment

1. Visit your Vercel URL
2. Click "Sign In" button
3. Try Google Sign-In
4. Test AI Chat assistant
5. Navigate through all pages

## 🚨 Troubleshooting

### Issue: Build Fails

**Solution**: Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version (18+)

### Issue: Environment Variables Not Working

**Solution**: 
1. Verify all variables start with `VITE_`
2. Redeploy after adding variables
3. Check variable names match exactly

### Issue: Firebase Auth Not Working

**Solution**:
1. Add Vercel domain to Firebase authorized domains
2. Check Firebase API key is correct
3. Verify OAuth consent screen is configured

### Issue: AI Chat Not Responding

**Solution**:
1. Check Gemini API key is correct
2. Verify API quota in Google Cloud Console
3. Check browser console for errors

## 📊 Vercel CLI Deployment

If you prefer CLI:

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables via CLI
vercel env add VITE_FIREBASE_API_KEY
# Enter value when prompted
# Repeat for all variables
```

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment

## 🎨 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Add domain to Firebase authorized domains

## 📈 Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Gzip compression
- ✅ Image optimization
- ✅ Edge caching

## 🔐 Security Headers

Vercel automatically adds:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

## 📊 Analytics

Enable Vercel Analytics:
1. Go to Project Settings → Analytics
2. Enable Web Analytics
3. View real-time metrics

## 💰 Pricing

- **Hobby Plan**: Free
  - Unlimited deployments
  - 100GB bandwidth/month
  - Perfect for this project

- **Pro Plan**: $20/month
  - More bandwidth
  - Team features
  - Priority support

## 🎉 Success!

Your AgentOS is now live on Vercel! 🚀

**Share your deployment**:
- Tweet about it
- Add to your portfolio
- Share with friends

## 📞 Support

Need help?
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/piyushxt43/kiroeventpush/issues)

---

**Pro Tip**: Bookmark your Vercel dashboard for easy access to logs and analytics!
