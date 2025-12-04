# Vercel Deployment Setup

## Environment Variables for Vercel

Copy and paste these environment variables into your Vercel project settings:

### Firebase Configuration

```
VITE_FIREBASE_API_KEY=AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8
VITE_FIREBASE_AUTH_DOMAIN=ria-new.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ria-new
VITE_FIREBASE_STORAGE_BUCKET=ria-new.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=64303120014
VITE_FIREBASE_APP_ID=1:64303120014:web:7a724156580dbe5c1f13df
VITE_FIREBASE_MEASUREMENT_ID=G-1SHJ6T2VST
```

### Google Gemini AI

```
VITE_GEMINI_API_KEY=AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw
```

## How to Add to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `VITE_FIREBASE_API_KEY`
   - **Value**: `AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8`
   - Click **Add**
4. Repeat for all 8 variables above
5. Redeploy your project

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add VITE_FIREBASE_API_KEY
# Paste: AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8

vercel env add VITE_FIREBASE_AUTH_DOMAIN
# Paste: ria-new.firebaseapp.com

vercel env add VITE_FIREBASE_PROJECT_ID
# Paste: ria-new

vercel env add VITE_FIREBASE_STORAGE_BUCKET
# Paste: ria-new.firebasestorage.app

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
# Paste: 64303120014

vercel env add VITE_FIREBASE_APP_ID
# Paste: 1:64303120014:web:7a724156580dbe5c1f13df

vercel env add VITE_FIREBASE_MEASUREMENT_ID
# Paste: G-1SHJ6T2VST

vercel env add VITE_GEMINI_API_KEY
# Paste: AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw

# Deploy
vercel --prod
```

### Method 3: Import from .env file

1. Create a file named `vercel-env.txt` with this content:

```
VITE_FIREBASE_API_KEY="AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8"
VITE_FIREBASE_AUTH_DOMAIN="ria-new.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="ria-new"
VITE_FIREBASE_STORAGE_BUCKET="ria-new.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="64303120014"
VITE_FIREBASE_APP_ID="1:64303120014:web:7a724156580dbe5c1f13df"
VITE_FIREBASE_MEASUREMENT_ID="G-1SHJ6T2VST"
VITE_GEMINI_API_KEY="AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw"
```

2. In Vercel Dashboard:
   - Go to Settings → Environment Variables
   - Click **Import .env**
   - Upload `vercel-env.txt`

## Quick Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/piyushxt43/kiroeventpush)

After clicking:
1. Connect your GitHub account
2. Add the environment variables listed above
3. Click **Deploy**

### Manual Deploy

```bash
# Clone repository
git clone https://github.com/piyushxt43/kiroeventpush.git
cd kiroeventpush

# Install dependencies
npm install

# Deploy to Vercel
vercel

# Follow prompts and add environment variables when asked
```

## Verify Deployment

After deployment:

1. Visit your Vercel URL
2. Test Google Sign-In
3. Test AI Chat (click blue bot button)
4. Check browser console for errors

## Troubleshooting

### Issue: "import.meta.env is undefined"

**Solution**: Make sure all environment variables are added in Vercel dashboard and redeploy.

### Issue: Firebase not working

**Solution**: 
1. Check all Firebase variables are correct
2. Add your Vercel domain to Firebase authorized domains:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

### Issue: AI Chat not responding

**Solution**:
1. Verify `VITE_GEMINI_API_KEY` is set correctly
2. Check API quota in Google Cloud Console
3. Check browser console for errors

## Environment Variables Checklist

Before deploying, ensure all these are set:

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_FIREBASE_MEASUREMENT_ID`
- [ ] `VITE_GEMINI_API_KEY`

## Post-Deployment

After successful deployment:

1. **Update Firebase**:
   - Add Vercel domain to authorized domains
   - Update OAuth redirect URIs

2. **Test Features**:
   - Google Sign-In
   - AI Chat
   - All pages load correctly
   - No console errors

3. **Monitor**:
   - Check Vercel Analytics
   - Monitor Firebase usage
   - Check Gemini API quota

---

**Your AgentOS is ready to deploy!** 🚀
