# 🚀 Vercel Deployment Setup for AgentOS

## Quick Setup Guide

### Step 1: Add Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables

Add these **EXACT** variables (copy-paste each one):

```
VITE_FIREBASE_API_KEY=AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8
VITE_FIREBASE_AUTH_DOMAIN=ria-new.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ria-new
VITE_FIREBASE_STORAGE_BUCKET=ria-new.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=64303120014
VITE_FIREBASE_APP_ID=1:64303120014:web:7a724156580dbe5c1f13df
VITE_FIREBASE_MEASUREMENT_ID=G-1SHJ6T2VST
VITE_GEMINI_API_KEY=AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw
```

**Important**: 
- Make sure each variable name starts with `VITE_`
- Set them for **Production**, **Preview**, and **Development** environments
- Click "Save" after adding all variables

### Step 2: Add Vercel Domain to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **ria-new**
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add your Vercel domains:
   ```
   your-project.vercel.app
   your-custom-domain.com (if you have one)
   ```

### Step 3: Redeploy on Vercel

After adding environment variables:

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Find the latest deployment
4. Click the three dots (•••) → **Redeploy**
5. Check "Use existing Build Cache" → Click **Redeploy**

## 🔍 Troubleshooting

### Error: "Missing App configuration value: projectId"

**Cause**: Environment variables not loaded properly

**Solution**:
1. Verify all `VITE_` prefixed variables are in Vercel
2. Make sure they're set for all environments (Production, Preview, Development)
3. Redeploy after adding variables
4. Clear browser cache and try again

### Error: "Firebase: Error (auth/unauthorized-domain)"

**Cause**: Vercel domain not authorized in Firebase

**Solution**:
1. Copy your Vercel URL (e.g., `agentos.vercel.app`)
2. Add it to Firebase → Authentication → Authorized domains
3. Wait 1-2 minutes for changes to propagate
4. Try again

### Error: "API key not valid"

**Cause**: Wrong API key or not set properly

**Solution**:
1. Double-check the API key in Vercel matches the one in Firebase
2. Make sure variable name is exactly `VITE_FIREBASE_API_KEY`
3. Redeploy after fixing

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] Firebase connection works (check browser console)
- [ ] Sign-in button appears in header
- [ ] Google Sign-In works
- [ ] AI chat button appears
- [ ] AI chat responds to messages
- [ ] All pages load correctly
- [ ] No console errors

## � Environment Variables Reference

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key | AIzaSy... |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | project-id |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | project.appspot.com |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | 123456789 |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | 1:123:web:abc |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics ID | G-ABC123 |
| `VITE_GEMINI_API_KEY` | Gemini AI API Key | AIzaSy... |

## 🎯 Quick Copy-Paste for Vercel

Copy this entire block and paste into Vercel's environment variables (one per line):

```env
VITE_FIREBASE_API_KEY=AIzaSyAPivtbnPyUM0CZWJ2QGIr_9JnNM_-87G8
VITE_FIREBASE_AUTH_DOMAIN=ria-new.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ria-new
VITE_FIREBASE_STORAGE_BUCKET=ria-new.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=64303120014
VITE_FIREBASE_APP_ID=1:64303120014:web:7a724156580dbe5c1f13df
VITE_FIREBASE_MEASUREMENT_ID=G-1SHJ6T2VST
VITE_GEMINI_API_KEY=AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw
```

## 🔒 Security Notes

- Environment variables are secure in Vercel
- They're not exposed in the client bundle
- Only the values are used, not the variables themselves
- Keep your `.env` file in `.gitignore` (already configured)

## 📞 Still Having Issues?

1. Check Vercel deployment logs for errors
2. Check browser console for Firebase errors
3. Verify all environment variables are set correctly
4. Make sure Firebase project is active
5. Confirm billing is enabled in Firebase (if needed)

---

**Your AgentOS should now work perfectly on Vercel!** 🎉
