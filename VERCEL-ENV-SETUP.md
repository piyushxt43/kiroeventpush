# 🚀 Vercel Environment Variables Setup

## Quick Setup Guide

### Step 1: Go to Your Vercel Project
1. Visit https://vercel.com/dashboard
2. Select your project: `kiroeventpush`
3. Click on **Settings** tab

### Step 2: Add Environment Variables
1. In Settings, click **Environment Variables** (left sidebar)
2. Add each variable below:

### Required Environment Variables

Copy and paste these **one by one** into Vercel:

#### Firebase Variables
```
Name: VITE_FIREBASE_API_KEY
Value: [Your Firebase API Key from .env file]
```

```
Name: VITE_FIREBASE_AUTH_DOMAIN
Value: [Your Firebase Auth Domain from .env file]
```

```
Name: VITE_FIREBASE_PROJECT_ID
Value: [Your Firebase Project ID from .env file]
```

```
Name: VITE_FIREBASE_STORAGE_BUCKET
Value: [Your Firebase Storage Bucket from .env file]
```

```
Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [Your Firebase Messaging Sender ID from .env file]
```

```
Name: VITE_FIREBASE_APP_ID
Value: [Your Firebase App ID from .env file]
```

```
Name: VITE_FIREBASE_MEASUREMENT_ID
Value: [Your Firebase Measurement ID from .env file]
```

#### Gemini AI Variable
```
Name: VITE_GEMINI_API_KEY
Value: [Your Gemini API Key from .env file]
```

### Step 3: Select Environments
For each variable, select:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Redeploy
After adding all variables:
1. Go to **Deployments** tab
2. Click the **three dots** (•••) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (~2-3 minutes)

## ✅ Verification

After deployment, test your app:
1. Visit your Vercel URL
2. Sign in with Google
3. Click the AI chat button (bottom right)
4. Send a test message
5. If you get a response, it's working! 🎉

## 🐛 Troubleshooting

### AI Chat Not Working
**Error**: "Gemini API key is not configured"
**Solution**: 
- Double-check the variable name is exactly: `VITE_GEMINI_API_KEY`
- Verify the key value is correct
- Redeploy after adding variables

### Firebase Auth Not Working
**Error**: "Firebase: Error (auth/invalid-api-key)"
**Solution**:
- Verify `VITE_FIREBASE_API_KEY` is set correctly
- Check Firebase Console that the key is active

### Build Fails
**Solution**:
- Check build logs in Vercel
- Ensure all environment variables are added
- Try redeploying

## 📝 Quick Copy-Paste Format

**Copy the values from your local `.env` file** and paste them into Vercel.

Your `.env` file contains all the correct values. Simply:
1. Open your `.env` file
2. Copy each value
3. Paste into Vercel's environment variable form

## 🎯 Important Notes

1. **Environment variables are case-sensitive** - use exact names
2. **Must start with `VITE_`** for Vite to expose them to the browser
3. **Redeploy is required** after adding/changing variables
4. **Variables are encrypted** by Vercel - they're secure

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Env Docs: https://vercel.com/docs/environment-variables
- Firebase Console: https://console.firebase.google.com/
- Google AI Studio: https://makersuite.google.com/app/apikey

---

**Need help?** Check the main [VERCEL-SETUP.md](VERCEL-SETUP.md) for detailed deployment instructions.
